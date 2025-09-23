// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-task",
})
export class SwirlSymbolTask {
  @Prop() size: SwirlSymbolSize = 24;

  render() {
    const className = classnames(
      "swirl-symbol",
      `swirl-symbol--size-${this.size}`
    );

    return (
      <svg
        class={className}
        fill="none"
        height={this.size}
        part="symbol"
        viewBox="0 0 24 24"
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Fragment>
          <path
            d="M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H13.175C13.4417 2 13.6958 2.05 13.9375 2.15C14.1792 2.25 14.3917 2.39167 14.575 2.575L19.425 7.425C19.6083 7.60833 19.75 7.82083 19.85 8.0625C19.95 8.30417 20 8.55833 20 8.825V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 8C13 8.28333 13.0958 8.52083 13.2875 8.7125C13.4792 8.90417 13.7167 9 14 9H18L13 4V8ZM10.925 15.125L9.525 13.725C9.425 13.625 9.31667 13.55 9.2 13.5C9.08333 13.45 8.9625 13.425 8.8375 13.425C8.7125 13.425 8.5875 13.45 8.4625 13.5C8.3375 13.55 8.225 13.625 8.125 13.725C7.925 13.925 7.825 14.1625 7.825 14.4375C7.825 14.7125 7.925 14.95 8.125 15.15L10.25 17.3C10.35 17.4 10.4583 17.4708 10.575 17.5125C10.6917 17.5542 10.8167 17.575 10.95 17.575C11.0833 17.575 11.2083 17.5542 11.325 17.5125C11.4417 17.4708 11.55 17.4 11.65 17.3L15.875 13.075C16.075 12.875 16.175 12.6333 16.175 12.35C16.175 12.0667 16.075 11.825 15.875 11.625C15.675 11.425 15.4333 11.325 15.15 11.325C14.8667 11.325 14.625 11.425 14.425 11.625L10.925 15.125Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
