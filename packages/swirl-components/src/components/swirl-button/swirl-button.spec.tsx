import { newSpecPage } from "@stencil/core/testing";

import { SwirlButton } from "./swirl-button";

describe("swirl-button", () => {
  it("renders its label, icon and props", async () => {
    const page = await newSpecPage({
      components: [SwirlButton],
      html: `<swirl-button
              disabled="true"
              icon="<swirl-icon-close></swirl-icon-close>"
              intent="critical"
              label="Label"
              pill="true"
              size="l"
              type="submit"
              variant="flat">
            </swirl-button>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-button disabled="true" icon="<swirl-icon-close></swirl-icon-close>" intent="critical" label="Label" pill="true" size="l" type="submit" variant="flat">
        <button aria-disabled="true" class="button button--pill button--icon-position-start button--intent-critical button--size-l button--variant-flat" disabled="" type="submit">
          <span class="button__icon">
            <swirl-icon-close size="24"></swirl-icon-close>
          </span>
          <span class="button__label">
            Label
          </span>
        </button>
      </swirl-button>
    `);
  });

  it("can hide its label if icon is present", async () => {
    const page = await newSpecPage({
      components: [SwirlButton],
      html: `<swirl-button hide-label="true" icon="<swirl-icon-close></swirl-icon-close>" label="Label"></swirl-button>`,
    });

    expect(page.root.querySelector(".button__label")).toBeNull();
    expect(page.root.querySelector("[aria-label='Label']")).toBeDefined();
  });

  it("renders a link if href is set", async () => {
    const page = await newSpecPage({
      components: [SwirlButton],
      html: `<swirl-button href="#" label="Label" target="_blank"></swirl-button>`,
    });

    expect(page.root.children[0].tagName).toBe("A");
    expect(page.root.children[0].getAttribute("href")).toBe("#");
    expect(page.root.children[0].getAttribute("target")).toBe("_blank");
  });
});
