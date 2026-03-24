# AI Weekly — Claude Code Skill

> 每周追踪 25 位顶级 AI 建造者动态、主要 AI 公司产品发布和播客内容，自动生成带标签筛选的交互式 HTML 周报。

---

## 效果预览

生成的网页包含：
- 顶部粘性导航栏（本期概览 / 产品与技术 / 建造者动态 / 播客精选 / 深度洞察）
- 全文搜索框
- 标签云（点击筛选对应内容）
- 每条内容独立卡片，含核心描述、关键亮点、深度分析和原始链接
- 支持中文 / 英文 / 双语输出

---

## 安装

**前置要求：** 已安装 [Claude Code](https://claude.ai/code)，Node.js 18+

```bash
# 将本项目克隆到 Claude Code 的 skills 目录
git clone https://github.com/YOUR_USERNAME/ai-weekly ~/.claude/skills/ai-weekly
```

完成后直接在 Claude Code 中运行：

```
/ai-weekly
```

首次运行会引导你完成初始化配置（时间范围、输出语言）。

---

## 使用方法

| 命令 | 说明 |
|---|---|
| `/ai-weekly` | 生成本周周报 |
| 「改成每日追踪」 | 切换为 24 小时时间范围 |
| 「切换为中文」 | 修改输出语言 |
| 「重新生成网页」 | 从已有 Markdown 重新生成 HTML |
| 「显示我的设置」 | 查看当前配置 |

生成结果保存在 `~/ai-weekly/` 目录：
- `YYYY.M.D-D.md` — Markdown 版（可归档、可编辑）
- `YYYY.M.D-D.html` — 交互式网页版（生成后自动在浏览器打开）

---

## 数据来源

### 建造者动态 & 播客
依赖 [Zara Zhang（zarazhangrui）](https://github.com/zarazhangrui/follow-builders) 的中央 feed，每日更新，追踪 25 位顶级 AI 建造者。数据通过 `prepare-digest.js` 自动拉取。

如果网络连接失败，skill 会自动降级为通过 WebSearch 补充主要建造者的近期动态。

### 产品发布
通过 Claude Code 内置的 WebSearch 实时搜索，按以下优先级收录：

1. **Tier 1A** — 官方公司账号（@OpenAI、@AnthropicAI、@GoogleAI 等）
2. **Tier 1B** — CEO 和技术负责人推文（@sama、@karpathy 等）
3. **Tier 1C** — 官方博客（openai.com/blog、anthropic.com/news 等）
4. **Tier 2** — 科技媒体（techcrunch.com、theverge.com，仅补充）

官方来源占比必须达到 70% 以上。

---

## 自定义 Prompt

skill 支持三级 prompt 优先级：**用户自定义 > GitHub 远程 > 本地默认**

如果你想修改摘要风格或翻译规则，把对应文件复制到 `~/.ai-weekly/prompts/` 并编辑，不会被更新覆盖：

```bash
cp ~/.claude/skills/ai-weekly/prompts/summarize-tweets.md ~/.ai-weekly/prompts/
# 然后编辑 ~/.ai-weekly/prompts/summarize-tweets.md
```

可自定义的文件：

| 文件 | 说明 |
|---|---|
| `summarize-tweets.md` | 建造者推文摘要规则 |
| `summarize-podcast.md` | 播客摘要规则 |
| `translate.md` | 翻译和双语格式规则 |
| `digest-intro.md` | 周报整体结构和语气 |
| `product-releases.md` | 产品发布搜索和筛选规则 |

---

## 文件结构

```
ai-weekly/
├── SKILL.md                    # Claude Code skill 主文件（7 步生成流程）
├── scripts/
│   ├── prepare-digest.js       # 数据抓取脚本（拉取 Zara 的中央 feed）
│   └── package.json
└── prompts/
    ├── digest-intro.md         # 周报格式规则（5 节结构、语气、收尾规则）
    ├── product-releases.md     # 产品发布搜索规则（Tier 1A/1B/1C/2）
    ├── webpage.md              # HTML 生成规范（完整 CSS、JS、卡片模板）
    ├── summarize-tweets.md     # 推文摘要规则（来自 Zara，可自定义覆盖）
    ├── summarize-podcast.md    # 播客摘要规则（来自 Zara，可自定义覆盖）
    └── translate.md            # 翻译规则（来自 Zara，可自定义覆盖）
```

---

## 致谢

本项目基于 [Zara Zhang（@zarazhangrui）](https://github.com/zarazhangrui/follow-builders) 的 follow-builders skill 开发，核心数据架构（中央 feed、建造者名单、播客列表、三级 prompt 优先级）均来自她的原始设计。

在此基础上新增：
- 产品发布板块（WebSearch + Tier 优先级规则）
- 5 节 Markdown 周报结构和整体风格规范
- 交互式 HTML 网页生成（标签筛选、全文搜索、卡片布局）
- 中英双语输出支持
- feed 抓取失败时的降级策略

---

## License

MIT
