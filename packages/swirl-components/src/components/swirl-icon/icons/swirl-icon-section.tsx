// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-section",
})
export class SwirlIconSection {
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
              d="M12.6667 4.66667C13.403 4.66667 14 5.26362 14 6V12.6667C14 13.403 13.403 14 12.6667 14H3.33333L3.19727 13.9928C2.52482 13.9247 2 13.3571 2 12.6667V6C2 5.26362 2.59695 4.66667 3.33333 4.66667H12.6667ZM3.33333 12.6667H12.6667V6H3.33333V12.6667Z"
              fill="currentColor"
            />
            <path
              d="M8 2C8.36819 2 8.66667 2.29848 8.66667 2.66667C8.66667 3.03486 8.36819 3.33333 8 3.33333H2.66667C2.29848 3.33333 2 3.03486 2 2.66667C2 2.29848 2.29848 2 2.66667 2H8Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19 7C20.1046 7 21 7.89543 21 9V19C21 20.1046 20.1046 21 19 21H5L4.7959 20.9893C3.78722 20.887 3 20.0357 3 19V9C3 7.89543 3.89543 7 5 7H19ZM5 19H19V9H5V19Z"
              fill="currentColor"
            />
            <path
              d="M12 3C12.5523 3 13 3.44772 13 4C13 4.55228 12.5523 5 12 5H4C3.44772 5 3 4.55228 3 4C3 3.44772 3.44772 3 4 3H12Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.1667 8.16667C23.4553 8.16667 24.5 9.21134 24.5 10.5V22.1667C24.5 23.4553 23.4553 24.5 22.1667 24.5H5.83333L5.59521 24.4875C4.41843 24.3682 3.5 23.3749 3.5 22.1667V10.5C3.5 9.21134 4.54467 8.16667 5.83333 8.16667H22.1667ZM5.83333 22.1667H22.1667V10.5H5.83333V22.1667Z"
              fill="currentColor"
            />
            <path
              d="M14 3.5C14.6443 3.5 15.1667 4.02233 15.1667 4.66667C15.1667 5.311 14.6443 5.83333 14 5.83333H4.66667C4.02233 5.83333 3.5 5.311 3.5 4.66667C3.5 4.02233 4.02233 3.5 4.66667 3.5H14Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
