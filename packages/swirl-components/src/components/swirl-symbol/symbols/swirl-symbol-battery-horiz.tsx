// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-battery-horiz",
})
export class SwirlSymbolBatteryHoriz {
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
            d="M5 17C4.71667 17 4.47917 16.9042 4.2875 16.7125C4.09583 16.5208 4 16.2833 4 16V14H3C2.71667 14 2.47917 13.9042 2.2875 13.7125C2.09583 13.5208 2 13.2833 2 13V11C2 10.7167 2.09583 10.4792 2.2875 10.2875C2.47917 10.0958 2.71667 10 3 10H4V8C4 7.71667 4.09583 7.47917 4.2875 7.2875C4.47917 7.09583 4.71667 7 5 7H21C21.2833 7 21.5208 7.09583 21.7125 7.2875C21.9042 7.47917 22 7.71667 22 8V16C22 16.2833 21.9042 16.5208 21.7125 16.7125C21.5208 16.9042 21.2833 17 21 17H5ZM6 15H13V9H6V15Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
