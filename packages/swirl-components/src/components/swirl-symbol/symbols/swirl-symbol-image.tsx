// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-image",
})
export class SwirlSymbolImage {
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
            d="M21 19V5C20.9984 4.47005 20.7872 3.96227 20.4125 3.58753C20.0377 3.2128 19.5299 3.00158 19 3H5C4.47005 3.00158 3.96227 3.2128 3.58753 3.58753C3.2128 3.96227 3.00158 4.47005 3 5V19C3.00158 19.5299 3.2128 20.0377 3.58753 20.4125C3.96227 20.7872 4.47005 20.9984 5 21H19C19.5299 20.9984 20.0377 20.7872 20.4125 20.4125C20.7872 20.0377 20.9984 19.5299 21 19ZM8.9 13.98L11 16.51L14.1 12.52C14.1473 12.4585 14.2084 12.4088 14.2782 12.375C14.3481 12.3411 14.4249 12.324 14.5025 12.325C14.5801 12.3259 14.6565 12.345 14.7255 12.3806C14.7944 12.4161 14.8542 12.4673 14.9 12.53L18.41 17.21C18.4657 17.2843 18.4996 17.3726 18.508 17.4651C18.5163 17.5576 18.4987 17.6506 18.4572 17.7336C18.4157 17.8167 18.3519 17.8865 18.2729 17.9353C18.1939 17.9841 18.1029 18.01 18.01 18.01H6.02C5.92627 18.0096 5.83454 17.9828 5.75529 17.9327C5.67604 17.8827 5.61246 17.8114 5.5718 17.7269C5.53113 17.6425 5.51503 17.5483 5.52532 17.4551C5.53561 17.3619 5.57188 17.2735 5.63 17.2L8.12 14C8.16452 13.9392 8.22238 13.8894 8.28914 13.8545C8.35589 13.8196 8.42977 13.8004 8.50509 13.7985C8.58041 13.7965 8.65517 13.8119 8.72363 13.8434C8.79209 13.8748 8.85242 13.9216 8.9 13.98Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
