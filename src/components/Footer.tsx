import { site } from '../content/site';
import { BUILD_YEAR,dayOfYear } from '../lib/time';
import { ExternalLink } from './ExternalLink';
import s from './Footer.module.css';
export function Footer(){return <footer className={`container ${s.footer}`}><div className={s.top}><p className="section-label">Let’s put the data to work.</p><a className={s.email} href={`mailto:${site.email}`}>{site.email} <span aria-hidden="true">↗</span></a><div className={s.links}><ExternalLink href={site.linkedin}>LinkedIn ↗</ExternalLink><ExternalLink href={site.github}>GitHub ↗</ExternalLink></div></div><div className={s.bottom}><p>Set in Schibsted Grotesk & IBM Plex Mono. Built with React, deployed by GitHub Actions, fuelled by strawberry matcha lattes (n ≈ ∞).<br/><span className="mono">on_rotation: {site.onRotation[(dayOfYear-1)%site.onRotation.length]}</span></p><div><span>© {BUILD_YEAR} Kaiwen Yang</span><a href="#top">Back to top ↑</a></div></div></footer>}
