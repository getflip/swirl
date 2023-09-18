// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-open-in-new",
})
export class SwirlSymbolOpenInNew {
  @Prop() size: SwirlSymbolSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

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
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Fragment>
          <path
            d="M18 19H6C5.73478 19 5.48043 18.8946 5.29289 18.7071C5.10536 18.5196 5 18.2652 5 18V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H11C11.2652 5 11.5196 4.89464 11.7071 4.70711C11.8946 4.51957 12 4.26522 12 4C12 3.73478 11.8946 3.48043 11.7071 3.29289C11.5196 3.10536 11.2652 3 11 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3.00158 19.5299 3.2128 20.0377 3.58753 20.4125C3.96227 20.7872 4.47005 20.9984 5 21H19C19.5299 20.9984 20.0377 20.7872 20.4125 20.4125C20.7872 20.0377 20.9984 19.5299 21 19V13C21 12.7348 20.8946 12.4804 20.7071 12.2929C20.5196 12.1054 20.2652 12 20 12C19.7348 12 19.4804 12.1054 19.2929 12.2929C19.1054 12.4804 19 12.7348 19 13V18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19ZM14 4C14 4.26522 14.1054 4.51957 14.2929 4.70711C14.4804 4.89464 14.7348 5 15 5H17.59L8.46 14.13C8.29617 14.3213 8.21057 14.5674 8.22029 14.8191C8.23001 15.0707 8.33434 15.3095 8.51244 15.4876C8.69053 15.6657 8.92927 15.77 9.18095 15.7797C9.43262 15.7894 9.6787 15.7038 9.87 15.54L19 6.41V9C19 9.26522 19.1054 9.51957 19.2929 9.70711C19.4804 9.89464 19.7348 10 20 10C20.2652 10 20.5196 9.89464 20.7071 9.70711C20.8946 9.51957 21 9.26522 21 9V4C21 3.73478 20.8946 3.48043 20.7071 3.29289C20.5196 3.10536 20.2652 3 20 3H15C14.7348 3 14.4804 3.10536 14.2929 3.29289C14.1054 3.48043 14 3.73478 14 4Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
