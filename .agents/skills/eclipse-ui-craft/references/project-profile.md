# Text2Image — product / minimal studio

The main task is prompt and settings → generation → reviewing an image. Keep prompt,
style, aspect ratio, provider selection and history understandable without hover.
Do not substitute an animated placeholder for an actual generated result.

## Product sources

- [Repository guide](../../../../docs/repository-guide.md)
- [Styles](../../../../src/styles.css), [Tailwind tokens](../../../../tailwind.config.ts)
- [Generator](../../../../src/pages/Generator.tsx)
- [Style picker](../../../../src/components/StylePicker.tsx)
- [Existing Eclipse icons](../../../../src/components/icons/EclipseIcons.tsx)
- [Package manifest](../../../../package.json)

Preserve dark surface/accent tokens, controlled blue signals, Inter/Outfit/JetBrains Mono
and the existing Lucide/Eclipse icon family. Keep the image canvas central; do not spread
glass, bounce or new typography across the studio. Text entry and parameter changes do not
wait for motion. Pending/error/result states reflect the real provider result.
No Motion dependency is declared; retain CSS for simple selection feedback.

## One next pilot — proposed, not implemented

[AspectRatioPicker](../../../../src/components/AspectRatioPicker.tsx): retain the five
ratios and click behavior, add/review explicit accessible selected state and visible
keyboard focus, and check wrapping at narrow widths. The inspected buttons express selection
visually but do not currently expose aria-pressed in this component.

Acceptance: keyboard and pointer can select exactly one ratio; assistive technology can
identify the current choice; the 320/390 px layout has no lost controls or horizontal
overflow; reduced motion retains selection feedback. No generation/API call on pointerdown.
This is a proposed small UI change, not implemented or runtime-verified here.

## Checks and boundaries

Docs-only checks: frontmatter, links, provenance, conflict and diff review.
Future UI checks use fixtures without API keys, uploads or paid generation. Provider/API
logic, backend-only tasks and product prompt templates are not controlled by this skill.
Use package scripts for actual application changes; no dependency installation in this PR.
