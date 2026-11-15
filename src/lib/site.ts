import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'writing'>;
export type Side = 'software' | 'hardware';

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix an internal path with the site's base path. */
export function url(path = '/'): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${p}`;
}

/** All published projects, in the order they should appear. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.sort(
    (a, b) => a.data.order - b.data.order || b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

export const onSide = (p: Project, side: Side) => p.data.side === side || p.data.side === 'both';

/** All published writing, newest first. */
export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('writing', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// A project's own diagram lives at src/content/projects/<slug>/diagram.svg
const diagramsRaw = import.meta.glob<string>('/src/content/projects/*/diagram.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});
const diagramsUrl = import.meta.glob<string>('/src/content/projects/*/diagram.svg', {
  query: '?url',
  import: 'default',
  eager: true,
});
export const diagramOf = (id: string) => diagramsRaw[`/src/content/projects/${id}/diagram.svg`];
export const diagramUrlOf = (id: string) => diagramsUrl[`/src/content/projects/${id}/diagram.svg`];

export const readMinutes = (body = '') =>
  Math.max(1, Math.round(body.trim().split(/\s+/).length / 230));

export const year = (d: Date) => d.getUTCFullYear();

export const monthYear = (d: Date) =>
  d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export const fullDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const pad = (n: number) => String(n).padStart(2, '0');

export const sideLabel = {
  software: 'Software',
  hardware: 'Hardware',
  both: 'Software + Hardware',
} as const;

export const sideShort = { software: 'SW', hardware: 'HW', both: 'SW + HW' } as const;

/** Class that hides an item on the side it does not belong to. */
export const sideClass = (side: Project['data']['side']) =>
  side === 'software' ? 'sw-only' : side === 'hardware' ? 'hw-only' : '';
