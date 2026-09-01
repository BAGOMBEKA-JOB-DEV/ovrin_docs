import Link from 'next/link';

const features = [
  {
    title: 'Typed output',
    text: 'One Go struct. One reliable contract. No loose map leaks into your data pipeline.',
  },
  {
    title: 'Pipeline-first',
    text: 'Text layer first, OCR on demand, validation and grounding built in from the start.',
  },
  {
    title: 'Explainable',
    text: 'Every value can point back to page, source, and signal so review is never a guess.',
  },
];

export default function HomePage() {
  return (
    <main className="hero-page">
      <div className="hero-wrap">
        <header className="hero-topbar">
          <div className="brand-wrap">
            <div className="brand-mark">O</div>
            <div>
              <div className="brand-name">ovrin</div>
              <div className="brand-tag">docs</div>
            </div>
          </div>

          <nav className="hero-nav" aria-label="Main navigation">
            <Link href="/learn">Learn</Link>
            <Link href="/reference/extract">Reference</Link>
            <Link href="/community/contributing">Community</Link>
          </nav>
        </header>

        <section className="hero-panel">
          <div className="hero-copy">
            <span className="eyebrow">Document extraction for Go teams</span>
            <h1>Turn documents into trusted structured data.</h1>
            <p>
              Ovrin reads PDFs, scans, images, and office files, then returns typed Go values with validation,
              provenance, and reviewability built in.
            </p>

            <div className="hero-actions">
              <Link href="/learn" className="primary-button">Read the guide</Link>
              <Link href="/reference/extract" className="secondary-button">API reference</Link>
            </div>
          </div>

          <div className="hero-card">
            <div className="mini-label">Extraction</div>
            <div className="stat-row">
              <span className="stat-label">Valid</span>
              <span className="stat-value">99.2%</span>
            </div>
            <div className="bar-line"><span /></div>
            <div className="stat-row">
              <span className="stat-label">Grounded</span>
              <span className="stat-value">18/20</span>
            </div>
            <div className="code-block">
              <span className="code-keyword">type</span> Invoice <span className="code-keyword">struct</span> {'{'}
              <br />
              &nbsp;&nbsp;Total <span className="code-keyword">float64</span> {'`ovrin:"total amount including tax,required,min=0"`'}
              <br />
              {'}'}
            </div>
          </div>
        </section>

        <section className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-flag" />
              <h2>{feature.title}</h2>
              <p>{feature.text}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
