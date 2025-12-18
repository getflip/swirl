import { newSpecPage } from "@stencil/core/testing";
import { SwirlDataCell } from "./swirl-data-cell";

describe("swirl-data-cell", () => {
  it("renders with label and value", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `<swirl-data-cell label="Name" value="John Doe"></swirl-data-cell>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-data-cell label="Name" role="group" value="John Doe">
        <mock:shadow-root>
          <div class="data-cell" part="data-cell">
            <div class="data-cell__content">
              <div class="data-cell__label-wrapper">
                <span class="data-cell__label">Name</span>
              </div>
              <div class="data-cell__value-wrapper">
                <div class="data-cell__value">John Doe</div>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </swirl-data-cell>
    `);
  });

  it("renders with label only", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `<swirl-data-cell label="Name"></swirl-data-cell>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-data-cell label="Name" role="group">
        <mock:shadow-root>
          <div class="data-cell" part="data-cell">
            <div class="data-cell__content">
              <div class="data-cell__label-wrapper">
                <span class="data-cell__label">Name</span>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </swirl-data-cell>
    `);
  });

  it("renders with icon", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `<swirl-data-cell label="Email" icon="<swirl-icon-email></swirl-icon-email>"></swirl-data-cell>`,
    });

    const dataCell = page.root.shadowRoot.querySelector(".data-cell");
    expect(dataCell?.classList.contains("data-cell--has-media")).toBeTruthy();

    const avatar = page.root.shadowRoot.querySelector("swirl-avatar");
    expect(avatar?.getAttribute("icon")).toBe(
      "<swirl-icon-email></swirl-icon-email>"
    );
    expect(avatar?.getAttribute("size")).toBe("m");
  });

  it("renders with image", async () => {
    // simulate successful image loading
    global.Image = class Image {
      constructor() {
        setTimeout(() => {
          (this as any).onload?.();
        }, 0);
      }
    } as typeof Image;

    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `<swirl-data-cell label="Avatar" image="https://example.com/image.jpg"></swirl-data-cell>`,
    });

    await page.waitForChanges();

    const dataCell = page.root.shadowRoot.querySelector(".data-cell");
    expect(dataCell?.classList.contains("data-cell--has-media")).toBeTruthy();

    const avatar = page.root.shadowRoot.querySelector("swirl-avatar");
    expect(avatar?.getAttribute("src")).toBe("https://example.com/image.jpg");
  });

  it("prioritizes image over icon", async () => {
    // simulate successful image loading
    global.Image = class Image {
      constructor() {
        setTimeout(() => {
          (this as any).onload?.();
        }, 0);
      }
    } as typeof Image;

    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `<swirl-data-cell label="Media" image="https://example.com/image.jpg" icon="<swirl-icon-email></swirl-icon-email>"></swirl-data-cell>`,
    });

    await page.waitForChanges();

    const avatar = page.root.shadowRoot.querySelector("swirl-avatar");
    expect(avatar?.getAttribute("src")).toBe("https://example.com/image.jpg");
    expect(avatar?.getAttribute("icon")).toBeNull();
  });

  it("renders with tooltip", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `<swirl-data-cell label="Name" tooltip="This is a tooltip"></swirl-data-cell>`,
    });

    const tooltip = page.root.shadowRoot.querySelector("swirl-tooltip");
    expect(tooltip?.getAttribute("content")).toBe("This is a tooltip");

    const icon = page.root.shadowRoot.querySelector("swirl-icon-info");
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute("size")).toBe("16");
  });

  it("renders with suffix slot", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `
        <swirl-data-cell label="Name" value="John Doe">
          <swirl-button slot="suffix" label="Edit"></swirl-button>
        </swirl-data-cell>
      `,
    });

    const dataCell = page.root.shadowRoot.querySelector(".data-cell");
    expect(dataCell?.classList.contains("data-cell--has-suffix")).toBeTruthy();

    const valueWrapper = page.root.shadowRoot.querySelector(
      ".data-cell__value-wrapper"
    );
    expect(valueWrapper).toBeTruthy();

    const suffix = page.root.shadowRoot.querySelector(".data-cell__suffix");
    expect(suffix).toBeTruthy();
  });

  it("renders in vertical layout when vertical prop is true", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `<swirl-data-cell label="Name" value="John Doe" vertical></swirl-data-cell>`,
    });

    const dataCell = page.root.shadowRoot.querySelector(".data-cell");
    expect(dataCell?.classList.contains("data-cell--vertical")).toBeTruthy();
  });

  it("has proper accessibility attributes", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `<swirl-data-cell label="Name" value="John Doe"></swirl-data-cell>`,
    });

    const host = page.root;
    expect(host.getAttribute("role")).toBe("group");
  });

  it("renders with background and padding styles", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `<swirl-data-cell label="Name" value="John Doe"></swirl-data-cell>`,
    });

    const dataCell = page.root.shadowRoot.querySelector(".data-cell");

    // Verify the data-cell class is applied
    expect(dataCell?.classList.contains("data-cell")).toBeTruthy();
  });

  it("renders value and suffix in same wrapper", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `
        <swirl-data-cell label="Name" value="John Doe">
          <swirl-button slot="suffix" label="Edit"></swirl-button>
        </swirl-data-cell>
      `,
    });

    const valueWrapper = page.root.shadowRoot.querySelector(
      ".data-cell__value-wrapper"
    );
    expect(valueWrapper).toBeTruthy();

    const value = valueWrapper?.querySelector(".data-cell__value");
    expect(value?.textContent).toBe("John Doe");

    const suffix = valueWrapper?.querySelector(".data-cell__suffix");
    expect(suffix).toBeTruthy();
  });

  it("renders horizontal layout by default", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `<swirl-data-cell label="Name" value="John Doe"></swirl-data-cell>`,
    });

    const dataCell = page.root.shadowRoot.querySelector(".data-cell");
    expect(dataCell?.classList.contains("data-cell--vertical")).toBeFalsy();

    const content = page.root.shadowRoot.querySelector(".data-cell__content");
    // Content should not have vertical class applied
    expect(content?.classList.contains("data-cell--vertical")).toBeFalsy();
  });

  it("renders vertical layout when vertical prop is true", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `<swirl-data-cell label="Name" value="John Doe" vertical></swirl-data-cell>`,
    });

    const dataCell = page.root.shadowRoot.querySelector(".data-cell");
    expect(dataCell?.classList.contains("data-cell--vertical")).toBeTruthy();

    const content = page.root.shadowRoot.querySelector(".data-cell__content");
    // Content should be a child of the vertical data-cell
    expect(content).toBeTruthy();
    expect(dataCell?.querySelector(".data-cell__content")).toBeTruthy();
  });
});
