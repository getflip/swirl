import { newSpecPage } from "@stencil/core/testing";

import { SwirlTag } from "./swirl-tag";

describe("swirl-tag", () => {
  it("renders the label", async () => {
    const page = await newSpecPage({
      components: [SwirlTag],
      html: `<swirl-tag intent="info" label="Label"></swirl-tag>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-tag intent="info" label="Label">
        <mock:shadow-root>
          <span class="tag tag--icon-position-start tag--intent-info tag--size-m tag--variant-default" part="tag">
            <span class="tag__label">
              Label
            </span>
          </span>
        </mock:shadow-root>
      </swirl-tag>
    `);
  });

  it("renders the label with icon", async () => {
    const page = await newSpecPage({
      components: [SwirlTag],
      html: `<swirl-tag intent="info" icon="<swirl-icon-mail></swirl-icon-mail>" label="Label"></swirl-tag>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-tag icon="<swirl-icon-mail></swirl-icon-mail>" intent="info" label="Label">
        <mock:shadow-root>
          <span class="tag tag--icon-position-start tag--intent-info tag--size-m tag--variant-default" part="tag">
            <span class="tag__icon">
              <swirl-icon-mail size="16"></swirl-icon-mail>
            </span>
            <span class="tag__label">
              Label
            </span>
          </span>
        </mock:shadow-root>
      </swirl-tag>
    `);
  });

  it("renders with hidden label", async () => {
    const page = await newSpecPage({
      components: [SwirlTag],
      html: `<swirl-tag hide-label="true" intent="info" label="Label"></swirl-tag>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-tag hide-label="true" intent="info" label="Label">
        <mock:shadow-root>
          <span class="tag tag--hide-label tag--icon-position-start tag--intent-info tag--size-m tag--variant-default" part="tag">
            <swirl-visually-hidden>
              Label
            </swirl-visually-hidden>
          </span>
        </mock:shadow-root>
      </swirl-tag>
    `);
  });

  it("renders the label with outline variant when bordered is set", async () => {
    const page = await newSpecPage({
      components: [SwirlTag],
      html: `<swirl-tag intent="info" icon="<swirl-icon-mail></swirl-icon-mail>" label="Label" variant="strong" bordered="true"></swirl-tag>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-tag icon="<swirl-icon-mail></swirl-icon-mail>" intent="info" label="Label" variant="strong" bordered="true">
        <mock:shadow-root>
          <span class="tag tag--icon-position-start tag--intent-info tag--size-m tag--variant-outline" part="tag">
            <span class="tag__icon">
              <swirl-icon-mail size="16"></swirl-icon-mail>
            </span>
            <span class="tag__label">
              Label
            </span>
          </span>
        </mock:shadow-root>
      </swirl-tag>
    `);
  });

  it("renders as button when interactive", async () => {
    const page = await newSpecPage({
      components: [SwirlTag],
      html: `<swirl-tag interactive="true" intent="info" label="Label"></swirl-tag>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-tag interactive="true" intent="info" label="Label">
        <mock:shadow-root>
          <button class="tag tag--icon-position-start tag--intent-info tag--interactive tag--size-m tag--variant-default" part="tag" type="button">
            <span class="tag__label">
              Label
            </span>
          </button>
        </mock:shadow-root>
      </swirl-tag>
    `);
  });

  it("emits tagClick when interactive", async () => {
    const page = await newSpecPage({
      components: [SwirlTag],
      html: `<swirl-tag interactive="true" label="Label"></swirl-tag>`,
    });

    const button = page.root.shadowRoot.querySelector("button");
    const spy = jest.fn();

    page.root.addEventListener("tagClick", spy);
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it("can be removed", async () => {
    const page = await newSpecPage({
      components: [SwirlTag],
      html: `<swirl-tag label="Label" removable="true" removal-button-label="Remove this one"></swirl-tag>`,
    });

    const removalButton = page.root.shadowRoot.querySelector("button");
    const spy = jest.fn();

    page.root.addEventListener("remove", spy);
    removalButton.click();

    expect(removalButton.getAttribute("aria-label")).toBe("Remove this one");
    expect(spy).toHaveBeenCalled();
  });
});
