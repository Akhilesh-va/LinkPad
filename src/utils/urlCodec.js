/**
 * URL codec utilities for storing editor content in the hash.
 * Uses btoa(encodeURIComponent(text)) for encoding and decodeURIComponent(atob(encoded)) for decoding.
 */

/** Conservative limit for hash length; many browsers/servers struggle beyond ~2k. */
export const MAX_HASH_LENGTH = 2000;

/**
 * Encodes plain text for use in URL hash.
 * @param {string} text - Raw editor text
 * @returns {string} Base64-encoded string safe for hash
 */
export function encodeText(text) {
  if (text == null || text === '') return '';
  return btoa(encodeURIComponent(text));
}

/**
 * Decodes hash payload back to plain text. Fails silently on invalid input.
 * @param {string} encoded - Base64 string from hash (without #)
 * @returns {string} Decoded text, or empty string on error
 */
export function decodeText(encoded) {
  if (encoded == null || encoded === '') return '';
  try {
    return decodeURIComponent(atob(encoded));
  } catch {
    return '';
  }
}

/**
 * Reads current hash (without #) and decodes to text.
 * @returns {string} Decoded text or ''
 */
export function getTextFromHash() {
  const hash = window.location.hash.slice(1);
  return decodeText(hash);
}

/**
 * Updates the URL hash with encoded text. Use replaceState so we don't push history on every edit.
 * @param {string} text - Raw editor text; empty clears the hash
 */
export function setHashFromText(text) {
  const base = window.location.pathname + window.location.search;
  if (text == null || text === '') {
    history.replaceState(null, '', base);
    return;
  }
  const encoded = encodeText(text);
  const newHash = '#' + encoded;
  if (newHash.length > MAX_HASH_LENGTH) {
    // Don't replace URL if it would exceed limit; caller should show warning
    return;
  }
  history.replaceState(null, '', base + newHash);
}
