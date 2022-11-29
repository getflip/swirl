import { newSpecPage } from "@stencil/core/testing";

import { FlipCard } from "./flip-card";

describe("flip-card", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [FlipCard],
      html: `<flip-card as="article" elevated>Content</flip-card>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-card as="article" elevated="">
        <mock:shadow-root>
          <article class="card card--elevated">
            <slot></slot>
          </article>
        </mock:shadow-root>
        Content
      </flip-card>
    `);
  });

  it("renders as a link", async () => {
    const page = await newSpecPage({
      components: [FlipCard],
      html: `<flip-card href="#" link-target="_blank">Content</flip-card>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-card href="#" link-target="_blank">
        <mock:shadow-root>
          <a class="card card--interactive" href="#" rel="noreferrer" target="_blank">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Content
      </flip-card>
    `);
  });
});
