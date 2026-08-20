import type { GeneratedImage } from '../types';

export const REFERENCE_BOARD_SCHEMA = 'eclipse.reference-board.v1' as const;
export type ReferenceKind = 'shot' | 'object' | 'location' | 'pose' | 'character' | 'creature';
export type RightsStatus = 'owned' | 'licensed' | 'public-domain' | 'consented' | 'unconfirmed';

export type ReferenceBoard = {
  schemaVersion: typeof REFERENCE_BOARD_SCHEMA;
  board: {
    id: string; title: string; createdAt: string; approvalRequired: true;
    entries: Array<{
      id: string; kind: ReferenceKind; localFileName: string; description: string;
      rightsStatus: RightsStatus; consentConfirmed: boolean;
      provenance: { origin: 'ai-generated'; provider: string; model: string; createdAt: string };
    }>;
  };
};

const LIKENESS_KINDS = new Set<ReferenceKind>(['pose', 'character']);
const clean = (value: string, max: number) => value.replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max).trim();

export function buildReferenceBoard(asset: GeneratedImage, kind: ReferenceKind, rightsStatus: RightsStatus, consentConfirmed: boolean): ReferenceBoard {
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(asset.id)) throw new Error('Reference Board asset id is invalid.');
  if (rightsStatus === 'unconfirmed') throw new Error('Confirm the asset rights before exporting a Reference Board.');
  if (LIKENESS_KINDS.has(kind) && !consentConfirmed) throw new Error('Pose and character references require explicit likeness consent.');
  const createdAt = new Date(asset.timestamp).toISOString();
  const title = clean(asset.prompt, 90);
  const description = clean(asset.enhancedPrompt, 500);
  if (!title || !description || !Number.isFinite(Date.parse(createdAt))) throw new Error('Reference Board source metadata is incomplete.');
  return {
    schemaVersion: REFERENCE_BOARD_SCHEMA,
    board: {
      id: `rb-${asset.id}`, title, createdAt, approvalRequired: true,
      entries: [{
        id: `ref-${asset.id}`, kind,
        localFileName: `text2image-${asset.id}.${asset.imageUrl.startsWith('data:image/jpeg') ? 'jpg' : 'png'}`,
        description, rightsStatus, consentConfirmed,
        provenance: { origin: 'ai-generated', provider: clean(asset.provider, 80), model: clean(asset.model, 160), createdAt },
      }],
    },
  };
}
