import { newSpecPage } from "@stencil/core/testing";

import { SwirlSkeletonBox } from "./swirl-skeleton-box";

describe("swirl-skeleton-box", () => {
  it("renders with aspect ratio", async () => {
    const page = await newSpecPage({
      components: [SwirlSkeletonBox],
      html: `<swirl-skeleton-box aspect-ratio="1/0.5"></swirl-skeleton-box>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-skeleton-box aspect-ratio="1/0.5">
        <mock:shadow-root>
          <div class="skeleton-box skeleton-box--border-radius-base" style="aspect-ratio: 1/0.5; border-radius: var(--s-border-radius-base);"></div>
        </mock:shadow-root>
      </swirl-skeleton-box>
    `);
  });

  it("renders with width and height", async () => {
    const page = await newSpecPage({
      components: [SwirlSkeletonBox],
      html: `<swirl-skeleton-box width="50%" height="10rem"></swirl-skeleton-box>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-skeleton-box width="50%" height="10rem">
        <mock:shadow-root>
          <div class="skeleton-box skeleton-box--border-radius-base" style="border-radius: var(--s-border-radius-base); height: 10rem; width: 50%;"></div>
        </mock:shadow-root>
      </swirl-skeleton-box>
    `);
  });

  it("renders with pill border-radius", async () => {
    const page = await newSpecPage({
      components: [SwirlSkeletonBox],
      html: `<swirl-skeleton-box border-radius="pill"></swirl-skeleton-box>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-skeleton-box border-radius="pill">
        <mock:shadow-root>
          <div class="skeleton-box skeleton-box--border-radius-pill"></div>
        </mock:shadow-root>
      </swirl-skeleton-box>
    `);
  });

  it("disabled animation", async () => {
    const page = await newSpecPage({
      components: [SwirlSkeletonBox],
      html: `<swirl-skeleton-box animated="false"></swirl-skeleton-box>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-skeleton-box animated="false">
        <mock:shadow-root>
          <div class="skeleton-box skeleton-box--border-radius-base skeleton-box--static" style="border-radius: var(--s-border-radius-base);"></div>
        </mock:shadow-root>
      </swirl-skeleton-box>
    `);
  });
});
