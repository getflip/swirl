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
          <article class="card card--elevated card--justify-content-start" style="border-radius: var(--s-border-radius-base);">
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
          <a class="card card--interactive card--justify-content-start" href="#" rel="noreferrer" style="border-radius: var(--s-border-radius-base);" target="_blank">
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

  it("has adjustable paddings", async () => {
    const page = await newSpecPage({
      components: [SwirlCard],
      html: `<swirl-card padding="16" padding-block-start="2" padding-block-end="4" padding-inline-start="8" padding-inline-end="12">Content</swirl-card>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-card padding="16" padding-block-start="2" padding-block-end="4" padding-inline-start="8" padding-inline-end="12">
        <mock:shadow-root>
          <div class="card card--justify-content-start" style="border-radius: var(--s-border-radius-base);">
            <div class="card__image">
              <slot name="image"></slot>
            </div>
            <div class="card__body" style="padding: var(--s-space-16); padding-block-end: var(--s-space-4); padding-block-start: var(--s-space-2); padding-inline-end: var(--s-space-12); padding-inline-start: var(--s-space-8);">
              <div class="card__content">
                <slot name="content"></slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
        Content
      </swirl-card>
    `);
  });
});
