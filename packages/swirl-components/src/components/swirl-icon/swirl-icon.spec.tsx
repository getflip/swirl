import { newSpecPage } from "@stencil/core/testing";

import { SwirlIconEdit } from "./icons/swirl-icon-edit";
import { SwirlIcon } from "./swirl-icon";

describe("swirl-icon", () => {
  it("renders without wrapper", async () => {
    const page = await newSpecPage({
      components: [SwirlIcon, SwirlIconEdit],
      html: `<swirl-icon glyph="edit"></swirl-icon>`,
    });

    const icon = page.root.shadowRoot.querySelector("swirl-icon-edit");
    expect(icon).toBeTruthy();
    expect(page.root.shadowRoot.querySelector(".icon-wrapper")).toBeNull();
  });

  it("renders with wrapper when wrapperColor is passed", async () => {
    const page = await newSpecPage({
      components: [SwirlIcon, SwirlIconEdit],
      html: `<swirl-icon glyph="edit" wrapper-color="blueberry" wrapper-size="xl"></swirl-icon>`,
    });

    const wrapper = page.root.shadowRoot.querySelector(".icon-wrapper");
    expect(wrapper).toBeTruthy();

    const icon = wrapper?.querySelector("swirl-icon-edit");
    expect(icon).toBeTruthy();
  });

  it("applies wrapperSize prop correctly", async () => {
    const page = await newSpecPage({
      components: [SwirlIcon, SwirlIconEdit],
      html: `<swirl-icon glyph="edit" wrapper-color="blueberry" wrapper-size="2xl"></swirl-icon>`,
    });

    const wrapper = page.root.shadowRoot.querySelector(".icon-wrapper");
    expect(wrapper).toBeTruthy();
    expect(wrapper?.classList.contains("icon-wrapper--size-2xl")).toBe(true);
  });

  it("applies backgroundColor prop correctly", async () => {
    const page = await newSpecPage({
      components: [SwirlIcon, SwirlIconEdit],
      html: `<swirl-icon glyph="edit" wrapper-color="blueberry"></swirl-icon>`,
    });

    const wrapper = page.root.shadowRoot.querySelector(".icon-wrapper");
    expect(wrapper).toBeTruthy();
    expect(
      wrapper?.classList.contains("icon-wrapper--background-color-blueberry")
    ).toBe(true);
  });

  it("does not pass color to child icon when only wrapperColor is set", async () => {
    const page = await newSpecPage({
      components: [SwirlIcon, SwirlIconEdit],
      html: `<swirl-icon glyph="edit" wrapper-color="blueberry"></swirl-icon>`,
    });

    const wrapper = page.root.shadowRoot.querySelector(".icon-wrapper");
    const icon = wrapper?.querySelector("swirl-icon-edit");
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute("color")).toBeNull();
  });

  it("passes explicit color to child icon even when wrapperColor is set", async () => {
    const page = await newSpecPage({
      components: [SwirlIcon, SwirlIconEdit],
      html: `<swirl-icon glyph="edit" wrapper-color="blueberry" color="critical"></swirl-icon>`,
    });

    const wrapper = page.root.shadowRoot.querySelector(".icon-wrapper");
    const icon = wrapper?.querySelector("swirl-icon-edit") as any;
    expect(icon).toBeTruthy();
    expect(icon?.color).toBe("critical");
  });

  it("renders the SVG as decorative when no label is provided", async () => {
    const page = await newSpecPage({
      components: [SwirlIcon, SwirlIconEdit],
      html: `<swirl-icon glyph="edit"></swirl-icon>`,
    });

    const svg = page.root.shadowRoot
      .querySelector("swirl-icon-edit")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
    expect(svg?.getAttribute("role")).toBeNull();
    expect(svg?.querySelector("title")).toBeNull();
  });

  it("renders the SVG as a labeled image when label is provided", async () => {
    const page = await newSpecPage({
      components: [SwirlIcon, SwirlIconEdit],
      html: `<swirl-icon glyph="edit" label="Edit"></swirl-icon>`,
    });

    const icon = page.root.shadowRoot.querySelector("swirl-icon-edit") as any;
    expect(icon?.label).toBe("Edit");

    const svg = icon?.shadowRoot?.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute("aria-hidden")).toBeNull();
    expect(svg?.getAttribute("role")).toBe("img");
    expect(svg?.querySelector("title")?.textContent).toBe("Edit");
  });

  it("forwards the label through the wrapper branch", async () => {
    const page = await newSpecPage({
      components: [SwirlIcon, SwirlIconEdit],
      html: `<swirl-icon glyph="edit" label="Edit" wrapper-color="blueberry"></swirl-icon>`,
    });

    const icon = page.root.shadowRoot
      .querySelector(".icon-wrapper")
      ?.querySelector("swirl-icon-edit") as any;
    expect(icon?.label).toBe("Edit");
  });
});
