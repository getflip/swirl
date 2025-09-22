// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-flag",
})
export class SwirlSymbolFlag {
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
            d="M14.4 6L14.16 4.8C14.1139 4.57413 13.9912 4.37112 13.8126 4.22534C13.634 4.07956 13.4105 3.99995 13.18 4H6C5.73478 4 5.48043 4.10536 5.29289 4.29289C5.10536 4.48043 5 4.73478 5 5V20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21C6.26522 21 6.51957 20.8946 6.70711 20.7071C6.89464 20.5196 7 20.2652 7 20V14H12.6L12.84 15.2C12.884 15.4269 13.0061 15.6312 13.1852 15.7774C13.3642 15.9236 13.5889 16.0023 13.82 16H19C19.2652 16 19.5196 15.8946 19.7071 15.7071C19.8946 15.5196 20 15.2652 20 15V7C20 6.73478 19.8946 6.48043 19.7071 6.29289C19.5196 6.10536 19.2652 6 19 6H14.4Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
