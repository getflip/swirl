// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-edit-calendar",
})
export class SwirlSymbolEditCalendar {
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
            d="M12 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20L3.01 6C3.00882 5.73787 3.05941 5.47808 3.15887 5.23554C3.25833 4.99301 3.40471 4.77251 3.58961 4.58668C3.7745 4.40086 3.99427 4.25338 4.2363 4.1527C4.47833 4.05202 4.73786 4.00013 5 4H6V3C6 2.73478 6.10536 2.48043 6.29289 2.29289C6.48043 2.10536 6.73478 2 7 2C7.26522 2 7.51957 2.10536 7.70711 2.29289C7.89464 2.48043 8 2.73478 8 3V4H16V3C16 2.73478 16.1054 2.48043 16.2929 2.29289C16.4804 2.10536 16.7348 2 17 2C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V4H19C19.5299 4.00158 20.0377 4.2128 20.4125 4.58753C20.7872 4.96227 20.9984 5.47005 21 6V12H19V10H5V20H12V22ZM22.13 16.99L22.84 16.28C23.0263 16.0926 23.1308 15.8392 23.1308 15.575C23.1308 15.3108 23.0263 15.0574 22.84 14.87L22.13 14.16C21.9426 13.9737 21.6892 13.8692 21.425 13.8692C21.1608 13.8692 20.9074 13.9737 20.72 14.16L20.01 14.87L22.13 16.99ZM21.42 17.7L16.41 22.71C16.2232 22.8939 15.9721 22.9979 15.71 23H14.5C14.3674 23 14.2402 22.9473 14.1464 22.8536C14.0527 22.7598 14 22.6326 14 22.5V21.29C14.002 21.0249 14.1058 20.7707 14.29 20.58L19.3 15.57L21.42 17.7Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
