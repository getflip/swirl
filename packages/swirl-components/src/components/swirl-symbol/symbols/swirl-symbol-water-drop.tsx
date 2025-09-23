// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-water-drop",
})
export class SwirlSymbolWaterDrop {
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
            d="M12 22C9.71667 22 7.8125 21.2167 6.2875 19.65C4.7625 18.0833 4 16.1333 4 13.8C4 12.7667 4.23333 11.7333 4.7 10.7C5.16667 9.66667 5.75 8.675 6.45 7.725C7.15 6.775 7.90833 5.88333 8.725 5.05C9.54167 4.21667 10.3 3.49167 11 2.875C11.1333 2.74167 11.2875 2.64583 11.4625 2.5875C11.6375 2.52917 11.8167 2.5 12 2.5C12.1833 2.5 12.3625 2.52917 12.5375 2.5875C12.7125 2.64583 12.8667 2.74167 13 2.875C13.7 3.49167 14.4583 4.21667 15.275 5.05C16.0917 5.88333 16.85 6.775 17.55 7.725C18.25 8.675 18.8333 9.66667 19.3 10.7C19.7667 11.7333 20 12.7667 20 13.8C20 16.1333 19.2375 18.0833 17.7125 19.65C16.1875 21.2167 14.2833 22 12 22ZM12.275 19C12.475 18.9833 12.6458 18.9042 12.7875 18.7625C12.9292 18.6208 13 18.45 13 18.25C13 18.0167 12.925 17.8292 12.775 17.6875C12.625 17.5458 12.4333 17.4833 12.2 17.5C11.5167 17.55 10.7917 17.3625 10.025 16.9375C9.25833 16.5125 8.775 15.7417 8.575 14.625C8.54167 14.4417 8.45417 14.2917 8.3125 14.175C8.17083 14.0583 8.00833 14 7.825 14C7.59167 14 7.4 14.0875 7.25 14.2625C7.1 14.4375 7.05 14.6417 7.1 14.875C7.38333 16.3917 8.05 17.475 9.1 18.125C10.15 18.775 11.2083 19.0667 12.275 19Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
