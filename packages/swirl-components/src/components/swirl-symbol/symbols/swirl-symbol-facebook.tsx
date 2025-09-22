// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-facebook",
})
export class SwirlSymbolFacebook {
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
            d="M22 11.934C21.9999 10.023 21.4521 8.15198 20.4217 6.54256C19.3912 4.93315 17.9211 3.65271 16.1856 2.85283C14.45 2.05295 12.5215 1.76714 10.6285 2.02924C8.73555 2.29133 6.95731 3.09035 5.50433 4.3317C4.05136 5.57305 2.98451 7.20474 2.43009 9.03358C1.87566 10.8624 1.85689 12.8119 2.37598 14.651C2.89508 16.4902 3.9303 18.1422 5.3591 19.4113C6.78789 20.6804 8.55042 21.5135 10.438 21.812V14.825H7.9V11.933H10.438V9.731C10.3838 9.21658 10.4433 8.69654 10.6123 8.20766C10.7812 7.71878 11.0556 7.27301 11.4159 6.9019C11.7763 6.53078 12.2138 6.2434 12.6975 6.06007C13.1811 5.87674 13.6992 5.80195 14.215 5.841C14.9649 5.8529 15.7129 5.91975 16.453 6.041V8.497H15.192C14.9769 8.46831 14.7581 8.48844 14.5518 8.5559C14.3456 8.62336 14.1571 8.73641 14.0005 8.88666C13.844 9.03691 13.7232 9.2205 13.6473 9.4238C13.5714 9.6271 13.5422 9.84489 13.562 10.061V11.936H16.335L15.892 14.828H13.562V21.816C15.915 21.4439 18.0579 20.244 19.6048 18.4323C21.1518 16.6207 22.0011 14.3163 22 11.934Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
