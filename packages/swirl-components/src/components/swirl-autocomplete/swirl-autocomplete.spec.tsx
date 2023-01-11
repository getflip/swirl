jest.mock("../../utils", () => ({
  debounce: (fn) => fn,
}));

import { newSpecPage } from "@stencil/core/testing";

import { SwirlAutocomplete } from "./swirl-autocomplete";

const suggestions = [
  {
    id: "1",
    label: "Item #1",
  },
  {
    disabled: true,
    id: "2",
    label: "Item #2",
  },
  {
    id: "3",
    label: "Item #3",
  },
];

const generateSuggestions = async (value: string) => {
  if (!Boolean(value)) {
    return suggestions;
  }

  return suggestions.filter((suggestion) =>
    suggestion.label.toLowerCase().includes(value.toLowerCase())
  );
};

describe("swirl-autocomplete", () => {
  it("renders input and initial suggestions on focus", async () => {
    const page = await newSpecPage({
      components: [SwirlAutocomplete],
      html: `<swirl-autocomplete></swirl-autocomplete>`,
    });

    page.rootInstance.generateSuggestions = generateSuggestions;

    page.root
      .querySelector("swirl-text-input")
      .dispatchEvent(new CustomEvent("inputFocus"));

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <swirl-autocomplete>
        <div class="autocomplete">
          <swirl-text-input class="autocomplete__input" clearable="" clearbuttonlabel="Clear input" disabledynamicwidth="" swirlariaautocomplete="list" swirlariacontrols="autocomplete-0-suggestions" swirlariaexpanded="true" swirlrole="combobox" id="autocomplete-0"></swirl-text-input>
          <div class="autocomplete__listbox-container" style="width: 32px;">
            <swirl-option-list label="Suggestions" optionlistid="autocomplete-0-suggestions">
              <swirl-option-list-item label="Item #1" value="Item #1"></swirl-option-list-item>
              <swirl-option-list-item disabled="" label="Item #2" value="Item #2"></swirl-option-list-item>
              <swirl-option-list-item label="Item #3" value="Item #3"></swirl-option-list-item>
            </swirl-option-list>
          </div>
        </div>
      </swirl-autocomplete>
    `);
  });

  it("updates suggestions", async () => {
    const page = await newSpecPage({
      components: [SwirlAutocomplete],
      html: `<swirl-autocomplete></swirl-autocomplete>`,
    });

    page.rootInstance.generateSuggestions = generateSuggestions;

    const input = page.root.querySelector("swirl-text-input");

    input.dispatchEvent(new CustomEvent("inputFocus"));
    input.dispatchEvent(new CustomEvent("valueChange", { detail: "#3" }));

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <swirl-autocomplete value="#3">
        <div class="autocomplete">
          <swirl-text-input class="autocomplete__input" clearable="" clearbuttonlabel="Clear input" disabledynamicwidth="" swirlariaautocomplete="list" swirlariacontrols="autocomplete-0-suggestions" swirlariaexpanded="true" swirlrole="combobox" id="autocomplete-0" value="#3"></swirl-text-input>
          <div class="autocomplete__listbox-container" style="width: 32px;">
            <swirl-option-list label="Suggestions" optionlistid="autocomplete-0-suggestions">
              <swirl-option-list-item label="Item #3" value="Item #3"></swirl-option-list-item>
            </swirl-option-list>
          </div>
        </div>
      </swirl-autocomplete>
    `);
  });

  it("selects suggestions and closes them", async () => {
    const page = await newSpecPage({
      components: [SwirlAutocomplete],
      html: `<swirl-autocomplete></swirl-autocomplete>`,
    });

    page.rootInstance.generateSuggestions = generateSuggestions;

    const input = page.root.querySelector("swirl-text-input");
    const listbox = page.root.querySelector("swirl-option-list");

    input.dispatchEvent(new CustomEvent("inputFocus"));

    listbox.dispatchEvent(
      new CustomEvent("valueChange", { detail: ["Item #3"] })
    );

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <swirl-autocomplete value="Item #3">
        <div class="autocomplete autocomplete--inactive">
          <swirl-text-input class="autocomplete__input" clearable="" clearbuttonlabel="Clear input" disabledynamicwidth="" swirlariaautocomplete="list" swirlariacontrols="autocomplete-0-suggestions" swirlariaexpanded="false" swirlrole="combobox" id="autocomplete-0" value="Item #3"></swirl-text-input>
          <div class="autocomplete__listbox-container" style="width: 32px;">
            <swirl-option-list label="Suggestions" optionlistid="autocomplete-0-suggestions">
              <swirl-option-list-item label="Item #1" value="Item #1"></swirl-option-list-item>
              <swirl-option-list-item disabled="" label="Item #2" value="Item #2"></swirl-option-list-item>
              <swirl-option-list-item label="Item #3" selected="" value="Item #3"></swirl-option-list-item>
            </swirl-option-list>
          </div>
        </div>
      </swirl-autocomplete>
    `);
  });

  it("fires valueChange event", async () => {
    const page = await newSpecPage({
      components: [SwirlAutocomplete],
      html: `<swirl-autocomplete></swirl-autocomplete>`,
    });

    page.rootInstance.generateSuggestions = generateSuggestions;

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);

    const input = page.root.querySelector("swirl-text-input");
    const listbox = page.root.querySelector("swirl-option-list");

    input.dispatchEvent(new CustomEvent("inputFocus"));

    listbox.dispatchEvent(
      new CustomEvent("valueChange", { detail: ["Item #3"] })
    );

    expect(spy.mock.calls[0][0].detail).toBe("Item #3");

    input.dispatchEvent(new CustomEvent("valueChange", { detail: "#3" }));

    expect(spy.mock.calls[1][0].detail).toBe("#3");
  });
});
