import { newSpecPage } from "@stencil/core/testing";

import { FlipText } from "./flip-text";

describe("flip-text", () => {
  it("renders text with props", async () => {
    const page = await newSpecPage({
      components: [FlipText],
      html: `
        <flip-text align="center" color="critical" font-style="italic" size="lg" weight="medium">
          Est, odio dis scelerisque risus sagittis lorem rhoncus. Vivamus tristique
          habitant vitae cursus nisl. Sed adipiscing proin suspendisse aliquam
          maecenas faucibus mauris purus. Tortor ut habitant erat adipiscing nulla
          pretium, cursus tortor. Amet viverra et platea lacus, nec molestie
          tincidunt.
        </flip-text>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-text align="center" color="critical" font-style="italic" size="lg" weight="medium">
        <mock:shadow-root>
          <p class="text text--align-center text--color-critical text--font-style-italic text--size-lg text--weight-medium" part="text">
            <slot></slot>
          </p>
        </mock:shadow-root>
        Est, odio dis scelerisque risus sagittis lorem rhoncus. Vivamus tristique habitant vitae cursus nisl. Sed adipiscing proin suspendisse aliquam maecenas faucibus mauris purus. Tortor ut habitant erat adipiscing nulla pretium, cursus tortor. Amet viverra et platea lacus, nec molestie tincidunt.
      </flip-text>
    `);
  });

  it("renders with passes tag", async () => {
    const page = await newSpecPage({
      components: [FlipText],
      html: `
        <flip-text as="span">
          Est, odio dis scelerisque risus sagittis lorem rhoncus. Vivamus tristique
          habitant vitae cursus nisl. Sed adipiscing proin suspendisse aliquam
          maecenas faucibus mauris purus. Tortor ut habitant erat adipiscing nulla
          pretium, cursus tortor. Amet viverra et platea lacus, nec molestie
          tincidunt.
        </flip-text>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-text as="span">
        <mock:shadow-root>
          <span class="text text--align-start text--color-default text--font-style-normal text--size-base text--weight-normal" part="text">
            <slot></slot>
          </span>
        </mock:shadow-root>
        Est, odio dis scelerisque risus sagittis lorem rhoncus. Vivamus tristique habitant vitae cursus nisl. Sed adipiscing proin suspendisse aliquam maecenas faucibus mauris purus. Tortor ut habitant erat adipiscing nulla pretium, cursus tortor. Amet viverra et platea lacus, nec molestie tincidunt.
      </flip-text>
    `);
  });
});
