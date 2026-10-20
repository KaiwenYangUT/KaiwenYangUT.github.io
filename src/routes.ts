import { index,route,type RouteConfig } from '@react-router/dev/routes';
export default [index('routes/home.tsx'),route('education','routes/education.tsx'),route('work','routes/work.tsx'),route('research','routes/research.tsx'),route('projects','routes/projects.tsx'),route('teaching','routes/teaching.tsx'),route('*','routes/not-found.tsx')] satisfies RouteConfig;
