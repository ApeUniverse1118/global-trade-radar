# -*- coding: utf-8 -*-
"""生成全球贸易雷达品牌横幅 (og:image / 品牌图)"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

W, H = 1200, 630
NAVY = (13, 27, 42)
NAVY2 = (27, 46, 74)
BLUE = (44, 95, 138)
GOLD = (240, 196, 69)
WHITE = (255, 255, 255)
MUTED = (172, 190, 210)

# 渐变背景
img = Image.new("RGB", (W, H), NAVY)
px = img.load()
for y in range(H):
    t = y / H
    c = tuple(int(NAVY[i] + (NAVY2[i] - NAVY[i]) * t) for i in range(3))
    for x in range(W):
        px[x, y] = c

draw = ImageDraw.Draw(img)

# 细网格装饰线
for x in range(0, W, 80):
    draw.line([(x, 0), (x, H)], fill=(255, 255, 255, 8), width=1)
for y in range(0, H, 80):
    draw.line([(0, y), (W, y)], fill=(255, 255, 255, 8), width=1)

# 右下角光晕
glow = Image.new("RGB", (W, H), NAVY)
gd = ImageDraw.Draw(glow)
gd.ellipse([W - 520, H - 420, W + 120, H + 220], fill=(44, 95, 138))
glow = glow.filter(ImageFilter.GaussianBlur(120))
img = Image.blend(img, glow, 0.35)
draw = ImageDraw.Draw(img)

# 字体
def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

f_title = font(r"C:\Windows\Fonts\msyhbd.ttc", 88)
f_sub = font(r"C:\Windows\Fonts\msyh.ttc", 34)
f_tag = font(r"C:\Windows\Fonts\arialbd.ttf", 26)
f_foot = font(r"C:\Windows\Fonts\msyh.ttc", 22)

# 顶部小标签
draw.text((70, 52), "GLOBAL MARKET INTELLIGENCE", font=f_tag, fill=MUTED)
# 品牌主标题
draw.text((66, 92), "全球贸易雷达", font=f_title, fill=WHITE)
draw.text((66, 216), "Global Trade Radar", font=f_tag, fill=GOLD)
# 副标题
draw.text((70, 300), "看见全球变化，提前做出商业决策", font=f_sub, fill=WHITE)
# 使命
draw.text((70, 396), "每日追踪英国 · 欧盟 · 美国市场政策、消费趋势与商业机会", font=f_sub, fill=MUTED)
# 底部信息
draw.text((70, 540), "AI 驱动的中国企业全球市场情报平台", font=f_foot, fill=MUTED)
draw.text((W - 500, 540), "daily  ·  markets  ·  industries  ·  knowledge", font=f_foot, fill=MUTED)

img.save(r"D:\doubao-work-project\global-trade-radar\workspace\output\assets\images\og-banner.png", "PNG")
print("banner saved")
