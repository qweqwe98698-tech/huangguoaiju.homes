<div align="center">

<img src="./assets/images/logo.png" alt="黄果短剧 Logo" width="120" height="120" style="border-radius: 24px; box-shadow: 0 8px 28px rgba(245, 176, 38, 0.4);">

# 黄果短剧 (huangguoaiju.homes)

### 🎬 新一代高品质短剧索引平台 · 垂直流量高转化系统 · 纯净技术 SEO & GEO 架构

<p align="center">
  <a href="https://huangguoaiju.homes/"><img src="https://img.shields.io/badge/Domain-huangguoaiju.homes-f5b026?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Domain"></a>
  <a href="https://github.com/qweqwe98698-tech/huangguoaiju.homes"><img src="https://img.shields.io/badge/GitHub-huangguoaiju.homes-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
  <a href="#"><img src="https://img.shields.io/badge/SEO_Audit-100%2F100_PASS-00f59b?style=for-the-badge&logo=google&logoColor=white" alt="SEO Score"></a>
  <a href="#"><img src="https://img.shields.io/badge/Stack-Pure_Vanilla_ES6+-61dafb?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License"></a>
</p>

<p align="center">
  <strong>面向全球华语受众的高品质 AI 漫剧、真人短剧与创意剧集索引门户</strong><br>
  深度融合 <strong>100% 独立的技术 SEO 资产体系</strong>、<strong>GEO 生成式 AI 搜索友好架构</strong> 与 <strong>极速流媒体高转化引流漏斗</strong>。
</p>

---

[🌐 官方主站](https://huangguoaiju.homes/) • [📁 目录结构](#-目录结构规范) • [⚡ 核心架构特性](#-核心系统架构与特性) • [🚀 快速开始](#-本地开发与校验) • [🌐 生产部署](#-生产环境部署指引) • [📊 站长平台接入](#-seo--站长平台提交指引)

</div>

<br>

## 📖 项目简介

**黄果短剧 (`huangguoaiju.homes`)** 是一套专为高并发、高转化与极限搜索引擎收录能力设计的轻量化数字流媒体内容索引与引流系统。

项目彻底剔除了沉重的现代前端框架运行时与编译指纹，全站采用纯原生标准 Web 技术（HTML5 + CSS3 + 现代 ES 模块）构建，首屏实现毫秒级瞬间渲染。在架构层面上，针对 **Google**、**Bing**、**神马 (yisouspider / 夸克 / UC)**、**百度** 等传统搜索引擎蜘蛛，以及 **GPTBot**、**PerplexityBot**、**ClaudeBot** 等生成式 AI（GEO）搜索引擎提供了极致的语义可读性与数据结构支持。

---

## ⚡ 核心系统架构与特性

### 1. 🛡️ 代码级资产“纯净化”与零指纹隔离 (Zero Fingerprints)
- **彻底根除框架残留**：无任何第三方构建哈希、无 Astro Scoping CID、无未混淆的打包器指纹。
- **100% 独立主域闭环**：全站统一采用裸域 `https://huangguoaiju.homes/`，所有核心资产（CSS、JavaScript、封面海报、图标）均实现本地化自托管封装。
- **外链隔离防护**：针对外部商业合作站点（如光速云），提供内部中转伪装路由 `/go/speed/`（302 跳转），所有外部跳转链接严格包裹 `rel="nofollow sponsored noopener noreferrer"`，杜绝搜索引擎外链连坐与权重稀释。

### 2. 🎯 高转化流媒体引流漏斗 (Conversion Funnel)
- **全站海报与播放交互拦截**：用户点击任意剧集封面或播放按钮时，自适应触发流媒体专属海外专线解锁弹窗。
- **动态剧名提取渲染**：弹窗自动抓取用户当前所浏览的具体短剧名称，呈现高拟真度的海外 4K 原版无删减解密提示。
- **智能停留唤醒**：首屏停留超过阈值时间后，自动呼出专属名额弹窗，最大化挽回跳出流量。
- **全生态防封防红盾牌**：
  - 毫秒级识别微信、QQ、微博等内置受控 WebView 浏览器环境；
  - 自动呼出右上角“在浏览器中打开”指引遮罩，并集成剪贴板一键转存功能。

### 3. 🔍 深度 SEO 与 GEO 搜索引擎基础设施
- **标准化 8 大核心专区矩阵**：针对高价值搜索意图建立独立垂直频道：
  - `/vpn/`：VPN 加速器评测与精选专线
  - `/jichang/`：最新机场推荐评测与流媒体专线排行榜
  - `/clash/`：Clash 客户端下载与订阅配置完全指南
  - `/nodes/`：全球 4K 原画高速节点导航
  - `/tizi/`：稳定梯子推荐与使用指南
  - `/free/`：免费节点与试用体验专区
  - `/tutorial/`：全平台新手配置与排障完全教程
  - `/brands/`：优质网络加速品牌官方名录与测速报告
- **GEO (生成式引擎) Answer-First 实体锚点**：首屏直接输出大语言模型友好的清晰陈述句、频道对比 `<table>` 表格与标准化 `<details><summary>` FAQ 问答对。
- **结构化数据 (JSON-LD)**：全站严格遵循 Schema.org 标准，覆盖 `Organization`、`WebSite`、`CollectionPage`、`BreadcrumbList` 与 `FAQPage`，100% 与用户可见内容保持真实一致。
- **权威信任资产 (E-E-A-T)**：具备完备独立的合规政策三件套（隐私政策、服务条款、免责声明）及语义化 404 拦截。

---

## 📁 目录结构规范

```text
huangguoaiju.homes/
├── assets/
│   ├── css/
│   │   └── style.css            # 响应式全局核心样式表 (流媒体深色主题 + 表格 + 转化弹窗)
│   ├── js/
│   │   └── main.js              # 原生 ES6+ 脚本 (分类筛选、弹窗控制器、防红引导)
│   └── images/
│       ├── covers/              # 30+ 张超清优化海报 (cover-01.webp ~ cover-30.webp)
│       ├── logo.png             # 官方高清矢量 Logo
│       ├── apple-touch-icon.png # iOS Web App 触控图标
│       ├── favicon.ico          # 多尺寸标准网站图标
│       └── og-home.jpg          # 社交媒体分享卡片封面 (1200x630)
├── vpn/index.html               # 核心频道 1：VPN 加速器评测与指南
├── jichang/index.html           # 核心频道 2：最新高速稳定机场排行榜
├── clash/index.html             # 核心频道 3：Clash 客户端下载与订阅配置
├── nodes/index.html             # 核心频道 4：全球 4K 原画高速节点导航
├── tizi/index.html              # 核心频道 5：稳定科学上网梯子推荐
├── free/index.html              # 核心频道 6：免费节点与试用体验专区
├── tutorial/index.html          # 核心频道 7：全平台新手配置完全教程
├── brands/index.html            # 核心频道 8：优质网络加速品牌名录
├── privacy.html                 # 隐私保护政策 (Privacy Policy)
├── terms.html                   # 用户服务条款 (Terms of Service)
├── disclaimer.html              # 免责声明与第三方合作说明 (Disclaimer)
├── 404.html                     # 语义化 404 错误页 (杜绝 Soft 404)
├── index.html                   # 官方首页 (主转化与内容落地页)
├── robots.txt                   # 爬虫抓取协议 (放行主流搜索蜘蛛与 AI 爬虫)
├── sitemap.xml                  # 规范化 XML 站点地图 (包含 12 个正式 200 URL)
├── server.mjs                   # 零依赖本地轻量静态 HTTP 预览服务器 (含 301/302 路由)
├── build.js                     # 上线前自动化静态校验与完整性构建套件
├── audit.js                     # 代码级纯净度与历史残留指纹审计工具
├── preview.bat                  # Windows 极速双击本地预览启动脚本
├── package.json                 # 项目配置与 npm scripts 管理
├── .gitignore                   # Git 忽略配置
└── LICENSE                      # MIT 开源协议
```

---

## 🚀 本地开发与校验

### 1. 运行环境
- **Node.js**: `v18.0.0` 或更高版本（支持原生 ES 模块）
- **包管理器**: `npm` / `pnpm` / `yarn`（零第三方运行时依赖，克隆即用）

### 2. 启动本地预览
```bash
# 启动本地开发与预览服务器 (默认端口 3088)
npm start

# 或直接运行
node server.mjs
```
> **Windows 用户**：可直接双击根目录下的 `preview.bat` 极速打开浏览器预览。

### 3. 上线前自动化校验与审计
```bash
# 执行全站 HTML、Title、Canonical、H1、Schema 完整性构建校验
npm run build

# 执行代码级暗桩、违规外链与第三方指纹深度审计
npm run audit
```

构建与审计执行结果均为：
```text
✅ [PASS] 全部 13/13 页面与资产校验 100% 通过！
✅ [AUDIT PASSED] 0 RESIDUES FOUND! 100% CLEAN & INDEPENDENT.
```

---

## 🌐 生产环境部署指引

### 推荐方案 A：Cloudflare Pages / Vercel (全球 CDN 边缘加速)
1. 在 GitHub 上将本仓库 `qweqwe98698-tech/huangguoaiju.homes` 授权导入至 **Cloudflare Pages** 或 **Vercel**；
2. 构建参数配置：
   - **Framework Preset**: `None / Other` (纯静态)
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `.` (根目录)
3. 域名解析绑定：
   - 绑定正式主域：`huangguoaiju.homes`
   - 在 Cloudflare 中配置 **Redirect Rule**：将 `www.huangguoaiju.homes` 301 永久重定向至 `huangguoaiju.homes`。

### 推荐方案 B：Nginx 独立 VPS 部署
```nginx
# 1. HTTP 统一重定向到 HTTPS
server {
    listen 80;
    server_name huangguoaiju.homes www.huangguoaiju.homes;
    return 301 https://huangguoaiju.homes$request_uri;
}

# 2. WWW 统一 301 重定向至裸域规范
server {
    listen 443 ssl http2;
    server_name www.huangguoaiju.homes;
    ssl_certificate /etc/letsencrypt/live/huangguoaiju.homes/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/huangguoaiju.homes/privkey.pem;
    return 301 https://huangguoaiju.homes$request_uri;
}

# 3. 正式生产站点配置
server {
    listen 443 ssl http2;
    server_name huangguoaiju.homes;

    ssl_certificate /etc/letsencrypt/live/huangguoaiju.homes/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/huangguoaiju.homes/privkey.pem;

    root /var/www/huangguoaiju.homes;
    index index.html;

    # 404 真实状态码页面配置 (杜绝 Soft 404)
    error_page 404 /404.html;

    # 内部商业引流通道 302 隔离跳转
    location = /go/speed/ {
        return 302 https://sahude.gsyvipaff.com/#/?code=keqgvT5Y;
    }

    # 静态资产长效客户端缓存
    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
    }

    # 目录尾斜杠与静态文件匹配
    location / {
        try_files $uri $uri/ =404;
    }
}
```

---

## 📊 SEO 与站长平台提交指引

网站正式部署上线后，将站点地图提交至各大站长平台以加速全站秒级收录：

| 搜索引擎平台 | 站长平台入口 | 推荐所有权验证方式 | 提交内容 |
| :--- | :--- | :--- | :--- |
| **Google Search Console** | [search.google.com](https://search.google.com/search-console) | HTML 验证标记（代码已预留插槽）或 DNS TXT | `https://huangguoaiju.homes/sitemap.xml` |
| **Bing Webmaster Tools** | [bing.com/webmasters](https://www.bing.com/webmasters) | GSC 一键授权同步 或 HTML 验证标记 | `https://huangguoaiju.homes/sitemap.xml` |
| **神马站长平台 (UC/夸克)** | [zhanzhang.sm.cn](https://zhanzhang.sm.cn/) | `shenma-site-verification` 标签插槽 | `https://huangguoaiju.homes/sitemap.xml` |
| **百度搜索资源平台** | [ziyuan.baidu.com](https://ziyuan.baidu.com/) | HTML 头部标签或文件验证 | 提交主域名及 Sitemap 索引 |

---

## 📄 版权与协议

本项目基于 [MIT License](LICENSE) 开源协议授权。

Copyright © 2026 **黄果短剧** ([huangguoaiju.homes](https://huangguoaiju.homes/)). All rights reserved.
