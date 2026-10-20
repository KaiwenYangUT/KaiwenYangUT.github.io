import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from 'react-router';
import { useEffect, useRef, type ReactNode } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import bodyFont from '@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2?url';
import './styles/fonts.css';import './styles/tokens.css';import './styles/base.css';import './styles/layout.css';import './styles/utilities.css';
const themeScript=`(()=>{let t;try{t=localStorage.getItem('theme')}catch{}document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'})()`;
export function links(){return [{rel:'icon',href:'/favicon.svg',type:'image/svg+xml'},{rel:'preload',href:bodyFont,as:'font',type:'font/woff2',crossOrigin:'anonymous' as const}]}
export function Layout({children}:{children:ReactNode}){return <html lang="en" suppressHydrationWarning><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><script dangerouslySetInnerHTML={{__html:themeScript}}/><Meta/><Links/></head><body id="top">{children}<ScrollRestoration/><Scripts/></body></html>}
export default function App(){const loc=useLocation(),previous=useRef(loc.pathname);useEffect(()=>{if(previous.current!==loc.pathname){previous.current=loc.pathname;requestAnimationFrame(()=>{if(loc.hash)document.getElementById(decodeURIComponent(loc.hash.slice(1)))?.scrollIntoView();else document.getElementById('main')?.focus({preventScroll:true})})}},[loc.pathname,loc.hash]);return <><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main" tabIndex={-1}><Outlet/></main><Footer/></>}
