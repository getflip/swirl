// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-policy",
})
export class SwirlSymbolPolicy {
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
            d="M21 6.3C20.9993 5.91269 20.8865 5.53387 20.6754 5.20917C20.4642 4.88448 20.1637 4.62778 19.81 4.47L12.81 1.36C12.5551 1.24628 12.2791 1.1875 12 1.1875C11.7209 1.1875 11.4449 1.24628 11.19 1.36L4.19 4.47C3.83629 4.62778 3.53575 4.88448 3.32461 5.20917C3.11347 5.53387 3.00074 5.91269 3 6.3V11C3 16.55 6.84 21.74 12 23C14.3004 22.4102 16.3573 21.1124 17.88 19.29L14.76 16.17C13.726 16.8522 12.4757 17.1262 11.2512 16.9391C10.0267 16.752 8.91522 16.117 8.13219 15.1572C7.34915 14.1973 6.95029 12.981 7.01288 11.7439C7.07546 10.5067 7.59505 9.33686 8.47096 8.46096C9.34686 7.58505 10.5167 7.06547 11.7539 7.00288C12.991 6.94029 14.2073 7.33915 15.1672 8.12219C16.127 8.90522 16.762 10.0167 16.9491 11.2412C17.1362 12.4657 16.8622 13.716 16.18 14.75L19.08 17.65C20.3222 15.6533 20.9867 13.3515 21 11V6.3Z"
            fill="currentColor"
          />
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
