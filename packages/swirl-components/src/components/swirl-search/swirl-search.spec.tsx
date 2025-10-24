import { newSpecPage } from "@stencil/core/testing";

import { SwirlSearch } from "./swirl-search";

describe("swirl-search", () => {
  it("renders the input with passed props", async () => {
    const page = await newSpecPage({
      components: [SwirlSearch],
      html: `<swirl-search auto-focus clear-button-label="Clear" disabled input-name="search" input-id="search" label="Label" placeholder="Placeholder" value="Value"></swirl-search>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-search auto-focus="" clear-button-label="Clear" disabled="" input-id="search" input-name="search" label="Label" placeholder="Placeholder" value="Value">
        <span class="search search--disabled search--variant-filled">
          <swirl-icon-search aria-hidden="true" class="search__icon" size="24"></swirl-icon-search>
          <input aria-disabled="true" aria-label="Label" autocomplete="off" autofocus="" class="search__input" disabled="" id="search" inputmode="search" name="search" placeholder="Placeholder" type="search" value="Value">
        </span>
      </swirl-search>
    `);
  });

  it("fires events", async () => {
    const page = await newSpecPage({
      components: [SwirlSearch],
      html: `<swirl-search label="Search"></swirl-search>`,
    });

    const focusSpy = jest.fn();
    const changeSpy = jest.fn();

    page.root.addEventListener("valueChange", changeSpy);
    page.root.addEventListener("inputFocus", focusSpy);
    page.root.addEventListener("inputBlur", focusSpy);

    const input = page.root.querySelector("input");

    input.focus();
    expect(focusSpy).toHaveBeenCalledTimes(1);

    input.blur();
    expect(focusSpy).toHaveBeenCalledTimes(2);

    input.dispatchEvent(new Event("change"));
    expect(changeSpy).toHaveBeenCalled();
  });

  it("focuses with shortcuts", async () => {
    const page = await newSpecPage({
      components: [SwirlSearch],
      html: `<swirl-search label="Search"></swirl-search>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("inputFocus", spy);

    page.win.dispatchEvent(
      new KeyboardEvent("keydown", { code: "KeyK", metaKey: true })
    );
    page.win.dispatchEvent(
      new KeyboardEvent("keydown", { code: "KeyK", ctrlKey: true })
    );
    page.win.dispatchEvent(
      new KeyboardEvent("keydown", { code: "Slash", metaKey: true })
    );
    page.win.dispatchEvent(
      new KeyboardEvent("keydown", { code: "Slash", ctrlKey: true })
    );

    expect(spy).toHaveBeenCalledTimes(4);
  });

  it("does not render clear button when clearable is false", async () => {
    const page = await newSpecPage({
      components: [SwirlSearch],
      html: `<swirl-search clearable="false"></swirl-search>`,
    });

    expect(page.root.querySelector(".search__clear-button")).toBeNull();
  });

  it("clears the input when the clear button is clicked", async () => {
    const page = await newSpecPage({
      components: [SwirlSearch],
      html: `<swirl-search value="initial text"></swirl-search>`,
    });

    const clearButton = page.root.querySelector(
      ".search__clear-button"
    ) as HTMLButtonElement;
    expect(clearButton).not.toBeNull();
    const input = page.root.querySelector("input") as HTMLInputElement;
    const changeSpy = jest.fn();

    page.root.addEventListener("valueChange", changeSpy);

    // Verify initial state
    expect(input.value).toBe("initial text");

    // Click clear button
    clearButton.click();
    await page.waitForChanges();

    // Verify clear functionality
    expect(input.value).toBe("");
    expect(changeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: "",
      })
    );
  });
});
