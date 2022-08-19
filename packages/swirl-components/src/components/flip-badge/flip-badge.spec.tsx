import { newSpecPage } from "@stencil/core/testing";

import { FlipBadge } from "./flip-badge";

describe("flip-badge", () => {
  it("shows its label", async () => {
    const page = await newSpecPage({
      components: [FlipBadge],
      html: `<flip-badge label="Label"></flip-badge>`,
    });

    expect(page.root.shadowRoot.innerHTML).toMatchInlineSnapshot(
      `"<span class=\\"badge badge--intent-critical badge--size-m badge--variant-default\\"><span class=\\"badge__label\\">Label</span></span>"`
    );
  });

  it("shows its icon", async () => {
    const page = await newSpecPage({
      components: [FlipBadge],
      html: `<flip-badge label="Label" icon="<flip-icon-close></flip-icon-close>"></flip-badge>`,
    });

    expect(page.root.shadowRoot.innerHTML).toMatchInlineSnapshot(
      `"<span class=\\"badge badge--intent-critical badge--size-m badge--variant-default badge--has-icon\\"><span class=\\"badge__icon\\"><flip-icon-close></flip-icon-close></span></span>"`
    );

    expect(page.root.querySelector(".badge__icon")).toBeDefined();
    expect(page.root.querySelector(".badge__label")).toBeNull();
  });

  it("renders different intents", async () => {
    const page = await newSpecPage({
      components: [FlipBadge],
      html: `<flip-badge label="Label" intent="decorative-1"></flip-badge>`,
    });

    expect(
      page.root.shadowRoot.children[0].classList.contains(
        "badge--intent-decorative-1"
      )
    ).toBeTruthy();
  });

  it("renders different sizes", async () => {
    const page = await newSpecPage({
      components: [FlipBadge],
      html: `<flip-badge label="Label" size="s"></flip-badge>`,
    });

    expect(
      page.root.shadowRoot.children[0].classList.contains("badge--size-s")
    ).toBeTruthy();
  });

  it("renders different variants", async () => {
    const page = await newSpecPage({
      components: [FlipBadge],
      html: `<flip-badge label="Label" variant="dot"></flip-badge>`,
    });

    expect(
      page.root.shadowRoot.children[0].classList.contains("badge--variant-dot")
    ).toBeTruthy();
  });
});
