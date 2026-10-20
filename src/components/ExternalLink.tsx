import type { AnchorHTMLAttributes } from 'react';
export function ExternalLink({children,...props}:AnchorHTMLAttributes<HTMLAnchorElement>){return <a {...props} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens in new tab)</span></a>}
