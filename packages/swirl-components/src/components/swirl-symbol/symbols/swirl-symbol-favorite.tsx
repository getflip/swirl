// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-favorite",
})
export class SwirlSymbolFavorite {
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
            d="M13.35 20.13C12.9807 20.4631 12.5004 20.6467 12.0031 20.6448C11.5057 20.643 11.0269 20.4559 10.66 20.12L10.55 20.02C5.3 15.27 1.87 12.16 2 8.28001C2.02993 7.43229 2.25699 6.60322 2.66317 5.85855C3.06935 5.11389 3.64348 4.47412 4.34 3.99001C5.52831 3.19831 6.96689 2.87278 8.38027 3.07574C9.79366 3.27871 11.0825 3.99591 12 5.09001C12.9154 3.99287 14.2046 3.27341 15.6189 3.0703C17.0333 2.86719 18.4728 3.19481 19.66 3.99001C20.3565 4.47412 20.9306 5.11389 21.3368 5.85855C21.743 6.60322 21.9701 7.43229 22 8.28001C22.14 12.16 18.7 15.27 13.45 20.04L13.35 20.13Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
