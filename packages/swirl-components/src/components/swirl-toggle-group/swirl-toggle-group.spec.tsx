import { newSpecPage } from "@stencil/core/testing";
import { SwirlToggleButton } from "../swirl-toggle-button/swirl-toggle-button";
import { SwirlToggleGroup } from "./swirl-toggle-group";

describe("swirl-toggle-group", () => {
  it("renders with the children", async () => {
    const page = await newSpecPage({
      components: [SwirlToggleGroup, SwirlToggleButton],
      html: `
        <swirl-toggle-group selected-toggle-id="toggle-2">
          <swirl-toggle-button identifier="toggle-1" label="Toggle #1"></swirl-toggle-button>
          <swirl-toggle-button identifier="toggle-2" label="Toggle #2"></swirl-toggle-button>
          <swirl-toggle-button identifier="toggle-3" label="Toggle #3"></swirl-toggle-button>
        </swirl-toggle-group>`,
    });

    const slot = page.root.shadowRoot.querySelector("slot");
    slot.dispatchEvent(new Event("slotchange"));

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <swirl-toggle-group selected-toggle-id=\"toggle-2\">
        <mock:shadow-root>
          <swirl-stack align=\"center\" class=\"toggle-group toggle-group--variant-flat\" orientation=\"horizontal\" role=\"group\" spacing=\"4\">
            <slot></slot>
          </swirl-stack>
        </mock:shadow-root>
        <swirl-toggle-button identifier="toggle-1" label="Toggle #1">
          <mock:shadow-root>
            <button aria-pressed="false" class="button" type="button">
              <span class="button__label">
                Toggle #1
              </span>
            </button>
          </mock:shadow-root>
        </swirl-toggle-button>
        <swirl-toggle-button identifier="toggle-2" label="Toggle #2">
          <mock:shadow-root>
            <button aria-pressed="true" class="button button--pressed" type="button">
              <span class="button__label">
                Toggle #2
              </span>
            </button>
          </mock:shadow-root>
        </swirl-toggle-button>
        <swirl-toggle-button identifier="toggle-3" label="Toggle #3">
          <mock:shadow-root>
            <button aria-pressed="false" class="button" type="button">
              <span class="button__label">
                Toggle #3
              </span>
            </button>
          </mock:shadow-root>
        </swirl-toggle-button>
      </swirl-toggle-group>
    `);
  });

  it("manages the pressed state of the toggle buttons", async () => {
    const page = await newSpecPage({
      components: [SwirlToggleGroup, SwirlToggleButton],
      html: `
        <swirl-toggle-group selected-toggle-id="toggle-2">
          <swirl-toggle-button identifier="toggle-1" label="Toggle #1"></swirl-toggle-button>
          <swirl-toggle-button identifier="toggle-2" label="Toggle #2"></swirl-toggle-button>
          <swirl-toggle-button identifier="toggle-3" label="Toggle #3"></swirl-toggle-button>
        </swirl-toggle-group>`,
    });

    const slot = page.root.shadowRoot.querySelector("slot");
    slot.dispatchEvent(new Event("slotchange"));

    await page.waitForChanges();

    const toggleButtons = Array.from(
      page.root.querySelectorAll("swirl-toggle-button")
    );

    // Only the second button should be pressed
    expect(toggleButtons[0].isPressed).toEqual(false);
    expect(toggleButtons[1].isPressed).toEqual(true);
    expect(toggleButtons[2].isPressed).toEqual(false);

    toggleButtons[0].click();

    await page.waitForChanges();

    // Only the first button should be pressed
    expect(toggleButtons[0].isPressed).toEqual(true);
    expect(toggleButtons[1].isPressed).toEqual(false);
    expect(toggleButtons[2].isPressed).toEqual(false);
  });
});
