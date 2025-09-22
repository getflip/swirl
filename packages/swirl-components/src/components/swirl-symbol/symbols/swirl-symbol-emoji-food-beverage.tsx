// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-emoji-food-beverage",
})
export class SwirlSymbolEmojiFoodBeverage {
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
            d="M19 19H3C2.73478 19 2.48043 19.1054 2.29289 19.2929C2.10536 19.4804 2 19.7348 2 20C2 20.2652 2.10536 20.5196 2.29289 20.7071C2.48043 20.8946 2.73478 21 3 21H19C19.2652 21 19.5196 20.8946 19.7071 20.7071C19.8946 20.5196 20 20.2652 20 20C20 19.7348 19.8946 19.4804 19.7071 19.2929C19.5196 19.1054 19.2652 19 19 19Z"
            fill="currentColor"
          />
          <path
            d="M20 3H9V5.4L10.81 6.85C10.8693 6.89621 10.9173 6.95538 10.9502 7.02298C10.9831 7.09057 11.0002 7.16481 11 7.24V11.5C11 11.6326 10.9473 11.7598 10.8536 11.8536C10.7598 11.9473 10.6326 12 10.5 12H6.5C6.36739 12 6.24021 11.9473 6.14645 11.8536C6.05268 11.7598 6 11.6326 6 11.5V7.24C5.99983 7.16481 6.01686 7.09057 6.0498 7.02298C6.08273 6.95538 6.13069 6.89621 6.19 6.85L8 5.4V3H6C5.47005 3.00158 4.96227 3.2128 4.58753 3.58753C4.2128 3.96227 4.00158 4.47005 4 5V13C4 14.0609 4.42143 15.0783 5.17157 15.8284C5.92172 16.5786 6.93913 17 8 17H14C15.0609 17 16.0783 16.5786 16.8284 15.8284C17.5786 15.0783 18 14.0609 18 13V10H20C20.5299 9.99842 21.0377 9.7872 21.4125 9.41247C21.7872 9.03773 21.9984 8.52995 22 8V5C21.9984 4.47005 21.7872 3.96227 21.4125 3.58753C21.0377 3.2128 20.5299 3.00158 20 3ZM20 8H18V5H20V8Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
