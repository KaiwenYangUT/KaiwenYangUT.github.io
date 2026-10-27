import type { WorkEntry } from './types';
export const work: WorkEntry[] = [
  {kind:'work',id:'school-of-cities',sections:['work'],title:'Mapping & Data Visualization Assistant',org:'School of Cities, University of Toronto',location:'Toronto, ON',start:'2026-04',end:'present',employment:'part-time',tags:['python','pls','elastic-net','elt','dashboards'],bullets:[
    'Integrated three elections and census data in Python; implemented election–census interpolation using population weights.',
    'Modeled electoral participation using PLS, Elastic Net, and supervised PCA; validated with spatially blocked nested cross-validation.',
    'Delivered 6 reproducible ELT pipelines and a real-time monitor; developed 5 interactive dashboards and 6 analytical figures.',
    'Co-authored “One city, uneven participation” with Aniket Kali: an interactive report exploring neighbourhood patterns in voter turnout across three Toronto elections. Published by the School of Cities as Part 8 of Place & Politics in Toronto (October 2026).'
  ],links:[{label:'Read report: One city, uneven participation',href:'https://schoolofcities.github.io/place-and-politics-toronto/toronto-turnout',kind:'report'}]},
  {kind:'work',id:'ta',sections:['work'],title:'Teaching Assistant',org:'University of Toronto',location:'Toronto, ON',start:'2025-09',end:'present',employment:'part-time',tags:['python','r','teaching'],seeAlsoRoute:'/teaching',summary:'12 Python labs designed · 600+ students mentored · 55 teams guided',bullets:[
    'Designed 12 Python labs and two mock assignments; helped optimize grading rubrics, improving grading speed by 20%.',
    'Mentored 600+ students in Python/R modeling and visualization; guided 55 teams on data pipelines and web deployment.'
  ]},
  {kind:'work',id:'codemao',sections:['work'],title:'Data Analyst Intern, Executive Office',org:'Codemao',location:'Shenzhen, China',start:'2025-06',end:'2025-07',employment:'internship',tags:['sql','python','etl','superset'],bullets:[
    'Analyzed retention for 2,000+ users using SQL and Python, including cohort analysis and retention curve modeling.',
    'Built ETL pipelines processing 30,000+ user records and developed 4 Superset dashboards, enabling real-time monitoring.'
  ]},
  {kind:'work',id:'econ-ra',sections:['work','research'],title:'Research Assistant',org:'Department of Economics, University of Toronto',location:'Toronto, ON',start:'2024-04',end:'2024-08',employment:'part-time',tags:['r','sql','regression','difference-in-differences'],bullets:[
    'Collected 3,000+ rows of structured data via web scraping and APIs in R; consolidated a SQL schema from 7 tables to 5.',
    'Applied regression and difference-in-differences with visualization to identify high-value satellite portfolio strategies.'
  ],research:{question:'Which satellite portfolio strategies are high-value?',lab:'Department of Economics, University of Toronto',role:'Data collection using scraping and APIs in R, schema design, and analysis.',methods:['regression','difference-in-differences','r','sql','web-scraping'],outputs:['Consolidated a 7-table SQL schema into 5 tables.','Collected a dataset of 3,000+ rows.','Difference-in-differences analysis and visualizations of satellite portfolio strategies.'],funding:'paid'}},
  {kind:'work',id:'capgemini',sections:['work'],title:'Business Analyst Intern, Human Resources',org:'Capgemini China',location:'Beijing, China',start:'2023-05',end:'2023-07',employment:'internship',tags:['sql','excel','analysis','system-design'],bullets:[
    'Analyzed 10 years of graduate salary data across universities using Excel and SQL to support HR decision-making.',
    'Evaluated employee workload using SQL models, reducing program costs by $45,000; worked in a team of 6 to shorten training-material preparation from 2 weeks to 5 days, saving an additional $20,000.',
    'Designed functional logic diagrams and system architecture; collaborated with front-end and back-end engineers to validate 20+ functionalities before release.'
  ]},
];
