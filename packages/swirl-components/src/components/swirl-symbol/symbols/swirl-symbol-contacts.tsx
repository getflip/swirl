// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-contacts",
})
export class SwirlSymbolContacts {
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
            d="M1 6C1 5.44772 1.44771 5 2 5C2.55228 5 3 5.44772 3 6V18C3 18.5523 2.55228 19 2 19C1.44771 19 1 18.5523 1 18V6Z"
            fill="currentColor"
          />
          <path
            d="M4 6C4 4.34315 5.34315 3 7 3H19C20.6569 3 22 4.34315 22 6V18C22 19.6569 20.6569 21 19 21H7C5.34315 21 4 19.6569 4 18V6ZM7.25513 19H18.7457C17.4808 17.1865 15.3792 16 13.0004 16C10.6217 16 8.52007 17.1865 7.25513 19ZM13 14C14.6569 14 16 12.6568 16 11C16 9.34315 14.6569 8 13 8C11.3431 8 10 9.34315 10 11C10 12.6568 11.3431 14 13 14Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
