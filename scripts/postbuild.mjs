import {copyFile,writeFile,readFile,access} from 'node:fs/promises';
import { scanPrivacy } from './privacy.mjs';
const out='build/client';
await copyFile(`${out}/404/index.html`,`${out}/404.html`);
// The sitemap and robots URL follow the same site.ts setting as metadata.
const siteSource=await readFile('src/content/site.ts','utf8');
const siteUrl=siteSource.match(/siteUrl:\s*'([^']+)'/)?.[1];
if(!siteUrl)throw new Error('site.ts must define siteUrl');
const routes=['','education','work','research','projects','teaching'];
for(const route of routes)await access(`${out}/${route?`${route}/`:''}index.html`);
await writeFile(`${out}/sitemap.xml`,`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${siteUrl}/${r?`${r}/`:''}</loc></url>`).join('')}</urlset>`);
await writeFile(`${out}/robots.txt`,`User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
await scanPrivacy('src/content');await scanPrivacy(out);
console.log('Verified route HTML, generated 404/sitemap/robots, and passed privacy checks.');
