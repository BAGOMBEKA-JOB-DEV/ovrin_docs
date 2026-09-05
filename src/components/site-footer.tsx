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
        <p className="mt-2">
          Ovrin is pre-v1 and no release is tagged yet.{' '}
          <a href={siteConfig.repo} target="_blank" rel="noreferrer" className="text-accent hover:underline">
            Source on GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
