// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-beach-access",
})
export class SwirlSymbolBeachAccess {
  @Prop() size: SwirlSymbolSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

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
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Fragment>
          <path
            d="M13.13 14.56L14.56 13.13L20.29 18.86C20.3839 18.9539 20.4584 19.0654 20.5092 19.188C20.56 19.3107 20.5862 19.4422 20.5862 19.575C20.5862 19.7078 20.56 19.8393 20.5092 19.9619C20.4584 20.0846 20.3839 20.1961 20.29 20.29C20.1961 20.3839 20.0846 20.4584 19.962 20.5092C19.8393 20.56 19.7078 20.5862 19.575 20.5862C19.4422 20.5862 19.3107 20.56 19.188 20.5092C19.0654 20.4584 18.9539 20.3839 18.86 20.29L13.13 14.56ZM17.42 8.82999L18.69 7.55999C18.9024 7.352 19.0653 7.09889 19.1666 6.81942C19.2679 6.53994 19.305 6.24126 19.2752 5.94549C19.2455 5.64972 19.1495 5.36443 18.9946 5.11075C18.8396 4.85707 18.6296 4.6415 18.38 4.47999C16.4475 3.29944 14.1744 2.80256 11.9256 3.06915C9.67682 3.33574 7.58287 4.35033 5.98 5.94999C7.96561 5.31437 10.0895 5.24725 12.1113 5.75623C14.1331 6.26521 15.972 7.32997 17.42 8.82999ZM5.95 5.97999C4.35126 7.58313 3.33653 9.67625 3.06821 11.9244C2.79989 14.1725 3.29348 16.4456 4.47 18.38C4.63075 18.6305 4.84601 18.8414 5.09971 18.9971C5.35341 19.1527 5.63899 19.249 5.93513 19.2788C6.23127 19.3086 6.53032 19.2712 6.80995 19.1692C7.08957 19.0672 7.34255 18.9034 7.55 18.69L8.82 17.42C7.32318 15.9699 6.26132 14.1305 5.75421 12.1091C5.2471 10.0877 5.31491 7.96488 5.95 5.97999ZM5.97 5.95999L5.96 5.96999C5.58 8.97999 7.13 12.85 10.26 15.99L15.99 10.26C12.86 7.12999 8.98 5.57999 5.97 5.95999Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
