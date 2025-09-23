// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-sell",
})
export class SwirlSymbolSell {
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
            d="M21.4 14.25L14.25 21.4C14.05 21.6 13.825 21.75 13.575 21.85C13.325 21.95 13.075 22 12.825 22C12.575 22 12.325 21.95 12.075 21.85C11.825 21.75 11.6 21.6 11.4 21.4L2.575 12.575C2.39167 12.3917 2.25 12.1792 2.15 11.9375C2.05 11.6958 2 11.4417 2 11.175V4C2 3.45 2.19583 2.97917 2.5875 2.5875C2.97917 2.19583 3.45 2 4 2H11.175C11.4417 2 11.7 2.05417 11.95 2.1625C12.2 2.27083 12.4167 2.41667 12.6 2.6L21.4 11.425C21.6 11.625 21.7458 11.85 21.8375 12.1C21.9292 12.35 21.975 12.6 21.975 12.85C21.975 13.1 21.9292 13.3458 21.8375 13.5875C21.7458 13.8292 21.6 14.05 21.4 14.25ZM6.5 8C6.91667 8 7.27083 7.85417 7.5625 7.5625C7.85417 7.27083 8 6.91667 8 6.5C8 6.08333 7.85417 5.72917 7.5625 5.4375C7.27083 5.14583 6.91667 5 6.5 5C6.08333 5 5.72917 5.14583 5.4375 5.4375C5.14583 5.72917 5 6.08333 5 6.5C5 6.91667 5.14583 7.27083 5.4375 7.5625C5.72917 7.85417 6.08333 8 6.5 8Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
