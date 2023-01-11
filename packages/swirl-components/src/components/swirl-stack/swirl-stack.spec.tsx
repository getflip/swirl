import { newSpecPage } from "@stencil/core/testing";

import { FlipStack } from "./swirl-stack";

describe("flip-stack", () => {
  it("renders its children and props", async () => {
    const page = await newSpecPage({
      components: [FlipStack],
      html: `
        <flip-stack align="start" as="section" justify="start" orientation="horizontal" spacing="2" wrap="true">
          <flip-badge label="Dennis" intent="decorative-1"></flip-badge>
          <flip-badge label="Lennart" intent="decorative-2"></flip-badge>
        </flip-stack>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-stack align="start" as="section" justify="start" orientation="horizontal" spacing="2" wrap="true">
        <mock:shadow-root>
          <section class="stack stack--align-start stack--justify-start stack--orientation-horizontal stack--wrap" style="gap: var(--s-space-2);">
            <slot></slot>
          </section>
        </mock:shadow-root>
        <flip-badge intent="decorative-1" label="Dennis"></flip-badge>
        <flip-badge intent="decorative-2" label="Lennart"></flip-badge>
      </flip-stack>
    `);
  });
});
