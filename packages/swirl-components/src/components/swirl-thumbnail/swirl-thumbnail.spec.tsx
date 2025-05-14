import { newSpecPage } from "@stencil/core/testing";

import { SwirlThumbnail } from "./swirl-thumbnail";

describe("swirl-thumbnail", () => {
  it("renders the image", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="Brief description of the image." format="portrait" src="https://picsum.photos/id/433/400/400" size="l"></swirl-thumbnail>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-thumbnail alt="Brief description of the image." format="portrait" size="l" src="https://picsum.photos/id/433/400/400">
        <mock:shadow-root>
          <span class="thumbnail thumbnail--format-portrait thumbnail--size-l" role="group">
            <span class="thumbnail__image-wrapper">
              <img alt="Brief description of the image." class="thumbnail__image" loading="lazy" src="https://picsum.photos/id/433/400/400">
            </span>
          </span>
        </mock:shadow-root>
      </swirl-thumbnail>
    `);
  });

  it("renders timestamp and remove button", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="Brief description of the image." format="square" src="https://picsum.photos/id/433/400/400" show-remove-button size="xl" timestamp="12:12"></swirl-thumbnail>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-thumbnail alt="Brief description of the image." format="square" show-remove-button="" size="xl" src="https://picsum.photos/id/433/400/400" timestamp="12:12">
        <mock:shadow-root>
          <span class="thumbnail thumbnail--format-square thumbnail--size-xl" role="group">
            <span class="thumbnail__image-wrapper">
              <img alt="Brief description of the image." class="thumbnail__image" loading="lazy" src="https://picsum.photos/id/433/400/400">
            </span>
            <swirl-button-group class="thumbnail__buttons">
              <span>
                <swirl-button hidelabel="" icon="<swirl-icon-delete></swirl-icon-delete>" label="Remove" pill="" variant="on-image"></swirl-button>
              </span>
            </swirl-button-group>
            <span class="thumbnail__timestamp">
              12:12
            </span>
          </span>
        </mock:shadow-root>
      </swirl-thumbnail>
    `);
  });

  it("can be interactive", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="Brief description of the image." interactive src="https://picsum.photos/id/433/400/400"></swirl-thumbnail>`,
    });

    expect(
      page.root.shadowRoot
        .querySelector(".thumbnail")
        .classList.contains("thumbnail--interactive")
    ).toBeTruthy();

    const expectedButton = page.root.shadowRoot.querySelector(
      ".thumbnail__image-wrapper"
    );

    expect(expectedButton.tagName).toBe("BUTTON");
  });
});
