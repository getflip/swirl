// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-bolt",
})
export class SwirlSymbolBolt {
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
            d="M9 15H5.9C5.5 15 5.20417 14.8209 5.0125 14.4625C4.82083 14.1042 4.84167 13.7584 5.075 13.425L12.55 2.67503C12.7167 2.44169 12.9333 2.27919 13.2 2.18753C13.4667 2.09586 13.7417 2.10003 14.025 2.20003C14.3083 2.30003 14.5167 2.47503 14.65 2.72503C14.7833 2.97503 14.8333 3.24169 14.8 3.52503L14 10H17.875C18.3083 10 18.6125 10.1917 18.7875 10.575C18.9625 10.9584 18.9083 11.3167 18.625 11.65L10.4 21.5C10.2167 21.7167 9.99167 21.8584 9.725 21.925C9.45833 21.9917 9.2 21.9667 8.95 21.85C8.7 21.7334 8.50417 21.5542 8.3625 21.3125C8.22083 21.0709 8.16667 20.8084 8.2 20.525L9 15Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
