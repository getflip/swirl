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
              d="M6.66667 6.00009V4.94009C6.66667 4.34676 5.94667 4.04676 5.52667 4.46676L2.46667 7.52676C2.20667 7.78676 2.20667 8.20676 2.46667 8.46676L5.52667 11.5268C5.94667 11.9468 6.66667 11.6534 6.66667 11.0601V9.93343C10 9.93343 12.3333 11.0001 14 13.3334C13.3333 10.0001 11.3333 6.66676 6.66667 6.00009Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M9.99997 9.00002V7.41002C9.99997 6.52002 8.91997 6.07002 8.28997 6.70002L3.69997 11.29C3.30997 11.68 3.30997 12.31 3.69997 12.7L8.28997 17.29C8.91997 17.92 9.99997 17.48 9.99997 16.59V14.9C15 14.9 18.5 16.5 21 20C20 15 17 10 9.99997 9.00002Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M11.6667 10.5V8.64498C11.6667 7.60665 10.4067 7.08165 9.67165 7.81665L4.31665 13.1716C3.86165 13.6266 3.86165 14.3616 4.31665 14.8166L9.67165 20.1716C10.4067 20.9066 11.6667 20.3933 11.6667 19.355V17.3833C17.5 17.3833 21.5833 19.25 24.5 23.3333C23.3333 17.5 19.8333 11.6666 11.6667 10.5Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
