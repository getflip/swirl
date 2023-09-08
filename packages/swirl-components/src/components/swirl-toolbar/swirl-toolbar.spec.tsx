import { newSpecPage } from "@stencil/core/testing";

import { SwirlToolbar } from "./swirl-toolbar";

describe("swirl-toolbar", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlToolbar],
      html: `
        <swirl-toolbar>
          <swirl-chip label="Remove" pressed="true"></swirl-chip>
          <swirl-button icon="<swirl-icon-add></swirl-icon-add>" label="Add"></swirl-button>
        </swirl-toolbar>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-toolbar>
        <mock:shadow-root>
          <swirl-stack aria-orientation="horizontal" orientation="horizontal" role="toolbar" spacing="8">
            <slot></slot>
          </swirl-stack>
        </mock:shadow-root>
        <swirl-chip label="Remove" pressed="true"></swirl-chip>
        <swirl-button icon="<swirl-icon-add></swirl-icon-add>" label="Add"></swirl-button>
      </swirl-toolbar>
    `);
  });
});
