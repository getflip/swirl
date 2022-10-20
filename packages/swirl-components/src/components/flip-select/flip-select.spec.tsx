import { newSpecPage } from "@stencil/core/testing";
import { FlipOptionList } from "../flip-option-list/flip-option-list";
import { FlipPopover } from "../flip-popover/flip-popover";

import { FlipSelect } from "./flip-select";

describe("flip-select", () => {
  it("renders its option list", async () => {
    const page = await newSpecPage({
      components: [FlipSelect],
      html: `
        <flip-select invalid="true" label="Select" required="true">
          <flip-option-list-item
            label="This is an option 1"
            value="1"
          ></flip-option-list-item>
          <flip-option-list-item
            label="This is an option 2"
            value="2"
          ></flip-option-list-item>
        </flip-select>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-select invalid="true" label="Select" required="true">
        <div class="select">
          <input aria-invalid="true" class="select__label" id="trigger" readonly="" type="text" value="">
          <span class="select__indicator">
            <flip-icon-expand-more></flip-icon-expand-more>
          </span>
          <flip-popover class="select__popover" label="Select" popoverid="select-options" trigger="trigger" usecontainerwidth="flip-form-control">
            <flip-option-list>
              <flip-option-list-item label="This is an option 1" value="1"></flip-option-list-item>
              <flip-option-list-item label="This is an option 2" value="2"></flip-option-list-item>
            </flip-option-list>
          </flip-popover>
        </div>
      </flip-select>
    `);
  });

  it("allows multi selection", async () => {
    const page = await newSpecPage({
      components: [FlipSelect, FlipOptionList],
      html: `
        <flip-select multi-select="true" label="Select">
          <flip-option-list-item
            label="This is an option 1"
            value="1"
          ></flip-option-list-item>
          <flip-option-list-item
            label="This is an option 2"
            value="2"
          ></flip-option-list-item>
        </flip-select>`,
    });

    expect(
      page.root.querySelector("flip-option-list").multiSelect
    ).toBeTruthy();
  });

  it("can be disabled", async () => {
    const page = await newSpecPage({
      components: [FlipSelect],
      html: `
        <flip-select disabled="true" label="Select">
          <flip-option-list-item
            label="This is an option 1"
            value="1"
          ></flip-option-list-item>
          <flip-option-list-item
            label="This is an option 2"
            value="2"
          ></flip-option-list-item>
        </flip-select>`,
    });

    expect(page.root.querySelector("input").disabled).toBeTruthy();
  });

  it("fires valueChange events", async () => {
    const page = await newSpecPage({
      components: [FlipSelect, FlipPopover, FlipOptionList],
      html: `
        <flip-select label="Select">
          <flip-option-list-item
            label="This is an option 1"
            value="1"
          ></flip-option-list-item>
          <flip-option-list-item
            label="This is an option 2"
            value="2"
          ></flip-option-list-item>
        </flip-select>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);

    const optionList = page.root.querySelector("flip-option-list");

    optionList.dispatchEvent(new CustomEvent("valueChange", { detail: ["2"] }));
    await page.waitForChanges();

    expect(spy.mock.calls[0][0].detail).toEqual(["2"]);
  });
});
