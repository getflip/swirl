import { newSpecPage } from "@stencil/core/testing";

import { FlipResourceListItem } from "./flip-resource-list-item";

describe("flip-resource-list-item", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FlipResourceListItem],
      html: `<flip-resource-list-item></flip-resource-list-item>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-resource-list-item>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </flip-resource-list-item>
    `);
  });
});
