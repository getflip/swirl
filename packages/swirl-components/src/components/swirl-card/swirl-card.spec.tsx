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
            <div class="card__image">
              <slot name="image"></slot>
            </div>
            <div class="card__body">
              <div class="card__content">
                <slot name="content"></slot>
              </div>
            </div>
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
            <div class="card__image">
              <slot name="image"></slot>
            </div>
            <div class="card__body">
              <div class="card__content">
                <slot name="content"></slot>
              </div>
            </div>
          </a>
        </mock:shadow-root>
        Content
      </swirl-card>
    `);
  });
});
