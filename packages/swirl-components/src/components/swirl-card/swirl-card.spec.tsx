import { newSpecPage } from "@stencil/core/testing";

import { SwirlCard } from "./swirl-card";

describe("swirl-card", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [SwirlCard],
      html: `<swirl-card as="article" elevated>Content</swirl-card>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-card as="article" elevated="">
        <mock:shadow-root>
          <article class="card card--elevated">
            <slot></slot>
          </article>
        </mock:shadow-root>
        Content
      </swirl-card>
    `);
  });

  it("renders as a link", async () => {
    const page = await newSpecPage({
      components: [SwirlCard],
      html: `<swirl-card href="#" link-target="_blank">Content</swirl-card>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-card href="#" link-target="_blank">
        <mock:shadow-root>
          <a class="card card--interactive" href="#" rel="noreferrer" target="_blank">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Content
      </swirl-card>
    `);
  });
});
