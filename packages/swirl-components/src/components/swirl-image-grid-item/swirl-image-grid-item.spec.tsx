import { newSpecPage } from "@stencil/core/testing";

import { SwirlImageGridItem } from "./swirl-image-grid-item";

describe("swirl-image-grid-item", () => {
  it("renders its image", async () => {
    const page = await newSpecPage({
      components: [SwirlImageGridItem],
      html: `<swirl-image-grid-item alt="Dog in a blanket" src="/image.jpg"></swirl-image-grid-item>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-image-grid-item alt="Dog in a blanket" role="listitem" src="/image.jpg">
        <mock:shadow-root>
          <div class="image-grid-item">
            <div class="image-grid-item__background" style="background-image: url(/image.jpg);"></div>
            <img alt="Dog in a blanket" class="image-grid-item__image" src="/image.jpg">
          </div>
        </mock:shadow-root>
      </swirl-image-grid-item>
    `);
  });
});
