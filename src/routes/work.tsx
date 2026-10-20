import { Link } from 'react-router';
import { entriesFor } from '../lib/selectors';
import { pageMeta } from '../lib/meta';
import { PageHeading,EntryRow,TagList,Bullets,CrossLinks,EntryLinks } from '../components/Shared';
import { Timeline } from '../components/Timeline';
export const meta=()=>pageMeta('Work','Experience in data visualization, data engineering, analytics, teaching, and economics research.','work');
export default function Work(){return <div className="container page"><PageHeading number="03" title="Work">From messy inputs to useful systems. A record of what I’ve built and who I’ve built it with.</PageHeading><Timeline/>{entriesFor('work').map((e,i)=>e.kind==='work'&&<EntryRow key={e.id} entry={e} index={`0${i+1}`}><h2>{e.title}</h2><p className="muted">{e.org} · {e.location}</p>{e.seeAlsoRoute?<><p>{e.summary}</p><Link to={e.seeAlsoRoute}>See teaching appointments →</Link></>:<><Bullets items={e.bullets}/><TagList tags={e.tags}/></>}<EntryLinks entry={e}/><CrossLinks entry={e} section="work"/></EntryRow>)}</div>}
