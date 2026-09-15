# -*- coding: utf-8 -*-
"""全球贸易雷达静态网站全站验证脚本（只读检查，不修改任何文件）"""
import os, re, sys
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

ROOT = r"D:\doubao-work-project\global-trade-radar"

errors = []
warnings = []

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links = []   # (attr, url, line)
        self.meta = {}
        self.title = None
        self.in_title = False
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "a" and d.get("href"):
            self.links.append(("a", d["href"], self.getpos()[0]))
        if tag in ("link", "script", "img") and d.get("href" if tag == "link" else "src"):
            self.links.append((tag, d.get("href") or d.get("src"), self.getpos()[0]))
        if tag == "meta" and d.get("name"):
            self.meta[d["name"]] = d.get("content", "")
        if tag == "meta" and d.get("property"):
            self.meta[d["property"]] = d.get("content", "")
        if tag == "title":
            self.in_title = True
    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
    def handle_data(self, data):
        if self.in_title:
            self.title = (self.title or "") + data

def norm(p):
    return os.path.normpath(os.path.abspath(p))

def resolve(base_dir, url):
    """将页面内相对链接解析为站点内文件路径；外部链接返回 None"""
    if url.startswith(("http://", "https://", "mailto:", "tel:", "#", "javascript:")):
        return None
    if url.startswith("//"):
        return None
    if re.match(r"^[A-Za-z]:[\\/]", url):  # Windows 绝对路径
        return norm(url)
    p = url.split("#")[0].split("?")[0]
    if not p:
        return None
    return norm(os.path.join(base_dir, p))

def main():
    # 1. 收集所有 html（排除非部署目录 input/ 与 workspace/）
    SKIP_DIRS = {"input", "workspace", ".git"}
    html_files = []
    for dirpath, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for f in files:
            if f.lower().endswith(".html"):
                html_files.append(os.path.join(dirpath, f))
    html_files.sort()
    print(f"[OK] 发现 HTML 页面 {len(html_files)} 个")

    # 2. 逐页解析
    abs_path_hits = 0
    for hf in html_files:
        rel = os.path.relpath(hf, ROOT).replace("\\", "/")
        try:
            with open(hf, "r", encoding="utf-8") as fh:
                content = fh.read()
        except Exception as e:
            errors.append(f"{rel}: 无法读取 {e}")
            continue

        p = LinkParser()
        try:
            p.feed(content)
            p.close()
        except Exception as e:
            errors.append(f"{rel}: HTML 解析失败 {e}")
            continue

        # 结构检查
        if not content.lstrip().lower().startswith("<!doctype html>"):
            warnings.append(f"{rel}: 缺少 DOCTYPE")
        if p.title is None or not p.title.strip():
            errors.append(f"{rel}: 缺少 <title>")
        else:
            for kw in ["全球贸易雷达"]:
                if kw not in p.title:
                    warnings.append(f"{rel}: title 未含品牌名「{kw}」")
        desc = p.meta.get("description", "")
        if not desc:
            errors.append(f"{rel}: 缺少 meta description")
        elif not (120 <= len(desc) <= 160):
            warnings.append(f"{rel}: description 长度 {len(desc)}（建议 120-160）")
        for k in ["keywords"]:
            if k not in p.meta:
                errors.append(f"{rel}: 缺少 meta {k}")
        for k in ["og:title", "og:description", "og:image", "og:type"]:
            if k not in p.meta:
                errors.append(f"{rel}: 缺少 {k}")
        if "og:image" in p.meta:
            og = p.meta["og:image"]
            if og.startswith(("http://", "https://", "//")):
                warnings.append(f"{rel}: og:image 使用绝对地址（GitHub Pages 部署前需替换为真实域名）: {og}")

        base_dir = os.path.dirname(hf)
        for tag, url, line in p.links:
            if url.startswith(("http://", "https://", "mailto:", "tel:", "javascript:", "//")):
                continue
            if url.startswith("#"):
                continue
            target = resolve(base_dir, url)
            if target is None:
                continue
            if re.match(r"^[A-Za-z]:[\\/]", url):
                abs_path_hits += 1
                errors.append(f"{rel}:{line} 使用绝对路径引用 {url}")
                continue
            if not os.path.exists(target):
                errors.append(f"{rel}:{line} 链接目标不存在 -> {url} ({target})")

    print(f"[OK] 链接/资源/SEO 检查完成；绝对路径引用 {abs_path_hits} 处")

    # 3. sitemap 覆盖检查
    sm = os.path.join(ROOT, "sitemap.xml")
    if not os.path.exists(sm):
        errors.append("缺少 sitemap.xml")
    else:
        with open(sm, "r", encoding="utf-8") as fh:
            smc = fh.read()
        sm_locs = re.findall(r"<loc>(.*?)</loc>", smc)
        # 提取 sitemap 中的相对路径（按 URL path 解析，与域名无关）
        sm_paths = set()
        for loc in sm_locs:
            pth = urlparse(loc).path.lstrip("/")
            if pth:
                sm_paths.add(pth)
        site_paths = set(os.path.relpath(h, ROOT).replace("\\", "/") for h in html_files)
        missing_in_sm = site_paths - sm_paths
        if missing_in_sm:
            errors.append(f"sitemap 缺少 {len(missing_in_sm)} 个页面: {sorted(missing_in_sm)}")
        extra_in_sm = sm_paths - site_paths
        if extra_in_sm:
            warnings.append(f"sitemap 包含不存在的页面: {sorted(extra_in_sm)}")
        print(f"[OK] sitemap 检查完成：站点 {len(site_paths)} 页 / sitemap {len(sm_paths)} 条")

    # 4. robots.txt
    rb = os.path.join(ROOT, "robots.txt")
    if not os.path.exists(rb):
        errors.append("缺少 robots.txt")

    # 5. 必要文件
    for f in ["index.html", os.path.join("assets", "css", "style.css"),
              os.path.join("assets", "js", "main.js"),
              os.path.join("assets", "images", "og-banner.png"),
              "README.md", ".gitignore"]:
        if not os.path.exists(os.path.join(ROOT, f)):
            errors.append(f"缺少必需文件: {f}")

    # 6. JS 基础语法冒烟（括号平衡）
    js = os.path.join(ROOT, "assets", "js", "main.js")
    with open(js, "r", encoding="utf-8") as fh:
        jsc = fh.read()
    for a, b in [("(", ")"), ("{", "}"), ("[", "]")]:
        if jsc.count(a) != jsc.count(b):
            errors.append(f"main.js 括号不平衡: {a}{b} {jsc.count(a)} vs {jsc.count(b)}")

    # 7. 输出汇总
    print("\n" + "=" * 60)
    print(f"验证结果：错误 {len(errors)} ｜ 警告 {len(warnings)}")
    print("=" * 60)
    for e in errors:
        print("[ERROR]", e)
    for w in warnings:
        print("[WARN ]", w)

    print("\n=== 页面清单 ===")
    for h in html_files:
        print("  " + os.path.relpath(h, ROOT).replace("\\", "/"))

    sys.exit(1 if errors else 0)

if __name__ == "__main__":
    main()
