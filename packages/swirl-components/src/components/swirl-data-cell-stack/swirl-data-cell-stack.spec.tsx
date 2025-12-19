import { newSpecPage } from "@stencil/core/testing";
import { SwirlDataCellStack } from "./swirl-data-cell-stack";

describe("swirl-data-cell-stack", () => {
  it("renders with label and description", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCellStack],
      html: `<swirl-data-cell-stack label="User Information" description="Basic user details"></swirl-data-cell-stack>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-data-cell-stack label="User Information" description="Basic user details">
        <mock:shadow-root>
          <div class="data-cell-stack" part="data-cell-stack">
            <div class="data-cell-stack__header">
              <div class="data-cell-stack__header-content">
                <div class="data-cell-stack__label">User Information</div>
                <div class="data-cell-stack__description">Basic user details</div>
              </div>
            </div>
            <div class="data-cell-stack__cells">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
      </swirl-data-cell-stack>
    `);
  });

  it("renders with label only", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCellStack],
      html: `<swirl-data-cell-stack label="User Information"></swirl-data-cell-stack>`,
    });

    const header = page.root.shadowRoot.querySelector(
      ".data-cell-stack__header"
    );
    expect(header).toBeTruthy();

    const label = page.root.shadowRoot.querySelector(".data-cell-stack__label");
    expect(label?.textContent).toBe("User Information");
  });

  it("renders with description only", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCellStack],
      html: `<swirl-data-cell-stack description="Basic user details"></swirl-data-cell-stack>`,
    });

    const header = page.root.shadowRoot.querySelector(
      ".data-cell-stack__header"
    );
    expect(header).toBeTruthy();

    const description = page.root.shadowRoot.querySelector(
      ".data-cell-stack__description"
    );
    expect(description?.textContent).toBe("Basic user details");
  });

  it("hides label when hideLabel is true", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCellStack],
      html: `<swirl-data-cell-stack label="User Information" hide-label></swirl-data-cell-stack>`,
    });

    const label = page.root.shadowRoot.querySelector(".data-cell-stack__label");
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
  });
});
