import { readdir,readFile } from 'node:fs/promises';
// Require an entire North American number, not incidental digits in asset hashes.
export const phonePattern=/(?<![\w])(?:\+?1[ .-]?)?\(?[2-9]\d{2}\)?[ .-]\d{3}[ .-]\d{4}(?!\d)/;
export async function scanPrivacy(directory){
 for(const entry of await readdir(directory,{withFileTypes:true})){
  const path=`${directory}/${entry.name}`;
  if(entry.isDirectory())await scanPrivacy(path);
  else if(/\.(?:html|json|txt|xml|ts|tsx|js|css|data)$/.test(entry.name)){
   if(phonePattern.test(await readFile(path,'utf8')))throw new Error(`Phone-like content detected in ${path}`);
  }else if(/\.pdf$/i.test(entry.name))throw new Error(`PDF publishing is disabled: ${path}`);
 }
}
