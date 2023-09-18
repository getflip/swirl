import { newSpecPage } from "@stencil/core/testing";

import { SwirlColumns } from "./swirl-columns";

describe("swirl-columns", () => {
  it("renders columns with passed width", async () => {
    const page = await newSpecPage({
      components: [SwirlColumns],
      html: `
        <swirl-columns columns="1fr 200px 1fr" spacing="16">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </swirl-columns>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-columns columns="1fr 200px 1fr" spacing="16">
        <mock:shadow-root>
          <div class="columns" style="grid-template-columns: 1fr 200px 1fr; gap: var(--s-space-16);">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <div>
          1
        </div>
        <div>
          2
        </div>
        <div>
          3
        </div>
      </swirl-columns>
    `);
  });
});
