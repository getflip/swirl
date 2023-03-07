import { newSpecPage } from "@stencil/core/testing";

import { SwirlCarousel } from "./swirl-carousel";

describe("swirl-carousel", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlCarousel],
      html: `<swirl-carousel></swirl-carousel>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-carousel>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </swirl-carousel>
    `);
  });
});
