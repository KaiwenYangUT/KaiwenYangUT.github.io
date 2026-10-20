import { PageHeading } from '../components/Shared';
import { TeachingTable,CourseCatalogue } from '../components/Teaching';
import { byId } from '../lib/selectors';
import { pageMeta } from '../lib/meta';
export const meta=()=>pageMeta('Teaching','University of Toronto teaching in data science, machine learning, statistics, and visualization.','teaching');
export default function Teaching(){return <div className="container page"><PageHeading number="06" title="Teaching" side>{byId('ta')?.summary}</PageHeading><TeachingTable/><CourseCatalogue/></div>}
