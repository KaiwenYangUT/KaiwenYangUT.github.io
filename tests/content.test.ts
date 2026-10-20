import { describe,it,expect } from 'vitest';
import { readFileSync,readdirSync } from 'node:fs';
import { allEntries,courses,teaching } from '../src/content';
import { entriesFor,termStatus,termsForCourse } from '../src/lib/selectors';
import { validateContent } from '../src/lib/validate';
describe('Content integrity',()=>{
 it('resolves ids, courses, research facets and date ranges',()=>expect(validateContent(allEntries,courses,teaching)).toEqual([]));
 it('rejects broken related links',()=>expect(validateContent([{...allEntries[0],related:['missing']}],courses,teaching)).toContain('Unresolved related id: missing'));
 it('rejects broken course references',()=>expect(validateContent(allEntries,courses,[{...teaching[0],courseCode:'MISSING'}])).toContain('Unknown course: MISSING'));
 it('rejects invalid dates and duplicate ids',()=>{const invalid={...allEntries[0],start:'2026-13'} as unknown as typeof allEntries[number];expect(validateContent([invalid,invalid],courses,[]).length).toBeGreaterThan(1)});
 it('shares one economics record across both lists',()=>{expect(allEntries.filter(e=>e.id==='econ-ra')).toHaveLength(1);expect(entriesFor('work').find(e=>e.id==='econ-ra')).toBe(entriesFor('research').find(e=>e.id==='econ-ra'))});
 it('keeps project and research assignments correct',()=>{expect(entriesFor('projects').some(e=>e.id==='acoustic-pollution')).toBe(false);expect(entriesFor('research').some(e=>e.id==='school-of-cities')).toBe(false)});
 it('keeps contact phone numbers out of source content',()=>{for(const f of readdirSync('src/content'))expect(readFileSync(`src/content/${f}`,'utf8')).not.toMatch(/(?:\+?1[ .-]?)?\(?[2-9]\d{2}\)?[ .-]\d{3}[ .-]\d{4}/)});
 it('keeps the résumé PDF disabled',async()=>{const{site}=await import('../src/content/site');expect(site.resumePdf).toBeNull()});
 it('computes teaching status at term boundaries',()=>{const t={season:'Winter',year:2027} as const;expect(termStatus(t,'2026-12-31')).toBe('upcoming');expect(termStatus(t,'2027-01-01')).toBe('current');expect(termStatus(t,'2027-04-30')).toBe('current');expect(termStatus(t,'2027-05-01')).toBe('past')});
 it('groups repeated courses and sorts terms',()=>expect(termsForCourse('STA313H1')).toEqual([{season:'Fall',year:2026},{season:'Winter',year:2026}]));
});
