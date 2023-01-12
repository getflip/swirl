// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-info",
})
export class SwirlIconInfo {
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
              d="M8.00001 1.33333C4.32001 1.33333 1.33334 4.32 1.33334 8C1.33334 11.68 4.32001 14.6667 8.00001 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8C14.6667 4.32 11.68 1.33333 8.00001 1.33333ZM8.00001 11.3333C7.63334 11.3333 7.33334 11.0333 7.33334 10.6667V8C7.33334 7.63333 7.63334 7.33333 8.00001 7.33333C8.36668 7.33333 8.66668 7.63333 8.66668 8V10.6667C8.66668 11.0333 8.36668 11.3333 8.00001 11.3333ZM8.66668 5.33333C8.66668 5.70152 8.3682 6 8.00001 6C7.63182 6 7.33334 5.70152 7.33334 5.33333C7.33334 4.96514 7.63182 4.66667 8.00001 4.66667C8.3682 4.66667 8.66668 4.96514 8.66668 5.33333Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16C13 16.55 12.55 17 12 17ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M14 2.33333C7.56001 2.33333 2.33334 7.56 2.33334 14C2.33334 20.44 7.56001 25.6667 14 25.6667C20.44 25.6667 25.6667 20.44 25.6667 14C25.6667 7.56 20.44 2.33333 14 2.33333ZM14 19.8333C13.3583 19.8333 12.8333 19.3083 12.8333 18.6667V14C12.8333 13.3583 13.3583 12.8333 14 12.8333C14.6417 12.8333 15.1667 13.3583 15.1667 14V18.6667C15.1667 19.3083 14.6417 19.8333 14 19.8333ZM15.1667 9.33333C15.1667 9.97767 14.6443 10.5 14 10.5C13.3557 10.5 12.8333 9.97767 12.8333 9.33333C12.8333 8.689 13.3557 8.16667 14 8.16667C14.6443 8.16667 15.1667 8.689 15.1667 9.33333Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
