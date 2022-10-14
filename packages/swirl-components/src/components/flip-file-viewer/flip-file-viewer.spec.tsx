import { newSpecPage } from "@stencil/core/testing";

import { FlipFileViewer } from "./flip-file-viewer";

describe("flip-file-viewer", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FlipFileViewer],
      html: `<flip-file-viewer></flip-file-viewer>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-file-viewer>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </flip-file-viewer>
    `);
  });
});
