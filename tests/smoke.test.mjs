import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = (f) => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
const has = (f) => existsSync(new URL(`../${f}`, import.meta.url));

test('index.html basics', () => {
  const html = read('index.html');
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /<html[^>]*\slang="[^"]+"/);
  for (const ref of ['renpy.js', 'renpy-pre.js', 'game.zip']) assert.ok(html.includes(ref), ref);
});

test('runtime assets exist', () => {
  for (const f of ['renpy.wasm', 'renpy.data', 'game.zip', 'manifest.json', 'service-worker.js']) assert.ok(has(f), f);
});

test('manifest is valid', () => {
  const m = JSON.parse(read('manifest.json'));
  assert.ok(m.name);
  assert.ok(Array.isArray(m.icons) && m.icons.length > 0);
});

test('security headers configured', () => {
  const toml = read('netlify.toml');
  for (const h of ['Content-Security-Policy', 'X-Frame-Options', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy']) assert.ok(toml.includes(h), h);
});

test('no legacy analytics IDs', () => {
  for (const f of ['index.html', '.env.example', 'service-worker.js']) assert.ok(!read(f).includes('G-DLRDXGG3V1'), f);
});
