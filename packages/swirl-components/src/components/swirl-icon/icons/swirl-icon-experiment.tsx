// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-experiment",
})
export class SwirlIconExperiment {
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
              d="M3.33335 14C2.76669 14 2.36391 13.7472 2.12502 13.2417C1.88613 12.7361 1.94447 12.2667 2.30002 11.8333L6.00002 7.33333V3.33333H5.33335C5.14447 3.33333 4.98613 3.26944 4.85835 3.14167C4.73058 3.01389 4.66669 2.85556 4.66669 2.66667C4.66669 2.47778 4.73058 2.31944 4.85835 2.19167C4.98613 2.06389 5.14447 2 5.33335 2H10.6667C10.8556 2 11.0139 2.06389 11.1417 2.19167C11.2695 2.31944 11.3334 2.47778 11.3334 2.66667C11.3334 2.85556 11.2695 3.01389 11.1417 3.14167C11.0139 3.26944 10.8556 3.33333 10.6667 3.33333H10V7.33333L13.7 11.8333C14.0556 12.2667 14.1139 12.7361 13.875 13.2417C13.6361 13.7472 13.2334 14 12.6667 14H3.33335ZM4.66669 12H11.3334L9.06669 9.33333H6.93335L4.66669 12ZM3.33335 12.6667H12.6667L8.66669 7.8V3.33333H7.33335V7.8L3.33335 12.6667Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M5 21C4.15 21 3.54583 20.6208 3.1875 19.8625C2.82917 19.1042 2.91667 18.4 3.45 17.75L9 11V5H8C7.71667 5 7.47917 4.90417 7.2875 4.7125C7.09583 4.52083 7 4.28333 7 4C7 3.71667 7.09583 3.47917 7.2875 3.2875C7.47917 3.09583 7.71667 3 8 3H16C16.2833 3 16.5208 3.09583 16.7125 3.2875C16.9042 3.47917 17 3.71667 17 4C17 4.28333 16.9042 4.52083 16.7125 4.7125C16.5208 4.90417 16.2833 5 16 5H15V11L20.55 17.75C21.0833 18.4 21.1708 19.1042 20.8125 19.8625C20.4542 20.6208 19.85 21 19 21H5ZM7 18H17L13.6 14H10.4L7 18ZM5 19H19L13 11.7V5H11V11.7L5 19Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M5.83332 24.5C4.84166 24.5 4.1368 24.0576 3.71874 23.1729C3.30069 22.2882 3.40277 21.4667 4.02499 20.7083L10.5 12.8333V5.83333H9.33332C9.00277 5.83333 8.72569 5.72153 8.50207 5.49792C8.27846 5.27431 8.16666 4.99722 8.16666 4.66667C8.16666 4.33611 8.27846 4.05903 8.50207 3.83542C8.72569 3.61181 9.00277 3.5 9.33332 3.5H18.6667C18.9972 3.5 19.2743 3.61181 19.4979 3.83542C19.7215 4.05903 19.8333 4.33611 19.8333 4.66667C19.8333 4.99722 19.7215 5.27431 19.4979 5.49792C19.2743 5.72153 18.9972 5.83333 18.6667 5.83333H17.5V12.8333L23.975 20.7083C24.5972 21.4667 24.6993 22.2882 24.2812 23.1729C23.8632 24.0576 23.1583 24.5 22.1667 24.5H5.83332ZM8.16666 21H19.8333L15.8667 16.3333H12.1333L8.16666 21ZM5.83332 22.1667H22.1667L15.1667 13.65V5.83333H12.8333V13.65L5.83332 22.1667Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}