// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-flight",
})
export class SwirlSymbolFlight {
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
            d="M10 13.8L3.675 16.325C3.275 16.4917 2.89583 16.4542 2.5375 16.2125C2.17917 15.9708 2 15.6333 2 15.2V14.65C2 14.45 2.04583 14.2583 2.1375 14.075C2.22917 13.8917 2.35833 13.7417 2.525 13.625L10 8.4V4C10 3.45 10.1958 2.97917 10.5875 2.5875C10.9792 2.19583 11.45 2 12 2C12.55 2 13.0208 2.19583 13.4125 2.5875C13.8042 2.97917 14 3.45 14 4V8.4L21.475 13.625C21.6417 13.7417 21.7708 13.8917 21.8625 14.075C21.9542 14.2583 22 14.45 22 14.65V15.2C22 15.6333 21.8208 15.9708 21.4625 16.2125C21.1042 16.4542 20.725 16.4917 20.325 16.325L14 13.8V17.4L16.575 19.2C16.7083 19.3 16.8125 19.4208 16.8875 19.5625C16.9625 19.7042 17 19.8583 17 20.025V20.625C17 20.9583 16.8625 21.2292 16.5875 21.4375C16.3125 21.6458 16.0083 21.7 15.675 21.6L12 20.5L8.325 21.6C7.99167 21.7 7.6875 21.6458 7.4125 21.4375C7.1375 21.2292 7 20.9583 7 20.625V20.025C7 19.8583 7.0375 19.7042 7.1125 19.5625C7.1875 19.4208 7.29167 19.3 7.425 19.2L10 17.4V13.8Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
