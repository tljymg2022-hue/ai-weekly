---
name: ai-weekly
description: AI周报生成器 — 追踪25位顶级AI建造者动态、主要AI公司产品发布和播客内容，生成Markdown周报和带标签筛选的交互式HTML网页。使用 /ai-weekly 触发。
---

# AI 周报生成器

追踪 25 位顶级 AI 建造者的推文、5 个 AI 播客，以及主要 AI 公司的产品发布动态。
每次生成两份文件：
- `~/ai-weekly/YYYY.M.D-D.md` — Markdown 版（可归档、可编辑）
- `~/ai-weekly/YYYY.M.D-D.html` — 交互式网页版（支持标签筛选和全文搜索）

---

## 首次运行 — 初始化配置

检查 `~/.ai-weekly/config.json` 是否存在且包含 `"onboardingComplete": true`。

如果不存在，执行以下初始化流程：

### 第 1 步：询问时间范围

询问用户：「你想追踪最近多长时间的内容？」
- 最近 7 天（推荐，适合每周生成）
- 最近 24 小时（适合每日生成）

默认：7 天

### 第 2 步：询问语言偏好

询问用户：「输出语言偏好？」
- 双语（中英段落交替，推荐）
- 中文
- 英文

默认：双语

### 第 3 步：保存配置并立即生成

```bash
mkdir -p ~/.ai-weekly
mkdir -p ~/ai-weekly
cat > ~/.ai-weekly/config.json << 'EOF'
{
  "timeRange": "7d",
  "language": "bilingual",
  "outputDir": "~/ai-weekly",
  "onboardingComplete": true
}
EOF
```

告知用户：「配置完成！正在生成你的第一份周报...」

立即执行下面的「生成周报」流程。

---

## 生成周报

用户输入 `/ai-weekly` 或要求生成周报时执行此流程。

### 第 1 步：加载配置

读取 `~/.ai-weekly/config.json`，获取 `timeRange` 和 `language`。
如果文件不存在，使用默认值：`timeRange: "7d"`，`language: "bilingual"`。

### 第 2 步：运行数据抓取脚本

```bash
cd ${CLAUDE_SKILL_DIR}/scripts && node prepare-digest.js 2>/dev/null
```

脚本输出一个 JSON，包含：
- `config` — 用户配置
- `x` — 25 位建造者的近期推文
- `podcasts` — 播客节目（含摘要信息）
- `prompts` — 所有提示词（summarize_tweets、summarize_podcast、translate、digest_intro、product_releases）
- `stats` — 内容数量统计

如果脚本完全失败（无 JSON 输出），告知用户检查网络连接并停止。
否则，使用 JSON 中的任何可用内容继续。

**当 feed 抓取失败时的降级策略：**
- `x` 数组为空（tweet feed 失败）→ 在第 3 步的 WebSearch 中额外搜索以下建造者的近期动态：`site:twitter.com/sama OR site:x.com/sama`、`site:twitter.com/karpathy OR site:x.com/karpathy`、`site:twitter.com/alexalbert__ OR site:x.com/alexalbert__`、`site:twitter.com/amasad OR site:x.com/amasad`。将找到的内容归入「AI 建造者动态」板块。
- `podcasts` 数组为空（podcast feed 失败）→ 跳过播客板块，不强行补充。播客内容质量要求高，WebSearch 难以保证准确性。

### 第 3 步：搜索产品发布动态

按照 `prompts.product_releases` 中的规则，使用 WebSearch 搜索 AI 产品发布信息。

`freshness` 参数根据配置：
- `timeRange: "7d"` → 最近 7 天
- `timeRange: "1d"` → 最近 24 小时

按优先级执行搜索（找到足够内容后可停止 Tier 1，进入下一步）：

**Tier 1A — 官方公司账号推文（最优先，必须执行）：**
```
site:twitter.com/OpenAI OR site:x.com/OpenAI
site:twitter.com/AnthropicAI OR site:x.com/AnthropicAI
site:twitter.com/GoogleAI OR site:x.com/GoogleAI OR site:twitter.com/GoogleLabs OR site:x.com/GoogleLabs
site:twitter.com/MetaAI OR site:x.com/MetaAI OR site:twitter.com/Replit OR site:x.com/Replit OR site:twitter.com/vercel OR site:x.com/vercel
```

**Tier 1B — CEO 和技术负责人推文（同等优先级）：**
```
site:twitter.com/sama OR site:x.com/sama OR site:twitter.com/kevinweil OR site:x.com/kevinweil
site:twitter.com/alexalbert__ OR site:x.com/alexalbert__ OR site:twitter.com/AmandaAskell OR site:x.com/AmandaAskell
site:twitter.com/joshwoodward OR site:x.com/joshwoodward
site:twitter.com/amasad OR site:x.com/amasad OR site:twitter.com/rauchg OR site:x.com/rauchg OR site:twitter.com/karpathy OR site:x.com/karpathy
```

**Tier 1C — 官方博客（当推文来源不足时使用）：**
```
site:openai.com/blog OR site:anthropic.com/news OR site:ai.google/blog
```

**Tier 2 — 科技媒体（仅当 Tier 1 内容明显不足时补充）：**
```
site:techcrunch.com OR site:theverge.com "AI" "launch" OR "release" OR "announcement"
```

严格禁止：Wikipedia、未在白名单中的账号、低质量博客、PR 稿（非官方来源）。

### 第 4 步：整理内容并生成 Markdown 周报

基于步骤 2 的 JSON 数据和步骤 3 的 WebSearch 结果，按照 `prompts.digest_intro` 的格式规则生成 Markdown 周报。

**内容处理规则：**

- **建造者动态**：按照 `prompts.summarize_tweets` 处理 JSON 中的 `x` 数组。用 `bio` 字段确定职位，不要猜测。每位建造者必须附上推文链接。
- **播客内容**：按照 `prompts.summarize_podcast` 处理 JSON 中的 `podcasts` 数组。
- **产品发布**：使用 WebSearch 结果，按 Tier 优先级排列。官方来源占比应达 70% 以上。
- **本期概览**：在所有其他内容生成完毕后最后生成，提炼 3-5 个最重要的亮点。
- **本期洞察**：基于所有内容提炼 3-5 个跨领域深度洞察，识别共同趋势和不同来源之间的关联。

**绝对规则：**
- 不能虚构任何内容，只使用实际获取到的数据
- 每条内容必须有有效链接，无链接则不收录
- 如果某个板块没有内容，跳过该板块

**Markdown 文档结构：**

```markdown
# AI 周报 [日期范围]

---

## 本期概览

**追踪时间范围**: [start] - [end]

**本期亮点**:
- 🔥 [亮点1]
- 🚀 [亮点2]
- 💡 [亮点3]

---

## 产品发布与技术突破

### [产品名称]
**发布日期**: [date]
**来源**: [来源标注]

**核心描述**: [2-3句完整描述，不是一句话]

**关键亮点**:
- [亮点1]
- [亮点2]
- [亮点3]

**为什么重要**: [1-2段深度分析]

🔗 [查看详情](url)

**标签**: #OpenAI #LLM

---

## AI 建造者动态

### **[Full Name]** (@handle · Company/Role)

**最新动态**: [完整段落]

**核心观点**: [详细描述]

**为什么重要**: [分析]

🔗 相关推文: [link1] [link2]

**标签**: #Agents #开源

---

## YouTube 播客精选

### [频道名] — "[标题]"
**发布日期**: [date]

**核心观点**: [一句话总结]

**关键洞察**: [2-3段详细说明]

🔗 [观看完整播客](url)

**标签**: #Agent #基础设施

---

## 本期洞察

### 1. [洞察标题]
[详细分析，2-3段]

**标签**: #AGI #Agents

---
```

**应用语言设置：**

读取 `config.language`：
- `"bilingual"`：按照 `prompts.translate` 的规则，英中段落交替
- `"zh"`：全中文，按照 `prompts.translate` 翻译
- `"en"`：全英文，不翻译

### 第 5 步：生成 HTML 网页

读取设计规范：
```bash
cat ${CLAUDE_SKILL_DIR}/prompts/webpage.md
```

按照 `webpage.md` 中的规范，将 Markdown 周报的全部内容转换为交互式 HTML 网页。

**HTML 必须包含：**
- 顶部粘性导航栏（本期概览 / 产品与技术 / 建造者动态 / 播客精选 / 深度洞察）
- 全文搜索框
- 标签云（点击筛选对应卡片）
- 五个 section，每条内容为独立卡片
- 卡片 `data-tags` 属性支持标签筛选
- 无结果提示
- 完整 CSS 和 JavaScript（严格按照 webpage.md 中的代码）

生成前必须通过 `webpage.md` 末尾的检查清单。

### 第 6 步：写入文件并打开

确定日期范围字符串（格式：`YYYY.M.D-D`，例如 `2026.3.17-24`）。

```bash
mkdir -p ~/ai-weekly
```

写入两个文件：
- `~/ai-weekly/[日期范围].md`
- `~/ai-weekly/[日期范围].html`

在 macOS 上自动打开 HTML：
```bash
open ~/ai-weekly/[日期范围].html
```

### 第 7 步：完成确认

向用户报告：

```
✅ AI 周报生成完成！

📄 文字版: ~/ai-weekly/[日期范围].md
🌐 网页版: ~/ai-weekly/[日期范围].html（已在浏览器打开）

📊 本期内容统计:
- 产品发布: [N] 条
- 建造者动态: [N] 位
- 播客精选: [N] 期
- 深度洞察: [N] 条

💡 后续操作:
- 直接编辑 .md 文件修改内容
- 说「重新生成网页」可更新 HTML 版
- 说「改成每日追踪」可调整时间范围
```

---

## 配置管理

当用户提出以下类型的请求时，更新 `~/.ai-weekly/config.json`：

| 用户说 | 操作 |
|---|---|
| 「改成每日 / 每周」 | 更新 `timeRange` 为 `"1d"` / `"7d"` |
| 「切换为中文 / 英文 / 双语」 | 更新 `language` |
| 「重新生成网页」 | 读取最近的 `.md` 文件，重新执行第 5-6 步 |
| 「显示我的设置」 | 读取并展示 `config.json` |
| 「自定义摘要风格」 | 复制对应 prompt 到 `~/.ai-weekly/prompts/` 后编辑 |

自定义 prompt 路径：`~/.ai-weekly/prompts/<filename>.md`（优先级最高，不会被中央更新覆盖）。

修改任何配置后，确认已更新并告知用户变更内容。
