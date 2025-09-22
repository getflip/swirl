// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-leaderboard",
})
export class SwirlSymbolLeaderboard {
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
            d="M6.5 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V10C2 9.73478 2.10536 9.48043 2.29289 9.29289C2.48043 9.10536 2.73478 9 3 9H6.5C6.76522 9 7.01957 9.10536 7.20711 9.29289C7.39464 9.48043 7.5 9.73478 7.5 10V20C7.5 20.2652 7.39464 20.5196 7.20711 20.7071C7.01957 20.8946 6.76522 21 6.5 21ZM13.75 3H10.25C9.98478 3 9.73043 3.10536 9.54289 3.29289C9.35536 3.48043 9.25 3.73478 9.25 4V20C9.25 20.2652 9.35536 20.5196 9.54289 20.7071C9.73043 20.8946 9.98478 21 10.25 21H13.75C14.0152 21 14.2696 20.8946 14.4571 20.7071C14.6446 20.5196 14.75 20.2652 14.75 20V4C14.75 3.73478 14.6446 3.48043 14.4571 3.29289C14.2696 3.10536 14.0152 3 13.75 3ZM21 11H17.5C17.2348 11 16.9804 11.1054 16.7929 11.2929C16.6054 11.4804 16.5 11.7348 16.5 12V20C16.5 20.2652 16.6054 20.5196 16.7929 20.7071C16.9804 20.8946 17.2348 21 17.5 21H21C21.2652 21 21.5196 20.8946 21.7071 20.7071C21.8946 20.5196 22 20.2652 22 20V12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
