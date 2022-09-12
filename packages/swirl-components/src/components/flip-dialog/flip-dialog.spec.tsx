import { newSpecPage } from "@stencil/core/testing";

import { FlipDialog } from "./flip-dialog";

describe("flip-dialog", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FlipDialog],
      html: `<flip-dialog></flip-dialog>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-dialog>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </flip-dialog>
    `);
  });
});
