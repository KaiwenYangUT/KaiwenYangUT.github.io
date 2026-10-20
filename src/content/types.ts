export type Section = 'education' | 'work' | 'research' | 'projects' | 'teaching';
export type YearMonth = `${number}-${'01'|'02'|'03'|'04'|'05'|'06'|'07'|'08'|'09'|'10'|'11'|'12'}`;
export type DateLike = YearMonth | `${number}`;           // '2025' allowed for year-only entries
export type Tag = string;                                // lowercase-kebab, e.g. 'time-series'

export interface Link {
  label: string;
  href: string;
  kind?: 'repo' | 'demo' | 'report' | 'paper' | 'slides' | 'site';
}

/** Fields every entry shares. `id` doubles as the URL anchor (#id) and the cross-link key. */
export interface BaseEntry {
  id: string;
  sections: Section[];          // every page this entry appears on (no duplication)
  title: string;                // role, degree, or project name
  org?: string;
  location?: string;
  start: DateLike;
  end?: DateLike | 'present';
  expected?: boolean;           // e.g. MEng end date
  summary?: string;             // one line
  bullets?: string[];
  tags: Tag[];
  links?: Link[];
  related?: string[];           // ids of other entries → "Also in …" links
  draft?: boolean;              // excluded from build
}

export interface Award { name: string; year: number; amount?: string }
export interface CourseGrade { name: string; grade?: string }

export interface EducationEntry extends BaseEntry {
  kind: 'education';
  degree: string;               // "MEng", "HBSc"
  field: string;
  distinction?: string;         // "with High Distinction"
  gpa?: { value: string; scale: string; label?: string };   // label: "Major GPA"
  honours?: string[];           // "Dean's List Scholar (2021–2025)"
  awards?: Award[];
  coursework?: CourseGrade[];
}

export interface ResearchFacet {
  question: string;
  supervisor?: string;
  lab?: string;                 // or department
  role: string;
  methods: Tag[];
  outputs: string[];
  funding: 'paid' | 'unpaid' | 'course' | 'unspecified';
}

export interface WorkEntry extends BaseEntry {
  kind: 'work';
  employment: 'internship' | 'part-time' | 'contract' | 'full-time';
  research?: ResearchFacet;     // present ⇔ 'research' ∈ sections
  seeAlsoRoute?: '/teaching';   // compact row pointing elsewhere (TA summary)
}

export interface ResearchEntry extends BaseEntry { kind: 'research'; research: ResearchFacet }

export interface ProjectEntry extends BaseEntry {
  kind: 'project';
  context: 'self-directed' | 'course' | 'hackathon' | 'unspecified';
  course?: string;
  stack: Tag[];
  highlights?: string[];        // mono key-numbers row
}

export type Entry = EducationEntry | WorkEntry | ResearchEntry | ProjectEntry;

/* ---------- Teaching ---------- */
export type Season = 'Winter' | 'Summer' | 'Fall';
export interface Term { season: Season; year: number }

export interface Course {
  code: string;                 // 'STA313H1' (display 'STA313')
  title: string;                // official calendar title
  description: string;          // verbatim from calendar
  sourceUrl: string;            // https://artsci.calendar.utoronto.ca/course/sta313h1
  retrieved: string;            // ISO date
  descriptionKind: 'summary' | 'verbatim';
  verified: boolean;            // false → UI shows "description unverified"
}

export interface TeachingAppointment {
  id: string;
  term: Term;
  courseCode: string;           // FK → Course.code
  role: 'Teaching Assistant' | 'Head TA' | 'Course Instructor';
  institution: 'University of Toronto';
}
