/* ============================================================
   全球贸易雷达 Global Trade Radar — 全站共享脚本
   Vanilla JS，无任何外部依赖，可直接运行于 GitHub Pages
   功能：移动端导航、站内搜索、返回顶部、页脚年份
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 站内搜索索引（新增页面时在此追加一行） ----------
     格式：[页面标题, 关键词, 链接, 描述] */
  var SEARCH_INDEX = [
    ["首页｜全球贸易雷达", "全球贸易 雷达 首页 情报平台", "index.html", "AI驱动的中国企业全球市场情报平台，每日追踪英国、欧盟、美国市场。"],
    ["日报归档｜全球贸易雷达", "日报 归档 历史 全球市场", "daily/index.html", "全球市场情报日报历史归档。"],
    ["镀锡钢196%与欧盟海关改革日报 2026-09-18", "镀锡钢 反倾销 欧盟海关改革 CBAM 457 小包处理费 301 亚马逊保险 峰会 日报", "daily/2026-09-18.html", "美国对镀锡钢初裁196.78%、301关税推迟到9月24日峰会后、欧盟海关改革9月21日生效、碳关税扩到457种产品。"],
    ["美国IOR作废与欧盟处理费日报 2026-09-17", "IOR 5106 AEO 处理费 海关改革 CBAM CRA 中美降税 日报", "daily/2026-09-17.html", "CBP当场作废进口商号、欧盟海关改革走完立法、CBAM扩到457项、中美300亿降税磋商。"],
    ["小包裹免税取消与法定进口商日报 2026-09-16", "de minimis 法定进口商 IOR ET13 美联储 加息 处理费 平台 日报", "daily/2026-09-16.html", "英国取消135镑免税、欧盟平台成法定进口商、美国CBP严查IOR、美联储3年首次加息。"],
    ["欧盟CBAM扩围与中美降税磋商日报 2026-09-15", "CBAM 扩围 联盟处理费 中美降税 镀锡板 美联储 加息 直邮 日报", "daily/2026-09-15.html", "欧洲议会CBAM扩围450余种产品、欧盟小包加2欧处理费、中美300亿降税磋商、镀锡板双反初裁。"],
    ["欧盟小包处理费与合规新规日报 2026-09-13", "欧盟 小包 处理费 CBAM 反倾销 IOR 日报", "daily/2026-09-13.html", "英国玻璃反倾销、欧盟小包处理费、美国IOR核查、三大央行紧缩。"],
    ["欧美关税与美联储加息日报 2026-09-14", "钢铁 配额 对加禁运 美联储 加息 双反 日报", "daily/2026-09-14.html", "英国钢铁配额、欧盟小包表决、美国对加禁运、美联储加息概率近九成。"],
    ["英国市场分析｜全球贸易雷达", "英国 市场 反倾销 碳关税 消费", "markets/uk.html", "英国对华贸易救济、CBAM 2027、价值驱动消费与汽配机会。"],
    ["欧盟市场分析｜全球贸易雷达", "欧盟 市场 小包裹 处理费 CBAM 合规", "markets/eu.html", "欧盟海关改革、小包处理费、CBAM扩围、四国差异化打法。"],
    ["美国市场分析｜全球贸易雷达", "美国 市场 关税 执法 IOR 直播电商", "markets/usa.html", "美国关税执法时代、IOR核查、双反调查、TikTok Shop直播电商。"],
    ["家电行业出海机会｜全球贸易雷达", "家电 节能 小家电 家居 出海", "industries/appliance.html", "节能小家电需求、英国家居承压、欧美合规门槛下的家电出海。"],
    ["户外用品出海机会｜全球贸易雷达", "户外 用品 出海 消费 美国", "industries/outdoor.html", "美国身份认同型消费中的户外品类机会。"],
    ["汽车用品出海机会｜全球贸易雷达", "汽车 用品 汽配 双反 英国 美国", "industries/automotive.html", "英国中国车复苏带动汽配、美国液压缸双反、CBAM下游扩围。"],
    ["消费品出海趋势｜全球贸易雷达", "消费品 价值驱动 定价 出海 贸易", "industries/consumer-goods.html", "欧美价值驱动消费、trade-down、定价与选品策略。"],
    ["跨境电商渠道与平台合规｜全球贸易雷达", "跨境电商 TikTok Shop 亚马逊 平台 合规", "industries/ecommerce.html", "TikTok Shop美欧、亚马逊旺季费用、平台合规责任转移。"],
    ["跨境物流与海外仓策略｜全球贸易雷达", "物流 海外仓 小包 处理费 履约 头程", "industries/logistics.html", "欧盟本地仓窗口期、小包处理费、旺季附加费与头程策略。"],
    ["行业机会库索引｜全球贸易雷达", "行业 机会 家电 户外 汽车 消费品", "industries/index.html", "按行业聚合欧美市场情报与商业机会。"],
    ["欧美贸易政策解读｜全球贸易雷达", "贸易政策 反倾销 双反 301 338 CBAM", "knowledge/trade-policy.html", "反倾销、双反、301条款、338条款、碳关税与关税清单动态。"],
    ["欧美消费趋势洞察｜全球贸易雷达", "消费趋势 价值驱动 直播电商 通胀", "knowledge/consumer-trends.html", "价值驱动消费、直播电商爆发、通胀与消费决策。"],
    ["出海合规清单｜全球贸易雷达", "合规 IOR VAT REACH GPSR UKCA 生态税", "knowledge/compliance.html", "IOR核查、VAT/IOSS、REACH、UKCA、GPSR与知识产权合规。"],
    ["欧美消费文化洞察｜全球贸易雷达", "文化 英国 欧盟 美国 消费心理", "knowledge/culture.html", "英国排队文化、欧盟环保身份、美国精明中产与四国性格。"],
    ["出海知识库索引｜全球贸易雷达", "知识库 政策 趋势 合规 文化", "knowledge/index.html", "出海知识库：政策、趋势、合规、文化四大主题。"],
    ["关于JZ｜全球贸易雷达", "JZ 关于 作者 观点", "about/jason.html", "关于《全球贸易雷达》主理人 JZ 与网站使命。"]
  ];

  /* ---------- 移动端导航 ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  /* ---------- 站内搜索 ---------- */
  function initSearch() {
    var box = document.querySelector(".search-box");
    if (!box) return;
    var input = box.querySelector("input");
    var panel = box.querySelector(".search-results");
    if (!input || !panel) return;

    function build(query) {
      var q = query.trim().toLowerCase();
      panel.innerHTML = "";
      if (!q) {
        panel.classList.remove("show");
        return;
      }
      var hits = [];
      for (var i = 0; i < SEARCH_INDEX.length; i++) {
        var item = SEARCH_INDEX[i];
        var hay = (item[0] + " " + item[1] + " " + item[3]).toLowerCase();
        if (hay.indexOf(q) !== -1) hits.push(item);
      }
      if (hits.length === 0) {
        var none = document.createElement("div");
        none.className = "none";
        none.textContent = "未找到相关页面，试试“关税 / 合规 / 英国”等关键词";
        panel.appendChild(none);
      } else {
        hits.slice(0, 8).forEach(function (h) {
          var a = document.createElement("a");
          a.href = h[2];
          var t = document.createElement("div");
          t.className = "t";
          t.textContent = h[0];
          var d = document.createElement("div");
          d.className = "d";
          d.textContent = h[3];
          a.appendChild(t);
          a.appendChild(d);
          panel.appendChild(a);
        });
      }
      panel.classList.add("show");
    }

    input.addEventListener("input", function () { build(input.value); });
    input.addEventListener("focus", function () { if (input.value.trim()) build(input.value); });
    document.addEventListener("click", function (e) {
      if (!box.contains(e.target)) panel.classList.remove("show");
    });
  }

  /* ---------- 返回顶部 ---------- */
  function initToTop() {
    var btn = document.querySelector(".to-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) btn.classList.add("show");
      else btn.classList.remove("show");
    });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 页脚年份 ---------- */
  function initYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  initNav();
  initSearch();
  initToTop();
  initYear();
})();
