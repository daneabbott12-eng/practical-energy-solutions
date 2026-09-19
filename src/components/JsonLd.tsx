/**
 * Renders a JSON-LD structured-data block.
 *
 * `<` is escaped to `<` so a stray "</script>" inside any string value
 * cannot break out of the script element. This is the standard mitigation for
 * injecting JSON into an inline script.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      // The payload is built from static config in src/lib, never user input.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
