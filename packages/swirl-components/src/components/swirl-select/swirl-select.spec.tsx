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
        <div class="select">
          <input aria-invalid="true" class="select__label" id="trigger" readonly="" type="text" value="">
          <span class="select__indicator">
            <swirl-icon-expand-more></swirl-icon-expand-more>
          </span>
          <swirl-popover animation="scale-in-y" class="select__popover" label="Select" popoverid="select-options" trigger="trigger" usecontainerwidth="swirl-form-control">
            <swirl-option-list>
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
  });
});
