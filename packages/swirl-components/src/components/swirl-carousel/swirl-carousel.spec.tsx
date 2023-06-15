import { newSpecPage } from "@stencil/core/testing";

import { SwirlCarousel } from "./swirl-carousel";

describe("swirl-carousel", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [SwirlCarousel],
      html: `<swirl-carousel>Content</swirl-carousel>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-carousel aria-roledescription="carousel" role="group">
        <mock:shadow-root>
          <div class="carousel">
            <div aria-live="polite" class="carousel__slides">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
        Content
      </swirl-carousel>
    `);
  });
});
