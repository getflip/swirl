// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-reply",
})
export class SwirlIconReply {
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
              d="M6.66661 6V4.94C6.66661 4.34667 5.94661 4.04667 5.52661 4.46667L2.46661 7.52667C2.20661 7.78667 2.20661 8.20667 2.46661 8.46667L5.52661 11.5267C5.94661 11.9467 6.66661 11.6533 6.66661 11.06V9.93333C9.99994 9.93333 12.3333 11 13.9999 13.3333C13.3333 10 11.3333 6.66667 6.66661 6Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M9.99997 9V7.41C9.99997 6.52 8.91997 6.07 8.28997 6.7L3.69997 11.29C3.30997 11.68 3.30997 12.31 3.69997 12.7L8.28997 17.29C8.91997 17.92 9.99997 17.48 9.99997 16.59V14.9C15 14.9 18.5 16.5 21 20C20 15 17 10 9.99997 9Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M11.6667 10.5V8.645C11.6667 7.60667 10.4067 7.08167 9.67171 7.81667L4.31671 13.1717C3.86171 13.6267 3.86171 14.3617 4.31671 14.8167L9.67171 20.1717C10.4067 20.9067 11.6667 20.3933 11.6667 19.355V17.3833C17.5 17.3833 21.5834 19.25 24.5 23.3333C23.3334 17.5 19.8334 11.6667 11.6667 10.5Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
