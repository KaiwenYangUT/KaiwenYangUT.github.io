import { entriesFor } from '../lib/selectors';
import { pageMeta } from '../lib/meta';
import { PageHeading,EntryRow,TagList,Bullets,EntryLinks } from '../components/Shared';
import s from '../components/Entries.module.css';
export const meta=()=>pageMeta('Projects','Multimodal News RAG: text and image retrieval, vision-enabled generation, and rigorous evaluation.','projects');
export default function Projects(){const entries=entriesFor('projects');return <div className="container page"><PageHeading number="05" title="Projects">Built to learn. Evaluated to find out whether it works.</PageHeading>{entries.map((e,i)=>e.kind==='project'&&<EntryRow key={e.id} entry={e} index={String(i+1).padStart(3,'0')}><h2>{e.title}</h2><p>{e.summary}</p><TagList tags={e.stack}/><Bullets items={e.bullets}/><EntryLinks entry={e}/>{e.highlights&&<div className={s.highlights}>{e.highlights.map(h=><span key={h}>{h}</span>)}</div>}</EntryRow>)}{entries.length<3&&<div className={s.placeholder}><span className="mono">{String(entries.length+1).padStart(3,'0')} / ····</span><p>Next entry is still training.</p></div>}</div>}
