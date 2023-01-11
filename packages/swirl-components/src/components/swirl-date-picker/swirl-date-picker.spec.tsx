import { newSpecPage } from "@stencil/core/testing";

import { FlipDatePicker } from "./swirl-date-picker";

describe("flip-date-picker", () => {
  it("renders the picker", async () => {
    const page = await newSpecPage({
      components: [FlipDatePicker],
      html: `<flip-date-picker range="true"></flip-date-picker>`,
    });

    page.root.startDate = new Date("2022-01-01");

    expect(page.root).toEqualHtml(`
      <flip-date-picker range="true">
        <mock:shadow-root>
          <div>
            <div class="-inline- air-datepicker date-picker">
              <i class="air-datepicker--pointer"></i>
              <div class="air-datepicker--navigation">
                <nav class="air-datepicker-nav">
                  <div class="air-datepicker-nav--action" data-action="prev">
                    <flip-icon-chevron-left></flip-icon-chevron-left>
                  </div>
                  <div class="air-datepicker-nav--title">
                    January,
                    <i>
                      2022
                    </i>
                  </div>
                  <div class="air-datepicker-nav--action" data-action="next">
                   <flip-icon-chevron-right></flip-icon-chevron-right>
                  </div>
                </nav>
              </div>
              <div class="air-datepicker--content">
                <div class="-days- air-datepicker-body">
                  <div class="air-datepicker-body--day-names">
                    <div class="-weekend- air-datepicker-body--day-name" data-day-index="0">
                      Su
                    </div>
                    <div class="air-datepicker-body--day-name" data-day-index="1">
                      Mo
                    </div>
                    <div class="air-datepicker-body--day-name" data-day-index="2">
                      Tu
                    </div>
                    <div class="air-datepicker-body--day-name" data-day-index="3">
                      We
                    </div>
                    <div class="air-datepicker-body--day-name" data-day-index="4">
                      Th
                    </div>
                    <div class="air-datepicker-body--day-name" data-day-index="5">
                      Fr
                    </div>
                    <div class="-weekend- air-datepicker-body--day-name" data-day-index="6">
                      Sa
                    </div>
                  </div>
                  <div class="-days- air-datepicker-body--cells">
                    <div class="-day- -other-month- -weekend- air-datepicker-cell" data-date="26" data-month="11" data-year="2021"></div>
                    <div class="-day- -other-month- air-datepicker-cell" data-date="27" data-month="11" data-year="2021"></div>
                    <div class="-day- -other-month- air-datepicker-cell" data-date="28" data-month="11" data-year="2021"></div>
                    <div class="-day- -other-month- air-datepicker-cell" data-date="29" data-month="11" data-year="2021"></div>
                    <div class="-day- -other-month- air-datepicker-cell" data-date="30" data-month="11" data-year="2021"></div>
                    <div class="-day- -other-month- air-datepicker-cell" data-date="31" data-month="11" data-year="2021"></div>
                    <div class="-day- -weekend- air-datepicker-cell" data-date="1" data-month="0" data-year="2022"></div>
                    <div class="-day- -weekend- air-datepicker-cell" data-date="2" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="3" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="4" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="5" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="6" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="7" data-month="0" data-year="2022"></div>
                    <div class="-day- -weekend- air-datepicker-cell" data-date="8" data-month="0" data-year="2022"></div>
                    <div class="-day- -weekend- air-datepicker-cell" data-date="9" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="10" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="11" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="12" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="13" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="14" data-month="0" data-year="2022"></div>
                    <div class="-day- -weekend- air-datepicker-cell" data-date="15" data-month="0" data-year="2022"></div>
                    <div class="-day- -weekend- air-datepicker-cell" data-date="16" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="17" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="18" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="19" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="20" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="21" data-month="0" data-year="2022"></div>
                    <div class="-day- -weekend- air-datepicker-cell" data-date="22" data-month="0" data-year="2022"></div>
                    <div class="-day- -weekend- air-datepicker-cell" data-date="23" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="24" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="25" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="26" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="27" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="28" data-month="0" data-year="2022"></div>
                    <div class="-day- -weekend- air-datepicker-cell" data-date="29" data-month="0" data-year="2022"></div>
                    <div class="-day- -weekend- air-datepicker-cell" data-date="30" data-month="0" data-year="2022"></div>
                    <div class="-day- air-datepicker-cell" data-date="31" data-month="0" data-year="2022"></div>
                    <div class="-day- -other-month- air-datepicker-cell" data-date="1" data-month="1" data-year="2022"></div>
                    <div class="-day- -other-month- air-datepicker-cell" data-date="2" data-month="1" data-year="2022"></div>
                    <div class="-day- -other-month- air-datepicker-cell" data-date="3" data-month="1" data-year="2022"></div>
                    <div class="-day- -other-month- air-datepicker-cell" data-date="4" data-month="1" data-year="2022"></div>
                    <div class="-day- -other-month- -weekend- air-datepicker-cell" data-date="5" data-month="1" data-year="2022"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </flip-date-picker>
    `);
  });
});
