import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const paths=['/','/education','/work','/research','/projects','/teaching'];
for(const width of [360,1280])for(const theme of ['light','dark'] as const){
 test(`${width}px ${theme}: all pages accessible, hydrated, and refreshable`,async({page})=>{
  await page.setViewportSize({width,height:900});await page.emulateMedia({colorScheme:theme});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  for(const path of paths){
   const response=await page.goto(path);expect(response?.status()).toBe(200);await expect(page.locator('h1')).toBeVisible();
   await expect(page.locator('html')).toHaveAttribute('data-theme',theme);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   for(const name of ['LinkedIn','GitHub']){const link=page.locator('header').getByRole('link',{name:`${name} (opens in new tab)`,exact:true});await expect(link).toBeVisible();await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel','noopener noreferrer')}
   expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
   expect(await page.locator('link[rel=canonical]').getAttribute('href')).toBe(`https://kaiwenyangut.github.io${path==='/'?'/':path+'/'}`);
   expect((await page.reload())?.status()).toBe(200);
  }expect(errors).toEqual([]);
 });
}
test('theme selection survives reload',async({page})=>{await page.emulateMedia({colorScheme:'light'});await page.goto('/');await page.getByRole('button',{name:'Dark theme'}).click();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');await expect(page.getByRole('button',{name:'Dark theme'})).toHaveAttribute('aria-pressed','true')});
test('mobile menu traps focus and restores it after Escape',async({page})=>{await page.setViewportSize({width:360,height:800});await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();const menu=page.getByRole('button',{name:'Menu',exact:true});await menu.click();await expect(page.getByRole('dialog')).toBeVisible();for(let i=0;i<10;i++){await page.keyboard.press('Tab');expect(await page.evaluate(()=>!!document.activeElement?.closest('dialog'))).toBe(true)}await page.keyboard.press('Escape');await expect(menu).toBeFocused();await menu.click();await page.getByRole('navigation',{name:'Mobile primary'}).getByRole('link',{name:'Teaching'}).click();await expect(page).toHaveURL(/teaching/);await expect(page.getByRole('dialog')).not.toBeVisible()});
test('teaching disclosures respond to Enter and Space',async({page})=>{await page.goto('/teaching');const b=page.locator('#sta314-w2027 button');await b.focus();await page.keyboard.press('Enter');await expect(b).toHaveAttribute('aria-expanded','true');await expect(page.locator('#sta314-w2027-description')).toBeVisible();await page.keyboard.press('Space');await expect(b).toHaveAttribute('aria-expanded','false');await expect(page.locator('#sta314-w2027-description')).toBeHidden();await expect(page.locator('#sta314-w2027')).toContainText('Upcoming');await expect(page.locator('#course-STA313H1')).toContainText('Fall 2026 · Winter 2026')});
test('economics cross links navigate to the same record',async({page})=>{await page.goto('/work');await page.locator('#econ-ra').getByRole('link',{name:'Also in Research'}).click();await expect(page).toHaveURL(/research#econ-ra/);await page.locator('#econ-ra').getByRole('link',{name:'Also in Work'}).click();await expect(page).toHaveURL(/work#econ-ra/)});
test('unknown route returns a real 404 with a home link',async({page})=>{expect((await page.goto('/nope'))?.status()).toBe(404);await expect(page.locator('h1')).toContainText('outlier');await page.getByRole('link',{name:'Back to the index'}).click();await expect(page).toHaveURL('/')});
test('reduced motion removes transitions',async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');expect(await page.locator('a').evaluateAll(as=>as.every(a=>getComputedStyle(a).transitionDuration==='0s'))).toBe(true)});
