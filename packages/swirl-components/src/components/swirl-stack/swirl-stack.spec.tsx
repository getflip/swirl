import { newSpecPage } from "@stencil/core/testing";

import { SwirlStack } from "./swirl-stack";

describe("swirl-stack", () => {
  it("renders its children and props", async () => {
    const page = await newSpecPage({
      components: [SwirlStack],
      html: `
        <swirl-stack align="start" as="section" justify="start" orientation="horizontal" spacing="2" wrap="true">
          <swirl-badge label="Dennis" intent="decorative-1"></swirl-badge>
          <swirl-badge label="Lennart" intent="decorative-2"></swirl-badge>
        </swirl-stack>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-stack align="start" as="section" justify="start" orientation="horizontal" spacing="2" wrap="true">
        <mock:shadow-root>
          <section class="stack stack--align-start stack--justify-start stack--orientation-horizontal stack--wrap" style="column-gap: var(--s-space-2); row-gap: var(--s-space-2);">
            <slot></slot>
          </section>
        </mock:shadow-root>
        <swirl-badge intent="decorative-1" label="Dennis"></swirl-badge>
        <swirl-badge intent="decorative-2" label="Lennart"></swirl-badge>
      </swirl-stack>
    `);
  });

  it("sets column-gap and row-gap when specified", async () => {
    const page = await newSpecPage({
      components: [SwirlStack],
      html: `
        <swirl-stack align="start" as="section" justify="start" orientation="horizontal" spacing="2" column-spacing="30" row-spacing="20" wrap="true">
          <swirl-badge label="Dennis" intent="decorative-1"></swirl-badge>
          <swirl-badge label="Lennart" intent="decorative-2"></swirl-badge>
        </swirl-stack>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-stack align="start" as="section" justify="start" orientation="horizontal" spacing="2" column-spacing="30" row-spacing="20" wrap="true">
        <mock:shadow-root>
          <section class="stack stack--align-start stack--justify-start stack--orientation-horizontal stack--wrap" style="column-gap: var(--s-space-30); row-gap: var(--s-space-20);">
            <slot></slot>
          </section>
        </mock:shadow-root>
        <swirl-badge intent="decorative-1" label="Dennis"></swirl-badge>
        <swirl-badge intent="decorative-2" label="Lennart"></swirl-badge>
      </swirl-stack>
    `);
  });
});
