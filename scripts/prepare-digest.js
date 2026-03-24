#!/usr/bin/env node

// ============================================================================
// AI Weekly — Prepare Digest
// ============================================================================
// Gathers everything Claude needs to produce the weekly digest:
// - Fetches Zara's central feeds (builders' tweets + podcasts)
// - Loads prompts (3-tier priority: user custom > GitHub remote > local)
// - Reads the user's config
// - Outputs a single JSON blob to stdout
//
// Usage: node prepare-digest.js
// Output: JSON to stdout
// ============================================================================

import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

// -- Constants ---------------------------------------------------------------

const USER_DIR = join(homedir(), '.ai-weekly');
const CONFIG_PATH = join(USER_DIR, 'config.json');

// Zara's central feeds — updated daily
const FEED_X_URL = 'https://raw.githubusercontent.com/zarazhangrui/follow-builders/main/feed-x.json';
const FEED_PODCASTS_URL = 'https://raw.githubusercontent.com/zarazhangrui/follow-builders/main/feed-podcasts.json';

// Zara's prompt base — for prompts we inherit from her
const ZARA_PROMPTS_BASE = 'https://raw.githubusercontent.com/zarazhangrui/follow-builders/main/prompts';

// Prompts fetched from Zara's repo (user custom > GitHub remote > local fallback)
const ZARA_PROMPTS = [
  'summarize-podcast.md',
  'summarize-tweets.md',
  'translate.md',
];

// Our custom prompts (user custom > local only, no remote fallback)
const LOCAL_PROMPTS = [
  'digest-intro.md',
  'product-releases.md',
];

// -- Helpers -----------------------------------------------------------------

async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function fetchText(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.text();
  } catch {
    return null;
  }
}

// -- Main --------------------------------------------------------------------

async function main() {
  const errors = [];

  // 1. Read user config
  let config = {
    timeRange: '7d',
    language: 'bilingual',
    outputDir: '~/ai-weekly',
  };
  if (existsSync(CONFIG_PATH)) {
    try {
      config = JSON.parse(await readFile(CONFIG_PATH, 'utf-8'));
    } catch (err) {
      errors.push(`Could not read config: ${err.message}`);
    }
  }

  // 2. Fetch Zara's central feeds in parallel
  const [feedX, feedPodcasts] = await Promise.all([
    fetchJSON(FEED_X_URL),
    fetchJSON(FEED_PODCASTS_URL),
  ]);

  if (!feedX) errors.push('Could not fetch tweet feed from Zara\'s central repo');
  if (!feedPodcasts) errors.push('Could not fetch podcast feed from Zara\'s central repo');

  // 3. Load prompts
  const prompts = {};
  const scriptDir = decodeURIComponent(new URL('.', import.meta.url).pathname);
  const localPromptsDir = join(scriptDir, '..', 'prompts');
  const userPromptsDir = join(USER_DIR, 'prompts');

  // Zara's prompts: user custom > GitHub remote > local fallback
  for (const filename of ZARA_PROMPTS) {
    const key = filename.replace('.md', '').replace(/-/g, '_');
    const userPath = join(userPromptsDir, filename);
    const localPath = join(localPromptsDir, filename);

    if (existsSync(userPath)) {
      prompts[key] = await readFile(userPath, 'utf-8');
      continue;
    }

    const remote = await fetchText(`${ZARA_PROMPTS_BASE}/${filename}`);
    if (remote) {
      prompts[key] = remote;
      continue;
    }

    if (existsSync(localPath)) {
      prompts[key] = await readFile(localPath, 'utf-8');
    } else {
      errors.push(`Could not load prompt: ${filename}`);
    }
  }

  // Our custom prompts: user custom > local (no remote fallback)
  for (const filename of LOCAL_PROMPTS) {
    const key = filename.replace('.md', '').replace(/-/g, '_');
    const userPath = join(userPromptsDir, filename);
    const localPath = join(localPromptsDir, filename);

    if (existsSync(userPath)) {
      prompts[key] = await readFile(userPath, 'utf-8');
    } else if (existsSync(localPath)) {
      prompts[key] = await readFile(localPath, 'utf-8');
    } else {
      errors.push(`Could not load prompt: ${filename}`);
    }
  }

  // 4. Build output — everything Claude needs in one blob
  const output = {
    status: 'ok',
    generatedAt: new Date().toISOString(),

    config: {
      timeRange: config.timeRange || '7d',
      language: config.language || 'bilingual',
      outputDir: config.outputDir || '~/ai-weekly',
    },

    // Content from Zara's central feeds
    x: feedX?.x || [],
    podcasts: feedPodcasts?.podcasts || [],

    stats: {
      xBuilders: feedX?.x?.length || 0,
      totalTweets: (feedX?.x || []).reduce((sum, a) => sum + (a.tweets?.length || 0), 0),
      podcastEpisodes: feedPodcasts?.podcasts?.length || 0,
      feedGeneratedAt: feedX?.generatedAt || feedPodcasts?.generatedAt || null,
    },

    prompts,

    errors: errors.length > 0 ? errors : undefined,
  };

  console.log(JSON.stringify(output, null, 2));
}

main().catch(err => {
  console.error(JSON.stringify({ status: 'error', message: err.message }));
  process.exit(1);
});
