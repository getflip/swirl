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
      <swirl-button disabled="true" icon="<swirl-icon-close></swirl-icon-close>" intent="critical" label="Label" pill="true" size="l" type="submit" variant="flat" style="pointer-events: none;">
        <button aria-disabled="true" class="button button--disabled button--has-icon button--icon-position-start button--intent-critical button--pill button--size-l button--text-align-center button--variant-flat" disabled="" type="submit">
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

  it("can hide its label if icon is slotted", async () => {
    const page = await newSpecPage({
      components: [SwirlButton],
      html: `<swirl-button hide-label="true" label="Label"><swirl-icon-close slot="icon"></swirl-icon-close></swirl-button>`,
    });

    const buttonElement = page.root.querySelector("button");

    expect(page.root.querySelector(".button__label")).toBeNull();
    expect(buttonElement.getAttribute("aria-label")).toBe("Label");
    expect(buttonElement.classList.contains("button--icon-only")).toBe(true);
  });

  it("does not hide its label if no icon is present", async () => {
    const page = await newSpecPage({
      components: [SwirlButton],
      html: `<swirl-button hide-label="true" label="Label"></swirl-button>`,
    });

    expect(page.root.querySelector(".button__label")).not.toBeNull();
  });

  it("renders slotted label content instead of the label prop", async () => {
    const page = await newSpecPage({
      components: [SwirlButton],
      html: `<swirl-button label="Label"><span slot="label">Custom <b>label</b></span></swirl-button>`,
    });

    const labelElement = page.root.querySelector(".button__label");

    expect(labelElement).not.toBeNull();
    expect(labelElement.hasAttribute("hidden")).toBe(false);
    expect(labelElement.querySelector("[slot='label']")).not.toBeNull();
    expect(labelElement.textContent.trim()).toBe("Custom label");
    expect(page.root.textContent).not.toContain("Label");
    expect(page.root.querySelector("button").hasAttribute("aria-label")).toBe(
      false
    );
  });

  it("keeps slotted label content inside the button when the label is hidden", async () => {
    const page = await newSpecPage({
      components: [SwirlButton],
      html: `<swirl-button hide-label="true" label="Label"><swirl-icon-close slot="icon"></swirl-icon-close><span slot="label" style="display: block;">Custom label</span></swirl-button>`,
    });

    const buttonElement = page.root.querySelector("button");
    const slottedLabel = page.root.querySelector("[slot='label']");

    expect(buttonElement.getAttribute("aria-label")).toBe("Label");
    expect(slottedLabel.closest(".button__label")).not.toBeNull();
    expect(slottedLabel.closest("button")).toBe(buttonElement);
    expect(
      page.root.querySelector(".button__label").hasAttribute("hidden")
    ).toBe(true);

    page.root.hideLabel = false;
    await page.waitForChanges();

    expect(slottedLabel.closest("button")).toBe(buttonElement);
    expect(
      page.root.querySelector(".button__label").hasAttribute("hidden")
    ).toBe(false);
    expect(buttonElement.hasAttribute("aria-label")).toBe(false);

    page.root.hideLabel = true;
    await page.waitForChanges();

    expect(slottedLabel.closest("button")).toBe(buttonElement);
    expect(
      page.root.querySelector(".button__label").hasAttribute("hidden")
    ).toBe(true);
  });

  it("renders as a small button", async () => {
    const page = await newSpecPage({
      components: [SwirlButton],
      html: `<swirl-button icon="<swirl-icon-close></swirl-icon-close>" label="Label" size="s"></swirl-button>`,
    });

    const buttonElement = page.root.querySelector("button");
    const iconElement = page.root.querySelector("swirl-icon-close");

    expect(buttonElement.classList.contains("button--size-s")).toBe(true);
    expect(iconElement.getAttribute("size")).toBe("20");
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

  it("renders with passed cursor", async () => {
    const page = await newSpecPage({
      components: [SwirlButton],
      html: `<swirl-button cursor="help" label="Label"></swirl-button>`,
    });

    expect(page.root.querySelector("button").style.cursor).toBe("help");

    page.root.setAttribute("disabled", "true");
    await page.waitForChanges();

    expect(page.root.querySelector("button").style.cursor).toBe("");
  });
});
