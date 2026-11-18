import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const script = readFileSync(new URL('../src/components/BackToTopButton.astro', import.meta.url), 'utf8').match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];
function fixture(top = 0, height = 2000) {
  const button = new EventTarget();
  const progress = { style: { setProperty(_, value) { this.value = value; } } };
  const container = { classList: { toggle() {} }, setAttribute() {}, querySelector(q) { return q.includes('back-to-top') ? button : progress; } };
  const root = { scrollTop: top, scrollHeight: height, clientHeight: 800 };
  const document = Object.assign(new EventTarget(), { documentElement: root, querySelector(q) { return q === '#btt-btn-container' ? container : null; } });
  const window = Object.assign(new EventTarget(), { scrollTo() { root.scrollTop = 0; } });
  let id = 0; const frames = new Map();
  const context = { document, window, AbortController, requestAnimationFrame(fn) { frames.set(++id, fn); return id; }, cancelAnimationFrame(n) { frames.delete(n); } };
  const start = () => runInNewContext(script, context);
  const flush = () => { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn()); };
  start(); flush();
  return { document, window, root, button, container, progress, frames, start, flush };
}
test('restored scroll initializes visibility without needing a scroll event', () => {
  const f = fixture(900); assert.equal(f.container.hidden, false); assert.equal(f.button.disabled, false);
});
test('top and zero range disable the hidden control and keep finite progress', () => {
  for (const height of [800, 500, 2000]) { const f = fixture(0, height); assert.equal(f.container.hidden, true); assert.equal(f.button.disabled, true); assert(!/NaN|Infinity/.test(f.progress.style.value)); }
});
test('visibility threshold stays at more than twenty percent', () => {
  const f = fixture(240); assert(f.container.hidden); f.root.scrollTop = 241; f.document.dispatchEvent(new Event('scroll')); f.flush(); assert(!f.container.hidden);
});
test('resize recomputes visibility and clamps progress', () => {
  const f = fixture(900); f.root.scrollHeight = 800; f.window.dispatchEvent(new Event('resize')); f.flush(); assert(f.container.hidden); f.root.scrollHeight = 1000; f.window.dispatchEvent(new Event('resize')); f.flush(); assert(f.progress.style.value.includes('100%'));
});
test('swap aborts old listeners and cancels pending frames', () => {
  const f = fixture(900); f.document.dispatchEvent(new Event('scroll')); f.document.dispatchEvent(new Event('astro:before-swap')); assert.equal(f.frames.size, 0); f.document.dispatchEvent(new Event('scroll')); assert.equal(f.frames.size, 0); assert.equal(f.window.__cleanupBackToTop, undefined);
});
test('reinitialization leaves one scheduled update and click returns to top', () => {
  const f = fixture(900); f.start(); f.start(); f.flush(); f.document.dispatchEvent(new Event('scroll')); assert.equal(f.frames.size, 1); f.flush(); f.button.dispatchEvent(new Event('click')); assert.equal(f.root.scrollTop, 0); assert(f.container.hidden);
});
