// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-star",
})
export class SwirlSymbolStar {
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
            d="M12 17.27L16.15 19.78C16.3181 19.881 16.5122 19.9304 16.7082 19.922C16.9041 19.9135 17.0932 19.8477 17.252 19.7326C17.4108 19.6175 17.5323 19.4582 17.6013 19.2746C17.6703 19.091 17.6837 18.8912 17.64 18.7L16.54 13.98L20.21 10.8C20.3579 10.6711 20.4646 10.5015 20.5168 10.3124C20.569 10.1233 20.5645 9.92303 20.5037 9.7365C20.443 9.54996 20.3287 9.38541 20.1751 9.26335C20.0215 9.14128 19.8354 9.06708 19.64 9.05L14.81 8.64L12.92 4.18C12.8432 3.99961 12.715 3.84579 12.5514 3.73767C12.3878 3.62956 12.1961 3.57191 12 3.57191C11.8039 3.57191 11.6122 3.62956 11.4486 3.73767C11.285 3.84579 11.1568 3.99961 11.08 4.18L9.19 8.63L4.36 9.04C4.16457 9.05708 3.97847 9.13128 3.82489 9.25335C3.67131 9.37541 3.55703 9.53996 3.49627 9.72649C3.43551 9.91303 3.43097 10.1133 3.48319 10.3024C3.53542 10.4915 3.64212 10.6611 3.79 10.79L7.46 13.97L6.36 18.69C6.31628 18.8812 6.32975 19.081 6.39874 19.2646C6.46772 19.4482 6.58916 19.6075 6.74796 19.7226C6.90676 19.8377 7.09591 19.9035 7.29185 19.912C7.4878 19.9204 7.6819 19.871 7.85 19.77L12 17.27Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
