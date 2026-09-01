import { sidebarLearn } from './learn';
import { sidebarReference } from './reference';
import { sidebarCommunity } from './community';
import { flattenSidebar, type Sidebar } from './types';

export { sidebarLearn, sidebarReference, sidebarCommunity };
export * from './types';

export type TrackId = 'learn' | 'reference' | 'community';

export const tracks: Record<TrackId, { label: string; sidebar: Sidebar; root: string }> = {
  learn: { label: 'Learn', sidebar: sidebarLearn, root: '/learn' },
  reference: { label: 'Reference', sidebar: sidebarReference, root: '/reference' },
  community: { label: 'Community', sidebar: sidebarCommunity, root: '/community' },
};

export function trackForPath(path: string): TrackId | undefined {
  if (path === '/learn' || path.startsWith('/learn/')) return 'learn';
  if (path === '/reference' || path.startsWith('/reference/')) return 'reference';
  if (path === '/community' || path.startsWith('/community/')) return 'community';
  return undefined;
}

export function allRoutes(): string[] {
  return Object.values(tracks).flatMap((track) =>
    flattenSidebar(track.sidebar).map((item) => item.path),
  );
}
