jest.mock("../../utils", () => ({
  debounce: (fn) => fn,
}));

import { newSpecPage } from "@stencil/core/testing";

import { FlipAutocomplete } from "./swirl-autocomplete";

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

describe("flip-autocomplete", () => {
  it("renders input and initial suggestions on focus", async () => {
    const page = await newSpecPage({
      components: [FlipAutocomplete],
      html: `<flip-autocomplete></flip-autocomplete>`,
    });

    page.rootInstance.generateSuggestions = generateSuggestions;

    page.root
      .querySelector("flip-text-input")
      .dispatchEvent(new CustomEvent("inputFocus"));

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <flip-autocomplete>
        <div class="autocomplete">
          <flip-text-input class="autocomplete__input" clearable="" clearbuttonlabel="Clear input" disabledynamicwidth="" flipariaautocomplete="list" flipariacontrols="autocomplete-0-suggestions" flipariaexpanded="true" fliprole="combobox" id="autocomplete-0"></flip-text-input>
          <div class="autocomplete__listbox-container" style="width: 32px;">
            <flip-option-list label="Suggestions" optionlistid="autocomplete-0-suggestions">
              <flip-option-list-item label="Item #1" value="Item #1"></flip-option-list-item>
              <flip-option-list-item disabled="" label="Item #2" value="Item #2"></flip-option-list-item>
              <flip-option-list-item label="Item #3" value="Item #3"></flip-option-list-item>
            </flip-option-list>
          </div>
        </div>
      </flip-autocomplete>
    `);
  });

  it("updates suggestions", async () => {
    const page = await newSpecPage({
      components: [FlipAutocomplete],
      html: `<flip-autocomplete></flip-autocomplete>`,
    });

    page.rootInstance.generateSuggestions = generateSuggestions;

    const input = page.root.querySelector("flip-text-input");

    input.dispatchEvent(new CustomEvent("inputFocus"));
    input.dispatchEvent(new CustomEvent("valueChange", { detail: "#3" }));

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <flip-autocomplete value="#3">
        <div class="autocomplete">
          <flip-text-input class="autocomplete__input" clearable="" clearbuttonlabel="Clear input" disabledynamicwidth="" flipariaautocomplete="list" flipariacontrols="autocomplete-0-suggestions" flipariaexpanded="true" fliprole="combobox" id="autocomplete-0" value="#3"></flip-text-input>
          <div class="autocomplete__listbox-container" style="width: 32px;">
            <flip-option-list label="Suggestions" optionlistid="autocomplete-0-suggestions">
              <flip-option-list-item label="Item #3" value="Item #3"></flip-option-list-item>
            </flip-option-list>
          </div>
        </div>
      </flip-autocomplete>
    `);
  });

  it("selects suggestions and closes them", async () => {
    const page = await newSpecPage({
      components: [FlipAutocomplete],
      html: `<flip-autocomplete></flip-autocomplete>`,
    });

    page.rootInstance.generateSuggestions = generateSuggestions;

    const input = page.root.querySelector("flip-text-input");
    const listbox = page.root.querySelector("flip-option-list");

    input.dispatchEvent(new CustomEvent("inputFocus"));

    listbox.dispatchEvent(
      new CustomEvent("valueChange", { detail: ["Item #3"] })
    );

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <flip-autocomplete value="Item #3">
        <div class="autocomplete autocomplete--inactive">
          <flip-text-input class="autocomplete__input" clearable="" clearbuttonlabel="Clear input" disabledynamicwidth="" flipariaautocomplete="list" flipariacontrols="autocomplete-0-suggestions" flipariaexpanded="false" fliprole="combobox" id="autocomplete-0" value="Item #3"></flip-text-input>
          <div class="autocomplete__listbox-container" style="width: 32px;">
            <flip-option-list label="Suggestions" optionlistid="autocomplete-0-suggestions">
              <flip-option-list-item label="Item #1" value="Item #1"></flip-option-list-item>
              <flip-option-list-item disabled="" label="Item #2" value="Item #2"></flip-option-list-item>
              <flip-option-list-item label="Item #3" selected="" value="Item #3"></flip-option-list-item>
            </flip-option-list>
          </div>
        </div>
      </flip-autocomplete>
    `);
  });

  it("fires valueChange event", async () => {
    const page = await newSpecPage({
      components: [FlipAutocomplete],
      html: `<flip-autocomplete></flip-autocomplete>`,
    });

    page.rootInstance.generateSuggestions = generateSuggestions;

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);

    const input = page.root.querySelector("flip-text-input");
    const listbox = page.root.querySelector("flip-option-list");

    input.dispatchEvent(new CustomEvent("inputFocus"));

    listbox.dispatchEvent(
      new CustomEvent("valueChange", { detail: ["Item #3"] })
    );

    expect(spy.mock.calls[0][0].detail).toBe("Item #3");

    input.dispatchEvent(new CustomEvent("valueChange", { detail: "#3" }));

    expect(spy.mock.calls[1][0].detail).toBe("#3");
  });
});
