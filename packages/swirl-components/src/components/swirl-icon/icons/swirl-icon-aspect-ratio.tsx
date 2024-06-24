// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-aspect-ratio",
})
export class SwirlIconAspectRatio {
  @Prop() color?: SwirlIconColor;
  @Prop() size: SwirlIconSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

    const styles = {
      color: Boolean(this.color) ? `var(--s-icon-${this.color})` : undefined,
    };

    const className = classnames("swirl-icon", `swirl-icon--size-${this.size}`);

    return (
      <svg
        aria-hidden="true"
        class={className}
        fill="none"
        height={this.size}
        part="icon"
        style={styles}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.size === 16 && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14 3.99984C14 3.26346 13.403 2.6665 12.6667 2.6665H3.33333C2.59695 2.6665 2 3.26346 2 3.99984V11.9998C2 12.7362 2.59695 13.3332 3.33333 13.3332H12.6667C13.403 13.3332 14 12.7362 14 11.9998V3.99984ZM12.6667 3.99984H3.33333L3.33333 11.9998H4.66667V6.6665C4.66667 5.93012 5.26362 5.33317 6 5.33317H12.6667V3.99984ZM8.66667 11.9998H12.6667V6.6665H8.66667V11.9998ZM7.33333 6.6665H6V11.9998H7.33333V6.6665Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21 6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6ZM19 6H5L5 18H7V10C7 8.89543 7.89543 8 9 8H19V6ZM13 18H19V10H13V18ZM11 10H9V18H11V10Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24.5 6.99984C24.5 5.71117 23.4553 4.6665 22.1667 4.6665H5.83333C4.54467 4.6665 3.5 5.71117 3.5 6.99984V20.9998C3.5 22.2885 4.54467 23.3332 5.83333 23.3332H22.1667C23.4553 23.3332 24.5 22.2885 24.5 20.9998V6.99984ZM22.1667 6.99984H5.83333L5.83333 20.9998H8.16667V11.6665C8.16667 10.3778 9.21134 9.33317 10.5 9.33317H22.1667V6.99984ZM15.1667 20.9998H22.1667V11.6665H15.1667V20.9998ZM12.8333 11.6665H10.5V20.9998H12.8333V11.6665Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
