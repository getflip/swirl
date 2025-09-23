// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-warehouse",
})
export class SwirlSymbolWarehouse {
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
            d="M2 19V8.35002C2 7.93336 2.1125 7.55836 2.3375 7.22502C2.5625 6.89169 2.86667 6.65002 3.25 6.50002L11.25 3.30002C11.4833 3.20002 11.7333 3.15002 12 3.15002C12.2667 3.15002 12.5167 3.20002 12.75 3.30002L20.75 6.50002C21.1333 6.65002 21.4375 6.89169 21.6625 7.22502C21.8875 7.55836 22 7.93336 22 8.35002V19C22 19.55 21.8042 20.0209 21.4125 20.4125C21.0208 20.8042 20.55 21 20 21H16V13H8V21H4C3.45 21 2.97917 20.8042 2.5875 20.4125C2.19583 20.0209 2 19.55 2 19ZM9 21V19H11V21H9ZM11 18V16H13V18H11ZM13 21V19H15V21H13Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
