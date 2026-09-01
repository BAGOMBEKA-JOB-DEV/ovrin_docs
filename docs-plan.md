# Ovrin documentation plan

## Executive summary

Ovrin is a Go library for turning documents into typed structured data. Its real value is not “LLM on PDF”; it is a staged extraction pipeline that reads the text layer when available, falls back to OCR and rendering only when needed, validates schema output, checks whether every value actually appears in the source document, and exposes confidence and provenance in a way that can be reviewed or audited.

The upstream Ovrin project already contains the product truth in its README and its docs directory. The role of this documentation repo is to translate that into a polished MDX site structure inspired by the skyl_docs pattern: 

- Learn: narrative onboarding and conceptual understanding
- Reference: API surfaces, provider contracts, schema rules, and examples
- Architecture: how the library is organized, how the seams work, and where the system boundaries are
- Verification: how to validate docs against real code and examples

This should not be a copy of the upstream docs. It should be a curated product documentation experience for developers who want to adopt Ovrin and understand it quickly.

---

## What Ovrin really is

From the actual upstream source and docs, Ovrin’s core principles are:

1. Typed output
   - `Extract[Invoice]` returns a typed struct, not a loose map.
   - This makes downstream data pipelines safer and enables compile-time validation.

2. Pipeline-first extraction
   - Text layer first
   - OCR on demand
   - Vision as a distinct process
   - Normalization, schema shaping, validation, grounding, explainability, and scoring are all staged

3. Confidence and explainability are part of the contract
   - Confidence is decomposed across named signals, not a magic single number.
   - Every value has provenance: page, bounding box, source span, provider, and field-level reasoning.

4. Safety and untrusted input assumptions
   - Documents are treated as untrusted input.
   - The product explicitly checks for fabrication and suspicious extraction patterns.

5. Provider independence
   - The core defines seams: `Model`, `OCR`, and `Renderer`.
   - Adapters are separate modules, keeping the core dependency-free.

6. Zero-dependency core
   - The design intentionally keeps the root package free of heavy dependencies and cgo.

In practice, the product story is: “turn a document into a typed Go value with confidence, provenance, and reviewability.”

---

## Why this needs a strong documentation architecture

The upstream Ovrin design already demonstrates a solid content model. The risk is not the absence of documentation; it is that the documentation needs to be made accessible to different audiences:

- New users who only want “make my first extraction work”
- Engineers integrating Ovrin into real systems
- Contributors understanding the design constraints and rules
- Reviewers and auditors who need explainability and validation details
- Adapter authors writing model/OCR/render providers

A good MDX site should support all of these without overwhelming the reader.

---

## Recommended MDX structure

Use the skyl_docs pattern: two main tracks, then a few supporting pages.

### 1) Learn track

This should be narrative and onboarding-first.

Suggested pages:

- Overview: What Ovrin is and why it exists
- Why typed extraction matters
- Installing and setting up Ovrin
- Your first extraction
- Understanding the extraction pipeline
- Defining schemas with Go structs
- Validation and required fields
- Confidence, explainability, and review
- Handling PDFs, scans, and images
- Providers and adapters
- Threat model and untrusted input
- Evaluation and measuring accuracy
- Roadmap and project maturity

### 2) Reference track

This should be API-first and generated or structured around public symbols.

Suggested sections:

- `Extract[T]`
- `Client`
- `New` and `Option`
- `Result[T]`
- `FieldResult`
- `Metadata`
- `ReviewReason`
- `Document`, `Source`, `Page`
- `Model`, `OCR`, `Renderer` interfaces
- Schema tags and validation rules
- Confidence signal model
- Provider adapter contract

### 3) Community / engineering docs

This is where the design history and contributing guidance live.

Suggested pages:

- Contributing guide
- Rules and coding standards
- Architecture decision records index
- Feature matrix by provider
- Data handling and third-party leaks
- Security and threat model
- Evaluation corpus and benchmarking
- Release and versioning policy

---

## Documentation information architecture

### Recommended top-level site nav

- Home
- Learn
  - Overview
  - Getting started
  - First extraction
  - Pipeline
  - Schemas
  - Validation
  - Confidence
  - Explainability
  - Providers
  - Threat model
  - Evaluation
- Reference
  - Core API
  - Provider interfaces
  - Result types
  - Schema rules
  - Provider matrix
- Architecture
  - Module layout
  - Dependency boundaries
  - ADR overview
- Community
  - Contributing
  - Rules
  - Roadmap
  - Security

This structure cleanly matches the upstream Ovrin docs and the skyl_docs style: onboarding first, reference second, engineering depth last.

---

## Page-by-page content plan

### Learn pages

#### 1. Overview
Purpose: explain the problem Ovrin solves and why it is different from “just send a PDF to a model.”

Must cover:
- unstructured documents vs typed structured data
- why raw model output is not enough
- why provenance, validation, and confidence matter
- who the product is for

#### 2. Getting started
Purpose: enable the user to install and run the library in under 10 minutes.

Must cover:
- Go requirements
- install commands
- minimal example with a sample struct
- how to add a provider module
- minimal provider configuration

#### 3. First extraction
Purpose: show a complete, end-to-end flow.

Must cover:
- define schema
- create `Client`
- pass file / source
- inspect `Result`
- handle `Valid`, `NeedsReview`, and `err`

#### 4. Pipeline
Purpose: explain the lifecycle from file input to structured output.

Must cover:
- format detection
- text-layer reading
- OCR fallback
- rendering and image handling
- normalization
- schema enforcement
- validation
- cross-field checks
- grounding / provenance
- confidence scoring

#### 5. Schemas
Purpose: teach the struct-tag grammar and the rule vocabulary.

Must cover:
- tag syntax
- required / enum / min / max / format constraints
- partial results and absent values
- how Go struct types map to extraction contracts

#### 6. Validation and rules
Purpose: explain what makes an extraction trustworthy.

Must cover:
- `Valid` vs `err`
- fields marked absent rather than zero values
- why a result can be syntactically parsable but still unacceptable

#### 7. Confidence and explainability
Purpose: explain that confidence is not a probability claim by default.

Must cover:
- multi-signal scoring model
- grounding, OCR agreement, schema fit, format parsing, cross-field agreement
- why it should be treated as a ranking signal
- how to explain or review a value

#### 8. Providers and adapters
Purpose: show how Ovrin integrates with OpenAI, Anthropic, Gemini, OCR engines, and custom adapters.

Must cover:
- provider seam design
- core vs adapter boundaries
- how to add a model adapter
- how OCR and rendering are separate concerns

#### 9. Threat model and untrusted input
Purpose: show security posture.

Must cover:
- prompt injection resistance
- finite limits
- source validation
- document content as untrusted input
- red flags and review semantics

#### 10. Evaluation and accuracy
Purpose: tell readers how measurements are made and what is not yet claimed.

Must cover:
- synthetic corpus vs real-world corpus
- evaluation harness
- what “confidence” and “accuracy” mean
- the fact that v1 claims are intentionally deferred

### Reference pages

Suggested symbol pages:

- Extracting data from a document
- Client configuration
- Options and call-level configuration
- Result and field-level data structures
- Provenance / source references
- Model, OCR, Renderer interfaces
- Validation rules and tag grammar
- Feature matrix by provider

These should be written as reference pages with clear signatures, examples, and caveats.

---

## Template approach for MDX content

To match skyl_docs and keep the docs maintainable, use strict templates.

### Learn template

Each learn page should include:

- Intro
- You will learn
- Narrative content
- Example snippet
- Recap
- Challenges / pitfalls

### Reference template

Each reference page should include:

- Intro
- Signature block
- Parameters
- Returns
- Caveats / limitations
- Usage example
- Troubleshooting and review notes

### Component vocabulary

Use a controlled set of MDX components, similar to the skyl_docs approach:

- Intro
- YouWillLearn
- Recap
- Challenge
- Hint
- Solution
- Signature
- Parameters
- Returns
- Recipe
- Trouble
- Diagram
- Table / DataView components

This keeps the documentation consistent, even when different sections have different audiences.

---

## Missing areas we should emphasize

The upstream Ovrin docs make a few concepts especially important. These deserve prominent treatment in the MDX site:

1. The difference between an error and a failed validation
   - `err != nil` means no usable result
   - `Valid == false` means a result was produced but failed internal rules

2. Absent values vs zero values
   - A missing field must remain absent, not silently become zero

3. Grounding and provenance
   - Users need to know where values came from and whether they are grounded in the document

4. Confidence as a ranking signal
   - Not all docs should treat confidence as a probability

5. Provider independence
   - The product is not tied to a specific LLM or OCR vendor

6. Security posture
   - The pipeline is built around untrusted document content, not trust-by-default assumptions

7. The project maturity statement
   - Ovrin is implemented and design-heavy, but still pre-v1

These are the core product differentiators, and they should be visible early.

---

## Recommended page order for first implementation

If we are building the docs in phases, this should be the first priority order:

### Phase 1 — foundation
- Overview
- Getting started
- First extraction
- Pipeline
- Schemas

### Phase 2 — trust and review
- Validation
- Confidence
- Explainability
- Threat model

### Phase 3 — integration and engineering
- Providers
- Architecture
- Feature matrix
- Contributing
- Roadmap

### Phase 4 — polish and reference
- Full API reference
- ADR index
- release and versioning notes
- deep examples from receipts and document extraction

---

## Content writing rules

To keep the MDX docs high-quality and maintainable:

- Prefer examples that compile or map directly to proven code patterns
- Keep each page narrowly scoped and audience-specific
- Avoid duplicating the upstream project docs verbatim
- Use real product language: schema, validation, provenance, confidence, review, provider seam
- Use diagrams only when they clarify architecture and boundaries
- Keep tutorial pages read-in-order and reference pages lookup-oriented
- Add verification markers on code examples when they should be compiled and checked

---

## What to avoid

- Long prose that repeats the README without translation
- Designing the docs around marketing language instead of product accuracy
- Treating confidence as a probability without explaining the caveat
- Publishing provider behavior claims without checking the feature matrix
- Building a reference section that is not aligned to the public API surface

---

## Suggested output for this repo

The `ovrin_docs` repo should produce a Next.js MDX documentation site organized like this:

```text
src/
├── app/
├── components/
├── content/
│   ├── learn/
│   ├── reference/
│   ├── architecture/
│   └── community/
├── data/
├── sidebars/
├── lib/
└── config/
```

This mirrors the skyl_docs pattern while staying grounded in the actual Ovrin architecture.

---

## Final recommendation

The best documentation strategy is to treat Ovrin as a “serious data-extraction system,” not a generic AI wrapper. The MDX experience should lead readers through five core questions:

1. What exactly is Ovrin and why does it exist?
2. How do I define a schema and extract data from a document?
3. How does the pipeline decide what is trustworthy?
4. How do confidence, provenance, and review work?
5. How do I integrate providers and contribute safely?

If we build the docs around these five questions, the site will be clear, useful, and faithful to the upstream codebase.
