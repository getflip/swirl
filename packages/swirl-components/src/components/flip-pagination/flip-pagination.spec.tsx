import { newSpecPage } from "@stencil/core/testing";

import { FlipPagination } from "./flip-pagination";

describe("flip-pagination", () => {
  it("renders default variant", async () => {
    const page = await newSpecPage({
      components: [FlipPagination],
      html: `<flip-pagination label="Pagination" page="2" pages="20"></flip-pagination>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-pagination label="Pagination" page="2" pages="20">
        <mock:shadow-root>
          <nav aria-label="Pagination" class="pagination pagination--variant-default">
            <ul class="pagination__list">
              <li class="pagination__list-item">
                <flip-button class="pagination__prev-button" fliparialabel="Previous page" hidelabel="" icon="<flip-icon-chevron-left></flip-icon-chevron-left>" intent="primary" label="Prev"></flip-button>
              </li>
              <li class="pagination__list-item">
                <span>
                  <span aria-current="page">
                    2 out of 20
                  </span>
                </span>
              </li>
              <li class="pagination__list-item">
                <flip-button class="pagination__next-button" fliparialabel="Next page" hidelabel="" icon="<flip-icon-chevron-right></flip-icon-chevron-right>" iconposition="end" intent="primary" label="Next"></flip-button>
              </li>
            </ul>
          </nav>
        </mock:shadow-root>
      </flip-pagination>
    `);
  });

  it("disables the prev button", async () => {
    const page = await newSpecPage({
      components: [FlipPagination],
      html: `<flip-pagination label="Pagination" page="1" pages="20"></flip-pagination>`,
    });

    expect(
      page.root.shadowRoot.querySelector(".pagination__prev-button")
    ).toHaveAttribute("disabled");
  });

  it("disables the next button", async () => {
    const page = await newSpecPage({
      components: [FlipPagination],
      html: `<flip-pagination label="Pagination" page="20" pages="20"></flip-pagination>`,
    });

    expect(
      page.root.shadowRoot.querySelector(".pagination__next-button")
    ).toHaveAttribute("disabled");
  });

  it("fires setPage events", async () => {
    const page = await newSpecPage({
      components: [FlipPagination],
      html: `<flip-pagination label="Pagination" page="2" pages="20" variant="advanced"></flip-pagination>`,
    });

    const spy = jest.fn();

    const pageSelect = page.root.shadowRoot.querySelector<HTMLSelectElement>(
      ".pagination__page-select"
    );

    const prevButton =
      page.root.shadowRoot.querySelector<HTMLFlipButtonElement>(
        ".pagination__prev-button"
      );

    const nextButton =
      page.root.shadowRoot.querySelector<HTMLFlipButtonElement>(
        ".pagination__next-button"
      );

    page.root.addEventListener("setPage", spy);

    nextButton.click();
    expect(spy.mock.calls[0][0].detail).toBe(3);

    prevButton.click();
    expect(spy.mock.calls[1][0].detail).toBe(1);

    pageSelect.value = "5";
    pageSelect.dispatchEvent(new Event("change"));
    expect(spy.mock.calls[2][0].detail).toBe(5);
  });
});
