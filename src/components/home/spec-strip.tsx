const specs = [
  { name: 'Valid', what: 'whether every validation rule passed' },
  { name: 'Confidence', what: 'decomposed into named signals' },
  { name: 'Provenance', what: 'the page and region each value came from' },
  { name: 'NeedsReview', what: 'whether a person should look first' },
];

export function SpecStrip() {
  return (
    <section className="border-t border-hairline bg-canvas-alt">
      <div className="mx-auto max-w-(--container-story) px-[22px] py-16 sm:py-20">
        <h2 className="text-title-3">Every result carries</h2>
        <dl className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {specs.map((spec) => (
            <div key={spec.name} className="border-t border-hairline pt-4">
              <dt className="font-mono text-caption text-accent">{spec.name}</dt>
              <dd className="mt-1 text-caption text-ink-secondary">{spec.what}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
