// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-restaurant",
})
export class SwirlSymbolRestaurant {
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
            d="M16 6V12C16.0016 12.5299 16.2128 13.0377 16.5875 13.4125C16.9623 13.7872 17.4701 13.9984 18 14H19V21C19 21.2652 19.1054 21.5196 19.2929 21.7071C19.4804 21.8946 19.7348 22 20 22C20.2652 22 20.5196 21.8946 20.7071 21.7071C20.8946 21.5196 21 21.2652 21 21V3.13C20.9997 2.97804 20.965 2.82812 20.8986 2.69143C20.8323 2.55474 20.7359 2.4348 20.6166 2.34058C20.4974 2.24636 20.3585 2.18028 20.2101 2.14728C20.0618 2.11428 19.9079 2.11521 19.76 2.15C17.6 2.68 16 4.51 16 6ZM11 9H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V9H5V3C5 2.73478 4.89464 2.48043 4.70711 2.29289C4.51957 2.10536 4.26522 2 4 2C3.73478 2 3.48043 2.10536 3.29289 2.29289C3.10536 2.48043 3 2.73478 3 3V9C3 10.0609 3.42143 11.0783 4.17157 11.8284C4.92172 12.5786 5.93913 13 7 13V21C7 21.2652 7.10536 21.5196 7.29289 21.7071C7.48043 21.8946 7.73478 22 8 22C8.26522 22 8.51957 21.8946 8.70711 21.7071C8.89464 21.5196 9 21.2652 9 21V13C10.0609 13 11.0783 12.5786 11.8284 11.8284C12.5786 11.0783 13 10.0609 13 9V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2C11.7348 2 11.4804 2.10536 11.2929 2.29289C11.1054 2.48043 11 2.73478 11 3V9Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
