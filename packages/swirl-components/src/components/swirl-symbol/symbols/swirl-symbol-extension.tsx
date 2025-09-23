// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-extension",
})
export class SwirlSymbolExtension {
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
            d="M8.8 21H5C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V15.2C3.8 15.2 4.5 14.9458 5.1 14.4375C5.7 13.9292 6 13.2833 6 12.5C6 11.7167 5.7 11.0708 5.1 10.5625C4.5 10.0542 3.8 9.8 3 9.8V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H9C9 3.3 9.24167 2.70833 9.725 2.225C10.2083 1.74167 10.8 1.5 11.5 1.5C12.2 1.5 12.7917 1.74167 13.275 2.225C13.7583 2.70833 14 3.3 14 4H18C18.55 4 19.0208 4.19583 19.4125 4.5875C19.8042 4.97917 20 5.45 20 6V10C20.7 10 21.2917 10.2417 21.775 10.725C22.2583 11.2083 22.5 11.8 22.5 12.5C22.5 13.2 22.2583 13.7917 21.775 14.275C21.2917 14.7583 20.7 15 20 15V19C20 19.55 19.8042 20.0208 19.4125 20.4125C19.0208 20.8042 18.55 21 18 21H14.2C14.2 20.1667 13.9375 19.4583 13.4125 18.875C12.8875 18.2917 12.25 18 11.5 18C10.75 18 10.1125 18.2917 9.5875 18.875C9.0625 19.4583 8.8 20.1667 8.8 21Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
