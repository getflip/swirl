// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-qr-code-scanner",
})
export class SwirlSymbolQrCodeScanner {
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
            d="M2 7V2H7V4H4V7H2ZM2 22V17H4V20H7V22H2ZM17 22V20H20V17H22V22H17ZM20 7V4H17V2H22V7H20ZM17.5 17.5H19V19H17.5V17.5ZM17.5 14.5H19V16H17.5V14.5ZM16 16H17.5V17.5H16V16ZM14.5 17.5H16V19H14.5V17.5ZM13 16H14.5V17.5H13V16ZM16 13H17.5V14.5H16V13ZM14.5 14.5H16V16H14.5V14.5ZM13 13H14.5V14.5H13V13ZM19 5V11H13V5H19ZM11 13V19H5V13H11ZM11 5V11H5V5H11ZM9.5 17.5V14.5H6.5V17.5H9.5ZM9.5 9.5V6.5H6.5V9.5H9.5ZM17.5 9.5V6.5H14.5V9.5H17.5Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
