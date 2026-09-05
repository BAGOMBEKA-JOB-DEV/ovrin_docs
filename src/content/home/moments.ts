/**
 * The homepage story.
 *
 * Every sample here is assembled only from API the documentation actually
 * describes, and every one configures a model — `ovrin.New()` with no provider
 * surfaces as ErrNoProvider at extraction time, so a sample without one does
 * not run.
 */
export interface Moment {
  id: string;
  eyebrow: string;
  headline: string;
  body: string;
  code: string;
  lang: string;
}

/** The nine pipeline stages, in the order a document passes through them. */
export const PIPELINE_STAGES = [
  'Detect',
  'Acquire',
  'Normalise',
  'Schema',
  'Prompt',
  'Generate',
  'Validate',
  'Ground',
  'Score',
] as const;

/** The named signals confidence is composed from. */
export const CONFIDENCE_SIGNALS = [
  'grounding',
  'agreement',
  'ocr',
  'schema',
  'format',
  'cross_field',
] as const;

export const HOME_MOMENTS: Moment[] = [
  {
    id: 'typed',
    eyebrow: 'Typed output',
    headline: 'A struct in.\nA struct out.',
    body:
      'You declare the shape you want and get that shape back — not a map to ' +
      'assert your way through. The description in each tag is what the model ' +
      'reads; the rules after it are what gets checked.',
    lang: 'go',
    code: `type Invoice struct {
    Number   string  \`ovrin:"invoice number,required"\`
    Vendor   string  \`ovrin:"vendor company name"\`
    Currency string  \`ovrin:"currency code,required,enum=UGX|USD"\`
    Total    float64 \`ovrin:"total amount,required,min=0"\`
}

client := ovrin.New(ovrin.WithModel(model))

res, err := ovrin.Extract[Invoice](ctx, client, ovrin.File("in.pdf"))
if err != nil {
    return err
}

fmt.Println(res.Data.Vendor, res.Data.Total)`,
  },
  {
    id: 'pipeline',
    eyebrow: 'Staged extraction',
    headline: 'Not a prompt\nwith extra steps.',
    body:
      'When a PDF carries its own text, reading it is exact and nearly free. ' +
      'Rendering those characters to pixels for a model to read back is a lossy ' +
      'round trip. OCR runs when there is no text layer — not before.',
    lang: 'go',
    code: `client := ovrin.New(
    ovrin.WithModel(model),       // structured output
    ovrin.WithOCR(ocr),           // when there is no text layer
    ovrin.WithRenderer(renderer), // when OCR needs pixels
)

res, err := ovrin.Extract[Invoice](ctx, client, ovrin.File("scan.pdf"))
if err != nil {
    return err
}

fmt.Println(res.Valid, res.Confidence)`,
  },
  {
    id: 'confidence',
    eyebrow: 'Explainability',
    headline: 'Not 0.98.\nThe reasons for it.',
    body:
      'Confidence is composed from named signals that fail in uncorrelated ways, ' +
      'and every one is recorded on the field. It is a ranking signal rather than ' +
      'a probability — the documentation says so too, and will until it is calibrated.',
    lang: 'go',
    code: `res, err := ovrin.Extract[Invoice](ctx, client, src)
if err != nil {
    return err
}

if !res.Valid || res.NeedsReview {
    for _, reason := range res.Reasons {
        fmt.Printf("review %s: %s\\n", reason.Field, reason.Why)
    }
    return nil
}`,
  },
  {
    id: 'absent',
    eyebrow: 'Provenance',
    headline: 'Every value knows\nwhether it was found.',
    body:
      'A field that could not be read stays absent rather than quietly becoming ' +
      'zero. In a payments system, “the total is zero” and “we could not read the ' +
      'total” are different facts, and nothing is ever guessed to fill a struct.',
    lang: 'go',
    code: `total := res.Fields["total"]

if !total.Found {
    // Not the same fact as "the total is zero".
    return queueForReview(res)
}

fmt.Println(total.Value, total.Confidence)`,
  },
];
