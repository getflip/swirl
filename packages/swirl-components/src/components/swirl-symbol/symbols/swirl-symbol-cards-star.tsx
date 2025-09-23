// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-cards-star",
})
export class SwirlSymbolCardsStar {
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
            d="M5.7 21.875C5.15 21.9583 4.65417 21.8292 4.2125 21.4875C3.77084 21.1458 3.51667 20.7 3.45 20.15L2.125 9.225C2.05834 8.675 2.19167 8.18333 2.525 7.75C2.85834 7.31667 3.3 7.06667 3.85 7L5 6.85V15C5 16.1 5.39167 17.0417 6.175 17.825C6.95834 18.6083 7.9 19 9 19H18.3C18.2 19.4 18 19.7458 17.7 20.0375C17.4 20.3292 17.0333 20.5 16.6 20.55L5.7 21.875ZM9 17C8.45 17 7.97917 16.8042 7.5875 16.4125C7.19584 16.0208 7 15.55 7 15V4C7 3.45 7.19584 2.97917 7.5875 2.5875C7.97917 2.19583 8.45 2 9 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V15C22 15.55 21.8042 16.0208 21.4125 16.4125C21.0208 16.8042 20.55 17 20 17H9ZM12.725 12.2L14.5 11.125L16.275 12.2C16.375 12.2667 16.4708 12.2667 16.5625 12.2C16.6542 12.1333 16.6833 12.0417 16.65 11.925L16.175 9.9L17.725 8.55C17.8083 8.46667 17.8375 8.37917 17.8125 8.2875C17.7875 8.19583 17.7167 8.14167 17.6 8.125L15.55 7.95L14.725 6.05C14.6917 5.95 14.6167 5.9 14.5 5.9C14.3833 5.9 14.3083 5.95 14.275 6.05L13.45 7.95L11.4 8.125C11.2833 8.14167 11.2125 8.19583 11.1875 8.2875C11.1625 8.37917 11.1917 8.46667 11.275 8.55L12.825 9.9L12.35 11.925C12.3167 12.0417 12.3458 12.1333 12.4375 12.2C12.5292 12.2667 12.625 12.2667 12.725 12.2Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
