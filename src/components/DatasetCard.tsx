import { site } from '../content/site';
import s from './Home.module.css';
export function DatasetCard(){return <div className={s.dataset}><p className={s.comment}># kaiwen.yaml · schema v2026.10</p><dl>{site.dataset.map(([key,value,comment])=><div key={key}><dt>{key}:</dt><dd className={key==='actual_order'?'strawberry':undefined}>{value}{comment&&<span className={s.comment}> # {comment}</span>}</dd></div>)}</dl></div>}
