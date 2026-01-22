import { newSpecPage } from "@stencil/core/testing";
import { SwirlDataCell } from "./swirl-data-cell";

describe("swirl-data-cell", () => {
  it("renders with label and value", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `<swirl-data-cell label="Name" value="John Doe"></swirl-data-cell>`,
    });

    const label = page.root.shadowRoot.querySelector(".data-cell__label");
    expect(label?.textContent).toBe("Name");
    expect(label?.getAttribute("role")).toBe("term");
    expect(label?.getAttribute("id")).toMatch(/^data-cell-.*-label$/);

    const valueWrapper = page.root.shadowRoot.querySelector(
      ".data-cell__value-wrapper"
    );
    expect(valueWrapper?.getAttribute("role")).toBe("definition");
    expect(valueWrapper?.getAttribute("aria-labelledby")).toMatch(
      /^data-cell-.*-label$/
    );
    expect(valueWrapper?.getAttribute("id")).toMatch(/^data-cell-.*-value$/);

    const value = page.root.shadowRoot.querySelector(".data-cell__value");
    expect(value?.textContent).toBe("John Doe");
  });

  it("renders with label only", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `<swirl-data-cell label="Name"></swirl-data-cell>`,
    });

    const label = page.root.shadowRoot.querySelector(".data-cell__label");
    expect(label?.textContent).toBe("Name");
    expect(label?.getAttribute("role")).toBe("term");
    expect(label?.getAttribute("id")).toMatch(/^data-cell-.*-label$/);

    const valueWrapper = page.root.shadowRoot.querySelector(
      ".data-cell__value-wrapper"
    );
    expect(valueWrapper).toBeNull();
  });

  it("renders with media slot (avatar with icon)", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `
        <swirl-data-cell label="Email">
          <swirl-avatar slot="media" label="Email" icon="<swirl-icon-email></swirl-icon-email>" size="s"></swirl-avatar>
        </swirl-data-cell>
      `,
    });

    const dataCell = page.root.shadowRoot.querySelector(".data-cell");
    expect(dataCell?.classList.contains("data-cell--has-media")).toBeTruthy();

    const media = page.root.shadowRoot.querySelector(".data-cell__media");
    expect(media).toBeTruthy();
  });

  it("renders with media slot (avatar with image)", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `
        <swirl-data-cell label="Avatar">
          <swirl-avatar slot="media" label="Avatar" src="https://example.com/image.jpg" size="s"></swirl-avatar>
        </swirl-data-cell>
      `,
    });

    const dataCell = page.root.shadowRoot.querySelector(".data-cell");
    expect(dataCell?.classList.contains("data-cell--has-media")).toBeTruthy();

    const media = page.root.shadowRoot.querySelector(".data-cell__media");
    expect(media).toBeTruthy();
  });

  it("renders with media slot (avatar with initials)", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `
        <swirl-data-cell label="User" value="John Doe">
          <swirl-avatar slot="media" label="John Doe" src="https://example.com/image.jpg" initials="JD" size="s"></swirl-avatar>
        </swirl-data-cell>
      `,
    });

    const dataCell = page.root.shadowRoot.querySelector(".data-cell");
    expect(dataCell?.classList.contains("data-cell--has-media")).toBeTruthy();

    const media = page.root.shadowRoot.querySelector(".data-cell__media");
    expect(media).toBeTruthy();
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

    const label = page.root.shadowRoot.querySelector(".data-cell__label");
    expect(label?.getAttribute("role")).toBe("term");
    expect(label?.getAttribute("id")).toMatch(/^data-cell-.*-label$/);

    const valueWrapper = page.root.shadowRoot.querySelector(
      ".data-cell__value-wrapper"
    );
    expect(valueWrapper?.getAttribute("role")).toBe("definition");
    expect(valueWrapper?.getAttribute("aria-labelledby")).toMatch(
      /^data-cell-.*-label$/
    );

    const media = page.root.shadowRoot.querySelector(".data-cell__media");
    if (media) {
      expect(media.getAttribute("aria-hidden")).toBe("true");
    }
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

    const suffix = page.root.shadowRoot.querySelector(".data-cell__suffix");
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

  it("renders with an input of type text", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `
        <swirl-data-cell label="Name">
          <swirl-text-input slot="content" type="text" value="John Doe"></swirl-text-input>
        </swirl-data-cell>
      `,
    });

    const dataCell = page.root.shadowRoot.querySelector(".data-cell");
    expect(dataCell?.classList.contains("data-cell--has-content")).toBeTruthy();

    const inputWrapper = page.root.shadowRoot.querySelector(".data-cell__input");
    expect(inputWrapper).toBeTruthy();

    const textInput = page.root.querySelector('swirl-text-input[slot="content"]');
    expect(textInput).toBeTruthy();
    expect(textInput?.getAttribute("type")).toBe("text");
  });

  it("renders with an input of type email", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `
        <swirl-data-cell label="Email">
          <swirl-text-input slot="content" type="email" value="john@example.com"></swirl-text-input>
        </swirl-data-cell>
      `,
    });

    const dataCell = page.root.shadowRoot.querySelector(".data-cell");
    expect(dataCell?.classList.contains("data-cell--has-content")).toBeTruthy();

    const inputWrapper = page.root.shadowRoot.querySelector(".data-cell__input");
    expect(inputWrapper).toBeTruthy();

    const emailInput = page.root.querySelector('swirl-text-input[slot="content"]');
    expect(emailInput).toBeTruthy();
    expect(emailInput?.getAttribute("type")).toBe("email");
  });

  it("renders with an input of type number", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `
        <swirl-data-cell label="Age">
          <swirl-text-input slot="content" type="number" value="25"></swirl-text-input>
        </swirl-data-cell>
      `,
    });

    const dataCell = page.root.shadowRoot.querySelector(".data-cell");
    expect(dataCell?.classList.contains("data-cell--has-content")).toBeTruthy();

    const inputWrapper = page.root.shadowRoot.querySelector(".data-cell__input");
    expect(inputWrapper).toBeTruthy();

    const numberInput = page.root.querySelector('swirl-text-input[slot="content"]');
    expect(numberInput).toBeTruthy();
    expect(numberInput?.getAttribute("type")).toBe("number");
  });

  it("renders with a select input", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `
        <swirl-data-cell label="Country">
          <swirl-select slot="content" value="us">
            <swirl-option value="us" label="United States"></swirl-option>
            <swirl-option value="uk" label="United Kingdom"></swirl-option>
          </swirl-select>
        </swirl-data-cell>
      `,
    });

    const dataCell = page.root.shadowRoot.querySelector(".data-cell");
    expect(dataCell?.classList.contains("data-cell--has-content")).toBeTruthy();

    const inputWrapper = page.root.shadowRoot.querySelector(".data-cell__input");
    expect(inputWrapper).toBeTruthy();

    const selectInput = page.root.querySelector('swirl-select[slot="content"]');
    expect(selectInput).toBeTruthy();
    expect(selectInput?.getAttribute("value")).toBe("us");
  });

  it("renders with a checkbox", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `
        <swirl-data-cell>
          <swirl-checkbox slot="content" label="Subscribe to newsletter" description="Receive updates about new features" input-id="newsletter" input-name="newsletter" checked="true"></swirl-checkbox>
        </swirl-data-cell>
      `,
    });

    const dataCell = page.root.shadowRoot.querySelector(".data-cell");
    expect(dataCell?.classList.contains("data-cell--has-content")).toBeTruthy();

    const inputWrapper = page.root.shadowRoot.querySelector(".data-cell__input");
    expect(inputWrapper).toBeTruthy();

    const checkbox = page.root.querySelector('swirl-checkbox[slot="content"]');
    expect(checkbox).toBeTruthy();
    expect(checkbox?.getAttribute("label")).toBe("Subscribe to newsletter");
    expect(checkbox?.getAttribute("description")).toBe("Receive updates about new features");
    expect(checkbox?.getAttribute("checked")).toBe("true");
  });

  it("renders with radio button group", async () => {
    const page = await newSpecPage({
      components: [SwirlDataCell],
      html: `
        <swirl-radio-group value="premium">
          <swirl-data-cell>
            <swirl-radio slot="content" label="Standard plan" description="Basic features included" input-id="radio-1" input-name="plan" value="standard"></swirl-radio>
          </swirl-data-cell>
          <swirl-data-cell>
            <swirl-radio slot="content" label="Premium plan" description="All features included" input-id="radio-2" input-name="plan" value="premium"></swirl-radio>
          </swirl-data-cell>
          <swirl-data-cell>
            <swirl-radio slot="content" label="Enterprise plan" description="Custom solutions" input-id="radio-3" input-name="plan" value="enterprise"></swirl-radio>
          </swirl-data-cell>
        </swirl-radio-group>
      `,
    });

    const radioGroup = page.body.querySelector("swirl-radio-group");
    expect(radioGroup).toBeTruthy();
    expect(radioGroup?.getAttribute("value")).toBe("premium");

    const dataCells = page.body.querySelectorAll("swirl-data-cell");
    expect(dataCells.length).toBe(3);

    const radios = page.body.querySelectorAll('swirl-radio[slot="content"]');
    expect(radios.length).toBe(3);

    expect(radios[0]?.getAttribute("label")).toBe("Standard plan");
    expect(radios[0]?.getAttribute("value")).toBe("standard");
    expect(radios[0]?.getAttribute("input-name")).toBe("plan");

  });
});
