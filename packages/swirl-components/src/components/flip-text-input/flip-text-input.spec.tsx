import { newSpecPage } from "@stencil/core/testing";

import { FlipTextInput } from "./flip-text-input";

describe("flip-text-input", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FlipTextInput],
      html: `<flip-text-input></flip-text-input>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-text-input>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </flip-text-input>
    `);
  });
});
