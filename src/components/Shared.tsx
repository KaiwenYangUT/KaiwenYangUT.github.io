import type { ReactNode } from 'react';
import type { Entry, Section } from '../content/types';
import { Link } from 'react-router';
import { dateRange } from '../lib/format';
import { relatedOf } from '../lib/selectors';
import { ExternalLink } from './ExternalLink';
import s from './Entries.module.css';
export function SectionLabel({children}:{children:ReactNode}){return <span className="section-label">{children}</span>}
export function PageHeading({number,title,compact,children}:{number:string,title:string,compact?:boolean,children?:ReactNode}){if(compact)return <h1 className="section-label page-label">{number} / {title}</h1>;return <div className="page-heading"><SectionLabel>{number} / {title}</SectionLabel><div><h1>{title}</h1>{children&&<p>{children}</p>}</div></div>}
export function TagList({tags}:{tags:string[]}){return <ul className={s.tags} aria-label="Topics and tools">{tags.map(t=><li key={t}>{t}</li>)}</ul>}
export function EntryRow({entry,index,children}:{entry:Entry,index:string,children:ReactNode}){return <article id={entry.id} className={s.entry}><div className={s.index}><span className="mono">{index}</span><span className="mono">{dateRange(entry)}</span>{entry.expected&&<span className="mono muted">(expected)</span>}</div><div className={s.content}>{children}</div></article>}
export function CrossLinks({entry,section}:{entry:Entry,section:Section}){return <>{entry.sections.filter(p=>p!==section).map(p=><p className={s.cross} key={p}><Link to={`/${p}#${entry.id}`}>↳ Also in {p[0].toUpperCase()+p.slice(1)}</Link></p>)}{relatedOf(entry).map(e=><p className={s.cross} key={e.id}><Link to={`/${e.sections[0]}#${e.id}`}>Related: {e.title} →</Link></p>)}</>}
export function EntryLinks({entry}:{entry:Entry}){return entry.links?.length?<div className={s.links}>{entry.links.map(l=><ExternalLink key={l.href} href={l.href}>{l.label} ↗</ExternalLink>)}</div>:null}
export function Bullets({items}:{items?:string[]}){return items?.length?<ul className={s.bullets}>{items.map(i=><li key={i}>{i}</li>)}</ul>:null}
