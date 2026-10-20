import type { Entry, Course, TeachingAppointment } from '../content/types';
export function validateContent(entries:Entry[],courses:Course[],appointments:TeachingAppointment[]){
 const errors:string[]=[];const ids=new Set<string>();
 const addId=(id:string)=>{if(ids.has(id))errors.push(`Duplicate id: ${id}`);ids.add(id)};
 entries.forEach(e=>addId(e.id));appointments.forEach(t=>addId(t.id));
 const courseCodes=new Set(courses.map(c=>c.code));if(courseCodes.size!==courses.length)errors.push('Duplicate course codes');
 const datePattern=/^\d{4}(?:-(?:0[1-9]|1[0-2]))?$/;
 for(const e of entries){
  if(!datePattern.test(e.start)||e.end&&e.end!=='present'&&!datePattern.test(e.end))errors.push(`Malformed date: ${e.id}`);
  if(e.end&&e.end!=='present'&&`${e.start}-01`.slice(0,7)>`${e.end}-12`.slice(0,7))errors.push(`Reversed dates: ${e.id}`);
  if(e.sections.includes('research')!==Boolean('research'in e&&e.research))errors.push(`Missing/misplaced research facet: ${e.id}`);
  for(const id of e.related||[]){const other=entries.find(x=>x.id===id);if(!other)errors.push(`Unresolved related id: ${id}`);else if(!other.related?.includes(e.id))console.warn(`Nonreciprocal related link: ${e.id} → ${id}`)}
 }
 for(const t of appointments)if(!courseCodes.has(t.courseCode))errors.push(`Unknown course: ${t.courseCode}`);
 return errors;
}
