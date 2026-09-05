export function CodePlate({ html, label }: { html: string; label: string }) {
  return (
    <figure className="code-plate">
      {/* Scrollable regions must be reachable by keyboard, and the label says
          what is being scrolled. */}
      <div
        tabIndex={0}
        role="group"
        aria-label={`${label} — code sample`}
        className="rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
