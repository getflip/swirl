// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-news",
})
export class SwirlIconNews {
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
              d="M6.33333 5.33333C6.33333 5.88562 5.88562 6.33333 5.33333 6.33333C4.78105 6.33333 4.33333 5.88562 4.33333 5.33333C4.33333 4.78105 4.78105 4.33333 5.33333 4.33333C5.88562 4.33333 6.33333 4.78105 6.33333 5.33333Z"
              fill="currentColor"
            />
            <path
              d="M2 4C2 2.89543 2.89543 2 4 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4ZM4 3.33333C3.63181 3.33333 3.33333 3.63181 3.33333 4V7.33333H12.6667V4C12.6667 3.63181 12.3682 3.33333 12 3.33333H4ZM3.33333 8.66667V12C3.33333 12.3682 3.63181 12.6667 4 12.6667H12C12.3682 12.6667 12.6667 12.3682 12.6667 12V8.66667H3.33333Z"
              fill="currentColor"
            />
            <path
              d="M7.33333 5.33333C7.33333 4.96514 7.63181 4.66667 8 4.66667H10.6667C11.0349 4.66667 11.3333 4.96514 11.3333 5.33333C11.3333 5.70152 11.0349 6 10.6667 6H8C7.63181 6 7.33333 5.70152 7.33333 5.33333Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8Z"
              fill="currentColor"
            />
            <path
              d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5C5.44772 5 5 5.44772 5 6V11H19V6C19 5.44772 18.5523 5 18 5H6ZM5 13V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V13H5Z"
              fill="currentColor"
            />
            <path
              d="M11 8C11 7.44772 11.4477 7 12 7H16C16.5523 7 17 7.44772 17 8C17 8.55228 16.5523 9 16 9H12C11.4477 9 11 8.55228 11 8Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M11.0833 9.33333C11.0833 10.2998 10.2998 11.0833 9.33333 11.0833C8.36684 11.0833 7.58333 10.2998 7.58333 9.33333C7.58333 8.36684 8.36684 7.58333 9.33333 7.58333C10.2998 7.58333 11.0833 8.36684 11.0833 9.33333Z"
              fill="currentColor"
            />
            <path
              d="M3.5 7C3.5 5.067 5.067 3.5 7 3.5H21C22.933 3.5 24.5 5.067 24.5 7V21C24.5 22.933 22.933 24.5 21 24.5H7C5.067 24.5 3.5 22.933 3.5 21V7ZM7 5.83333C6.35567 5.83333 5.83333 6.35567 5.83333 7V12.8333H22.1667V7C22.1667 6.35567 21.6443 5.83333 21 5.83333H7ZM5.83333 15.1667V21C5.83333 21.6443 6.35567 22.1667 7 22.1667H21C21.6443 22.1667 22.1667 21.6443 22.1667 21V15.1667H5.83333Z"
              fill="currentColor"
            />
            <path
              d="M12.8333 9.33333C12.8333 8.689 13.3557 8.16667 14 8.16667H18.6667C19.311 8.16667 19.8333 8.689 19.8333 9.33333C19.8333 9.97767 19.311 10.5 18.6667 10.5H14C13.3557 10.5 12.8333 9.97767 12.8333 9.33333Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
