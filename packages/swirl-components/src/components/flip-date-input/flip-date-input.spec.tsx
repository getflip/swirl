import { newSpecPage } from "@stencil/core/testing";

import { FlipDateInput } from "./flip-date-input";

describe("flip-date-input", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FlipDateInput],
      html: `<flip-date-input></flip-date-input>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-date-input>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </flip-date-input>
    `);
  });
});
