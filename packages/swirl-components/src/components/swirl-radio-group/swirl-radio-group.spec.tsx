import { newSpecPage } from "@stencil/core/testing";

import { SwirlRadioGroup } from "./swirl-radio-group";

describe("swirl-radio-group", () => {
  it("renders its radio buttons", async () => {
    const page = await newSpecPage({
      components: [SwirlRadioGroup],
      html: `
        <swirl-radio-group aria-label="Radio group">
          <swirl-radio input-id="radio-1" input-name="radio" label="Radio button #1" value="1"></swirl-radio>
          <swirl-radio input-id="radio-2" input-name="radio" label="Radio button #2" value="2"></swirl-radio>
          <swirl-radio input-id="radio-3" input-name="radio" label="Radio button #3" value="3"></swirl-radio>
        </swirl-radio-group>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-radio-group aria-label=\"Radio group\" role=\"radiogroup\">
        <div class=\"radio-group\">
          <swirl-radio input-id=\"radio-1\" input-name=\"radio\" label=\"Radio button #1\" value=\"1\"></swirl-radio>
          <swirl-radio input-id=\"radio-2\" input-name=\"radio\" label=\"Radio button #2\" value=\"2\"></swirl-radio>
          <swirl-radio input-id=\"radio-3\" input-name=\"radio\" label=\"Radio button #3\" value=\"3\"></swirl-radio>
        </div>
      </swirl-radio-group>
    `);
  });

  it("fires valueChange events", async () => {
    const page = await newSpecPage({
      components: [SwirlRadioGroup],
      html: `
        <swirl-radio-group aria-label="Radio group" value="2">
          <swirl-radio input-id="radio-1" input-name="radio" label="Radio button #1" value="1"></swirl-radio>
          <swirl-radio input-id="radio-2" input-name="radio" label="Radio button #2" value="2"></swirl-radio>
          <swirl-radio input-id="radio-3" input-name="radio" label="Radio button #3" value="3"></swirl-radio>
        </swirl-radio-group>
      `,
    });

    const spy = jest.fn();

    const radio = page.root.querySelector("swirl-radio");
    radio.checked = true;
    radio.value = "1";

    page.root.addEventListener("valueChange", spy);
    page.root
      .querySelector("swirl-radio")
      .dispatchEvent(new CustomEvent("valueChange"));

    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toBe("1");
  });
});
