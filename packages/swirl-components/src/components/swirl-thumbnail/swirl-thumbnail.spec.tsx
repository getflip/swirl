import { newSpecPage } from "@stencil/core/testing";

import { FlipThumbnail } from "./swirl-thumbnail";

describe("flip-thumbnail", () => {
  it("renders the image", async () => {
    const page = await newSpecPage({
      components: [FlipThumbnail],
      html: `<flip-thumbnail alt="Brief description of the image." format="portrait" src="https://picsum.photos/id/433/400/400" size="l"></flip-thumbnail>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-thumbnail alt="Brief description of the image." format="portrait" size="l" src="https://picsum.photos/id/433/400/400">
        <mock:shadow-root>
          <span class="thumbnail thumbnail--format-portrait thumbnail--size-l">
            <img alt="Brief description of the image." class="thumbnail__image" loading="lazy" src="https://picsum.photos/id/433/400/400">
          </span>
        </mock:shadow-root>
      </flip-thumbnail>
    `);
  });
});
