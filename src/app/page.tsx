import { SiteHeader } from '@/components/site-header';
import { Hero } from '@/components/home/hero';
import { Moment } from '@/components/home/moment';
import { SpecStrip } from '@/components/home/spec-strip';
import { StageRail } from '@/components/home/stage-rail';
import { Reveal } from '@/components/reveal';
import { HOME_MOMENTS } from '@/content/home/moments';
import { highlightCode } from '@/lib/content';

export default async function HomePage() {
  // Highlighting happens here, at build time, with the same Shiki call the
  // documentation uses — so Go looks identical everywhere on the site and no
  // highlighter ships to the browser.
  const moments = await Promise.all(
    HOME_MOMENTS.map(async (moment) => ({
      moment,
      codeHtml: await highlightCode(moment.code, moment.lang),
    })),
  );

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />

      <main>
        {/* The hero is above the fold, so it is not revealed on scroll — the
            observer would fire immediately and read as a pop. */}
        <Hero />

        {moments.map(({ moment, codeHtml }, index) => (
          <Reveal key={moment.id}>
            <Moment moment={moment} codeHtml={codeHtml} index={index}>
              {moment.id === 'pipeline' ? <StageRail /> : null}
            </Moment>
          </Reveal>
        ))}

        <Reveal>
          <SpecStrip />
        </Reveal>
      </main>
    </div>
  );
}
