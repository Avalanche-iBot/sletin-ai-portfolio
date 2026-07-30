/**
 * Saves generated content as a file, from the browser.
 *
 * The architecture page builds its exports client-side rather than fetching
 * them from a route, so there is no URL to link to — the data exists only in
 * memory at the moment the reader clicks.
 *
 * There is no browser API for "save this data as a file". The long-standing
 * workaround is the three steps below, and each one is load-bearing:
 *
 *   1. A `Blob` holds the file's bytes, and `createObjectURL` gives them a
 *      temporary `blob:` address the browser treats like any other URL.
 *   2. An anchor with a `download` attribute, clicked from code. It has to be
 *      in the document for the click to register in every browser, which is
 *      why it is appended and removed again rather than just constructed.
 *   3. The blob stays in memory until it is explicitly released. Without the
 *      final call, every click leaks a whole file.
 *
 * Callers should treat this as fire-and-forget: it returns once the download
 * has been handed to the browser, which is not the same as the file having
 * been written, and there is no way to observe the latter.
 */
export function downloadFile(content: string, filename: string, mime: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
