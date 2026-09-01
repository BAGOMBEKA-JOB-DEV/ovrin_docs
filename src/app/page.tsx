import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
      <div className="mb-8 inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
        Ovrin documentation
      </div>

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Turn documents into typed Go data.
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
        Ovrin reads PDFs, scans, images, and structured office files, then returns a typed Go struct with validation, provenance, and review signals.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/learn" className="rounded-md bg-slate-900 px-5 py-3 font-medium text-white dark:bg-slate-100 dark:text-slate-900">
          Explore Learn
        </Link>
        <Link href="/reference/extract" className="rounded-md border border-slate-300 px-5 py-3 font-medium text-slate-900 dark:border-slate-700 dark:text-slate-100">
          View API reference
        </Link>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
          <h2 className="text-lg font-semibold">Typed output</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Go structs instead of loose maps.</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
          <h2 className="text-lg font-semibold">Pipeline-first</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Text layer first, OCR only when needed.</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
          <h2 className="text-lg font-semibold">Explainable</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Confidence, provenance, and review pathways are built in.</p>
        </div>
      </div>
    </main>
  );
}
