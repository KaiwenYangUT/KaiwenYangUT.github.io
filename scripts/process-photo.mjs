import sharp from 'sharp';
import { readFile,mkdir } from 'node:fs/promises';
const config=JSON.parse(await readFile('assets-src/portrait.config.json','utf8'));
await mkdir('public/images',{recursive:true});
const cropped=sharp('assets-src/portrait-original.jpg').rotate().extract(config.crop);
let image=()=>cropped.clone();
if(config.duotone){const {data,info}=await cropped.clone().greyscale().raw().toBuffer({resolveWithObject:true});
const rgb=Buffer.alloc(info.width*info.height*3);
for(let i=0;i<info.width*info.height;i++){const luminance=Math.max(0,Math.min(1,(data[i*info.channels]/255-.5)*config.contrast+.5));for(let c=0;c<3;c++)rgb[i*3+c]=Math.round(config.shadows[c]+luminance*(config.highlights[c]-config.shadows[c]));}
image=()=>sharp(rgb,{raw:{width:info.width,height:info.height,channels:3}});}
for(const width of [480,800,1200]){await Promise.all([image().resize(width).avif({quality:52,effort:6}).toFile(`public/images/portrait-${width}.avif`),image().resize(width).webp({quality:78}).toFile(`public/images/portrait-${width}.webp`),image().resize(width).jpeg({quality:82,mozjpeg:true}).toFile(`public/images/portrait-${width}.jpg`)]);}
await image().resize(480).jpeg({quality:85,mozjpeg:true}).toFile('public/images/portrait-og.jpg');
console.log(`Generated ${config.duotone?'warm duotone':'full-colour'} portraits at 480, 800, and 1200px.`);
