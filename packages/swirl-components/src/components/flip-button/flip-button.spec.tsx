import { newSpecPage } from "@stencil/core/testing";

import { FlipButton } from "./flip-button";

describe("flip-button", () => {
  it("renders its label, icon and props", async () => {
    const page = await newSpecPage({
      components: [FlipButton],
      html: `<flip-button
              disabled="true"
              icon="<flip-icon-close></flip-icon-close>"
              intent="critical"
              label="Label"
              pill="true"
              size="l"
              type="submit"
              variant="flat">
            </flip-button>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-button disabled="true" icon="<flip-icon-close></flip-icon-close>" intent="critical" label="Label" pill="true" size="l" type="submit" variant="flat">
        <button aria-disabled="true" class="button button--pill button--icon-position-start button--intent-critical button--size-l button--variant-flat" disabled="" type="submit">
          <span class="button__icon">
            <flip-icon-close size="24"></flip-icon-close>
          </span>
          <span class="button__label">
            Label
          </span>
        </button>
      </flip-button>
    `);
  });

  it("can hide its label if icon is present", async () => {
    const page = await newSpecPage({
      components: [FlipButton],
      html: `<flip-button hide-label="true" icon="<flip-icon-close></flip-icon-close>" label="Label"></flip-button>`,
    });

    expect(page.root.querySelector(".button__label")).toBeNull();
    expect(page.root.querySelector("[aria-label='Label']")).toBeDefined();
  });

  it("renders a link if href is set", async () => {
    const page = await newSpecPage({
      components: [FlipButton],
      html: `<flip-button href="#" label="Label" target="_blank"></flip-button>`,
    });

    expect(page.root.children[0].tagName).toBe("A");
    expect(page.root.children[0].getAttribute("href")).toBe("#");
    expect(page.root.children[0].getAttribute("target")).toBe("_blank");
  });
});
