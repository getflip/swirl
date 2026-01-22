import { newSpecPage } from "@stencil/core/testing";

import { SwirlImageGridItem } from "./swirl-image-grid-item";

describe("swirl-image-grid-item", () => {
  it("renders its image", async () => {
    const page = await newSpecPage({
      components: [SwirlImageGridItem],
      html: `<swirl-image-grid-item alt="Dog in a blanket" src="/image.jpg"></swirl-image-grid-item>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-image-grid-item alt="Dog in a blanket" data-sibling-count="1" role="listitem" src="/image.jpg">
        <mock:shadow-root>
          <div class="image-grid-item">
            <div class="image-grid-item__background" style="background-image: url(/image.jpg);"></div>
            <img alt="Dog in a blanket" class="image-grid-item__image" src="/image.jpg">
            <span class="image-grid-item__watermark">
              <slot name="watermark"></slot>
            </span>
            <swirl-skeleton-box borderradius="none" class="image-grid-item__skeleton" height="100%" width="100%"></swirl-skeleton-box>
          </div>
        </mock:shadow-root>
      </swirl-image-grid-item>
    `);
  });

  it("renders the image and the gif control button when a gif image is used", async () => {
    const page = await newSpecPage({
      components: [SwirlImageGridItem],
      html: `<swirl-image-grid-item alt="Funny cat" src="/cat.gif" show-gif-controls></swirl-image-grid-item>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-image-grid-item alt="Funny cat" data-sibling-count="1" role="listitem" show-gif-controls="" src="/cat.gif">
        <mock:shadow-root>
          <div class="image-grid-item">
            <div class="image-grid-item__background" style="background-image: url(/cat.gif);"></div>
            <img alt="Funny cat" class="image-grid-item__image" src="/cat.gif">
            <span class="image-grid-item__watermark">
              <slot name="watermark"></slot>
            </span>
            <swirl-button class="image-grid-item__gif-control-button" hidelabel="" icon="<swirl-icon-gif></swirl-icon-gif>" label="Pause GIF playback" pill="" swirlarialabel="Pause GIF playback" variant="on-image"></swirl-button>
            <swirl-skeleton-box borderradius="none" class="image-grid-item__skeleton" height="100%" width="100%"></swirl-skeleton-box>
          </div>
        </mock:shadow-root>
      </swirl-image-grid-item>
    `);
  });

  it("toggles gif play/pause when the control button is clicked", async () => {
    const page = await newSpecPage({
      components: [SwirlImageGridItem],
      html: `<swirl-image-grid-item alt="Looping meme" src="/meme.gif" show-gif-controls></swirl-image-grid-item>`,
    });

    // Mock the canvas extraction to avoid relying on real image/canvas APIs
    const instance = page.rootInstance as SwirlImageGridItem;
    const staticMockSrc = "data:image/jpeg;base64,STATIC";
    jest
      .spyOn(instance as any, "readImageFromCanvas")
      .mockResolvedValue(staticMockSrc);

    const img = page.root.shadowRoot.querySelector(
      "img.image-grid-item__image"
    ) as HTMLImageElement;
    const buttonEl = page.root.shadowRoot.querySelector(
      ".image-grid-item__gif-control-button"
    ) as HTMLElement;

    // Click to pause
    buttonEl.click();

    await new Promise((resolve) => setTimeout(resolve));
    await page.waitForChanges();

    expect(img.getAttribute("src")).toBe(staticMockSrc);
    expect(buttonEl.getAttribute("label")).toBe("Continue GIF playback");

    buttonEl.click();

    await new Promise((resolve) => setTimeout(resolve));
    await page.waitForChanges();

    expect(img.getAttribute("src")).toBe("/meme.gif");
    expect(buttonEl.getAttribute("label")).toBe("Pause GIF playback");
  });
});
