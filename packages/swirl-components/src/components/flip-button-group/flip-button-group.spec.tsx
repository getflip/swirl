import { newSpecPage } from "@stencil/core/testing";

import { FlipButtonGroup } from "./flip-button-group";

describe("flip-button-group", () => {
  it("renders its children", async () => {
    const page = await newSpecPage({
      components: [FlipButtonGroup],
      html: `
        <flip-button-group>
          <flip-button label="Button"></flip-button>
          <flip-button intent="primary" label="Button" variant="flat"></flip-button>
        </flip-button-group>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-button-group>
        <mock:shadow-root>
          <flip-stack class="button-group" justify="start" orientation="horizontal" role="group" spacing="8">
            <slot></slot>
          </flip-stack>
        </mock:shadow-root>
        <flip-button label="Button"></flip-button>
        <flip-button intent="primary" label="Button" variant="flat"></flip-button>
      </flip-button-group>
    `);
  });
});
