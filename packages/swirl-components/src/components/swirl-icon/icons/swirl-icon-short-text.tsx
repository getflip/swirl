// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-short-text",
})
export class SwirlIconShortText {
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
              d="M3.33335 7.33333C3.14446 7.33333 2.98613 7.26944 2.85835 7.14167C2.73058 7.01389 2.66669 6.85556 2.66669 6.66667C2.66669 6.47778 2.73058 6.31944 2.85835 6.19167C2.98613 6.06389 3.14446 6 3.33335 6H12.6667C12.8556 6 13.0139 6.06389 13.1417 6.19167C13.2695 6.31944 13.3334 6.47778 13.3334 6.66667C13.3334 6.85556 13.2695 7.01389 13.1417 7.14167C13.0139 7.26944 12.8556 7.33333 12.6667 7.33333H3.33335ZM3.33335 10C3.14446 10 2.98613 9.93611 2.85835 9.80833C2.73058 9.68056 2.66669 9.52222 2.66669 9.33333C2.66669 9.14444 2.73058 8.98611 2.85835 8.85833C2.98613 8.73056 3.14446 8.66667 3.33335 8.66667H8.66669C8.85558 8.66667 9.01391 8.73056 9.14169 8.85833C9.26947 8.98611 9.33335 9.14444 9.33335 9.33333C9.33335 9.52222 9.26947 9.68056 9.14169 9.80833C9.01391 9.93611 8.85558 10 8.66669 10H3.33335Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M5 11C4.71667 11 4.47917 10.9042 4.2875 10.7125C4.09583 10.5208 4 10.2833 4 10C4 9.71667 4.09583 9.47917 4.2875 9.2875C4.47917 9.09583 4.71667 9 5 9H19C19.2833 9 19.5208 9.09583 19.7125 9.2875C19.9042 9.47917 20 9.71667 20 10C20 10.2833 19.9042 10.5208 19.7125 10.7125C19.5208 10.9042 19.2833 11 19 11H5ZM5 15C4.71667 15 4.47917 14.9042 4.2875 14.7125C4.09583 14.5208 4 14.2833 4 14C4 13.7167 4.09583 13.4792 4.2875 13.2875C4.47917 13.0958 4.71667 13 5 13H13C13.2833 13 13.5208 13.0958 13.7125 13.2875C13.9042 13.4792 14 13.7167 14 14C14 14.2833 13.9042 14.5208 13.7125 14.7125C13.5208 14.9042 13.2833 15 13 15H5Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M5.83332 12.8333C5.50277 12.8333 5.22568 12.7215 5.00207 12.4979C4.77846 12.2743 4.66666 11.9972 4.66666 11.6667C4.66666 11.3361 4.77846 11.059 5.00207 10.8354C5.22568 10.6118 5.50277 10.5 5.83332 10.5H22.1667C22.4972 10.5 22.7743 10.6118 22.9979 10.8354C23.2215 11.059 23.3333 11.3361 23.3333 11.6667C23.3333 11.9972 23.2215 12.2743 22.9979 12.4979C22.7743 12.7215 22.4972 12.8333 22.1667 12.8333H5.83332ZM5.83332 17.5C5.50277 17.5 5.22568 17.3882 5.00207 17.1646C4.77846 16.941 4.66666 16.6639 4.66666 16.3333C4.66666 16.0028 4.77846 15.7257 5.00207 15.5021C5.22568 15.2785 5.50277 15.1667 5.83332 15.1667H15.1667C15.4972 15.1667 15.7743 15.2785 15.9979 15.5021C16.2215 15.7257 16.3333 16.0028 16.3333 16.3333C16.3333 16.6639 16.2215 16.941 15.9979 17.1646C15.7743 17.3882 15.4972 17.5 15.1667 17.5H5.83332Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}