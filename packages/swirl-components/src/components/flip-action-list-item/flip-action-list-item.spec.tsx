import { newSpecPage } from "@stencil/core/testing";

import { FlipActionListItem } from "./flip-action-list-item";

describe("flip-action-list-item", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FlipActionListItem],
      html: `<flip-action-list-item></flip-action-list-item>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-action-list-item>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </flip-action-list-item>
    `);
  });
});
