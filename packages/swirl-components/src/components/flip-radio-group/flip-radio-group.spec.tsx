import { newSpecPage } from "@stencil/core/testing";

import { FlipRadioGroup } from "./flip-radio-group";

describe("flip-radio-group", () => {
  it("renders its radio buttons", async () => {
    const page = await newSpecPage({
      components: [FlipRadioGroup],
      html: `
        <flip-radio-group aria-label="Radio group">
          <flip-radio input-id="radio-1" input-name="radio" label="Radio button #1" value="1"></flip-radio>
          <flip-radio input-id="radio-2" input-name="radio" label="Radio button #2" value="2"></flip-radio>
          <flip-radio input-id="radio-3" input-name="radio" label="Radio button #3" value="3"></flip-radio>
        </flip-radio-group>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-radio-group aria-label=\"Radio group\" role=\"radiogroup\">
        <div class=\"radio-group\">
          <flip-radio input-id=\"radio-1\" input-name=\"radio\" label=\"Radio button #1\" value=\"1\"></flip-radio>
          <flip-radio input-id=\"radio-2\" input-name=\"radio\" label=\"Radio button #2\" value=\"2\"></flip-radio>
          <flip-radio input-id=\"radio-3\" input-name=\"radio\" label=\"Radio button #3\" value=\"3\"></flip-radio>
        </div>
      </flip-radio-group>
    `);
  });

  it("fires valueChange events", async () => {
    const page = await newSpecPage({
      components: [FlipRadioGroup],
      html: `
        <flip-radio-group aria-label="Radio group" value="2">
          <flip-radio input-id="radio-1" input-name="radio" label="Radio button #1" value="1"></flip-radio>
          <flip-radio input-id="radio-2" input-name="radio" label="Radio button #2" value="2"></flip-radio>
          <flip-radio input-id="radio-3" input-name="radio" label="Radio button #3" value="3"></flip-radio>
        </flip-radio-group>
      `,
    });

    const spy = jest.fn();

    const radio = page.root.querySelector("flip-radio");
    radio.checked = true;
    radio.value = "1";

    page.root.addEventListener("valueChange", spy);
    page.root
      .querySelector("flip-radio")
      .dispatchEvent(new CustomEvent("valueChange"));

    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toBe("1");
  });
});
