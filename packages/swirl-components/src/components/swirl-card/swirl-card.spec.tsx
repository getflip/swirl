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
          <article class="card card--elevation-level-3 card--intent-default card--elevated card--justify-content-start" style="border-radius: var(--s-border-radius-base);">
            <div class="card__image">
              <slot name="image"></slot>
            </div>
            <div class="card__floating-controls">
              <slot name="floating-controls"></slot>
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
      html: `<swirl-card href="#" link-target="_blank" swirl-aria-current="page">Content</swirl-card>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-card href="#" link-target="_blank" swirl-aria-current="page">
        <mock:shadow-root>
          <a aria-current="page" class="card card--elevation-level-3 card--intent-default card--interactive card--justify-content-start" href="#" rel="noreferrer" style="border-radius: var(--s-border-radius-base);" target="_blank">
            <div class="card__image">
              <slot name="image"></slot>
            </div>
            <div class="card__floating-controls">
              <slot name="floating-controls"></slot>
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

  it("renders with an image", async () => {
    const page = await newSpecPage({
      components: [SwirlCard],
      html: `
        <swirl-card href="#" link-target="_blank">
          <img slot="image" alt="Dog in a blanket." src="/sample-2.jpg" />
        </swirl-card>
      `,
    });

    const card = page.root.shadowRoot.firstChild as HTMLElement;

    expect(card.classList.contains("card--has-image")).toBeTruthy();
  });

  it("has adjustable paddings", async () => {
    const page = await newSpecPage({
      components: [SwirlCard],
      html: `<swirl-card padding="16" padding-block-start="2" padding-block-end="4" padding-inline-start="8" padding-inline-end="12">Content</swirl-card>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-card padding="16" padding-block-start="2" padding-block-end="4" padding-inline-start="8" padding-inline-end="12">
        <mock:shadow-root>
          <div class="card card--elevation-level-3 card--intent-default card--justify-content-start" style="border-radius: var(--s-border-radius-base);">
            <div class="card__image">
              <slot name="image"></slot>
            </div>
            <div class="card__floating-controls">
              <slot name="floating-controls"></slot>
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

  it("flashes for set duration", async () => {
    const page = await newSpecPage({
      components: [SwirlCard],
      html: `<swirl-card>Content</swirl-card>`,
    });

    const card = page.root.shadowRoot.firstChild as HTMLElement;

    expect(card.classList.contains("card--flashing")).toBe(false);

    await page.root.flash(10);
    await page.waitForChanges();

    expect(card.classList.contains("card--flashing")).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 10));
    await page.waitForChanges();

    expect(card.classList.contains("card--flashing")).toBe(false);
  });
});
