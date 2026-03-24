# Product Release Search Rules

You are searching for AI product releases and technical breakthroughs using WebSearch.

## Source Priority (strict order)

### Tier 1A — Official Company Accounts on X/Twitter (always search first)

Search these accounts for product announcements, model releases, and feature updates:
- @OpenAI, @AnthropicAI, @GoogleAI, @GoogleLabs, @MetaAI, @Replit, @vercel, @claudeai

Key individuals at same priority level:
- OpenAI: @sama (Sam Altman, CEO), @kevinweil (Chief Product Officer)
- Anthropic: @alexalbert__ (Developer Relations), @AmandaAskell (Alignment lead)
- Google: @joshwoodward (Google Labs VP)
- Replit: @amasad (CEO)
- Vercel: @rauchg (CEO)
- Independent: @karpathy (Andrej Karpathy), @swyx

What to look for in these tweets:
- New model or product launch announcements
- Feature updates with specific capability descriptions
- Technical benchmark results and comparisons
- Demo links and interactive examples
- API releases and developer tooling
- Usage examples and product walkthroughs from key figures

### Tier 1B — Official Company Blogs (use when Tier 1A results are insufficient)

- openai.com/blog
- anthropic.com/news
- ai.google/blog
- meta.ai (Meta AI announcements)

### Tier 2 — Tech Media (only when Tier 1 is clearly insufficient)

Use only for additional context on already-confirmed Tier 1 announcements:
- techcrunch.com, theverge.com, arstechnica.com

## Content Selection Rules

**Include only if ALL of these are true:**
- ✅ Source is in the whitelist above
- ✅ Directly about an AI product, model, capability, or technical development
- ✅ Published within the user's configured time range
- ✅ Has a working, publicly accessible URL
- ✅ Contains specific product name, feature description, or technical detail

**Always exclude:**
- ❌ Wikipedia — anyone can edit it, no reliability guarantee
- ❌ Twitter accounts not in the whitelist above
- ❌ Low-quality personal blogs or news aggregators
- ❌ PR/marketing content without technical substance (unless from official sources)
- ❌ Political bias-prone outlets (e.g. The Guardian for tech topics)
- ❌ Minor bug fixes or routine maintenance updates
- ❌ Duplicate coverage of the same announcement (keep only the best source)
- ❌ Personal life content (even from key figures)

## Quality Threshold

Official source coverage (Tier 1A + 1B combined) must make up 70%+ of the final product releases list.

If fewer than 3 qualifying Tier 1 items are found, note this in the digest rather than padding with low-quality Tier 2 sources.

## Content to Extract per Item

For each qualifying product release, extract:
- Product or feature name
- Announcement date
- Source type (Official account / CEO tweet / Company blog / Tech media)
- Core description (what it does, key capabilities)
- Key highlights (3-5 specific points)
- Why it matters (significance to the AI landscape)
- Direct URL to the announcement
