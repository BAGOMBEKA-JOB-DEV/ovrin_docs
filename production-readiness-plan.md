# Production Readiness Plan

## Goal

Turn the Ovrin docs project into a launch-ready, production-quality documentation site that is stable, polished, and prepared for deployment.

## Phase 1 — Core production hardening

### Status: in progress

- [x] Remove localhost-only defaults from config and metadata
- [x] Add environment-based site URL configuration
- [x] Add favicon asset
- [x] Add robots and sitemap routes
- [x] Add environment example file

### Remaining tasks

- [ ] Confirm site metadata is consistent across the full app shell
- [ ] Validate deployment assumptions for static export and host platform

## Phase 2 — Content quality and accuracy

### Status: pending

- [ ] Review all docs content against the real Ovrin backend repository
- [ ] Verify code examples are accurate and copy-pasteable
- [ ] Ensure terminology matches the upstream project exactly
- [ ] Remove weak or generic phrasing from onboarding pages
- [ ] Tighten the reference pages to match actual API contracts

## Phase 3 — UI polish and launch quality

### Status: pending

- [ ] Final polish on landing-page hierarchy and spacing
- [ ] Final pass on docs page typography and rhythm
- [ ] Final pass on code-block styling and syntax consistency
- [ ] Mobile UX validation across breakpoints
- [ ] Accessibility review for contrast, focus states, and navigation

## Phase 4 — Deployment and operational readiness

### Status: pending

- [ ] Choose deployment target (Vercel, Netlify, custom static host)
- [ ] Configure production build settings for the target host
- [ ] Add domain and custom URL configuration
- [ ] Confirm static export behavior matches hosting constraints
- [ ] Add any required CDN or headers configuration

## Phase 5 — Final verification and sign-off

### Status: pending

- [ ] Run final full test suite
- [ ] Run lint, typecheck, and build together
- [ ] Review final README and onboarding commands
- [ ] Check open graph / social preview metadata
- [ ] Launch checklist approval

## Execution order

1. Finish production hardening
2. Complete content accuracy sweep
3. Final UI polish pass
4. Deployment setup and environment validation
5. Final verification and release sign-off
