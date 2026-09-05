import type { Moment as MomentData } from '@/content/home/moments';
import { CodePlate } from '@/components/home/code-plate';

export function Moment({
  moment,
  codeHtml,
  index,
  children,
}: {
  moment: MomentData;
  codeHtml: string;
  index: number;
  children?: React.ReactNode;
}) {
  // Alternating canvas tints separate sections, the way apple.com does it —
  // rather than borders and drop shadows. The hero above is untinted, so the
  // first moment is tinted and the run alternates from there into the tinted
  // spec strip below.
  const tinted = index % 2 === 0;
  const codeFirst = index % 2 === 1;

  return (
    <section className={tinted ? 'band-tinted bg-canvas-alt' : 'bg-canvas'}>
      <div className="mx-auto max-w-(--container-story) px-[22px] py-20 sm:py-28">
        <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-2">
          <div className={codeFirst ? 'lg:order-2' : undefined}>
            <p className="text-micro font-semibold text-ink-secondary uppercase">
              {moment.eyebrow}
            </p>
            <h2 className="mt-3 text-title-1 whitespace-pre-line">{moment.headline}</h2>
            <p className="mt-5 max-w-xl text-lede text-ink-secondary">{moment.body}</p>
            {children}
          </div>

          <div className={`min-w-0 ${codeFirst ? 'lg:order-1' : ''}`}>
            <CodePlate html={codeHtml} label={moment.eyebrow} />
          </div>
        </div>
      </div>
    </section>
  );
}
