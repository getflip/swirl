// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-folder",
})
export class SwirlSymbolFolder {
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
            d="M10.59 4.59C10.4037 4.4031 10.1824 4.25478 9.93878 4.15354C9.69511 4.05229 9.43386 4.00012 9.17 4H4C3.4713 4.00264 2.96516 4.21452 2.59225 4.58931C2.21933 4.9641 2.00999 5.4713 2.01 6L2 18C2.00158 18.5299 2.2128 19.0377 2.58753 19.4125C2.96227 19.7872 3.47005 19.9984 4 20H20C20.5299 19.9984 21.0377 19.7872 21.4125 19.4125C21.7872 19.0377 21.9984 18.5299 22 18V8C21.9984 7.47005 21.7872 6.96227 21.4125 6.58753C21.0377 6.2128 20.5299 6.00158 20 6H12L10.59 4.59Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
