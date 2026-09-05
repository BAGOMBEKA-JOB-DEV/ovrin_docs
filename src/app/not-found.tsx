import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';

const tracks = [
  { href: '/learn', label: 'Learn', what: 'Guides, from a first extraction to the threat model.' },
  { href: '/reference', label: 'Reference', what: 'The public API — types, seams, options and errors.' },
  { href: '/community', label: 'Community', what: 'How the project is built, governed and released.' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />

      <main className="mx-auto max-w-(--container-story) px-[22px] py-24 sm:py-32">
        <p className="text-micro font-semibold text-ink-secondary uppercase">Error 404</p>
        <h1 className="mt-3 text-title-1 text-balance">This page does not exist.</h1>
        <p className="mt-5 max-w-xl text-lede text-ink-secondary">
          The link may be out of date, or the page may have moved. Everything the documentation
          covers is one of these three.
        </p>

        {/* Next's stock 404 is a dead end. Give the reader somewhere to go. */}
        <ul className="mt-12 border-t border-hairline">
          {tracks.map((track) => (
            <li key={track.href} className="border-b border-hairline">
              <Link href={track.href} className="group flex flex-col gap-1 py-5">
                <span className="text-title-4 text-accent group-hover:underline">
                  {track.label} &rsaquo;
                </span>
                <span className="text-caption text-ink-secondary">{track.what}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
