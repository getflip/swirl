import { newSpecPage } from "@stencil/core/testing";

import { SwirlCarousel } from "./swirl-carousel";

describe("swirl-carousel", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [SwirlCarousel],
      html: `<swirl-carousel>Content</swirl-carousel>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-carousel aria-roledescription="carousel" class="carousel" role="group">
        <mock:shadow-root>
        <swirl-button class="carousel__previous-slide-button" hidelabel="" icon="<swirl-icon-arrow-left></swirl-icon-arrow-left>" label="Previous slide" pill="" variant="flat"></swirl-button>
          <swirl-button class="carousel__next-slide-button" hidelabel="" icon="<swirl-icon-arrow-right></swirl-icon-arrow-right>" label="Next slide" pill="" variant="flat"></swirl-button>
          <div aria-live="polite" class="carousel__slides">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Content
      </swirl-carousel>
    `);
  });
});
