import assert from "node:assert/strict";
import test from "node:test";
import { buildMediaAssetSidecar, MEDIA_ASSET_SCHEMA } from "../src/services/mediaAssetContract.ts";

test("builds a metadata-only Media Asset v1 sidecar", () => {
  const sidecar = buildMediaAssetSidecar({
    id: "../unsafe id",
    prompt: "A moonlit forge",
    enhancedPrompt: "Detailed moonlit forge",
    style: "digital-art",
    aspectRatio: "16:9",
    provider: "ollama",
    model: "local-model",
    imageUrl: "data:image/webp;base64,AAAA",
    timestamp: Date.UTC(2026, 7, 13),
    liked: false,
  });

  assert.equal(sidecar.schemaVersion, MEDIA_ASSET_SCHEMA);
  assert.equal(sidecar.asset.fileName, "text2image-unsafeid.webp");
  assert.equal(sidecar.asset.mimeType, "image/webp");
  assert.equal(sidecar.asset.rightsStatus, "unconfirmed");
  assert.equal(sidecar.asset.approvalRequired, true);
  assert.equal(JSON.stringify(sidecar).includes("base64"), false);
  assert.equal("imageUrl" in sidecar.asset, false);
});
