// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-event-menu",
})
export class SwirlSymbolEventMenu {
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
            d="M16 13H13C12.7348 13 12.4804 13.1054 12.2929 13.2929C12.1054 13.4804 12 13.7348 12 14V17C12 17.2652 12.1054 17.5196 12.2929 17.7071C12.4804 17.8946 12.7348 18 13 18H16C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V14C17 13.7348 16.8946 13.4804 16.7071 13.2929C16.5196 13.1054 16.2652 13 16 13ZM16 3V4H8V3C8 2.73478 7.89464 2.48043 7.70711 2.29289C7.51957 2.10536 7.26522 2 7 2C6.73478 2 6.48043 2.10536 6.29289 2.29289C6.10536 2.48043 6 2.73478 6 3V4H5C4.73786 4.00013 4.47833 4.05202 4.2363 4.1527C3.99427 4.25338 3.7745 4.40086 3.58961 4.58668C3.40471 4.77251 3.25833 4.99301 3.15887 5.23554C3.05941 5.47808 3.00882 5.73787 3.01 6L3 20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5299 21.9984 20.0377 21.7872 20.4125 21.4125C20.7872 21.0377 20.9984 20.5299 21 20V6C20.9984 5.47005 20.7872 4.96227 20.4125 4.58753C20.0377 4.2128 19.5299 4.00158 19 4H18V3C18 2.73478 17.8946 2.48043 17.7071 2.29289C17.5196 2.10536 17.2652 2 17 2C16.7348 2 16.4804 2.10536 16.2929 2.29289C16.1054 2.48043 16 2.73478 16 3ZM18 20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V9H19V19C19 19.2652 18.8946 19.5196 18.7071 19.7071C18.5196 19.8946 18.2652 20 18 20Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
