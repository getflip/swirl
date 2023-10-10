import { newSpecPage } from "@stencil/core/testing";

import { SwirlAccordion } from "./swirl-accordion";
import { SwirlAccordionItem } from "../swirl-accordion-item/swirl-accordion-item";

describe("swirl-accordion", () => {
  it("renders its items", async () => {
    const page = await newSpecPage({
      components: [SwirlAccordion],
      html: `
        <swirl-accordion>
          <swirl-accordion-item description="Description" heading="Heading 1">
            Content 1
          </swirl-accordion-item>
          <swirl-accordion-item description="Description" heading="Heading 2">
            Content 2
          </swirl-accordion-item>
          <swirl-accordion-item description="Description" heading="Heading 3">
            Content 3
          </swirl-accordion-item>
        </swirl-accordion>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-accordion>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <swirl-accordion-item description="Description" heading="Heading 1">
          Content 1
        </swirl-accordion-item>
        <swirl-accordion-item description="Description" heading="Heading 2">
          Content 2
        </swirl-accordion-item>
        <swirl-accordion-item description="Description" heading="Heading 3">
          Content 3
        </swirl-accordion-item>
      </swirl-accordion>
    `);
  });

  it("renders only allows one expanded item", async () => {
    const page = await newSpecPage({
      components: [SwirlAccordion, SwirlAccordionItem],
      html: `
        <swirl-accordion>
          <swirl-accordion-item description="Description" heading="Heading 1" initially-open>
            Content 1
          </swirl-accordion-item>
          <swirl-accordion-item description="Description" heading="Heading 2">
            Content 2
          </swirl-accordion-item>
          <swirl-accordion-item description="Description" heading="Heading 3">
            Content 3
          </swirl-accordion-item>
        </swirl-accordion>
      `,
    });

    const items = page.root.querySelectorAll("swirl-accordion-item");

    expect(
      items[0].shadowRoot.querySelector(".accordion-item--expanded")
    ).toBeTruthy();
    expect(
      items[1].shadowRoot.querySelector(".accordion-item--expanded")
    ).toBeFalsy();
    expect(
      items[2].shadowRoot.querySelector(".accordion-item--expanded")
    ).toBeFalsy();

    const secondItemToggle =
      items[1].shadowRoot.querySelector<HTMLButtonElement>(
        ".accordion-item__toggle"
      );

    secondItemToggle.click();
    await page.waitForChanges();

    expect(
      items[0].shadowRoot.querySelector(".accordion-item--expanded")
    ).toBeFalsy();
    expect(
      items[1].shadowRoot.querySelector(".accordion-item--expanded")
    ).toBeTruthy();
    expect(
      items[2].shadowRoot.querySelector(".accordion-item--expanded")
    ).toBeFalsy();
  });
});
