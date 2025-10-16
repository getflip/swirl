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
    const clearSpy = jest.fn();

    page.root.addEventListener("clear", clearSpy);

    expect(page.root.value).toBe("Value");

    page.root
      .querySelector<HTMLButtonElement>(".text-input__clear-button")
      .click();

    expect(clearSpy).toHaveBeenCalled();
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

  it("shows character counter when showCharacterCounterNearLimit is false", async () => {
    const page = await newSpecPage({
      components: [SwirlTextInput],
      html: `<swirl-text-input
              show-character-counter="true"
              max-length="100"
              value="Short">
            </swirl-text-input>`,
    });

    const characterCounter = page.root.querySelector(
      ".text-input__character-counter"
    );

    expect(characterCounter).toBeTruthy();
    expect(characterCounter.textContent.trim()).toContain("5");
    expect(characterCounter.textContent.trim()).toContain("100");
  });

  it("hides character counter when showCharacterCounterNearLimit is true and below 80% threshold", async () => {
    const page = await newSpecPage({
      components: [SwirlTextInput],
      html: `<swirl-text-input
              show-character-counter="true"
              show-character-counter-near-limit="true"
              max-length="100"
              value="Short text">
            </swirl-text-input>`,
    });

    const characterCounter = page.root.querySelector(
      ".text-input__character-counter"
    );

    // 10 characters is below 80% of 100, so it should not be visible
    expect(characterCounter).toBeFalsy();
  });

  it("shows character counter when showCharacterCounterNearLimit is true and at 80% threshold", async () => {
    const page = await newSpecPage({
      components: [SwirlTextInput],
      html: `<swirl-text-input
              show-character-counter="true"
              show-character-counter-near-limit="true"
              max-length="100">
            </swirl-text-input>`,
    });

    // Set value to exactly 80 characters (80% of 100)
    page.root.value = "a".repeat(80);
    await page.waitForChanges();

    const characterCounter = page.root.querySelector(
      ".text-input__character-counter"
    );

    expect(characterCounter).toBeTruthy();
    expect(characterCounter.textContent.trim()).toContain("80");
    expect(characterCounter.textContent.trim()).toContain("100");
  });

  it("shows character counter when showCharacterCounterNearLimit is true and above 80% threshold", async () => {
    const page = await newSpecPage({
      components: [SwirlTextInput],
      html: `<swirl-text-input
              show-character-counter="true"
              show-character-counter-near-limit="true"
              max-length="100">
            </swirl-text-input>`,
    });

    // Set value to 95 characters (95% of 100)
    page.root.value = "a".repeat(95);
    await page.waitForChanges();

    const characterCounter = page.root.querySelector(
      ".text-input__character-counter"
    );

    expect(characterCounter).toBeTruthy();
    expect(characterCounter.textContent.trim()).toContain("95");
    expect(characterCounter.textContent.trim()).toContain("100");
  });
});
