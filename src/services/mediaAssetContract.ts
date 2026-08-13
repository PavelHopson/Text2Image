import type { GeneratedImage } from "../types";

export const MEDIA_ASSET_SCHEMA = "eclipse.media-asset.v1" as const;

export type MediaAssetSidecar = {
  schemaVersion: typeof MEDIA_ASSET_SCHEMA;
  asset: {
    kind: "image";
    fileName: string;
    mimeType: "image/png" | "image/jpeg" | "image/webp";
    prompt: string;
    enhancedPrompt: string;
    style: string;
    aspectRatio: string;
    provider: string;
    model: string;
    createdAt: string;
    rightsStatus: "unconfirmed";
    approvalRequired: true;
  };
};

function imageFormat(imageUrl: string): { mimeType: MediaAssetSidecar["asset"]["mimeType"]; extension: string } {
  if (imageUrl.startsWith("data:image/jpeg")) return { mimeType: "image/jpeg", extension: "jpg" };
  if (imageUrl.startsWith("data:image/webp")) return { mimeType: "image/webp", extension: "webp" };
  return { mimeType: "image/png", extension: "png" };
}

function safeId(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48) || "generated";
}

export function buildMediaAssetSidecar(image: GeneratedImage): MediaAssetSidecar {
  const format = imageFormat(image.imageUrl);
  return {
    schemaVersion: MEDIA_ASSET_SCHEMA,
    asset: {
      kind: "image",
      fileName: "text2image-" + safeId(image.id) + "." + format.extension,
      mimeType: format.mimeType,
      prompt: image.prompt.slice(0, 2000),
      enhancedPrompt: image.enhancedPrompt.slice(0, 4000),
      style: image.style,
      aspectRatio: image.aspectRatio,
      provider: image.provider,
      model: image.model.slice(0, 160),
      createdAt: new Date(image.timestamp).toISOString(),
      rightsStatus: "unconfirmed",
      approvalRequired: true,
    },
  };
}

export function downloadMediaAssetSidecar(image: GeneratedImage): void {
  const sidecar = buildMediaAssetSidecar(image);
  const blob = new Blob([JSON.stringify(sidecar, null, 2) + "\n"], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = sidecar.asset.fileName.replace(/\.[^.]+$/, ".media-asset.json");
  anchor.click();
  URL.revokeObjectURL(url);
}
