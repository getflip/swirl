// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-menu-filled",
})
export class SwirlIconMenuFilled {
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
              d="M2 3.33333C2 2.59695 2.59695 2 3.33333 2H6C6.73638 2 7.33333 2.59695 7.33333 3.33333V6C7.33333 6.73638 6.73638 7.33333 6 7.33333H3.33333C2.59695 7.33333 2 6.73638 2 6V3.33333Z"
              fill="currentColor"
            />
            <path
              d="M2 10C2 9.26362 2.59695 8.66667 3.33333 8.66667H6C6.73638 8.66667 7.33333 9.26362 7.33333 10V12.6667C7.33333 13.403 6.73638 14 6 14H3.33333C2.59695 14 2 13.403 2 12.6667V10Z"
              fill="currentColor"
            />
            <path
              d="M8.66667 3.33333C8.66667 2.59695 9.26362 2 10 2H12.6667C13.403 2 14 2.59695 14 3.33333V6C14 6.73638 13.403 7.33333 12.6667 7.33333H10C9.26362 7.33333 8.66667 6.73638 8.66667 6V3.33333Z"
              fill="currentColor"
            />
            <path
              d="M8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667H12.6667C13.403 8.66667 14 9.26362 14 10V12.6667C14 13.403 13.403 14 12.6667 14H10C9.26362 14 8.66667 13.403 8.66667 12.6667V10Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M3 5C3 3.89543 3.89543 3 5 3H9C10.1046 3 11 3.89543 11 5V9C11 10.1046 10.1046 11 9 11H5C3.89543 11 3 10.1046 3 9V5Z"
              fill="currentColor"
            />
            <path
              d="M3 15C3 13.8954 3.89543 13 5 13H9C10.1046 13 11 13.8954 11 15V19C11 20.1046 10.1046 21 9 21H5C3.89543 21 3 20.1046 3 19V15Z"
              fill="currentColor"
            />
            <path
              d="M13 5C13 3.89543 13.8954 3 15 3H19C20.1046 3 21 3.89543 21 5V9C21 10.1046 20.1046 11 19 11H15C13.8954 11 13 10.1046 13 9V5Z"
              fill="currentColor"
            />
            <path
              d="M13 15C13 13.8954 13.8954 13 15 13H19C20.1046 13 21 13.8954 21 15V19C21 20.1046 20.1046 21 19 21H15C13.8954 21 13 20.1046 13 19V15Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M3.5 5.83333C3.5 4.54467 4.54467 3.5 5.83333 3.5H10.5C11.7887 3.5 12.8333 4.54467 12.8333 5.83333V10.5C12.8333 11.7887 11.7887 12.8333 10.5 12.8333H5.83333C4.54467 12.8333 3.5 11.7887 3.5 10.5V5.83333Z"
              fill="currentColor"
            />
            <path
              d="M3.5 17.5C3.5 16.2113 4.54467 15.1667 5.83333 15.1667H10.5C11.7887 15.1667 12.8333 16.2113 12.8333 17.5V22.1667C12.8333 23.4553 11.7887 24.5 10.5 24.5H5.83333C4.54467 24.5 3.5 23.4553 3.5 22.1667V17.5Z"
              fill="currentColor"
            />
            <path
              d="M15.1667 5.83333C15.1667 4.54467 16.2113 3.5 17.5 3.5H22.1667C23.4553 3.5 24.5 4.54467 24.5 5.83333V10.5C24.5 11.7887 23.4553 12.8333 22.1667 12.8333H17.5C16.2113 12.8333 15.1667 11.7887 15.1667 10.5V5.83333Z"
              fill="currentColor"
            />
            <path
              d="M15.1667 17.5C15.1667 16.2113 16.2113 15.1667 17.5 15.1667H22.1667C23.4553 15.1667 24.5 16.2113 24.5 17.5V22.1667C24.5 23.4553 23.4553 24.5 22.1667 24.5H17.5C16.2113 24.5 15.1667 23.4553 15.1667 22.1667V17.5Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
