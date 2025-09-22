// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-youtube",
})
export class SwirlSymbolYoutube {
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
            d="M21.582 7.201C21.4691 6.77542 21.2463 6.38698 20.936 6.07459C20.6257 5.76219 20.2388 5.5368 19.814 5.421C18.254 5 12 5 12 5C12 5 5.74599 5 4.18599 5.421C3.76123 5.5369 3.37436 5.76231 3.06408 6.0747C2.7538 6.38708 2.53101 6.77547 2.41799 7.201C2.12953 8.79965 1.9896 10.4216 1.99999 12.046C1.9896 13.6704 2.12953 15.2923 2.41799 16.891C2.53092 17.3166 2.75368 17.705 3.06397 18.0174C3.37426 18.3298 3.76118 18.5552 4.18599 18.671C5.74499 19.092 11.999 19.092 11.999 19.092C11.999 19.092 18.253 19.092 19.813 18.671C20.2378 18.5553 20.6248 18.3299 20.9351 18.0175C21.2454 17.7051 21.4682 17.3166 21.581 16.891C21.8695 15.2923 22.0098 13.6705 22 12.046C22.0104 10.4216 21.8704 8.79965 21.582 7.201ZM9.95399 15.019V9.072L15.181 12.045L9.95399 15.019Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
