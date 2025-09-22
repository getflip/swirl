// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-roadmap",
})
export class SwirlSymbolRoadmap {
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
            d="M13 10H18L21 7L18 4H13V2H11V4H4V10H11V12H6L3 15L6 18H11V22H13V18H20V12H13V10ZM6 6H17.17L18.17 7L17.17 8H6V6ZM18 16H6.83L5.83 15L6.83 14H18V16Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
