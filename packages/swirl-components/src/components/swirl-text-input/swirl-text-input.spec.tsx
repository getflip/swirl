import { newSpecPage } from "@stencil/core/testing";

import { SwirlTextInput } from "./swirl-text-input";

describe("swirl-text-input", () => {
  it("renders the input with props", async () => {
    const page = await newSpecPage({
      components: [SwirlTextInput],
      html: `<swirl-text-input
              disabled="true"
              swirl-aria-describedby="id"
              invalid="true"
              mode="decimal"
              required="true"
              spell-check="false"
              type="url"
              value="Value">
            </swirl-text-input>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-text-input disabled="true"
                      swirl-aria-describedby="id"
                      invalid="true"
                      mode="decimal"
                      required="true"
                      spell-check="false"
                      type="url"
                      value="Value">
        <div class="text-input text-input--font-size-default text-input--type-url">
          <input aria-describedby="id"
                 aria-disabled="true"
                 aria-invalid="true"
                 autocomplete="on"
                 class="text-input__input"
                 disabled=""
                 inputmode="decimal"
                 required=""
                 type="url"
                 value="Value">
        </div>
      </swirl-text-input>
    `);
  });

  it("renders with prefix/suffix", async () => {
    const page = await newSpecPage({
      components: [SwirlTextInput],
      html: `<swirl-text-input prefix-label="Prefix" suffix-label="Suffix"></swirl-text-input>`,
    });

    expect(page.root.querySelector(".text-input__prefix").innerHTML).toBe(
      "Prefix"
    );

    expect(page.root.querySelector(".text-input__suffix").innerHTML).toBe(
      "Suffix"
    );

    expect(
      page.root.querySelector<HTMLInputElement>(".text-input__input").style
        .width
    ).toBeTruthy();
  });

  it("can be cleared", async () => {
    const page = await newSpecPage({
      components: [SwirlTextInput],
      html: `<swirl-text-input clearable="true" value="Value"></swirl-text-input>`,
    });

    expect(page.root.value).toBe("Value");

    page.root
      .querySelector<HTMLButtonElement>(".text-input__clear-button")
      .click();

    expect(page.root.value).toBe("");
  });

  it("can toggle password", async () => {
    const page = await newSpecPage({
      components: [SwirlTextInput],
      html: `<swirl-text-input type="password" value="Value"></swirl-text-input>`,
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
      components: [SwirlTextInput],
      html: `<swirl-text-input value="Value"></swirl-text-input>`,
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

  it("can focus", async () => {
    const page = await newSpecPage({
      components: [SwirlTextInput],
      html: `<swirl-text-input value="Value"></swirl-text-input>`,
    });

    const spy = jest.fn();
    const input =
      page.root.querySelector<HTMLButtonElement>(".text-input__input");

    input.addEventListener("focus", spy);

    page.rootInstance.focusInput();

    expect(spy).toHaveBeenCalled();
  });

  it("can blur", async () => {
    const page = await newSpecPage({
      components: [SwirlTextInput],
      html: `<swirl-text-input value="Value"></swirl-text-input>`,
    });

    const spy = jest.fn();
    const input =
      page.root.querySelector<HTMLButtonElement>(".text-input__input");

    input.addEventListener("blur", spy);

    page.rootInstance.blurInput();

    expect(spy).toHaveBeenCalled();
  });

  it("renders in a readonly state", async () => {
    const page = await newSpecPage({
      components: [SwirlTextInput],
      html: `<swirl-text-input
              readonly="true"
              value="Value">
            </swirl-text-input>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-text-input readonly="true" value="Value">
        <div class="text-input text-input--font-size-default text-input--type-text">
          <input 
            autocomplete="on" 
            class="text-input__input"
            readonly
            type="text"
            value="Value"
          >
        </div>
      </swirl-text-input>
    `);
  });
});
