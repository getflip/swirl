import { newSpecPage } from "@stencil/core/testing";
import { SwirlDatePicker } from "./swirl-date-picker";

describe("swirl-date-picker", () => {
  it("renders the picker", async () => {
    const page = await newSpecPage({
      components: [SwirlDatePicker],
      html: `<swirl-date-picker range="true"></swirl-date-picker>`,
    });

    page.root.startDate = new Date("2022-01-01");

    expect(page.root).toEqualHtml(`
      <swirl-date-picker range="true">
        <mock:shadow-root>
          <wc-datepicker  class="date-picker--fixed-max-width" elementclassname="date-picker" firstdayofweek="7" locale="en-US" range=""></wc-datepicker>
        </mock:shadow-root>
      </swirl-date-picker>
    `);
  });
});
