// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-bookmark",
})
export class SwirlSymbolBookmark {
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
            d="M17 3H7C6.47005 3.00158 5.96227 3.2128 5.58753 3.58753C5.2128 3.96227 5.00158 4.47005 5 5V21L12 18L19 21V5C18.9984 4.47005 18.7872 3.96227 18.4125 3.58753C18.0377 3.2128 17.5299 3.00158 17 3Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
