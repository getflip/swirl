import { newSpecPage } from "@stencil/core/testing";

import { SwirlCarouselSlide } from "./swirl-carousel-slide";

describe("swirl-carousel-slide", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [SwirlCarouselSlide],
      html: `<swirl-carousel-slide></swirl-carousel-slide>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-carousel-slide aria-roledescription=\"slide\" class=\"carousel-slide\" role=\"group\" tabindex=\"0\">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </swirl-carousel-slide>
    `);
  });
});
