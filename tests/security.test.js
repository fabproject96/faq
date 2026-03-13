import test from 'node:test';
import assert from 'node:assert/strict';
import { validateExternalUrl } from '../src/app/url-security.js';

test('validateExternalUrl blocks non-http protocols', () => {
  assert.throws(() => validateExternalUrl('file:///etc/passwd'));
});

test('validateExternalUrl blocks localhost', () => {
  assert.throws(() => validateExternalUrl('http://localhost:3000'));
});

test('validateExternalUrl accepts https domain', () => {
  const parsed = validateExternalUrl('https://example.com/test');
  assert.equal(parsed.protocol, 'https:');
  assert.equal(parsed.hostname, 'example.com');
});
