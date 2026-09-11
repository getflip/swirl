import { newSpecPage } from "@stencil/core/testing";

import { SwirlTableCell } from "./swirl-table-cell";

describe("swirl-table-cell", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [SwirlTableCell],
      html: `<swirl-table-cell>Cell</swirl-table-cell>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-table-cell class="table-cell" role="cell">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Cell
      </swirl-table-cell>
    `);
  });

  it("indents tree cells by level", async () => {
    const page = await newSpecPage({
      components: [SwirlTableCell],
      html: `<swirl-table-cell tree level="3">Cell</swirl-table-cell>`,
    });

    expect(page.root).toHaveClass("table-cell--tree");
    expect(
      page.root.style.getPropertyValue("--swirl-table-cell-tree-level")
    ).toBe("3");

    page.root.level = 0;
    await page.waitForChanges();

    expect(
      page.root.style.getPropertyValue("--swirl-table-cell-tree-level")
    ).toBe("0");
  });

  it("renders a focusable toggle for expandable rows and emits toggle", async () => {
    const page = await newSpecPage({
      components: [SwirlTableCell],
      html: `<swirl-table-cell tree expandable label="Engineering">Cell</swirl-table-cell>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("toggle", spy);

    const toggle = page.root.shadowRoot.querySelector<HTMLButtonElement>(
      ".table-cell__tree-toggle"
    );

    expect(toggle).toBeTruthy();
    expect(toggle.getAttribute("aria-label")).toBe("Expand Engineering");
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(toggle.querySelector("swirl-icon")?.getAttribute("glyph")).toBe(
      "chevron-right"
    );

    toggle.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ expanded: true });

    page.root.expanded = true;
    await page.waitForChanges();

    expect(toggle.getAttribute("aria-label")).toBe("Collapse Engineering");
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(toggle.querySelector("swirl-icon")?.getAttribute("glyph")).toBe(
      "expand-more"
    );

    toggle.click();

    expect(spy.mock.calls[1][0].detail).toEqual({ expanded: false });
  });

  it("hides link underlines until hover in tree cells", async () => {
    const page = await newSpecPage({
      components: [SwirlTableCell],
      html: `<swirl-table-cell tree expandable label="Group">Cell</swirl-table-cell>`,
    });

    expect(
      page.root.style.getPropertyValue("--swirl-link-text-decoration")
    ).toBe("none");
  });

  it("renders no toggle for leaf cells", async () => {
    const page = await newSpecPage({
      components: [SwirlTableCell],
      html: `<swirl-table-cell tree level="1">Leaf</swirl-table-cell>`,
    });

    expect(
      page.root.shadowRoot.querySelector(".table-cell__tree-toggle")
    ).toBeNull();
    expect(page.root).not.toHaveClass("table-cell--tree-expandable");
    expect(
      page.root.shadowRoot.querySelector(".table-cell__tree-content")
    ).toBeTruthy();
  });

  it("allows icon overrides", async () => {
    const page = await newSpecPage({
      components: [SwirlTableCell],
      html: `<swirl-table-cell tree expandable collapsed-icon="folder" expanded-icon="folder-open">Cell</swirl-table-cell>`,
    });

    const icon = page.root.shadowRoot.querySelector("swirl-icon");

    expect(icon.getAttribute("glyph")).toBe("folder");

    page.root.expanded = true;
    await page.waitForChanges();

    expect(icon.getAttribute("glyph")).toBe("folder-open");
  });
});
