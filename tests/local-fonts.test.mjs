import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const assets = new Map([
  ['inter-cyrillic.woff2', '71d5ee93cc1e9f1d520a3a8b66456de18c7879d8df09d57fcd2eaff75fef0075'],
  ['inter-latin.woff2', '3100e775e8616cd2611beecfa23a4263d7037586789b43f035236a2e6fbd4c62'],
  ['outfit-latin-ext.woff2', '0f53d1c03b3918d744a843b5039001ee31695ca1e255e3914188df81beb461e9'],
  ['outfit-latin.woff2', '6c18d579fd87c3776be068b762cbc83fde3acb543d49eabd3ade842eb987e887'],
  ['jetbrains-mono-cyrillic.woff2', 'e17cfd15fb96909d64095015f958207063a0c07191da3512df7d560a781aebdf'],
  ['jetbrains-mono-latin.woff2', '83c005d49d8a6a50474c73a5a36ac0468076e9c4a29da7bdb14995d80560a5be'],
]);

const root = new URL('../', import.meta.url);

test('serves integrity-pinned fonts without a Google Fonts runtime dependency', async () => {
  const [html, css] = await Promise.all([
    readFile(new URL('index.html', root), 'utf8'),
    readFile(new URL('src/styles.css', root), 'utf8'),
  ]);
  assert.doesNotMatch(html, /fonts\.(?:googleapis|gstatic)\.com/i);
  for (const family of ['Inter', 'Outfit', 'JetBrains Mono']) assert.match(css, new RegExp(`font-family: '${family}'`));
  assert.equal((css.match(/font-display: swap/g) || []).length, 6);

  for (const [name, expectedHash] of assets) {
    const bytes = await readFile(new URL(`public/fonts/${name}`, root));
    assert.equal(bytes.subarray(0, 4).toString('ascii'), 'wOF2', `${name} must be WOFF2`);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), expectedHash, `${name} integrity mismatch`);
  }

  for (const notice of ['INTER-OFL.txt', 'OUTFIT-OFL.txt', 'JETBRAINS-MONO-OFL.txt']) {
    const license = await readFile(new URL(`public/fonts/${notice}`, root), 'utf8');
    assert.match(license, /SIL OPEN FONT LICENSE Version 1\.1/);
  }
});
