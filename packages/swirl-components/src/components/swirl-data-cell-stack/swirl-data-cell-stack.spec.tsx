import { newSpecPage } from "@stencil/core/testing";
import { SwirlDataCellStack } from "./swirl-data-cell-stack";

describe("swirl-data-cell-stack", () => {
  it("renders with label and description", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCellStack],
      html: `<swirl-data-cell-stack label="User Information" description="Basic user details"></swirl-data-cell-stack>`,
    });

    const stack = page.root.shadowRoot.querySelector(".data-cell-stack");
    expect(stack?.getAttribute("role")).toBe("group");

    const header = page.root.shadowRoot.querySelector(
      "header.data-cell-stack__header"
    );
    expect(header).toBeTruthy();
    expect(header?.getAttribute("id")).toMatch(/^data-cell-stack-header-/);

    const label = page.root.shadowRoot.querySelector(
      "h3.data-cell-stack__label"
    );
    expect(label?.textContent).toBe("User Information");
    expect(label?.getAttribute("id")).toMatch(
      /^data-cell-stack-header-.*-label$/
    );

    const description = page.root.shadowRoot.querySelector(
      "p.data-cell-stack__description"
    );
    expect(description?.textContent).toBe("Basic user details");
    expect(description?.getAttribute("id")).toMatch(
      /^data-cell-stack-header-.*-description$/
    );

    const cells = page.root.shadowRoot.querySelector(".data-cell-stack__cells");
    expect(cells?.getAttribute("role")).toBe("list");
    expect(cells?.getAttribute("aria-labelledby")).toMatch(
      /^data-cell-stack-header-.*-label$/
    );
    expect(cells?.getAttribute("aria-describedby")).toMatch(
      /^data-cell-stack-header-.*-description$/
    );
  });

  it("renders with label only", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCellStack],
      html: `<swirl-data-cell-stack label="User Information"></swirl-data-cell-stack>`,
    });

    const header = page.root.shadowRoot.querySelector(
      "header.data-cell-stack__header"
    );
    expect(header).toBeTruthy();

    const label = page.root.shadowRoot.querySelector(
      "h3.data-cell-stack__label"
    );
    expect(label?.textContent).toBe("User Information");
    expect(label?.getAttribute("id")).toMatch(
      /^data-cell-stack-header-.*-label$/
    );

    const cells = page.root.shadowRoot.querySelector(".data-cell-stack__cells");
    expect(cells?.getAttribute("aria-labelledby")).toMatch(
      /^data-cell-stack-header-.*-label$/
    );
  });

  it("renders with description only", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCellStack],
      html: `<swirl-data-cell-stack description="Basic user details"></swirl-data-cell-stack>`,
    });

    const header = page.root.shadowRoot.querySelector(
      "header.data-cell-stack__header"
    );
    expect(header).toBeTruthy();

    const description = page.root.shadowRoot.querySelector(
      "p.data-cell-stack__description"
    );
    expect(description?.textContent).toBe("Basic user details");
    expect(description?.getAttribute("id")).toMatch(
      /^data-cell-stack-header-.*-description$/
    );

    const cells = page.root.shadowRoot.querySelector(".data-cell-stack__cells");
    expect(cells?.getAttribute("aria-describedby")).toMatch(
      /^data-cell-stack-header-.*-description$/
    );
  });

  it("hides label when hideLabel is true", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCellStack],
      html: `<swirl-data-cell-stack label="User Information" hide-label></swirl-data-cell-stack>`,
    });

    const label = page.root.shadowRoot.querySelector(
      "h3.data-cell-stack__label"
    );
    expect(label).toBeNull();
  });

  it("renders with CTA slot", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCellStack],
      html: `
        <swirl-data-cell-stack label="User Information">
          <swirl-button slot="cta" label="Edit"></swirl-button>
        </swirl-data-cell-stack>
      `,
    });

    const dataCellStack =
      page.root.shadowRoot.querySelector(".data-cell-stack");
    expect(
      dataCellStack?.classList.contains("data-cell-stack--has-cta")
    ).toBeTruthy();

    const cta = page.root.shadowRoot.querySelector(".data-cell-stack__cta");
    expect(cta).toBeTruthy();
  });

  it("renders without header when no label or description", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCellStack],
      html: `<swirl-data-cell-stack></swirl-data-cell-stack>`,
    });

    const header = page.root.shadowRoot.querySelector(
      ".data-cell-stack__header"
    );
    expect(header).toBeNull();
  });

  it("renders cells slot", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCellStack],
      html: `
        <swirl-data-cell-stack>
          <swirl-data-cell label="Name" value="John Doe"></swirl-data-cell>
        </swirl-data-cell-stack>
      `,
    });

    const cells = page.root.shadowRoot.querySelector(".data-cell-stack__cells");
    expect(cells).toBeTruthy();
    expect(cells?.getAttribute("role")).toBe("list");
  });
});
