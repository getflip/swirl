import { newSpecPage } from "@stencil/core/testing";

import { FlipTextInput } from "./swirl-text-input";

describe("flip-text-input", () => {
  it("renders the input with props", async () => {
    const page = await newSpecPage({
      components: [FlipTextInput],
      html: `<flip-text-input
              auto-focus="true"
              disabled="true"
              flip-aria-describedby="id"
              invalid="true"
              mode="decimal"
              required="true"
              spell-check="false"
              type="url"
              value="Value">
            </flip-text-input>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-text-input auto-focus="true"
                      disabled="true"
                      flip-aria-describedby="id"
                      invalid="true"
                      mode="decimal"
                      required="true"
                      spell-check="false"
                      type="url"
                      value="Value">
        <div class="text-input text-input--disabled text-input--type-url">
          <input aria-describedby="id"
                 aria-disabled="true"
                 aria-invalid="true"
                 autocomplete="on"
                 autofocus=""
                 class="text-input__input"
                 disabled=""
                 inputmode="decimal"
                 required=""
                 type="url"
                 style="width: NaNrem;"
                 value="Value">
        </div>
      </flip-text-input>
    `);
  });

  it("renders with prefix/suffix", async () => {
    const page = await newSpecPage({
      components: [FlipTextInput],
      html: `<flip-text-input prefix-label="Prefix" suffix-label="Suffix"></flip-text-input>`,
    });

    expect(page.root.querySelector(".text-input__prefix").innerHTML).toBe(
      "Prefix"
    );

    expect(page.root.querySelector(".text-input__suffix").innerHTML).toBe(
      "Suffix"
    );
  });

  it("can be cleared", async () => {
    const page = await newSpecPage({
      components: [FlipTextInput],
      html: `<flip-text-input clearable="true" value="Value"></flip-text-input>`,
    });

    expect(page.root.value).toBe("Value");

    page.root
      .querySelector<HTMLButtonElement>(".text-input__clear-button")
      .click();

    expect(page.root.value).toBe("");
  });

  it("can toggle password", async () => {
    const page = await newSpecPage({
      components: [FlipTextInput],
      html: `<flip-text-input type="password" value="Value"></flip-text-input>`,
    });

    const input =
      page.root.querySelector<HTMLInputElement>(".text-input__input");

    expect(input.getAttribute("type")).toBe("password");

    page.root
      .querySelector<HTMLButtonElement>(".text-input__password-toggle")
      .click();

    await page.waitForChanges();

    expect(input.getAttribute("type")).toBe("text");
  });

  it("fires valueChange events", async () => {
    const page = await newSpecPage({
      components: [FlipTextInput],
      html: `<flip-text-input value="Value"></flip-text-input>`,
    });

    const spy = jest.fn();
    const input =
      page.root.querySelector<HTMLButtonElement>(".text-input__input");

    page.root.addEventListener("valueChange", spy);

    input.value = "New Value";
    input.dispatchEvent(new Event("input"));

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toBe("New Value");
  });
});
