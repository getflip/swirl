import { newSpecPage } from "@stencil/core/testing";

import { SwirlSkeletonText } from "./swirl-skeleton-text";

describe("swirl-skeleton-text", () => {
  it("renders lines", async () => {
    const page = await newSpecPage({
      components: [SwirlSkeletonText],
      html: `<swirl-skeleton-text lines="4" size="lg"></swirl-skeleton-text>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-skeleton-text lines="4" size="lg">
        <mock:shadow-root>
          <div class="skeleton-text skeleton-text--size-lg" part="skeleton-text skeleton-text--size-lg">
            <div class="skeleton-text__line skeleton-text__line--size-lg" part="skeleton-text__line skeleton-text__line--size-lg"></div>
            <div class="skeleton-text__line skeleton-text__line--size-lg" part="skeleton-text__line skeleton-text__line--size-lg"></div>
            <div class="skeleton-text__line skeleton-text__line--size-lg" part="skeleton-text__line skeleton-text__line--size-lg"></div>
            <div class="skeleton-text__line skeleton-text__line--size-lg" part="skeleton-text__line skeleton-text__line--size-lg"></div>
          </div>
        </mock:shadow-root>
      </swirl-skeleton-text>
    `);
  });

  it("disables animation", async () => {
    const page = await newSpecPage({
      components: [SwirlSkeletonText],
      html: `<swirl-skeleton-text animated="false"></swirl-skeleton-text>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-skeleton-text animated="false">
        <mock:shadow-root>
          <div class="skeleton-text skeleton-text--size-base skeleton-text--static" part="skeleton-text skeleton-text--size-base skeleton-text--static">
            <div class="skeleton-text__line skeleton-text__line--size-base" part="skeleton-text__line skeleton-text__line--size-base"></div>
          </div>
        </mock:shadow-root>
      </swirl-skeleton-text>
    `);
  });
});
