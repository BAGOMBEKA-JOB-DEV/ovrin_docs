export function CodePlate({ html, label }: { html: string; label: string }) {
  return (
    // The <code> inside scrolls and takes keyboard focus itself, and the copy
    // button sits in its corner, so this wrapper needs no tab stop of its own.
    <figure className="code-plate" aria-label={`${label} — code sample`}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
