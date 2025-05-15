import { newSpecPage } from "@stencil/core/testing";
import { SwirlOptionList } from "../swirl-option-list/swirl-option-list";
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
          <swirl-popover animation="scale-in-y" class="select__popover" id="select-options-${page.root.selectId}" label="Select" usecontainerwidth="swirl-form-control">
            <swirl-option-list allowdeselect="">
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
});
