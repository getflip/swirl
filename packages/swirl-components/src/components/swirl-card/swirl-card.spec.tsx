import { newSpecPage } from "@stencil/core/testing";

import { SwirlCard } from "./swirl-card";

describe("swirl-card", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [SwirlCard],
      html: `<swirl-card as="article" elevated><span slot="content">Content</span></swirl-card>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-card as="article" elevated="">
          <article class="card card--elevation-level-3 card--intent-default card--elevated card--justify-content-start" style="border-radius: var(--s-border-radius-base);">
            <div class="card__image"></div>
            <div class="card__floating-controls"></div>
            <div class="card__body">
              <div class="card__content">
                <span slot="content">Content</span>
              </div>
            </div>
          </article>
      </swirl-card>
    `);
  });

  it("renders as a link", async () => {
    const page = await newSpecPage({
      components: [SwirlCard],
      html: `<swirl-card href="#" link-target="_blank" swirl-aria-current="page"><span slot="content">Content</span></swirl-card>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-card href="#" link-target="_blank" swirl-aria-current="page">
          <a aria-current="page" class="card card--elevation-level-3 card--intent-default card--interactive card--justify-content-start" href="#" rel="noreferrer" style="border-radius: var(--s-border-radius-base);" target="_blank">
            <div class="card__image"></div>
            <div class="card__floating-controls"></div>
            <div class="card__body">
              <div class="card__content">
                <span slot="content">Content</span>
              </div>
            </div>
          </a>
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

    const card = page.root.children[0];

    expect(card.classList.contains("card--has-image")).toBeTruthy();
  });

  it("has adjustable paddings", async () => {
    const page = await newSpecPage({
      components: [SwirlCard],
      html: `<swirl-card padding="16" padding-block-start="2" padding-block-end="4" padding-inline-start="8" padding-inline-end="12">
               <span slot="content">Content</span>
             </swirl-card>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-card padding="16" padding-block-start="2" padding-block-end="4" padding-inline-start="8" padding-inline-end="12">
          <div class="card card--elevation-level-3 card--intent-default card--justify-content-start" style="border-radius: var(--s-border-radius-base);">
            <div class="card__image"></div>
            <div class="card__floating-controls"></div>
            <div class="card__body" style="padding: var(--s-space-16); padding-block-end: var(--s-space-4); padding-block-start: var(--s-space-2); padding-inline-end: var(--s-space-12); padding-inline-start: var(--s-space-8);">
              <div class="card__content">
                <span slot="content">Content</span>
              </div>
            </div>
          </div>
      </swirl-card>
    `);
  });

  it("flashes for set duration", async () => {
    const page = await newSpecPage({
      components: [SwirlCard],
      html: `<swirl-card><span slot="content">Content</span></swirl-card>`,
    });

    const card = page.root.children[0];

    expect(card.classList.contains("card--flashing")).toBe(false);

    await page.root.flash(10);
    await page.waitForChanges();

    expect(card.classList.contains("card--flashing")).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 10));
    await page.waitForChanges();

    expect(card.classList.contains("card--flashing")).toBe(false);
  });
});
