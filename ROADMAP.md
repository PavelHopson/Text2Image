# Text2Image roadmap

## Current release slice

- [x] Export a metadata-only `eclipse.media-asset.v1` sidecar.
- [x] Export `eclipse.reference-board.v1` for shot, object, location, pose, character and creature references.
- [x] Fail closed on unconfirmed rights and require explicit likeness consent for pose/character references.

## Next

- [ ] Add multi-asset boards with deterministic ordering and duplicate detection.
- [ ] Move provider credentials behind a BFF before production use.

## Changelog

- 2026-08-20: added the local-only Reference Board handoff to Shotforge with visible rights, consent,
  provenance and disabled/error/success states. No binary image, remote URL or provider secret is exported.
