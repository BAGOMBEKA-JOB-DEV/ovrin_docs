import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-(--container-story) px-[22px] pt-20 pb-24 text-center sm:pt-28 sm:pb-32">
        <h1 className="text-title-1 text-balance lg:text-title-1-lg">
          Turn documents into trusted structured data.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lede text-ink-secondary text-balance">
          Ovrin is a Go library that turns invoices, receipts, forms and contracts into typed,
          validated values — with the evidence for every one of them.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Button href="/learn" size="lg">
            Read the guide
          </Button>
          <Button href="/reference/extract" variant="secondary" size="lg">
            API reference
          </Button>
        </div>
      </div>
    </section>
  );
}
