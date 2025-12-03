import { newSpecPage } from "@stencil/core/testing";

import { SwirlAccordionItem } from "./swirl-accordion-item";

describe("swirl-accordion-item", () => {
  it("renders heading and description", async () => {
    const page = await newSpecPage({
      components: [SwirlAccordionItem],
      html: `
        <swirl-accordion>
          <swirl-accordion-item description="Description" heading="heading" item-id="item-id">
          <div slot="trailing">trailing</div>
            Content
          </swirl-accordion-item>
        </swirl-accordion>
      `,
    });

    const headingId = page.root.shadowRoot.querySelector(
      ".accordion-item__toggle"
    ).id;

    expect(page.root).toEqualHtml(`
      <swirl-accordion-item description="Description" heading="heading" item-id="item-id">
        <mock:shadow-root>
          <div class="accordion-item">
            <h2 class="accordion-item__heading">
              <button aria-controls="item-id" aria-expanded="false" class="accordion-item__toggle" id="${headingId}" type="button">
                <slot name="media"></slot>
                <span class="accordion-item__toggle-text">
                  heading
                  <swirl-text as="span" color="subdued" size="sm">
                    Description
                  </swirl-text>
                </span>
                <slot name="trailing"></slot>
                <span class="accordion-item__icon">
                  <swirl-icon glyph="chevron-right" size="20"></swirl-icon>
                </span>
              </button>
            </h2>
            <div aria-labelledby="${headingId}" class="accordion-item__content" id="item-id" role="region">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
        <div slot="trailing">trailing</div>
        Content
      </swirl-accordion-item>
    `);
  });

  it("can be toggled", async () => {
    const page = await newSpecPage({
      components: [SwirlAccordionItem],
      html: `
        <swirl-accordion>
          <swirl-accordion-item description="Description" heading="heading">
            Content
          </swirl-accordion-item>
        </swirl-accordion>
      `,
    });

    expect(
      page.root.shadowRoot
        .querySelector(".accordion-item")
        .classList.contains("accordion-item--expanded")
    ).toBe(false);

    const toggle = page.root.shadowRoot.querySelector<HTMLButtonElement>(
      ".accordion-item__toggle"
    );

    toggle.click();
    await page.waitForChanges();

    expect(
      page.root.shadowRoot
        .querySelector(".accordion-item")
        .classList.contains("accordion-item--expanded")
    ).toBe(true);

    toggle.click();
    await page.waitForChanges();

    expect(
      page.root.shadowRoot
        .querySelector(".accordion-item")
        .classList.contains("accordion-item--expanded")
    ).toBe(false);
  });

  it("fires expansionChange events", async () => {
    const page = await newSpecPage({
      components: [SwirlAccordionItem],
      html: `
        <swirl-accordion>
          <swirl-accordion-item description="Description" heading="heading">
            Content
          </swirl-accordion-item>
        </swirl-accordion>
      `,
    });

    const spy = jest.fn();

    page.root.addEventListener("expansionChange", spy);

    const toggle = page.root.shadowRoot.querySelector<HTMLButtonElement>(
      ".accordion-item__toggle"
    );

    toggle.click();
    expect(spy.mock.calls[0][0].detail).toBe(true);

    toggle.click();
    expect(spy.mock.calls[1][0].detail).toBe(false);
  });
});
