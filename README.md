# Kaiwen Yang · The index

A static portfolio using React 19, React Router 7 framework mode, Vite, TypeScript, and CSS Modules. Each page is rendered to HTML at build time. The published artifact is **only `build/client`**; the original portrait, plan, and development files are not served.

## Develop and check

Requires Node 24 and npm.

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm test
npm run build
npm run preview
npm run test:e2e
```

Preview serves the built site at http://127.0.0.1:4173 and returns real HTTP 404s for unknown routes. Browser tests use installed Google Chrome. Unit tests check references, dates, privacy, and term boundaries; browser tests cover every route at 360px and 1280px in both themes, axe accessibility, disclosure controls, mobile focus management, theme persistence, cross-links, and 404 handling. Generated results are ignored by Git.

`BUILD_DATE=2026-10-20 npm run build` fixes the date for reproducible previews. Normal builds use the UTC build date. Date-based content never consults the client clock. A monthly Actions rebuild refreshes current teaching terms.

## Content

Edit the relevant file in `src/content`; page components do not need to change.

| File | Content |
| --- | --- |
| `site.ts` | Name, intro, email, social URLs, dataset, current-entry IDs, music, résumé toggle |
| `education.ts` | Degrees, GPAs, awards, coursework |
| `work.ts` | Employment; optional shared research facet |
| `research.ts` | Research outside employment |
| `projects.ts` | Projects and public output links |
| `teaching.ts` | Teaching appointments |
| `courses.ts` | Course titles, summaries, source links, verification dates |

### Add a project

Append an object to `projects` in `src/content/projects.ts`:

```ts
{
  kind: 'project', id: 'my-new-project', sections: ['projects'],
  title: 'My New Project', start: '2026', context: 'self-directed',
  summary: 'What it does and why it matters.',
  stack: ['python', 'pytorch'], tags: ['ml'],
  links: [{ label: 'Repo', href: 'https://github.com/KaiwenYangUT/my-new-project', kind: 'repo' }],
},
```

Choose a unique lowercase, hyphenated ID. Newest dates appear first; the index count updates automatically. At three projects, the “still training” row disappears. Run `npm test`, preview `/projects`, then commit and push.

### Add a teaching appointment

Append to `src/content/teaching.ts`:

```ts
{
  id: 'sta314-w2028', term: { season: 'Winter', year: 2028 },
  courseCode: 'STA314H1', role: 'Teaching Assistant',
  institution: 'University of Toronto',
},
```

For a new course, first add it to `courses.ts`. Tests reject unknown course codes. Winter is January–April, Summer May–August, and Fall September–December. The homepage shows current appointments automatically. Counts use **appointments**, because two courses taught in Winter 2026 are not two distinct terms.

### Cross-listed employment and research

Add one entry to `work.ts` with `sections: ['work', 'research']` and a `research` facet. Both pages and their reciprocal links use the same ID. `related` IDs can link distinct entries; missing IDs fail validation. Set `draft: true` to hide an entry.

### Photo, social image, and palette

Replace `assets-src/portrait-original.jpg`, set pixel crop bounds and color stops in `assets-src/portrait.config.json`, then run:

```sh
npm run photo
npm run og
```

The source photo is kept outside `public`; generated AVIF/WebP/JPEG files are committed. The script crops to 4:5 and keeps the original colours; set `"duotone": true` in the config for the warm ink→paper treatment. `public/og.png` is a 1200×630 social image.

Edit CSS custom properties in `src/styles/tokens.css` to change the palette. Plum and Ochre alternatives are documented there. The Matcha dark theme follows the OS until the visitor chooses a preference; blocked local storage is supported.

## Deployment

The repository remote is `https://github.com/KaiwenYangUT/KaiwenYangUT.github.io.git`.

1. Push `main`, including `.github/workflows/deploy.yml`.
2. In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
3. Run the “Build and deploy portfolio” workflow if needed.
4. Check the deployment and hard-refresh `/teaching/` and the other routes. `/nope` must return 404.

Actions builds on pushes to `main`, manual dispatch, and the first of each month at 09:00 UTC. GitHub may redirect `/education` to `/education/`; canonical URLs include the trailing slash. The postbuild script creates `404.html`, sitemap, and robots output and checks for phone-like content and PDFs.

A custom domain goes in Settings → Pages. Update `site.ts` → `siteUrl`; canonical metadata, sitemap, robots output, and social URLs follow it. Configure the domain's DNS separately. No analytics are included.

## Sources and intentional differences from the plan

Résumé content was transcribed from the supplied September résumé. The résumé PDF and phone number are **not** in this repository or public output. Award amounts are omitted. GPA and course grades follow the approved plan. Public links, supervisors, and project context remain omitted where unconfirmed; `unspecified` avoids inventing “course” or “self-directed” status.

The five course titles were checked against the [University of Toronto Arts & Science Calendar](https://artsci.calendar.utoronto.ca/) on 2026-10-20. Descriptions are original, explicitly labeled summaries with per-course source links, rather than full copyrighted reproductions. `verified` records source verification; `descriptionKind` distinguishes summaries. All five sources were accessible.

The plan's “6 terms” is presented as “6 appointments” (there are five distinct terms). The Work index counts all five work entries, including the compact TA entry. Navigation collapses at 1024px to prevent crowding at tablet widths while retaining the required 360px controls.

## Verification still requiring the live deployment

LinkedIn Post Inspector and live GitHub Pages response/Actions checks require a successful push and Pages setup. Local checks do not establish that the public site is deployed.
