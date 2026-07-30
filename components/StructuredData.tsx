/**
 * Emits a Schema.org description of the page for machines to read.
 *
 * Renders a script tag the browser never executes and never displays, so this
 * can be dropped into any page without affecting its layout by a single pixel.
 *
 * The escaping is the part worth understanding. An HTML parser ends a script
 * element at the first literal `</script>` in its text, wherever it appears —
 * so a case note containing that sequence in its prose would close the tag
 * early and spill the rest of the JSON into the page as markup. Replacing the
 * opening angle bracket with its escape keeps the value identical to a JSON
 * reader while making the sequence impossible to form.
 */
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
