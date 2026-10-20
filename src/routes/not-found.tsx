import { Link } from 'react-router';
import { pageMeta } from '../lib/meta';
export const meta=()=>[...pageMeta('404','This page is an outlier and was removed from the dataset.','404'),{name:'robots',content:'noindex'}];
export default function NotFound(){return <div className="container page"><div className="page-heading"><span className="section-label strawberry">404 / Missing observation</span><div><h1>This page is an outlier and was removed from the dataset.</h1><p className="mono" style={{marginBlock:24}}>p &gt; 0.05: no evidence this page exists.</p><Link to="/">Back to the index →</Link></div></div></div>}
