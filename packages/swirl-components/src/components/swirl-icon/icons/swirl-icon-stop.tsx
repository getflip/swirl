// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-stop",
})
export class SwirlIconStop {
  @Prop() size: SwirlIconSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

    const className = classnames("swirl-icon", `swirl-icon--size-${this.size}`);

    return (
      <svg
        class={className}
        fill="none"
        height={this.size}
        part="icon"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.size === 16 && (
          <Fragment>
            <path
              d="M5.33333 4H10.6667C11.4 4 12 4.6 12 5.33333V10.6667C12 11.4 11.4 12 10.6667 12H5.33333C4.6 12 4 11.4 4 10.6667V5.33333C4 4.6 4.6 4 5.33333 4Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M8 6H16C17.1 6 18 6.9 18 8V16C18 17.1 17.1 18 16 18H8C6.9 18 6 17.1 6 16V8C6 6.9 6.9 6 8 6Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M9.33333 7H18.6667C19.95 7 21 8.05 21 9.33333V18.6667C21 19.95 19.95 21 18.6667 21H9.33333C8.05 21 7 19.95 7 18.6667V9.33333C7 8.05 8.05 7 9.33333 7Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
