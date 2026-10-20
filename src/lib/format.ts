import type { BaseEntry } from '../content/types';
export const dateRange = (e:BaseEntry) => `${e.start}${e.end ? ` → ${e.end==='present'?'now':e.end}`:''}`;
