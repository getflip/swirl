// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-cloud",
})
export class SwirlSymbolCloud {
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
            d="M19.35 10.04C19.0492 8.51623 18.2822 7.12361 17.1552 6.05484C16.0283 4.98606 14.597 4.29397 13.0594 4.07431C11.5218 3.85466 9.95398 4.11831 8.57282 4.82877C7.19165 5.53924 6.06544 6.66141 5.35 8.04C3.83222 8.21584 2.43869 8.9641 1.45369 10.1322C0.468684 11.3002 -0.0335876 12.8001 0.04933 14.3257C0.132248 15.8514 0.794107 17.288 1.8999 18.3424C3.00569 19.3969 4.4721 19.9897 6 20H19C20.2928 20.0011 21.5355 19.5001 22.4659 18.6025C23.3964 17.705 23.9418 16.4811 23.9872 15.1891C24.0326 13.8971 23.5744 12.638 22.7093 11.6773C21.8441 10.7167 20.6397 10.1296 19.35 10.04Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
