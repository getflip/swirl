// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-maps-home-work",
})
export class SwirlSymbolMapsHomeWork {
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
            d="M14.16 10.4L9.16 6.83C8.82232 6.58626 8.41645 6.45509 8 6.45509C7.58355 6.45509 7.17768 6.58626 6.84 6.83L1.84 10.4C1.58014 10.585 1.36831 10.8295 1.22219 11.1131C1.07606 11.3966 0.999878 11.711 1 12.03V20C1 20.2652 1.10536 20.5196 1.29289 20.7071C1.48043 20.8946 1.73478 21 2 21H6V15H10V21H14C14.2652 21 14.5196 20.8946 14.7071 20.7071C14.8946 20.5196 15 20.2652 15 20V12.03C15.0001 11.711 14.9239 11.3966 14.7778 11.1131C14.6317 10.8295 14.4199 10.585 14.16 10.4Z"
            fill="currentColor"
          />
          <path
            d="M21.03 3H11.97C11.7112 2.99961 11.4548 3.05029 11.2156 3.14915C10.9765 3.24801 10.7591 3.39311 10.5761 3.57612C10.3931 3.75913 10.248 3.97646 10.1492 4.21565C10.0503 4.45484 9.99961 4.71119 10 4.97L10.09 5.06C10.17 5.11 10.25 5.15 10.33 5.2L15.33 8.77C16.0858 9.31286 16.63 10.1009 16.87 11H19V13H17V15H19V17H17V21H21.03C21.2888 21.0004 21.5452 20.9497 21.7844 20.8508C22.0235 20.752 22.2409 20.6069 22.4239 20.4239C22.6069 20.2409 22.752 20.0235 22.8508 19.7844C22.9497 19.5452 23.0004 19.2888 23 19.03V4.97C23.0004 4.71119 22.9497 4.45484 22.8508 4.21565C22.752 3.97646 22.6069 3.75913 22.4239 3.57612C22.2409 3.39311 22.0235 3.24801 21.7844 3.14915C21.5452 3.05029 21.2888 2.99961 21.03 3ZM19 9H17V7H19V9Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
