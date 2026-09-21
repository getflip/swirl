import { newSpecPage } from "@stencil/core/testing";

import { SwirlActionListItem } from "./swirl-action-list-item";

describe("swirl-action-list-item", () => {
  it("renders its label, description and icons", async () => {
    const page = await newSpecPage({
      components: [SwirlActionListItem],
      html: `<swirl-action-list-item description="Description" icon="<swirl-icon-close></swirl-icon-close>" label="Label" suffix="<swirl-icon-chevron-right></swirl-icon-chevron-right>"></swirl-action-list-item>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-action-list-item description="Description" icon="<swirl-icon-close></swirl-icon-close>" label="Label" suffix="<swirl-icon-chevron-right></swirl-icon-chevron-right>">
        <mock:shadow-root>
          <button class="action-list-item action-list-item--intent-default action-list-item--size-m" part="action-list-item" role="menuitem" tabindex="-1" type="button">
            <slot name="avatar"></slot>
            <span class="action-list-item__icon">
              <swirl-icon-close size="24"></swirl-icon-close>
            </span>
            <span class="action-list-item__label-container">
              <span class="action-list-item__label" style="white-space: nowrap;">
                Label
              </span>
              <span class="action-list-item__description">
                Description
              </span>
            </span>
            <span class="action-list-item__suffix">
              <swirl-icon-chevron-right size="24"></swirl-icon-chevron-right>
              <slot name="suffix"></slot>
            </span>
          </button>
        </mock:shadow-root>
      </swirl-action-list-item>
    `);
  });

  it("hides suffix if disabled", async () => {
    const page = await newSpecPage({
      components: [SwirlActionListItem],
      html: `<swirl-action-list-item disabled="true" label="Label"></swirl-action-list-item>`,
    });

    expect(
      page.root.shadowRoot.querySelector(".action-list-item__suffix")
    ).toBeNull();
  });

  it("does not set aria-disabled or the native disabled attribute when neither disabled prop is set", async () => {
    const page = await newSpecPage({
      components: [SwirlActionListItem],
      html: `<swirl-action-list-item label="Label"></swirl-action-list-item>`,
    });

    const button = page.root.shadowRoot.querySelector("button");

    expect(button.hasAttribute("disabled")).toBe(false);
    expect(button.hasAttribute("aria-disabled")).toBe(false);
    expect(button.classList.contains("action-list-item--aria-disabled")).toBe(
      false
    );
  });

  it("does not set aria-disabled when only disabled is set", async () => {
    const page = await newSpecPage({
      components: [SwirlActionListItem],
      html: `<swirl-action-list-item disabled="true" label="Label"></swirl-action-list-item>`,
    });

    const button = page.root.shadowRoot.querySelector("button");

    expect(button.hasAttribute("disabled")).toBe(true);
    expect(button.hasAttribute("aria-disabled")).toBe(false);
    expect(button.classList.contains("action-list-item--aria-disabled")).toBe(
      false
    );
  });

  it("sets aria-disabled but not the native disabled attribute when swirlAriaDisabled is set", async () => {
    const page = await newSpecPage({
      components: [SwirlActionListItem],
      html: `<swirl-action-list-item label="Label" swirl-aria-disabled="true"></swirl-action-list-item>`,
    });

    const button = page.root.shadowRoot.querySelector("button");

    expect(button.hasAttribute("disabled")).toBe(false);
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(button.classList.contains("action-list-item--aria-disabled")).toBe(
      true
    );
  });

  it("hides suffix if swirlAriaDisabled", async () => {
    const page = await newSpecPage({
      components: [SwirlActionListItem],
      html: `<swirl-action-list-item label="Label" suffix="<swirl-icon-chevron-right></swirl-icon-chevron-right>" swirl-aria-disabled="true"></swirl-action-list-item>`,
    });

    expect(
      page.root.shadowRoot.querySelector(".action-list-item__suffix")
    ).toBeNull();
  });

  it("forwards swirlAriaDescription to aria-description on the button", async () => {
    const page = await newSpecPage({
      components: [SwirlActionListItem],
      html: `<swirl-action-list-item label="Label" swirl-aria-description="This action is currently disabled"></swirl-action-list-item>`,
    });

    expect(
      page.root.shadowRoot.querySelector("button").getAttribute("aria-description")
    ).toBe("This action is currently disabled");
  });

  it("forwards swirlAriaDescribedby to aria-describedby on the button", async () => {
    const page = await newSpecPage({
      components: [SwirlActionListItem],
      html: `<swirl-action-list-item label="Label" swirl-aria-describedby="tooltip-1"></swirl-action-list-item>`,
    });

    expect(
      page.root.shadowRoot.querySelector("button").getAttribute("aria-describedby")
    ).toBe("tooltip-1");
  });

  it("resolves swirlAriaDescribedby ids to elements via ariaDescribedByElements", async () => {
    const page = await newSpecPage({
      components: [SwirlActionListItem],
      html: `
        <swirl-action-list-item label="Label" swirl-aria-describedby="tooltip-1 tooltip-2"></swirl-action-list-item>
        <div id="tooltip-1">Reason one</div>
        <div id="tooltip-2">Reason two</div>
      `,
    });

    const button = page.root.shadowRoot.querySelector("button");
    const tooltip1 = page.body.querySelector("#tooltip-1");
    const tooltip2 = page.body.querySelector("#tooltip-2");

    expect(button.ariaDescribedByElements).toEqual([tooltip1, tooltip2]);
  });

  it("clears ariaDescribedByElements when swirlAriaDescribedby has no matching elements", async () => {
    const page = await newSpecPage({
      components: [SwirlActionListItem],
      html: `<swirl-action-list-item label="Label"></swirl-action-list-item>`,
    });

    const button = page.root.shadowRoot.querySelector("button");

    expect(button.ariaDescribedByElements).toBeNull();
  });

  it("prevents a click from bubbling to the host when swirlAriaDisabled is set", async () => {
    const page = await newSpecPage({
      components: [SwirlActionListItem],
      html: `<swirl-action-list-item label="Label" swirl-aria-disabled="true"></swirl-action-list-item>`,
    });

    const onClick = jest.fn();
    page.root.addEventListener("click", onClick);
    page.root.shadowRoot.querySelector("button").click();

    expect(onClick).not.toHaveBeenCalled();
  });

  it("lets a click bubble to the host when neither disabled prop is set", async () => {
    const page = await newSpecPage({
      components: [SwirlActionListItem],
      html: `<swirl-action-list-item label="Label"></swirl-action-list-item>`,
    });

    const onClick = jest.fn();
    page.root.addEventListener("click", onClick);
    page.root.shadowRoot.querySelector("button").click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
