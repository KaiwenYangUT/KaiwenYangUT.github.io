import type { MetaDescriptor } from 'react-router';
import { site } from '../content/site';
export function pageMeta(title:string, description:string, path=''): MetaDescriptor[] {
 const name=title==='Home'?`${site.name} · Data science & ML`:`${title} · ${site.shortName}`;
 const url=`${site.siteUrl}${path ? `/${path.replace(/^\/+|\/+$/g,'')}/` : '/'}`;
 return [{title:name},{name:'description',content:description},{tagName:'link',rel:'canonical',href:url},{property:'og:title',content:name},{property:'og:description',content:description},{property:'og:url',content:url},{property:'og:type',content:'website'},{property:'og:image',content:`${site.siteUrl}/og.png`},{property:'og:image:width',content:'1200'},{property:'og:image:height',content:'630'},{property:'og:image:alt',content:`${site.name} — ${site.tagline}`},{name:'twitter:card',content:'summary_large_image'}];
}
