import { newSpecPage } from "@stencil/core/testing";

import { SwirlTableRowGroup } from "./swirl-table-row-group";

describe("swirl-table-row-group", () => {
  it("renders its label and content", async () => {
    const page = await newSpecPage({
      components: [SwirlTableRowGroup],
      html: `<swirl-table-row-group label="Label">Content</swirl-table-row-group>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-table-row-group class="table-row-group" label="Label" role="rowgroup">
        <mock:shadow-root>
          <div class="table-row-group__header-row" role="row">
            <span aria-rowspan="0" class="table-row-group__label" role="rowheader">
              Label
            </span>
          </div>
          <div class="table-row-group__rows-container table-row-group__rows-container--is-hidden">
            <slot></slot>
          </div>
        </mock:shadow-root>
          Content
      </swirl-table-row-group>
    `);
  });

  it("renders its label and content with tooltip", async () => {
    const page = await newSpecPage({
      components: [SwirlTableRowGroup],
      html: `<swirl-table-row-group label="Label" tooltip="Test">Content</swirl-table-row-group>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-table-row-group class="table-row-group" label="Label" role="rowgroup" tooltip="Test">
        <mock:shadow-root>
          <div class="table-row-group__header-row" role="row">
            <span aria-rowspan="0" class="table-row-group__label" role="rowheader">
              Label
              <span class="table-row-group__tooltip">
                <swirl-tooltip content="Test" position="top">
                  <swirl-icon-info class="table-row-group__tooltip-icon" size="16" tabindex="0"></swirl-icon-info>
                </swirl-tooltip>
              </span>
            </span>
          </div>
          <div class="table-row-group__rows-container table-row-group__rows-container--is-hidden">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Content
      </swirl-table-row-group>
    `);
  });

  it("renders collapsible button", async () => {
    const page = await newSpecPage({
      components: [SwirlTableRowGroup],
      html: `<swirl-table-row-group label="Label" collapsible="true">Content</swirl-table-row-group>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-table-row-group class="table-row-group" label="Label" role="rowgroup" collapsible="true">
        <mock:shadow-root>
          <div class="table-row-group__header-row" role="row">
          <swirl-button class="table-row-group__collapse-icon" hidelabel="" icon="<swirl-icon-expand-less></swirl-icon-expand-less" label="Previous slide" swirlariaexpanded="true" variant="plain"></swirl-button>
            <span aria-rowspan="0" class="table-row-group__label" role="rowheader">
              Label
            </span>
          </div>
          <div class="table-row-group__rows-container table-row-group__rows-container--is-hidden">
            <slot></slot>
          </div>
        </mock:shadow-root>
          Content
      </swirl-table-row-group>
    `);
  });
});
