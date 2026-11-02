import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let totalIssues = 0;

function searchDir(dir, pattern, label) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git') {
        searchDir(full, pattern, label);
      }
    } else if (/\.(html|css|js|xml|txt|json)$/i.test(f) && f !== 'audit.js') {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.match(pattern);
      if (matches) {
        console.error(`[FLAGGED: ${label}] in ${full}:`, matches.slice(0, 5));
        totalIssues += matches.length;
      }
    }
  }
}

console.log('====================================================');
console.log('🔍 DEEP AUDIT FOR RESIDUAL FINGERPRINTS & COMPLIANCE');
console.log('====================================================');

searchDir('.', /huangguoai-app\.cn/gi, 'Old Target Domain');
searchDir('.', /huangguoaiju\.cc/gi, 'Sibling Dev Domain');
searchDir('.', /downloadapps[^\s"'<>]+/gi, 'Shady Third-Party Download CDN');
searchDir('.', /clarity[^\s"'<>]+/gi, 'Microsoft Clarity Tracking');
searchDir('.', /cdn-cgi|cloudflare/gi, 'Cloudflare Residues');
searchDir('.', /hgdj[^\s"'<>]+/gi, 'Old Site Prefix');
searchDir('.', /data-astro-cid-[a-z0-9]+/gi, 'Astro CID Scoping');
searchDir('.', /Astro v[0-9.]+/gi, 'Astro Generator Fingerprint');
searchDir('.', /stardj/gi, 'Old Internal Alias');
searchDir('.', /\/_astro\//gi, 'Old _astro Path');

console.log('====================================================');
if (totalIssues === 0) {
  console.log('✅ AUDIT PASSED: 0 RESIDUES FOUND! 100% CLEAN & INDEPENDENT.');
  process.exit(0);
} else {
  console.error(`❌ AUDIT FAILED: ${totalIssues} ISSUES DETECTED!`);
  process.exit(1);
}
console.log('====================================================');
