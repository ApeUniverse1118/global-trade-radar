# 全球贸易雷达 Global Trade Radar

> 🌍 看见全球变化，提前做出商业决策。

**AI 驱动的中国企业全球市场情报平台**：每日追踪英国、欧盟、美国市场的政策变化、消费趋势与商业机会，把复杂的全球变化转化为中国企业可以执行的行动建议。

本仓库是《全球贸易雷达》的**纯静态网站源码**，基于 HTML5 + CSS3 + Vanilla JavaScript 构建，**零依赖、零构建**，上传到 GitHub 开启 Pages 即可公网访问。

---

## ✨ 功能说明

| 栏目 | 说明 | 路径 |
| --- | --- | --- |
| 🏠 首页 | Hero + 最新日报 + 市场地图 + 行业机会 + Jason观点 | `index.html` |
| 📰 每日雷达 | 历史日报归档，每日一期，覆盖近72小时关键事件 | `daily/` |
| 🗺️ 市场分析 | 英国 / 欧盟 / 美国 三大市场深度分析页 | `markets/` |
| 🏭 行业机会 | 家电 / 户外 / 汽车用品 / 消费品 / 跨境电商 / 物流 | `industries/` |
| 📚 出海知识库 | 贸易政策 / 消费趋势 / 合规清单 / 消费文化 | `knowledge/` |
| 🎙️ 关于Jason | 主理人个人IP页 | `about/jason.html` |
| 🔍 站内搜索 | 全站页面索引搜索（无后端） | `assets/js/main.js` |

**技术特点**
- 纯静态：HTML5 + CSS3 + Vanilla JS，无 React/Vue/Node.js，GitHub Pages 直接运行
- 响应式设计：PC / 平板 / 手机自适应
- SEO 就绪：每页含 title / description / keywords / Open Graph / canonical
- 移动端友好：粘性导航 + 折叠菜单 + 站内搜索 + 返回顶部

---

## 📁 目录结构

```
global-trade-radar/
├── index.html                  # 首页
├── daily/                      # 每日雷达（日报归档）
│   ├── index.html              # 日报归档页
│   ├── 2026-09-13.html         # 第1期日报
│   └── 2026-09-14.html         # 第2期日报
├── markets/                    # 市场分析
│   ├── uk.html                 # 英国市场
│   ├── eu.html                 # 欧盟市场
│   └── usa.html                # 美国市场
├── industries/                 # 行业机会库
│   ├── index.html              # 行业索引
│   ├── appliance.html          # 家电
│   ├── outdoor.html            # 户外
│   ├── automotive.html         # 汽车用品
│   ├── consumer-goods.html     # 消费品
│   ├── ecommerce.html          # 跨境电商
│   └── logistics.html          # 物流履约
├── knowledge/                  # 出海知识库
│   ├── index.html              # 知识库索引
│   ├── trade-policy.html       # 贸易政策
│   ├── consumer-trends.html    # 消费趋势
│   ├── compliance.html         # 出海合规
│   └── culture.html            # 消费文化
├── about/
│   └── jason.html              # 关于Jason
├── assets/
│   ├── css/style.css           # 全站统一设计系统
│   ├── js/main.js              # 导航/搜索/返回顶部（含页面搜索索引）
│   └── images/og-banner.png    # 品牌横幅（og:image）
├── sitemap.xml                 # 站点地图
├── robots.txt                  # 爬虫规则
├── README.md                   # 本文件
└── .gitignore

> 说明：`input/`（原始历史日报）与 `workspace/`（本地工具/文档）为**本地保留目录**，已加入 `.gitignore`，不会被提交到 GitHub 仓库；仓库根目录即部署根目录。
```

---

## 🚀 本地预览方法

任选其一：

```bash
# 方式一：Python 内置服务器（推荐）
cd global-trade-radar
python -m http.server 8080
# 浏览器打开 http://localhost:8080

# 方式二：VS Code Live Server 插件
# 右键 index.html → Open with Live Server

# 方式三：直接双击 index.html
# 注意：站内搜索依赖 JS 读取页面索引，双击打开也可用；
# 但为完整验证相对路径，建议使用本地服务器方式。
```

---

## 🌐 GitHub Pages 部署步骤

1. **创建 GitHub Repository**（如 `global-trade-radar`），设为 Public；
2. **上传全部文件**：将本目录下所有文件与文件夹（`index.html`、`daily/`、`markets/`、`assets/` 等）上传到仓库根目录（建议用 GitHub Desktop 或 `git push`）；
3. **开启 Pages**：进入仓库 → `Settings` → `Pages` → `Build and deployment` → `Source` 选择 **Deploy from a branch** → 分支选择 **main** → 文件夹选择 **/ (root)** → `Save`；
4. 等待 1-2 分钟，访问 `https://<你的用户名>.github.io/global-trade-radar/`；
5. **（可选）绑定自定义域名**：
   - 仓库 `Settings` → `Pages` → `Custom domain` 输入你的域名（如 `radar.example.com`）→ `Save`；
   - 到域名服务商添加一条 **CNAME 记录**：主机记录填子域名（或 `@`），指向 `<你的用户名>.github.io`；
   - 等待 DNS 生效后，勾选 `Enforce HTTPS`（GitHub 会自动签发证书）；
6. **部署后必做（重要）**：
   - 将 `sitemap.xml` 和 `robots.txt` 中的占位域名 `YOUR-GITHUB-USERNAME` 替换为你的真实域名（自定义域名生效后，也可替换为自定义域名），再重新上传；
   - 将 `about/jason.html` 与首页中的联系邮箱 `contact@example.com` 替换为真实联系方式；
   - 到 [百度搜索资源平台](https://ziyuan.baidu.com) 和 [Google Search Console](https://search.google.com/search-console) 提交站点并验证。

---

## 🔄 自动更新机制（AI 代理友好）

网站结构为**后续 AI 代理 / 内容维护**做了低改动设计：新增一期日报，**只改 3 处、不动核心代码**。

### 新增日报步骤（以 2026-09-15 为例）

1. **复制模板**：将 `daily/2026-09-14.html` 复制为 `daily/2026-09-15.html`，替换正文内容（保留统一 Header/Nav/Footer 与 CSS/JS 引用）；
2. **更新首页**：在 `index.html` 的 `#latest` 区块 `.report-list` 顶部插入新日报卡片（删除最旧一条，保持最多 10 条）；
3. **更新归档页**：在 `daily/index.html` 的日报列表顶部插入新条目；
4. **更新 sitemap.xml**：新增一条 `<url>`（复制模板中最新日报条目，改日期）；
5. **更新搜索索引**：在 `assets/js/main.js` 的 `SEARCH_INDEX` 数组顶部新增一行 `["标题", "关键词", "daily/2026-09-15.html", "描述"]`。

> 说明：市场页 / 行业页 / 知识库页按周聚合更新；核心 CSS/JS 无需改动。

---

## 🔍 SEO 说明

- **标题规范**：`关键词 + 品牌名`（如「欧盟小包处理费、英国玻璃反倾销、美国IOR核查：中国卖家本周必看｜全球贸易雷达」）；
- **百度优化**：文章标题采用用户搜索语言与利益点表述（"中国卖家怎么办/如何降低成本"），而非新闻式标题；
- **每页必备**：`<title>`、`meta description`（120-160字符）、`keywords`、`og:title/og:description/og:image`、`canonical`；
- **URL 结构**：日报固定为 `/daily/YYYY-MM-DD.html`，利于长期收录；
- **全部资源使用相对路径**，无绝对路径、无外部 CDN 依赖，确保零 404 与离线可用。

---

## ⚖️ 免责声明

本平台内容基于公开信息整理分析，仅供商业决策参考，不构成投资或法律建议。具体贸易合规、税务与法律事项，请咨询专业机构。

---

© 2026 全球贸易雷达 Global Trade Radar · 看见全球变化，提前做出商业决策。
