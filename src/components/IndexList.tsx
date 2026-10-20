import { Link } from 'react-router';
import { entriesFor } from '../lib/selectors';
import { courses,teaching } from '../content';
import type { Section } from '../content/types';
import s from './Home.module.css';
export function IndexList(){const rows:{key:Section;label:string;detail:string}[]=[
 {key:'education',label:'Education',detail:entriesFor('education').map(e=>`${e.kind==='education'?e.degree:e.title} ${e.end?.slice(0,4)}`).join(' · ')},
 {key:'work',label:'Work',detail:`${entriesFor('work').length} roles · ${entriesFor('work').at(-1)?.start.slice(0,4)}–present`},
 {key:'research',label:'Research',detail:`${entriesFor('research').length} entries · questions, methods, findings`},
 {key:'projects',label:'Projects',detail:entriesFor('projects').length===1?entriesFor('projects')[0].title:`${entriesFor('projects').length} projects`},
 {key:'teaching',label:'Teaching',detail:`${teaching.length} appointments · ${courses.length} courses`},
 ];return <div className={s.indexList}>{rows.map((r,i)=><Link to={`/${r.key}`} key={r.key}><span className="mono muted">0{i+2}</span><span className={s.indexTitle}>{r.label}</span><span className={s.indexDetail}>{r.detail}</span><span className={s.arrow} aria-hidden="true">↗</span></Link>)}</div>}
