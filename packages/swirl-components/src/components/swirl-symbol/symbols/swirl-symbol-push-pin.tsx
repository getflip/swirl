// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-push-pin",
})
export class SwirlSymbolPushPin {
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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19 12.87C18.9928 12.6415 18.9105 12.4217 18.7659 12.2445C18.6213 12.0674 18.4225 11.9428 18.2 11.89C17.5678 11.7151 17.0103 11.3377 16.6129 10.8158C16.2156 10.2938 16.0003 9.65599 16 9V4H17C17.2652 4 17.5196 3.89464 17.7071 3.70711C17.8946 3.51957 18 3.26522 18 3C18 2.73478 17.8946 2.48043 17.7071 2.29289C17.5196 2.10536 17.2652 2 17 2H7C6.73478 2 6.48043 2.10536 6.29289 2.29289C6.10536 2.48043 6 2.73478 6 3C6 3.26522 6.10536 3.51957 6.29289 3.70711C6.48043 3.89464 6.73478 4 7 4H8V9C7.9997 9.65599 7.7844 10.2938 7.38705 10.8158C6.98971 11.3377 6.43224 11.7151 5.8 11.89C5.57754 11.9428 5.37865 12.0674 5.23406 12.2445C5.08947 12.4217 5.00721 12.6415 5 12.87V13C5 13.2652 5.10536 13.5196 5.29289 13.7071C5.48043 13.8946 5.73478 14 6 14H10.98L11 21C11 21.2652 11.1054 21.5196 11.2929 21.7071C11.4804 21.8946 11.7348 22 12 22C12.2652 22 12.5196 21.8946 12.7071 21.7071C12.8946 21.5196 13 21.2652 13 21L12.98 14H18C18.2652 14 18.5196 13.8946 18.7071 13.7071C18.8946 13.5196 19 13.2652 19 13V12.87Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
