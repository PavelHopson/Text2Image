import assert from 'node:assert/strict';
import test from 'node:test';
import { buildReferenceBoard } from '../src/services/referenceBoard.ts';

const asset = { id: 'a1', prompt: 'Lantern in rain', enhancedPrompt: 'A brass lantern in rain', style: 'photo', aspectRatio: '1:1', provider: 'local', model: 'demo', imageUrl: 'data:image/png;base64,AA', timestamp: 1_700_000_000_000, liked: false };
test('exports local-only provenance without binary payloads or URLs', () => {
  const board = buildReferenceBoard(asset, 'object', 'owned', false);
  assert.equal(board.board.entries[0].localFileName, 'text2image-a1.png');
  assert.equal(JSON.stringify(board).includes('base64'), false);
  assert.equal(board.board.approvalRequired, true);
});
test('fails closed for unknown rights and missing likeness consent', () => {
  assert.throws(() => buildReferenceBoard(asset, 'shot', 'unconfirmed', false), /rights/i);
  assert.throws(() => buildReferenceBoard(asset, 'character', 'owned', false), /consent/i);
  assert.throws(() => buildReferenceBoard({ ...asset, id: '../escape' }, 'object', 'owned', false), /asset id/i);
});
