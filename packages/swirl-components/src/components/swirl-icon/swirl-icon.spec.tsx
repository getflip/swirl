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
});
