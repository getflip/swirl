// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-menu-outlined",
})
export class SwirlIconMenuOutlined {
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
              d="M6 3.33333V6H3.33333V3.33333H6ZM3.33333 2C2.59695 2 2 2.59695 2 3.33333V6C2 6.73638 2.59695 7.33333 3.33333 7.33333H6C6.73638 7.33333 7.33333 6.73638 7.33333 6V3.33333C7.33333 2.59695 6.73638 2 6 2H3.33333Z"
              fill="currentColor"
            />
            <path
              d="M6 10V12.6667H3.33333V10H6ZM3.33333 8.66667C2.59695 8.66667 2 9.26362 2 10V12.6667C2 13.403 2.59695 14 3.33333 14H6C6.73638 14 7.33333 13.403 7.33333 12.6667V10C7.33333 9.26362 6.73638 8.66667 6 8.66667H3.33333Z"
              fill="currentColor"
            />
            <path
              d="M12.6667 3.33333V6H10V3.33333H12.6667ZM10 2C9.26362 2 8.66667 2.59695 8.66667 3.33333V6C8.66667 6.73638 9.26362 7.33333 10 7.33333H12.6667C13.403 7.33333 14 6.73638 14 6V3.33333C14 2.59695 13.403 2 12.6667 2H10Z"
              fill="currentColor"
            />
            <path
              d="M12.6667 10V12.6667H10V10H12.6667ZM10 8.66667C9.26362 8.66667 8.66667 9.26362 8.66667 10V12.6667C8.66667 13.403 9.26362 14 10 14H12.6667C13.403 14 14 13.403 14 12.6667V10C14 9.26362 13.403 8.66667 12.6667 8.66667H10Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M9 5V9H5V5H9ZM5 3C3.89543 3 3 3.89543 3 5V9C3 10.1046 3.89543 11 5 11H9C10.1046 11 11 10.1046 11 9V5C11 3.89543 10.1046 3 9 3H5Z"
              fill="currentColor"
            />
            <path
              d="M9 15V19H5V15H9ZM5 13C3.89543 13 3 13.8954 3 15V19C3 20.1046 3.89543 21 5 21H9C10.1046 21 11 20.1046 11 19V15C11 13.8954 10.1046 13 9 13H5Z"
              fill="currentColor"
            />
            <path
              d="M19 5V9H15V5H19ZM15 3C13.8954 3 13 3.89543 13 5V9C13 10.1046 13.8954 11 15 11H19C20.1046 11 21 10.1046 21 9V5C21 3.89543 20.1046 3 19 3H15Z"
              fill="currentColor"
            />
            <path
              d="M19 15V19H15V15H19ZM15 13C13.8954 13 13 13.8954 13 15V19C13 20.1046 13.8954 21 15 21H19C20.1046 21 21 20.1046 21 19V15C21 13.8954 20.1046 13 19 13H15Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M10.5 5.83333V10.5H5.83333V5.83333H10.5ZM5.83333 3.5C4.54467 3.5 3.5 4.54467 3.5 5.83333V10.5C3.5 11.7887 4.54467 12.8333 5.83333 12.8333H10.5C11.7887 12.8333 12.8333 11.7887 12.8333 10.5V5.83333C12.8333 4.54467 11.7887 3.5 10.5 3.5H5.83333Z"
              fill="currentColor"
            />
            <path
              d="M10.5 17.5V22.1667H5.83333V17.5H10.5ZM5.83333 15.1667C4.54467 15.1667 3.5 16.2113 3.5 17.5V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5H10.5C11.7887 24.5 12.8333 23.4553 12.8333 22.1667V17.5C12.8333 16.2113 11.7887 15.1667 10.5 15.1667H5.83333Z"
              fill="currentColor"
            />
            <path
              d="M22.1667 5.83333V10.5H17.5V5.83333H22.1667ZM17.5 3.5C16.2113 3.5 15.1667 4.54467 15.1667 5.83333V10.5C15.1667 11.7887 16.2113 12.8333 17.5 12.8333H22.1667C23.4553 12.8333 24.5 11.7887 24.5 10.5V5.83333C24.5 4.54467 23.4553 3.5 22.1667 3.5H17.5Z"
              fill="currentColor"
            />
            <path
              d="M22.1667 17.5V22.1667H17.5V17.5H22.1667ZM17.5 15.1667C16.2113 15.1667 15.1667 16.2113 15.1667 17.5V22.1667C15.1667 23.4553 16.2113 24.5 17.5 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V17.5C24.5 16.2113 23.4553 15.1667 22.1667 15.1667H17.5Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
