import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';

const features = [
  {
    title: 'Typed output',
    text: 'One Go struct. One reliable contract. No loose map leaks into your data pipeline.',
  },
  {
    title: 'Pipeline-first',
    text: 'Text extraction first, OCR on demand, validation and grounding built in from the start.',
  },
  {
    title: 'Explainable',
    text: 'Every value can point back to a page, region, and confidence signal so review is never a guess.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#efefeb] text-slate-900 transition-colors duration-200 dark:bg-[#0b1220] dark:text-slate-100">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-[#f9f8f6] shadow-[0_24px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/80">
          <div className="grid gap-10 px-5 pb-8 pt-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:pb-10 lg:pt-12">
            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">
                  Document extraction for Go teams
                </span>

                <h1 className="mt-7 max-w-[620px] text-5xl font-black leading-[0.88] tracking-[-0.09em] text-slate-950 dark:text-white sm:text-6xl lg:text-[7rem]">
                  Turn documents into trusted structured data.
                </h1>
              </div>

              <div className="mt-8 max-w-xl">
                <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                  Ovrin reads PDFs, scans, images, and office files, then returns typed Go values with validation,
                  provenance, and reviewability built in.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/learn">Read the guide</Button>
                  <Button href="/reference/extract" variant="secondary">API reference</Button>
                </div>
              </div>
            </div>

            <aside className="rounded-[26px] border border-slate-200 bg-slate-50/80 p-5 shadow-inner shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-950/80 dark:shadow-none">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Extraction
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                  <span>Valid</span>
                  <span className="font-semibold text-slate-900 dark:text-white">99.2%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                </div>

                <div className="flex items-center justify-between pt-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>Grounded</span>
                  <span className="font-semibold text-slate-900 dark:text-white">18/20</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-indigo-500 to-sky-400" />
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-950 p-4 font-mono text-sm leading-7 text-slate-100 shadow-lg shadow-slate-900/10 dark:border-slate-700">
                <span className="text-sky-300">type</span> Invoice <span className="text-sky-300">struct</span> {'{'}
                <br />
                <span className="ml-4 text-slate-200">Total</span> <span className="text-sky-300">float64</span>{' '}
                <span className="text-amber-300">{`ovrin:&quot;total amount including tax,required,min=0&quot;`}</span>
                <br />
                {'}'}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-[24px] border border-slate-200 bg-white/80 p-6 shadow-[0_16px_30px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900/80">
              <div className="mb-5 h-1.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
              <h2 className="text-xl font-semibold tracking-[-0.04em] text-slate-900 dark:text-white">{feature.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.text}</p>
            </article>
          ))}
        </section>
      </div>

      <footer className="border-t border-slate-200 bg-[#f3f1ee]/80 py-6 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-[#0d1625]/80 dark:text-slate-300">
        <p>
          Developed and maintained by{' '}
          <a
            href="https://github.com/BAGOMBEKA-JOB-DEV"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-slate-900 underline-offset-4 hover:underline dark:text-white"
          >
            Bagombeka Job
          </a>
        </p>
      </footer>
    </main>
  );
}
