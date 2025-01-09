import { newSpecPage } from "@stencil/core/testing";

import { SwirlButtonGroup } from "./swirl-button-group";

describe("swirl-button-group", () => {
  it("renders its children", async () => {
    const page = await newSpecPage({
      components: [SwirlButtonGroup],
      html: `
        <swirl-button-group>
          <swirl-button label="Button"></swirl-button>
          <swirl-button intent="primary" label="Button" variant="flat"></swirl-button>
        </swirl-button-group>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-button-group>
        <mock:shadow-root>
          <swirl-stack align="start" class="button-group" justify="start" orientation="horizontal" role="group" spacing="8">
            <slot></slot>
          </swirl-stack>
        </mock:shadow-root>
        <swirl-button label="Button"></swirl-button>
        <swirl-button intent="primary" label="Button" variant="flat"></swirl-button>
      </swirl-button-group>
    `);
  });

  it("renders its children with specified spacing", async () => {
    const page = await newSpecPage({
      components: [SwirlButtonGroup],
      html: `
        <swirl-button-group spacing="4">
          <swirl-button label="Button"></swirl-button>
          <swirl-button intent="primary" label="Button" variant="flat"></swirl-button>
        </swirl-button-group>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-button-group spacing="4">
        <mock:shadow-root>
          <swirl-stack align="start" class="button-group" justify="start" orientation="horizontal" role="group" spacing="4">
            <slot></slot>
          </swirl-stack>
        </mock:shadow-root>
        <swirl-button label="Button"></swirl-button>
        <swirl-button intent="primary" label="Button" variant="flat"></swirl-button>
      </swirl-button-group>
    `);
  });
});
