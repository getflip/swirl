import { newSpecPage } from "@stencil/core/testing";

import { SwirlBadge } from "./swirl-badge";

describe("swirl-badge", () => {
  it("shows its label", async () => {
    const page = await newSpecPage({
      components: [SwirlBadge],
      html: `<swirl-badge label="Label"></swirl-badge>`,
    });

    expect(page.root.shadowRoot.innerHTML).toMatchInlineSnapshot(
      `"<span class=\\"badge badge--intent-critical badge--size-m badge--variant-default\\"><span class=\\"badge__label\\">Label</span></span>"`
    );
  });

  it("shows its icon", async () => {
    const page = await newSpecPage({
      components: [SwirlBadge],
      html: `<swirl-badge label="Label" icon="<swirl-icon-close></swirl-icon-close>"></swirl-badge>`,
    });

    expect(page.root.shadowRoot.innerHTML).toMatchInlineSnapshot(
      `"<span class=\\"badge badge--intent-critical badge--size-m badge--variant-default badge--has-icon\\"><span class=\\"badge__icon\\"><swirl-icon-close></swirl-icon-close></span></span>"`
    );

    expect(page.root.querySelector(".badge__icon")).toBeDefined();
    expect(page.root.querySelector(".badge__label")).toBeNull();
  });

  it("renders different intents", async () => {
    const page = await newSpecPage({
      components: [SwirlBadge],
      html: `<swirl-badge label="Label" intent="decorative-1"></swirl-badge>`,
    });

    expect(
      page.root.shadowRoot.children[0].classList.contains(
        "badge--intent-decorative-1"
      )
    ).toBeTruthy();
  });

  it("renders different sizes", async () => {
    const page = await newSpecPage({
      components: [SwirlBadge],
      html: `<swirl-badge label="Label" size="s"></swirl-badge>`,
    });

    expect(
      page.root.shadowRoot.children[0].classList.contains("badge--size-s")
    ).toBeTruthy();
  });

  it("renders different variants", async () => {
    const page = await newSpecPage({
      components: [SwirlBadge],
      html: `<swirl-badge label="Label" variant="dot"></swirl-badge>`,
    });

    expect(
      page.root.shadowRoot.children[0].classList.contains("badge--variant-dot")
    ).toBeTruthy();
  });
});
