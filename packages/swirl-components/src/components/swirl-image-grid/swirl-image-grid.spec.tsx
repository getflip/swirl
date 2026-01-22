import { newSpecPage } from "@stencil/core/testing";

import { SwirlImageGridItem } from "../swirl-image-grid-item/swirl-image-grid-item";
import { SwirlImageGrid } from "./swirl-image-grid";

describe("swirl-image-grid", () => {
  it("renders a single item", async () => {
    const page = await newSpecPage({
      components: [SwirlImageGrid, SwirlImageGridItem],
      html: `
        <swirl-image-grid aspect-ratio="4 / 3">
          <swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>
        </swirl-image-grid>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-image-grid aspect-ratio="4 / 3">
        <mock:shadow-root>
          <div class="image-grid image-grid--item-count-1" role="list" style="aspect-ratio: 4 / 3; border-radius: var(--s-border-radius-sm);">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <swirl-image-grid-item alt="Cute dog in a blanket" data-sibling-count="1" interactive="" role="listitem" src="/sample.jpg">
          <mock:shadow-root>
            <button class="image-grid-item" type="button">
              <div class="image-grid-item__background" style="background-image: url(/sample.jpg);"></div>
              <img alt="Cute dog in a blanket" class="image-grid-item__image" src="/sample.jpg">
              <span class="image-grid-item__watermark">
                <slot name="watermark"></slot>
              </span>
              <swirl-skeleton-box borderradius="none" class="image-grid-item__skeleton" height="100%" width="100%"></swirl-skeleton-box>
            </button>
          </mock:shadow-root>
        </swirl-image-grid-item>
      </swirl-image-grid>
    `);
  });

  it("renders a two items correctly", async () => {
    const page = await newSpecPage({
      components: [SwirlImageGrid, SwirlImageGridItem],
      html: `
        <swirl-image-grid aspect-ratio="4 / 3">
          <swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>
          <swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>
        </swirl-image-grid>
      `,
    });

    expect(
      page.root.shadowRoot.children[0].classList.contains(
        "image-grid--item-count-2"
      )
    ).toBe(true);
  });

  it("renders a two items correctly", async () => {
    const page = await newSpecPage({
      components: [SwirlImageGrid, SwirlImageGridItem],
      html: `
        <swirl-image-grid aspect-ratio="4 / 3">
          <swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>
          <swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>
        </swirl-image-grid>
      `,
    });

    expect(
      page.root.shadowRoot.children[0].classList.contains(
        "image-grid--item-count-2"
      )
    ).toBe(true);
  });

  it("renders a three items correctly", async () => {
    const page = await newSpecPage({
      components: [SwirlImageGrid, SwirlImageGridItem],
      html: `
        <swirl-image-grid aspect-ratio="4 / 3">
          <swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>
          <swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>
          <swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>
        </swirl-image-grid>
      `,
    });

    expect(
      page.root.shadowRoot.children[0].classList.contains(
        "image-grid--item-count-3"
      )
    ).toBe(true);
  });

  it("renders overflowing items correctly", async () => {
    const page = await newSpecPage({
      components: [SwirlImageGrid, SwirlImageGridItem],
      html: `
        <swirl-image-grid aspect-ratio="4 / 3">
          <swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>
          <swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>
          <swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>
          <swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>
          <swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>
          <swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>
        </swirl-image-grid>
      `,
    });

    const el = page.root.shadowRoot.children[0];
    const items = Array.from(
      page.root.querySelectorAll("swirl-image-grid-item")
    );

    expect(el.classList.contains("image-grid--item-count-4")).toBe(true);

    expect(
      items[3].shadowRoot
        .querySelector(".image-grid-item")
        .classList.contains("image-grid-item--has-overlay")
    ).toBe(true);

    expect(
      items[3].shadowRoot.querySelector<HTMLElement>(".image-grid-item")
        .innerText
    ).toEqual("+3");
  });
});
