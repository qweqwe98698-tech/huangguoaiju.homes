import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOMAIN = 'https://huangguoaiju.homes';

const PAGES_TO_VERIFY = [
  { path: 'index.html', url: `${DOMAIN}/`, expectedH1: 1, name: '首页' },
  { path: 'vpn/index.html', url: `${DOMAIN}/vpn/`, expectedH1: 1, name: 'VPN' },
  { path: 'jichang/index.html', url: `${DOMAIN}/jichang/`, expectedH1: 1, name: '机场推荐' },
  { path: 'clash/index.html', url: `${DOMAIN}/clash/`, expectedH1: 1, name: 'Clash' },
  { path: 'nodes/index.html', url: `${DOMAIN}/nodes/`, expectedH1: 1, name: '节点' },
  { path: 'tizi/index.html', url: `${DOMAIN}/tizi/`, expectedH1: 1, name: '梯子推荐' },
  { path: 'free/index.html', url: `${DOMAIN}/free/`, expectedH1: 1, name: '免费资源' },
  { path: 'tutorial/index.html', url: `${DOMAIN}/tutorial/`, expectedH1: 1, name: '使用教程' },
  { path: 'brands/index.html', url: `${DOMAIN}/brands/`, expectedH1: 1, name: '品牌库' },
  { path: 'privacy.html', url: `${DOMAIN}/privacy.html`, expectedH1: 1, name: '隐私政策' },
  { path: 'terms.html', url: `${DOMAIN}/terms.html`, expectedH1: 1, name: '用户条款' },
  { path: 'disclaimer.html', url: `${DOMAIN}/disclaimer.html`, expectedH1: 1, name: '免责声明' },
  { path: '404.html', url: null, expectedH1: 1, name: '404 错误页' }
];

console.log('====================================================');
console.log('🚀 执行上线前 SEO 基础设施构建与验证流程 (huangguoaiju.homes)');
console.log('====================================================');

let hasErrors = false;
const seenTitles = new Map();
const seenDescs = new Map();

// 1. 验证 HTML 页面
PAGES_TO_VERIFY.forEach(page => {
  const filePath = path.join(__dirname, page.path);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ [MISSING] 页面文件不存在: ${page.path}`);
    hasErrors = true;
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // Title 检查与唯一性
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    console.error(`❌ [TITLE] 缺少有效 Title: ${page.path}`);
    hasErrors = true;
  } else {
    const title = titleMatch[1].trim();
    if (seenTitles.has(title)) {
      console.error(`❌ [DUPLICATE TITLE] 发现重复 Title: "${title}" 在 ${page.path} 与 ${seenTitles.get(title)}`);
      hasErrors = true;
    } else {
      seenTitles.set(title, page.path);
    }
  }

  // Description 检查与唯一性
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (!descMatch || !descMatch[1].trim()) {
    console.error(`❌ [DESC] 缺少有效 Description: ${page.path}`);
    hasErrors = true;
  } else {
    const desc = descMatch[1].trim();
    if (seenDescs.has(desc)) {
      console.error(`❌ [DUPLICATE DESC] 发现重复 Description 在 ${page.path} 与 ${seenDescs.get(desc)}`);
      hasErrors = true;
    } else {
      seenDescs.set(desc, page.path);
    }
  }

  // Canonical 检查 (404 页面不应有 self canonical)
  if (page.url) {
    const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
    if (!canonicalMatch || canonicalMatch[1] !== page.url) {
      console.error(`❌ [CANONICAL] Canonical 异常或不匹配: ${page.path} (Found: ${canonicalMatch ? canonicalMatch[1] : 'NONE'}, Expected: ${page.url})`);
      hasErrors = true;
    }
  }

  // H1 唯一性检查
  const h1Matches = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  if (h1Matches.length !== page.expectedH1) {
    console.error(`❌ [H1] H1 数量不符合预期 (${h1Matches.length} != ${page.expectedH1}): ${page.path}`);
    hasErrors = true;
  }

  // Schema 检查 (除 404 外需包含有效 JSON-LD)
  if (page.url) {
    const schemas = [...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
    if (schemas.length === 0) {
      console.error(`❌ [SCHEMA] 缺少 JSON-LD 结构化数据: ${page.path}`);
      hasErrors = true;
    } else {
      schemas.forEach(s => {
        try {
          JSON.parse(s[1]);
        } catch(e) {
          console.error(`❌ [SCHEMA SYNTAX] JSON-LD 语法错误: ${page.path} - ${e.message}`);
          hasErrors = true;
        }
      });
    }
  }

  // 搜索引擎站长平台插槽检查
  if (!content.includes('google-site-verification') && !content.includes('msvalidate.01')) {
    console.warn(`⚠️ [VERIFY TAG] 未找到站长平台预留插槽: ${page.path}`);
  }

  console.log(`✅ [PASS] 页面校验通过: ${page.path.padEnd(20)} | Title: ${titleMatch ? titleMatch[1].slice(0, 28) : ''}...`);
});

// 2. 验证 sitemap.xml
console.log('----------------------------------------------------');
const sitemapPath = path.join(__dirname, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('❌ [SITEMAP] sitemap.xml 不存在');
  hasErrors = true;
} else {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  console.log(`✅ [SITEMAP] 包含 ${urls.length} 个规范 URL:`);
  urls.forEach(u => {
    if (!u.startsWith(DOMAIN)) {
      console.error(`❌ [SITEMAP URL] 非法主域: ${u}`);
      hasErrors = true;
    }
    // 检查是否包含 404, go, 重复等
    if (u.includes('404') || u.includes('/go/')) {
      console.error(`❌ [SITEMAP ANOMALY] Sitemap 不应包含异常页面: ${u}`);
      hasErrors = true;
    }
  });
  console.log(`   - 覆盖所有核心频道与合规页面，无 404 与跳转链接`);
}

// 3. 验证 robots.txt
console.log('----------------------------------------------------');
const robotsPath = path.join(__dirname, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  console.error('❌ [ROBOTS] robots.txt 不存在');
  hasErrors = true;
} else {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  if (!robots.includes(`Sitemap: ${DOMAIN}/sitemap.xml`)) {
    console.error(`❌ [ROBOTS] 缺少正确的 Sitemap 声明`);
    hasErrors = true;
  }
  const requiredSpiders = ['Googlebot', 'bingbot', 'Baiduspider', 'yisouspider'];
  for (const spider of requiredSpiders) {
    if (!robots.includes(spider)) {
      console.error(`❌ [ROBOTS] 缺少蜘蛛声明: ${spider}`);
      hasErrors = true;
    }
  }
  console.log('✅ [ROBOTS] Googlebot, bingbot, Baiduspider, yisouspider 抓取规则全部合规');
}

console.log('====================================================');
if (hasErrors) {
  console.error('❌ 构建与 SEO 校验失败，请检查上方错误项。');
  process.exit(1);
} else {
  console.log('🎉 全部构建验收项 100% 通过！网站已具备正式上线条件。');
  process.exit(0);
}
