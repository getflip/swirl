// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-home-repair-service",
})
export class SwirlSymbolHomeRepairService {
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
            d="M9 8H15V6H9V8ZM3 20C2.71667 20 2.47917 19.9042 2.2875 19.7125C2.09583 19.5208 2 19.2833 2 19V15H6C6 15.2833 6.09583 15.5208 6.2875 15.7125C6.47917 15.9042 6.71667 16 7 16C7.28333 16 7.52083 15.9042 7.7125 15.7125C7.90417 15.5208 8 15.2833 8 15H16C16 15.2833 16.0958 15.5208 16.2875 15.7125C16.4792 15.9042 16.7167 16 17 16C17.2833 16 17.5208 15.9042 17.7125 15.7125C17.9042 15.5208 18 15.2833 18 15H22V19C22 19.2833 21.9042 19.5208 21.7125 19.7125C21.5208 19.9042 21.2833 20 21 20H3ZM2 14V10C2 9.45 2.19583 8.97917 2.5875 8.5875C2.97917 8.19583 3.45 8 4 8H7V6C7 5.45 7.19583 4.97917 7.5875 4.5875C7.97917 4.19583 8.45 4 9 4H15C15.55 4 16.0208 4.19583 16.4125 4.5875C16.8042 4.97917 17 5.45 17 6V8H20C20.55 8 21.0208 8.19583 21.4125 8.5875C21.8042 8.97917 22 9.45 22 10V14H18V13C18 12.7167 17.9042 12.4792 17.7125 12.2875C17.5208 12.0958 17.2833 12 17 12C16.7167 12 16.4792 12.0958 16.2875 12.2875C16.0958 12.4792 16 12.7167 16 13V14H8V13C8 12.7167 7.90417 12.4792 7.7125 12.2875C7.52083 12.0958 7.28333 12 7 12C6.71667 12 6.47917 12.0958 6.2875 12.2875C6.09583 12.4792 6 12.7167 6 13V14H2Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
