import { newSpecPage } from "@stencil/core/testing";

import { SwirlHeading } from "./swirl-heading";

describe("swirl-heading", () => {
  it("renders its level and text", async () => {
    const page = await newSpecPage({
      components: [SwirlHeading],
      html: `<swirl-heading heading-id="id" level="3">Heading</swirl-heading>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-heading heading-id="id" level="3">
        Heading
        <h3 class="heading heading--align-start heading--balanced heading--level-3" id="id"></h3>
      </swirl-heading>
    `);
  });

  it("allows to render deviating visual level", async () => {
    const page = await newSpecPage({
      components: [SwirlHeading],
      html: `<swirl-heading as="h6" heading-id="id" level="3">Heading</swirl-heading>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-heading as="h6" heading-id="id" level="3">
        Heading
        <h6 class="heading heading--align-start heading--balanced heading--level-3" id="id"></h6>
      </swirl-heading>
    `);
  });
});
