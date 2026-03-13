import { newSpecPage } from "@stencil/core/testing";
import { SwirlOptionList } from "../swirl-option-list/swirl-option-list";
import { SwirlOptionListItem } from "../swirl-option-list-item/swirl-option-list-item";
import { SwirlPopover } from "../swirl-popover/swirl-popover";

import { SwirlSelect } from "./swirl-select";

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

describe("swirl-select", () => {
  it("renders its option list", async () => {
    const page = await newSpecPage({
      components: [SwirlSelect],
      html: `
        <swirl-select invalid="true" label="Select" required="true">
          <swirl-option-list-item
            label="This is an option 1"
            value="1"
          ></swirl-option-list-item>
          <swirl-option-list-item
            label="This is an option 2"
            value="2"
          ></swirl-option-list-item>
        </swirl-select>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-select invalid="true" label="Select" required="true">
        <div class="select select--placement-undefined">
          <swirl-popover-trigger>
            <swirl-stack class="select__value-container">
              <input aria-invalid="true" class="select__input" readonly="" type="text" value="">
            </swirl-stack>
          </swirl-popover-trigger>
          <span class="select__multi-select-values"></span>
          <span class="select__indicator">
            <swirl-icon-expand-more size="24"></swirl-icon-expand-more>
          </span>
          <swirl-popover animation="scale-in-y" class="select__popover" id="select-options-${page.root.selectId}" label="Select" translucent="" usecontainerwidth="swirl-form-control">
            <swirl-option-list allowdeselect="" class="select__option-list">
              <div aria-disabled="true" class="select__empty-list-label" role="option">
                <swirl-text color="subdued" weight="medium">
                  No results found.
                </swirl-text>
              </div>
              <swirl-option-list-item label="This is an option 1" value="1"></swirl-option-list-item>
              <swirl-option-list-item label="This is an option 2" value="2"></swirl-option-list-item>
            </swirl-option-list>
          </swirl-popover>
        </div>
      </swirl-select>
    `);
  });

  it("allows multi selection", async () => {
    const page = await newSpecPage({
      components: [SwirlSelect, SwirlOptionList],
      html: `
        <swirl-select multi-select="true" label="Select">
          <swirl-option-list-item
            label="This is an option 1"
            value="1"
          ></swirl-option-list-item>
          <swirl-option-list-item
            label="This is an option 2"
            value="2"
          ></swirl-option-list-item>
        </swirl-select>`,
    });

    expect(
      page.root.querySelector("swirl-option-list").multiSelect
    ).toBeTruthy();

    expect(
      page.root.querySelector(".select__multi-select-values").children.length
    ).toBe(0);

    page.root.value = ["1"];
    await page.waitForChanges();

    expect(
      page.root.querySelector(".select__multi-select-values").children.length
    ).toBe(1);
  });

  it("can be disabled", async () => {
    const page = await newSpecPage({
      components: [SwirlSelect],
      html: `
        <swirl-select disabled="true" label="Select">
          <swirl-option-list-item
            label="This is an option 1"
            value="1"
          ></swirl-option-list-item>
          <swirl-option-list-item
            label="This is an option 2"
            value="2"
          ></swirl-option-list-item>
        </swirl-select>`,
    });

    expect(page.root.querySelector("input").disabled).toBeTruthy();
  });

  it("fires valueChange events", async () => {
    const page = await newSpecPage({
      components: [SwirlSelect, SwirlPopover, SwirlOptionList],
      html: `
        <swirl-select label="Select">
          <swirl-option-list-item
            label="This is an option 1"
            value="1"
          ></swirl-option-list-item>
          <swirl-option-list-item
            label="This is an option 2"
            value="2"
          ></swirl-option-list-item>
        </swirl-select>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);

    const optionList = page.root.querySelector("swirl-option-list");

    optionList.dispatchEvent(new CustomEvent("valueChange", { detail: ["2"] }));
    await page.waitForChanges();

    expect(spy.mock.calls[0][0].detail).toEqual(["2"]);

    page.root.value = ["1"];
    await page.waitForChanges();

    expect(spy.mock.calls[1][0].detail).toEqual(["1"]);
  });

  describe("typeahead", () => {
    const typeaheadTemplate = `
      <swirl-select label="Select">
        <swirl-option-list-item label="Apple" value="1"></swirl-option-list-item>
        <swirl-option-list-item label="Apricot" value="2"></swirl-option-list-item>
        <swirl-option-list-item label="Avocado" value="3"></swirl-option-list-item>
        <swirl-option-list-item label="Banana" value="4"></swirl-option-list-item>
        <swirl-option-list-item label="Blueberry" value="5"></swirl-option-list-item>
        <swirl-option-list-item label="Cherry" value="6"></swirl-option-list-item>
      </swirl-select>
    `;

    async function createTypeaheadPage() {
      const page = await newSpecPage({
        components: [SwirlSelect, SwirlOptionList, SwirlOptionListItem],
        html: typeaheadTemplate,
      });

      const select = page.rootInstance as SwirlSelect;
      (select as any).open = true;

      await page.waitForChanges();
      return page;
    }

    function pressKey(el: Element, key: string) {
      el.dispatchEvent(
        new KeyboardEvent("keydown", { key, bubbles: true })
      );
    }

    function getFocusedOptionValue(page: any): string | undefined {
      const focused = page.root.querySelector(
        'swirl-option-list-item [role="option"][tabindex="0"]'
      );
      return focused?.closest("swirl-option-list-item")?.value;
    }

    it("focuses the first matching option on key press", async () => {
      const page = await createTypeaheadPage();

      pressKey(page.root, "b");
      await page.waitForChanges();

      expect(getFocusedOptionValue(page)).toBe("4");
    });

    it("cycles through options with the same starting letter", async () => {
      const page = await createTypeaheadPage();

      pressKey(page.root, "a");
      await page.waitForChanges();
      expect(getFocusedOptionValue(page)).toBe("1");

      pressKey(page.root, "a");
      await page.waitForChanges();
      expect(getFocusedOptionValue(page)).toBe("2");

      pressKey(page.root, "a");
      await page.waitForChanges();
      expect(getFocusedOptionValue(page)).toBe("3");

      pressKey(page.root, "a");
      await page.waitForChanges();
      expect(getFocusedOptionValue(page)).toBe("1");
    });

    it("matches multi-character prefix", async () => {
      const page = await createTypeaheadPage();

      pressKey(page.root, "a");
      await page.waitForChanges();
      pressKey(page.root, "p");
      await page.waitForChanges();

      expect(getFocusedOptionValue(page)).toBe("1");

      const page2 = await createTypeaheadPage();

      pressKey(page2.root, "a");
      await page2.waitForChanges();
      pressKey(page2.root, "v");
      await page2.waitForChanges();

      expect(getFocusedOptionValue(page2)).toBe("3");
    });

    it("falls back to single-character match when prefix has no match", async () => {
      const page = await createTypeaheadPage();

      pressKey(page.root, "a");
      await page.waitForChanges();
      pressKey(page.root, "b");
      await page.waitForChanges();

      expect(getFocusedOptionValue(page)).toBe("4");
    });

    it("resets buffer after cycling and typing a different character", async () => {
      const page = await createTypeaheadPage();

      pressKey(page.root, "a");
      await page.waitForChanges();
      pressKey(page.root, "a");
      await page.waitForChanges();
      pressKey(page.root, "a");
      await page.waitForChanges();

      pressKey(page.root, "c");
      await page.waitForChanges();

      expect(getFocusedOptionValue(page)).toBe("6");
    });

    it("does not trigger typeahead for Space", async () => {
      const page = await createTypeaheadPage();

      pressKey(page.root, " ");
      await page.waitForChanges();

      expect(getFocusedOptionValue(page)).not.toBe("4");
    });

    it("does not trigger typeahead with modifier keys", async () => {
      const page = await createTypeaheadPage();

      pressKey(page.root, "b");
      await page.waitForChanges();
      expect(getFocusedOptionValue(page)).toBe("4");

      page.root.dispatchEvent(
        new KeyboardEvent("keydown", { key: "a", ctrlKey: true, bubbles: true })
      );
      await page.waitForChanges();

      expect(getFocusedOptionValue(page)).toBe("4");
    });
  });
});
