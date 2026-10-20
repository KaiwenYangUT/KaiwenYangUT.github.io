import http from 'node:http';
import { readFile,stat } from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {gzipSync} from 'node:zlib';
const root=resolve('build/client');const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.avif':'image/avif','.webp':'image/webp','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain','.data':'text/plain'};
async function send(req,res,path,status=200){let body=await readFile(path);const type=mime[extname(path)]||'application/octet-stream';const headers={'Content-Type':type};if(/text|json|xml|svg/.test(type)&&req.headers['accept-encoding']?.includes('gzip')){body=gzipSync(body);headers['Content-Encoding']='gzip';headers.Vary='Accept-Encoding'}headers['Content-Length']=body.length;res.writeHead(status,headers);res.end(body)}
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');let path=resolve(root,`.${decodeURIComponent(url.pathname)}`);if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403);res.end();return}if((await stat(path)).isDirectory())path=resolve(path,'index.html');await send(req,res,path)}catch{await send(req,res,resolve(root,'404.html'),404)}}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
