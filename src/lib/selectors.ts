import { allEntries, teaching } from '../content';
import type { Entry, Section, Term } from '../content/types';
import { BUILD_DATE } from './time';
export const sortByStartDesc = <T extends {start:string}>(items:T[]) => [...items].sort((a,b)=>b.start.localeCompare(a.start));
export const entriesFor = (section:Section) => sortByStartDesc(allEntries.filter(e=>!e.draft && e.sections.includes(section)));
export const byId = (id:string) => allEntries.find(e=>e.id===id && !e.draft);
export const relatedOf = (entry:Entry) => (entry.related || []).map(byId).filter((e): e is Entry => Boolean(e));
export const termStart = (term:Term) => `${term.year}-${({Winter:'01',Summer:'05',Fall:'09'} as const)[term.season]}`;
export const termLabel = (term:Term) => `${term.season} ${term.year}`;
export const sortedTeaching = () => [...teaching].sort((a,b)=>termStart(b.term).localeCompare(termStart(a.term)));
export const termsForCourse = (code:string) => sortedTeaching().filter(t=>t.courseCode===code).map(t=>t.term);
export function termStatus(term:Term, buildDate=BUILD_DATE): 'past'|'current'|'upcoming' {
  const start=termStart(term), end=`${term.year}-${({Winter:'04',Summer:'08',Fall:'12'} as const)[term.season]}`;
  const now=buildDate.slice(0,7);
  return now<start?'upcoming':now>end?'past':'current';
}
export function entryStatus(entry:Entry) {
  const now=BUILD_DATE.slice(0,7);
  if (entry.start>now) return 'upcoming';
  return entry.end==='present'||(entry.end && entry.end>=now)?'current':'past';
}
