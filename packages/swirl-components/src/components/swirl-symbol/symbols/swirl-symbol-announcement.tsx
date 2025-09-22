// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-announcement",
})
export class SwirlSymbolAnnouncement {
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
            d="M20 2H4C3.47005 2.00158 2.96227 2.2128 2.58753 2.58753C2.2128 2.96227 2.00158 3.47005 2 4V22L6 18H20C20.5299 17.9984 21.0377 17.7872 21.4125 17.4125C21.7872 17.0377 21.9984 16.5299 22 16V4C21.9984 3.47005 21.7872 2.96227 21.4125 2.58753C21.0377 2.2128 20.5299 2.00158 20 2ZM12 11C11.7348 11 11.4804 10.8946 11.2929 10.7071C11.1054 10.5196 11 10.2652 11 10V6C11 5.73478 11.1054 5.48043 11.2929 5.29289C11.4804 5.10536 11.7348 5 12 5C12.2652 5 12.5196 5.10536 12.7071 5.29289C12.8946 5.48043 13 5.73478 13 6V10C13 10.2652 12.8946 10.5196 12.7071 10.7071C12.5196 10.8946 12.2652 11 12 11ZM13 15H11V13H13V15Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
