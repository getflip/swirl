// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-work",
})
export class SwirlSymbolWork {
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
            d="M20 6H16V4C16.0009 3.73709 15.9498 3.47661 15.8496 3.23354C15.7495 2.99047 15.6022 2.76962 15.4163 2.58372C15.2304 2.39782 15.0095 2.25054 14.7665 2.15035C14.5234 2.05017 14.2629 1.99907 14 2H10C9.73709 1.99907 9.47661 2.05017 9.23354 2.15035C8.99047 2.25054 8.76962 2.39782 8.58372 2.58372C8.39782 2.76962 8.25054 2.99047 8.15035 3.23354C8.05017 3.47661 7.99907 3.73709 8 4V6H4C3.73764 5.99933 3.47774 6.05068 3.23535 6.15107C2.99296 6.25147 2.77287 6.39892 2.58782 6.58491C2.40277 6.77089 2.25642 6.99171 2.15724 7.2346C2.05806 7.4775 2.00801 7.73764 2.01 8L2 19C1.99907 19.2629 2.05017 19.5234 2.15035 19.7665C2.25054 20.0095 2.39782 20.2304 2.58372 20.4163C2.76962 20.6022 2.99047 20.7495 3.23354 20.8496C3.47661 20.9498 3.73709 21.0009 4 21H20C20.2629 21.0009 20.5234 20.9498 20.7665 20.8496C21.0095 20.7495 21.2304 20.6022 21.4163 20.4163C21.6022 20.2304 21.7495 20.0095 21.8496 19.7665C21.9498 19.5234 22.0009 19.2629 22 19V8C22.0009 7.73709 21.9498 7.47661 21.8496 7.23354C21.7495 6.99047 21.6022 6.76962 21.4163 6.58372C21.2304 6.39782 21.0095 6.25054 20.7665 6.15035C20.5234 6.05017 20.2629 5.99907 20 6ZM14 6H10V4H14V6Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
