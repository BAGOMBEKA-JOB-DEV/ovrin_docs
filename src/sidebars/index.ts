import { sidebarLearn } from './learn';
import { sidebarReference } from './reference';
import { sidebarCommunity } from './community';
import type { Sidebar } from './types';

export { sidebarLearn, sidebarReference, sidebarCommunity };
export * from './types';

export type TrackId = 'learn' | 'reference' | 'community';

export const tracks: Record<TrackId, { label: string; sidebar: Sidebar; root: string }> = {
  learn: { label: 'Learn', sidebar: sidebarLearn, root: '/learn' },
  reference: { label: 'Reference', sidebar: sidebarReference, root: '/reference' },
  community: { label: 'Community', sidebar: sidebarCommunity, root: '/community' },
};

export function trackForPath(path: string): TrackId | undefined {
  return (Object.keys(tracks) as TrackId[]).find(
    (id) => path === tracks[id].root || path.startsWith(`${tracks[id].root}/`),
  );
}
