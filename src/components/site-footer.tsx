import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-canvas-alt">
      <div className="mx-auto max-w-(--container-story) px-[22px] py-8 text-micro text-ink-secondary">
        <p>
          Developed and maintained by{' '}
          <a
            href="https://github.com/BAGOMBEKA-JOB-DEV"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            Bagombeka Job
          </a>
          .
        </p>
        {/* The version is never shown without the link to what it does not
            promise: v1.0.0 is an API guarantee, not an accuracy one. */}
        <p className="mt-2">
          Ovrin v1.0.0 — the API is stable.{' '}
          <Link href="/community/release-status" className="text-accent hover:underline">
            What that does and does not promise
          </Link>
          .{' '}
          <a href={siteConfig.repo} target="_blank" rel="noreferrer" className="text-accent hover:underline">
            Source on GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
