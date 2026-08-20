# Reference Board System

`src/services/referenceBoard.ts` is the Text2Image producer for `eclipse.reference-board.v1`.
It emits metadata and a local filename only: no image bytes, remote URL, API key, or hidden prompt.

Supported reference kinds are `shot`, `object`, `location`, `pose`, `character`, and `creature`.
Export fails closed while rights are unconfirmed. `pose` and `character` additionally require
explicit likeness consent. The next UI slice should call `buildReferenceBoard` beside the existing
Media Asset export and expose type, rights, and consent as visible fields.
