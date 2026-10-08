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
    ["CBP小包清关新规与英国钛白粉反倾销日报 2026-10-07", "CBP 小包清关 拟议规则 de minimis 2500 电子预申报 保证金 IOR 持牌报关行 钛白粉 反倾销 63.66 混合税 配额 142 臂式高空作业平台 82.89 68.43 中欧磋商 10月8日 保障措施 自愿限 欧盟处理费 2欧元 PID 包装生产者责任 11月1日 熔炼与浇铸国 MTC CBS 107.57 紧急情况 追溯90天 碳钢板 三聚氰胺 301排除 符合性修订 非农 2.9万 失业率4.2 降税清单 未生效 旺季费 10月15日 日报", "daily/2026-10-07.html", "10月7日美国CBP拟收紧≤$2500小包清关：电子预申报+保证金+非货主须请持牌报关行当IOR；英国拟对中国钛白粉征最高63.66%反倾销税、臂式平台82.89%；中欧北京磋商10月8日开启、欧盟€2处理费与PID 11月1日倒计时；美国CBS反补贴107.57%追溯90天、9月非农仅2.9万。"],
    ["欧盟钢铁熔炼国申报与卡车后斗盖双反日报 2026-10-01", "熔炼与浇铸国 MTC 炉号 欧盟钢铁 卡车后斗盖 双反 127.66 空气压缩机 反补贴 MPF 34.58 670.86 CAPE 第三阶段 10月6日 日落复审 薄页纸 合金镁 英国钢铁配额 50% 先到先得 Ofgem 1723 电费VAT归零 包装EPR 10月1日 Nationwide 房价 0.8% PMI 51.9 ISM 54.5 价格指数77.9 西班牙2欧处理费 试运行 联盟处理费 欧版301 反胁迫工具 ACI 中欧磋商 10月8日 EUDR 毁林条例 12月30日 日报", "daily/2026-10-01.html", "10月1日欧盟钢铁强制申报熔炼与浇铸国、缺MTC可能拒入境，西班牙试收每件€2处理费11月1日全欧开征；美国对华卡车后斗盖双反初裁叠加最高127.66%、MPF上调、薄页纸与合金镁启动日落复审；英国钢铁配额重置超配额50%全额生效、电费增值税归零。"],
    ["中美降税清单77税号与欧盟€2按件收费日报 2026-09-29", "中美降税清单 77税号 1619税号 对等降税 300亿 玩具 无线 排除 烟花 餐具 圣诞装饰 足球 熔炼与浇铸国 MTC 炉号 欧盟处理费 2欧元 按件计费 不可退 爱尔兰税务局 碱性电池 海关登记 电工钢 GOES PBTC 从低征税 消费者信心 81.9 木栅栏板 双反 货架 日落复审 亚马逊旺季费 MPF 日报", "daily/2026-09-29.html", "中美对等降税清单公布：美方77个税号、中方1619个税号，超90%商品免除全部加征关税但尚未生效；欧盟€2处理费确认11月1日按件收取且不可退、10月1日起钢铁需申报熔炼与浇铸国；美国9月消费者信心81.9创2014年新低。"],
    ["中美300亿对等降税落地与欧盟2欧处理费入法日报 2026-09-27", "中美 八点共识 300亿美元 对等降税 玩具 家电 婴儿用品 厨卫 节日礼物 90%免除加征关税 休战延长 2027年1月10日 欧盟处理费 Regulation 2026/2108 PID 产品识别码 M-PID 英国钢铁 50% 先到先得 电子烟税 2.20 电工钢 GOES 保障措施 挂车 260% 加拿大转口 亚马逊旺季费 燃油附加费 消费者信心 48.1 日报", "daily/2026-09-27.html", "中美元首会晤达成八点共识、300亿美元对等降税、超90%商品免除全部加征关税，休战延至2027/1/10；欧盟2欧处理费正式入法最迟11/1、PID同日强制；英国钢铁超配额50%与电子烟税10/1生效。"],
    ["中美300亿对等降税共识与英国钢铁豁免到期日报 2026-09-26", "中美降税 300亿美元 八点共识 小家电 玩具 节庆装饰 儿童安全座椅 英国钢铁豁免 9月30日 能源上限 1723 电费VAT归零 秋季预算 10月28日 欧盟豌豆蛋白 终裁 北京烤鸭 进口登记 处理费 2欧 5欧 PID TikTok领航计划 IOR 作废 Form5106 MPF 34.58 670.86 拖车 260% 无人机 100% 多晶硅 MIP 日报", "daily/2026-09-26.html", "中美达成约300亿美元对等降税共识点名小家电玩具节庆装饰儿童安全座椅（尚未落地）；英国钢铁过渡豁免9月30日到期、能源上限10月1日涨至1723英镑；欧盟豌豆蛋白终裁40.5%-67.1%、北京烤鸭被进口登记、小包每件固定成本约5欧元。"],
    ["欧盟豌豆蛋白终裁与美国宗申发动机追溯规避日报 2026-09-25", "豌豆蛋白 反倾销 40.5% 67.1% 双塔食品 处理费 直邮2欧 入仓0.5欧 GARAN 漂绿 英国钢铁豁免 9Y16 柴油 北爱TSS 宗申 5C65M0 BC70M0 后期开发产品 规避 药品232 多晶硅 反囤货 FTC个性化定价 金刚石锯片 EAPA", "daily/2026-09-25.html", "欧盟对华豌豆蛋白终裁40.5%-67.1%为期5年；小包处理费直邮2欧入仓0.5欧；英国钢铁过渡豁免9月30日到期；美国宗申两款发动机改型号被认定规避、追溯至2025年7月11日收现金保证金。"],
    ["中美休战延到2027年1月：欧盟小包2欧元定案与石墨电极追溯征税 2026-09-24", "中美休战 延长 2027年1月10日 白宫会晤 欧盟小包处理费 2欧元 远程销售进口人 新海关法典 电工钢保障 GOES 中国配额3万吨 铝罐料 双撤销 追溯退税 石墨电极 紧急情形 103.49% 337-TA-1524 恒林 电动摇椅 亚马逊 MCF Prime 履约费降25% CBI砍单 1983 陶瓷餐厨具 TRA复审 IR0093 消费者信心 电费上限 日报", "daily/2026-09-24.html", "中美休战再延两个月至2027年1月10日；欧盟每件约2欧元处理费与3欧元关税叠加、新海关法典把平台卖家认定为进口人；美国撤销铝罐料双反并追溯退税、对石墨电极追溯至5月1日征税、337立案电动摇椅机构；英国CBI砍单创1983年来最狠。"],    ["中美休战延长与欧盟阿司匹林立案日报 2026-09-23", "中美休战 延长 2027年1月10日 300亿降税清单 阿司匹林 反倾销 2欧元处理费 特种药品 100%关税 Tris 117.39 割草机 双反撤销 PMI 电子烟税 钢铁50% TSS 日报", "daily/2026-09-23.html", "中美休战延长至2027年1月10日、300亿降税清单在谈；欧盟阿司匹林立案、2欧元处理费走完授权法案；美国特种药品100%关税9月29日生效、Tris初裁最高117.39%、割草机税令撤销。"],
    ["欧盟2欧元处理费与美国ET13反规避日报 2026-09-22", "欧盟小包处理费 2欧元 ET13 邮政报关 反规避 刹车鼓 蠕墨铸铁 柬埔寨衣架 钢丝衣架 220.68 Made in EU 工业加速器 GARAN 中英会晤 日报", "daily/2026-09-22.html", "欧盟统一处理费草案每件2欧元与7月3欧元叠加；美国ET13上线、刹车鼓150.25%与柬埔寨衣架220.68%两起反规避追溯；9月24日中美元首会晤、11月10日停战大限。"],
    ["美国马口铁反倾销136与GARAN标签日报 2026-09-21", "马口铁 镀锡板 反倾销 136.52 追溯 轴承 92.84 分别税率 IOR ET13 GARAN标签 小包处理费 意大利 2欧 亚马逊回款 24小时 TikTok英欧 日报", "daily/2026-09-21.html", "美国《联邦公报》一天两条对华裁决：马口铁136.52%追溯至6月23日、轴承92.84%；欧盟GARAN标签9/27生效、11/1处理费金额未定；美线消费线上+9.9%，亚马逊回款压到24小时。"],
    ["何立峰会谈与欧盟三张新账单日报 2026-09-20", "何立峰 贝森特 中美降税 LNG 次级关税 CBP IOR 5106 电工钢 最低价 禁漂绿 EmpCo 小包处理费 镀锡板 TikTok 英国钢铁 日报", "daily/2026-09-20.html", "何立峰9月20日与贝森特谈300亿降税与LNG；CBP严查IOR当场作废；欧盟9/25电工钢最低价、9/27禁漂绿、11/1处理费；英国不跟欧盟对华车加税。"],
    ["美国300亿对等降税与品类分化日报 2026-09-19", "中美降税 IOR FCC禁芯 禁漂绿 混动车限额 玻璃瓶罐 日报", "daily/2026-09-19.html", "美国300亿降税清单、CBP查IOR、FCC 10月13日禁芯、欧盟禁漂绿与混动车15%限额。"],
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
    ["贸易概念词典｜全球贸易雷达", "贸易词典 CBAM IOR de minimis 双反 301 337 处理费 GARAN 海外仓 外贸知识", "concepts/index.html", "把日报里的贸易黑话讲成人话：是什么、为什么和你有关、时间线与行动清单。"],
    ["CBAM碳关税是什么｜全球贸易雷达", "CBAM 碳关税 碳边境调节 欧盟碳税 钢铁 铝 碳足迹", "concepts/cbam.html", "欧盟对进口产品按含碳量补收的碳税，2026年从只申报走向要交钱、扩到下游制品。"],
    ["美国IOR进口商记录是什么｜全球贸易雷达", "IOR 进口商记录 Importer of Record CBP Form5106 美国清关 借号", "concepts/ior.html", "美国清关的法律责任人，9/18起CBP严查，借号、信息不实当场作废并追溯。"],
    ["de minimis小包免税额度｜全球贸易雷达", "de minimis 小包免税 800美元 135英镑 直邮 低值包裹", "concepts/de-minimis.html", "英美欧同步取消/收紧低价小包免税，低价直邮模式红利结束。"],
    ["反倾销反补贴双反是什么｜全球贸易雷达", "反倾销 反补贴 双反 AD CVD 惩罚性关税 贸易救济", "concepts/anti-dumping.html", "被认为卖太便宜或拿了补贴就加惩罚性关税，命中率高、还常追溯。"],
    ["美国301条款与337调查｜全球贸易雷达", "301条款 337调查 美国关税 侵权禁售 知识产权", "concepts/section-301.html", "301是单方面加关税的大棒，337查侵权、可直接把产品挡在国门之外。"],
    ["欧盟小包处理费是什么｜全球贸易雷达", "欧盟小包处理费 新海关法典 法定进口人 直邮成本 每件2欧", "concepts/eu-processing-fee.html", "进口小包每件多收约2欧、叠加3欧关税，平台被认定为法定进口人，每票固定成本约5欧。"],
    ["GARAN标签与欧盟反漂绿｜全球贸易雷达", "GARAN 反漂绿 green claims 环保宣称 绿色 标签 欧盟合规", "concepts/garan.html", "9/27起写环保/绿色/碳中和必须有证据，禁止漂绿。"],
    ["追溯征税是什么｜全球贸易雷达", "追溯征税 retroactive duty 反倾销追溯 现金保证金 反规避", "concepts/retro-duty.html", "今天的裁决能回头补几个月前已到港货的税，甚至收现金保证金。"],
    ["本地仓与海外仓怎么选｜全球贸易雷达", "海外仓 本地仓 直邮 批量清关 一件代发 跨境物流", "concepts/local-warehouse.html", "爆款转海外仓批量清关摊薄成本，长尾继续直邮但别再低申报。"],
    ["美国清关规费MPF是什么｜全球贸易雷达", "MPF HMF 货物处理费 美国清关费用 拖车费 到岸成本", "concepts/mpf.html", "美国清关按票收的固定处理费，跟货值挂钩、有上下限，报价别漏算。"],
    ["英国能源价格上限与秋季预算｜全球贸易雷达", "英国能源价格上限 Energy Price Cap 秋季预算 Autumn Budget 家电消费", "concepts/uk-energy.html", "能源价格上限决定英国家庭开支，秋季预算是政府财政大动作。"],
    ["中美对等降税与关税休战｜全球贸易雷达", "中美关税休战 对等降税 300亿美元 301豁免 贸易战", "concepts/us-china-truce.html", "分阶段、有清单、有截止日的停火，不是全面免税；共识不等于已生效。"],
    ["欧盟PID产品识别码是什么｜全球贸易雷达", "PID 产品识别码 M-PID NS-PID S-PID GTIN EAN SKU 报关 商品描述 欧盟清关", "concepts/pid.html", "11月1日起每个进欧盟B2C商品都要报商品身份证号，笼统商品描述不再够用，铺货型卖家风险最大。"],
    ["关税配额与保障措施是什么｜全球贸易雷达", "关税配额 TRQ 保障措施 safeguard 先到先得 配额 最低价 英国钢铁 电工钢 GOES", "concepts/trq.html", "规定一个免税额度、超出加税，或对全行业临时加税/限量；英国钢铁先到先得、欧盟电工钢整条链都用它。"],
    ["熔炼与浇铸国Melt&amp;Pour是什么｜全球贸易雷达", "熔炼与浇铸国 Melt and Pour MTC 钢厂材质证明 炉号 原产地 欧盟钢铁 入境拒绝", "concepts/melt-and-pour.html", "10月1日起欧盟钢铁要申报钢水在哪个国家、哪个炉子浇出来的；证明写不清，货连门都进不去。"],
    ["海关登记Customs Registration是什么｜全球贸易雷达", "海关登记 登记期 追溯征税 碱性电池 反倾销调查 风险窗口", "concepts/customs-registration.html", "海关先把货登记在案、将来裁决一出可回头补税；登记期就是风险累积期，别当宽限期。"],
    ["日落复审五年复审是什么｜全球贸易雷达", "日落复审 五年复审 sunset review 复审 撤销税令 薄页纸 合金镁 反倾销 延续", "concepts/sunset-review.html", "老关税每五年给一次「要不要取消」的复核机会；不参加的默认维持，参加才可能争取取消或降税。"],
    ["反胁迫工具ACI欧版301是什么｜全球贸易雷达", "反胁迫工具 ACI Anti-Coercion Instrument 欧版301 德法 贸易火箭筒 反向合格多数 40% 加税", "concepts/aci.html", "欧盟备而少用的贸易大棒，专门反制关税、配额、公共采购胁迫；德法正想把它从「多数同意才能用」改成「少数反对才能拦」。"],
    ["混合税Mixed Duty是什么｜全球贸易雷达", "混合税 Mixed Duty 从量税 从价税 配额内 配额外 钛白粉 63.66 反倾销 英国", "concepts/mixed-duty.html", "同一商品两段收税：配额内按每吨多少钱、配额外按货值百分比；英国对华钛白粉即此结构，报错一段成本差一大截。"],
    ["数字产品护照DPP是什么｜全球贸易雷达", "数字产品护照 DPP Digital Product Passport 欧洲产品法 平台连带责任 产品合规 电子身份证", "concepts/dpp.html", "欧盟拟给每件消费品配电子身份证；《欧洲产品法》草案拟把 DPP 从电池、纺织品扩展到全部消费品。"],
    ["关于JZ｜全球贸易雷达", "JZ 关于 作者 观点", "about/jason.html", "关于《全球贸易雷达》主理人 JZ 与网站使命。"]
  ];

  /* ---------- 自动渲染"最近日报"与更新日期 ----------
     任何页面放 <div class="js-latest-dailies" data-limit="5"></div> 即可
     自动从 SEARCH_INDEX 拉出最新日报卡片；
     <span class="js-updated-date"></span> 自动写成最新一期日期。 */
  function initLatestDailies() {
    var boxes = document.querySelectorAll(".js-latest-dailies");
    var upd = document.querySelector(".js-updated-date");
    if (!boxes.length && !upd) return;

    var here = location.pathname.replace(/\\/g, "/");
    var parts = here.split("/").filter(Boolean);
    var prefix = parts.length > 1 ? "../" : "";

    var dailies = [];
    for (var i = 0; i < SEARCH_INDEX.length; i++) {
      var it = SEARCH_INDEX[i];
      if (/^daily\/2026-\d{2}-\d{2}\.html$/.test(it[2])) dailies.push(it);
    }
    dailies.sort(function (a, b) { return a[2] < b[2] ? 1 : -1; });

    boxes.forEach(function (box) {
      var limit = parseInt(box.getAttribute("data-limit"), 10) || 5;
      dailies.slice(0, limit).forEach(function (it) {
        var date = it[2].replace("daily/", "").replace(".html", "");
        var a = document.createElement("a");
        a.className = "report-card";
        a.href = prefix + it[2];
        var badge = document.createElement("span");
        badge.className = "date-badge";
        badge.textContent = date;
        var h3 = document.createElement("h3");
        h3.textContent = it[0].replace(/\s*\d{4}-\d{2}-\d{2}$/, "");
        var p = document.createElement("p");
        p.textContent = it[3];
        a.appendChild(badge); a.appendChild(h3); a.appendChild(p);
        box.appendChild(a);
      });
    });

    if (upd && dailies.length) {
      upd.textContent = "数据更新：" + dailies[0][2].replace("daily/", "").replace(".html", "");
    }
  }

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
  initLatestDailies();
  initToTop();
  initYear();
})();
