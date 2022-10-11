import { newSpecPage } from "@stencil/core/testing";

import { FlipHeading } from "./flip-heading";

describe("flip-heading", () => {
  it("renders its level and text", async () => {
    const page = await newSpecPage({
      components: [FlipHeading],
      html: `<flip-heading heading-id="id" level="3">Heading</flip-heading>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-heading heading-id="id" level="3">
        <mock:shadow-root>
          <h3 class="heading heading--align-start heading--level-3" id="id" part="heading"></h3>
        </mock:shadow-root>
        Heading
      </flip-heading>
    `);
  });

  it("allows to render deviating visual level", async () => {
    const page = await newSpecPage({
      components: [FlipHeading],
      html: `<flip-heading as="h6" heading-id="id" level="3">Heading</flip-heading>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-heading as="h6" heading-id="id" level="3">
        <mock:shadow-root>
          <h6 class="heading heading--align-start heading--level-3" id="id" part="heading"></h6>
        </mock:shadow-root>
        Heading
      </flip-heading>
    `);
  });
});
