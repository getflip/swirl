import { newSpecPage } from "@stencil/core/testing";

import { SwirlIconWrapper } from "./swirl-icon-wrapper";

describe("swirl-icon-wrapper", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlIconWrapper],
      html: `<swirl-icon-wrapper
      icon="<swirl-icon-edit color='info' size='20'></swirl-icon-edit>"
      size="xl">
      </swirl-icon-wrapper>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-icon-wrapper>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </swirl-icon-wrapper>
    `);
  });
});
