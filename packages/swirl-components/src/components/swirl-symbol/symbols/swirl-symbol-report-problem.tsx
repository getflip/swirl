// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-report-problem",
})
export class SwirlSymbolReportProblem {
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
            d="M2.73 21H21.26C21.4359 21.0007 21.6088 20.955 21.7614 20.8675C21.914 20.78 22.0408 20.6539 22.129 20.5017C22.2173 20.3496 22.2638 20.1769 22.264 20.001C22.2642 19.8251 22.2179 19.6523 22.13 19.5L12.86 3.5C12.7721 3.34846 12.6459 3.22267 12.4941 3.13523C12.3423 3.04779 12.1702 3.00177 11.995 3.00177C11.8198 3.00177 11.6477 3.04779 11.4959 3.13523C11.3441 3.22267 11.2179 3.34846 11.13 3.5L1.86 19.5C1.77206 19.6523 1.72585 19.8251 1.72602 20.001C1.7262 20.1769 1.77275 20.3496 1.86099 20.5017C1.94923 20.6539 2.07603 20.78 2.22861 20.8675C2.38118 20.955 2.55413 21.0007 2.73 21ZM13 18H11V16H13V18ZM12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13V11C11 10.7348 11.1054 10.4804 11.2929 10.2929C11.4804 10.1054 11.7348 10 12 10C12.2652 10 12.5196 10.1054 12.7071 10.2929C12.8946 10.4804 13 10.7348 13 11V13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
