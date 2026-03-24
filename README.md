# AI Weekly — Claude Code Skill

> 每周追踪 25 位顶级 AI 建造者动态、主要 AI 公司产品发布和播客内容，自动生成带标签筛选的交互式 HTML 周报。
>
> Track 25 top AI builders, major AI product launches, and podcasts. Generate a bilingual interactive HTML digest weekly — with tag filtering and full-text search.

**基于 / Based on [Zara Zhang's follow-builders](https://github.com/zarazhangrui/follow-builders) · 新增产品发布、交互式 HTML 和双语输出 / Extended with product releases, interactive HTML, and bilingual output**

---

## 安装 / Installation

**前置要求 / Requirements:** [Claude Code](https://claude.ai/code) 已安装 / installed，Node.js 18+

```bash
git clone https://github.com/tljymg2022-hue/ai-weekly ~/.claude/skills/ai-weekly
```

然后在 Claude Code 中运行 / Then run in Claude Code:

```
/ai-weekly
```

首次运行会引导你完成初始化配置（时间范围、输出语言）。
First run will prompt you to configure time range and output language.

---

## 使用方法 / Usage

| 命令 / Command | 说明 / Description |
|---|---|
| `/ai-weekly` | 生成本周周报 / Generate this week's digest |
| 「改成每日追踪」/ "Switch to daily" | 切换为 24 小时范围 / Change to 24-hour range |
| 「切换为中文/英文」/ "Switch language" | 修改输出语言 / Change output language |
| 「重新生成网页」/ "Regenerate webpage" | 从已有 Markdown 重新生成 HTML / Rebuild HTML from existing Markdown |
| 「显示我的设置」/ "Show my settings" | 查看当前配置 / View current config |

生成结果保存在 `~/ai-weekly/` / Output saved to `~/ai-weekly/`:
- `YYYY.M.D-D.md` — Markdown 版 / Markdown version
- `YYYY.M.D-D.html` — 交互式网页版，生成后自动在浏览器打开 / Interactive webpage, auto-opens after generation

---

## 数据来源 / Data Sources

### 建造者动态 & 播客 / Builder Updates & Podcasts

依赖 [Zara Zhang（zarazhangrui）](https://github.com/zarazhangrui/follow-builders) 的中央 feed，每日更新，追踪 25 位顶级 AI 建造者。
Powered by Zara Zhang's central feed, updated daily, tracking 25 top AI builders.

如果网络连接失败，skill 会自动降级为通过 WebSearch 补充主要建造者的近期动态。
If the feed is unreachable, the skill falls back to WebSearch for major builders' recent activity.

### 产品发布 / Product Releases

通过 Claude Code 内置 WebSearch 实时搜索，按以下优先级收录 / Real-time search via WebSearch, ranked by source tier:

1. **Tier 1A** — 官方公司账号 / Official accounts (@OpenAI, @AnthropicAI, @GoogleAI, etc.)
2. **Tier 1B** — CEO 和技术负责人 / CEO and tech leads (@sama, @karpathy, etc.)
3. **Tier 1C** — 官方博客 / Official blogs (openai.com/blog, anthropic.com/news, etc.)
4. **Tier 2** — 科技媒体，仅补充 / Tech media, supplementary only (TechCrunch, The Verge)

官方来源占比必须达到 70% 以上 / Official sources must account for 70%+ of included items.

---

## 自定义 Prompt / Custom Prompts

支持三级 prompt 优先级：**用户自定义 > GitHub 远程 > 本地默认**
3-tier prompt priority: **user custom > GitHub remote > local default**

复制对应文件到 `~/.ai-weekly/prompts/` 并编辑，不会被更新覆盖 / Copy to `~/.ai-weekly/prompts/` and edit — won't be overwritten by updates:

```bash
cp ~/.claude/skills/ai-weekly/prompts/summarize-tweets.md ~/.ai-weekly/prompts/
```

| 文件 / File | 说明 / Purpose |
|---|---|
| `summarize-tweets.md` | 建造者推文摘要规则 / Builder tweet summarization rules |
| `summarize-podcast.md` | 播客摘要规则 / Podcast summarization rules |
| `translate.md` | 翻译和双语格式规则 / Translation and bilingual formatting |
| `digest-intro.md` | 周报整体结构和语气 / Digest structure and tone |
| `product-releases.md` | 产品发布搜索和筛选规则 / Product release search rules |

---

## 文件结构 / File Structure

```
ai-weekly/
├── SKILL.md                    # Claude Code skill 主文件 / entry point
├── scripts/
│   ├── prepare-digest.js       # 数据抓取脚本 / data fetch script
│   └── package.json
└── prompts/
    ├── digest-intro.md         # 周报格式规则 / digest format rules
    ├── product-releases.md     # 产品发布搜索规则 / product release search rules
    ├── webpage.md              # HTML 生成规范 / HTML generation spec
    ├── summarize-tweets.md     # 推文摘要（来自 Zara / from Zara）
    ├── summarize-podcast.md    # 播客摘要（来自 Zara / from Zara）
    └── translate.md            # 翻译规则（来自 Zara / from Zara）
```

---

## 致谢 / Credits

本项目基于 [Zara Zhang（@zarazhangrui）](https://github.com/zarazhangrui/follow-builders) 的 follow-builders skill 开发，核心数据架构（中央 feed、建造者名单、播客列表、三级 prompt 优先级）均来自她的原始设计。

Built on top of [Zara Zhang's (@zarazhangrui)](https://github.com/zarazhangrui/follow-builders) follow-builders skill. The core data architecture — central feed, builder list, podcast list, and 3-tier prompt priority — all originate from her original design.

在此基础上新增 / Added in this fork:
- 产品发布板块（WebSearch + Tier 优先级规则）/ **Product releases** — WebSearch with source-tier prioritization
- 5 节 Markdown 周报结构和整体风格规范 / **5-section digest structure** — overview, products, builders, podcasts, insights
- 交互式 HTML 网页生成（标签筛选、全文搜索、卡片布局）/ **Interactive HTML** — tag filtering, full-text search, card layout
- 中英双语输出支持 / **Bilingual output** — Chinese/English paragraph-level interleaving
- feed 抓取失败时的降级策略 / **Feed failure fallback** — WebSearch fallback when Zara's feed is unreachable

---

## License

MIT
