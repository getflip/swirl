import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlPaginationVariant = "default" | "simple" | "advanced";

@Component({
  shadow: true,
  styleUrl: "swirl-pagination.css",
  tag: "swirl-pagination",
})
export class SwirlPagination {
  @Prop() firstPageButtonLabel?: string = "First page";
  @Prop() lastPageButtonLabel?: string = "Last page";
  @Prop() label!: string;
  @Prop() nextButtonLabel?: string = "Next page";
  @Prop() page!: number;
  @Prop() pageLabel?: string = "out of";
  @Prop() pages!: number;
  @Prop() pageSelectLabel?: string = "Select a page";
  @Prop() prevButtonLabel?: string = "Previous page";
  @Prop() variant?: SwirlPaginationVariant = "default";

  @Event() setPage: EventEmitter<number>;

  private onFirstPageButtonClick = () => {
    if (this.page === 1) {
      return;
    }

    this.setPage.emit(1);
  };

  private onLastPageButtonClick = () => {
    if (this.page === this.pages) {
      return;
    }

    this.setPage.emit(this.pages);
  };

  private onPrevButtonClick = () => {
    const prevPage = Math.max(this.page - 1, 1);

    if (this.page === prevPage) {
      return;
    }

    this.setPage.emit(prevPage);
  };

  private onNextButtonClick = () => {
    const nextPage = Math.min(this.page + 1, this.pages);

    if (this.page === nextPage) {
      return;
    }

    this.setPage.emit(nextPage);
  };

  private onSelect = (event: Event) => {
    const page = +(event.target as HTMLSelectElement).value;

    if (this.page === page) {
      return;
    }

    this.setPage.emit(page);
  };

  render() {
    const showPageLabel = this.variant !== "simple";
    const showDropDown = this.variant === "advanced";

    const ariaPageLabel = `${this.page} ${this.pageLabel} ${this.pages}`;

    const className = classnames(
      "pagination",
      `pagination--variant-${this.variant}`
    );

    return (
      <Host>
        <nav aria-label={this.label} class={className}>
          <ul class="pagination__list" part="pagination__list">
            <li class="pagination__list-item">
              <swirl-button
                class="pagination__first-page-button"
                disabled={this.page <= 1}
                hideLabel
                icon="<swirl-icon-double-arrow-left></swirl-icon-double-arrow-left>"
                intent="primary"
                label={this.firstPageButtonLabel}
                onClick={this.onFirstPageButtonClick}
              ></swirl-button>
            </li>
            <li class="pagination__list-item">
              <swirl-button
                class="pagination__prev-button"
                disabled={this.page <= 1}
                hideLabel
                icon="<swirl-icon-chevron-left></swirl-icon-chevron-left>"
                intent="primary"
                label={this.prevButtonLabel}
                onClick={this.onPrevButtonClick}
              ></swirl-button>
            </li>
            {showPageLabel ? (
              <li class="pagination__list-item  pagination__page-label">
                <span>
                  {showDropDown ? (
                    <span
                      aria-current="page"
                      class="pagination__advanced-label"
                    >
                      <span class="pagination__page-select-container">
                        <select
                          aria-label={this.pageSelectLabel}
                          class="pagination__page-select"
                          onChange={this.onSelect}
                        >
                          {new Array(this.pages)
                            .fill(undefined)
                            .map((_, index) => index + 1)
                            .map((page) => (
                              <option
                                selected={this.page === page}
                                value={String(page)}
                              >
                                {page}
                              </option>
                            ))}
                        </select>
                      </span>
                      <span aria-hidden="true">
                        {this.pageLabel} {this.pages}
                      </span>
                    </span>
                  ) : (
                    <span aria-current="page">{ariaPageLabel}</span>
                  )}
                </span>
              </li>
            ) : (
              <li class="pagination__list-item">
                <swirl-visually-hidden>
                  <span aria-current="page">{ariaPageLabel}</span>
                </swirl-visually-hidden>
              </li>
            )}
            <li class="pagination__list-item">
              <swirl-button
                class="pagination__next-button"
                disabled={this.page >= this.pages}
                hideLabel
                icon="<swirl-icon-chevron-right></swirl-icon-chevron-right>"
                iconPosition="end"
                intent="primary"
                label={this.nextButtonLabel}
                onClick={this.onNextButtonClick}
              ></swirl-button>
            </li>
            <li class="pagination__list-item">
              <swirl-button
                class="pagination__last-page-button"
                disabled={this.page >= this.pages}
                hideLabel
                icon="<swirl-icon-double-arrow-right></swirl-icon-double-arrow-right>"
                intent="primary"
                label={this.lastPageButtonLabel}
                onClick={this.onLastPageButtonClick}
              ></swirl-button>
            </li>
          </ul>
        </nav>
      </Host>
    );
  }
}
