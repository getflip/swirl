// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-ios",
})
export class SwirlSymbolIos {
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
            d="M2.917 7.042C2.739 7.042 2.56499 7.09478 2.41699 7.19368C2.26898 7.29257 2.15363 7.43313 2.08551 7.59758C2.01739 7.76204 1.99957 7.943 2.03429 8.11758C2.06902 8.29216 2.15474 8.45253 2.2806 8.5784C2.40647 8.70426 2.56683 8.78998 2.74142 8.82471C2.916 8.85943 3.09696 8.84161 3.26141 8.77349C3.42587 8.70537 3.56643 8.59002 3.66532 8.44201C3.76421 8.29401 3.817 8.12 3.817 7.942C3.817 7.7033 3.72218 7.47439 3.55339 7.3056C3.38461 7.13682 3.15569 7.042 2.917 7.042ZM9.259 7.059C6.459 7.059 4.709 8.967 4.709 12.001C4.709 15.059 6.459 16.959 9.259 16.959C12.042 16.959 13.801 15.059 13.801 12.001C13.801 8.968 12.043 7.059 9.259 7.059ZM18.292 7.059C16.209 7.059 14.725 8.209 14.725 9.917C14.725 11.275 15.567 12.125 17.333 12.534L18.575 12.834C19.783 13.109 20.275 13.509 20.275 14.201C20.275 15.001 19.467 15.568 18.317 15.568C17.142 15.568 16.259 14.993 16.167 14.11H14.5C14.567 15.877 16.017 16.96 18.217 16.96C20.542 16.96 22 15.818 22 14.002C22 12.577 21.167 11.769 19.233 11.327L18.125 11.077C16.95 10.794 16.467 10.419 16.467 9.785C16.467 8.985 17.2 8.452 18.284 8.452C19.368 8.452 20.125 8.992 20.208 9.884H21.841C21.799 8.201 20.409 7.059 18.292 7.059ZM9.258 8.517C10.958 8.517 12.05 9.875 12.05 12C12.05 14.142 10.958 15.5 9.258 15.5C7.541 15.5 6.458 14.142 6.458 12C6.458 9.875 7.541 8.517 9.258 8.517ZM2.093 9.759V16.801H3.75V9.759H2.092H2.093Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
