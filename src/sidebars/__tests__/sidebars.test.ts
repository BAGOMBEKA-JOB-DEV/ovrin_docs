import { describe, expect, it } from 'vitest';
import { flattenSidebar, tracks, trackForPath, type TrackId } from '@/sidebars';
import { listAllContentRoutes, resolveContentFile } from '@/lib/content';

const trackIds = Object.keys(tracks) as TrackId[];

describe('sidebar integrity', () => {
  // Two sidebar entries once pointed at content that did not exist. Because
  // generateStaticParams filters unresolvable paths out, the build stayed
  // green while the links 404'd. This is the guard for that.
  it('every sidebar link resolves to a content file', () => {
    const broken = trackIds.flatMap((id) =>
      flattenSidebar(tracks[id].sidebar)
        .map((item) => item.path)
        .filter((path) => !resolveContentFile(path))
        .map((path) => `${id}: ${path}`),
    );

    expect(broken).toEqual([]);
  });

  it('every track root has a landing page', () => {
    for (const id of trackIds) {
      expect(resolveContentFile(tracks[id].root), `${id} root`).toBeTruthy();
    }
  });

  it('every content page is reachable from a sidebar', () => {
    const linked = new Set(
      trackIds.flatMap((id) => flattenSidebar(tracks[id].sidebar).map((item) => item.path)),
    );

    expect(listAllContentRoutes().filter((route) => !linked.has(route))).toEqual([]);
  });

  it('no path is listed twice within a track', () => {
    for (const id of trackIds) {
      const paths = flattenSidebar(tracks[id].sidebar).map((item) => item.path);
      expect(new Set(paths).size, `${id} has duplicates`).toBe(paths.length);
    }
  });

  it('maps a path to its track, and rejects unknown ones', () => {
    expect(trackForPath('/learn')).toBe('learn');
    expect(trackForPath('/reference/extract')).toBe('reference');
    expect(trackForPath('/community')).toBe('community');
    expect(trackForPath('/learning')).toBeUndefined();
    expect(trackForPath('/')).toBeUndefined();
  });
});
