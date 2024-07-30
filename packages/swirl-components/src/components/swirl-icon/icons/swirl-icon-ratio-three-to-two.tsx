// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-ratio-three-to-two",
})
export class SwirlIconRatioThreeToTwo {
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
              d="M3.33333 12C2.96667 12 2.65278 11.8694 2.39167 11.6083C2.13056 11.3472 2 11.0333 2 10.6667V5.33333C2 4.96667 2.13056 4.65278 2.39167 4.39167C2.65278 4.13056 2.96667 4 3.33333 4H12.6667C13.0333 4 13.3472 4.13056 13.6083 4.39167C13.8694 4.65278 14 4.96667 14 5.33333V10.6667C14 11.0333 13.8694 11.3472 13.6083 11.6083C13.3472 11.8694 13.0333 12 12.6667 12H3.33333ZM3.33333 10.6667H12.6667V5.33333H3.33333V10.6667Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M5 18C4.45 18 3.97917 17.8042 3.5875 17.4125C3.19583 17.0208 3 16.55 3 16V8C3 7.45 3.19583 6.97917 3.5875 6.5875C3.97917 6.19583 4.45 6 5 6H19C19.55 6 20.0208 6.19583 20.4125 6.5875C20.8042 6.97917 21 7.45 21 8V16C21 16.55 20.8042 17.0208 20.4125 17.4125C20.0208 17.8042 19.55 18 19 18H5ZM5 16H19V8H5V16Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M5.83333 21C5.19167 21 4.64236 20.7715 4.18542 20.3146C3.72847 19.8576 3.5 19.3083 3.5 18.6667V9.33333C3.5 8.69167 3.72847 8.14236 4.18542 7.68542C4.64236 7.22847 5.19167 7 5.83333 7H22.1667C22.8083 7 23.3576 7.22847 23.8146 7.68542C24.2715 8.14236 24.5 8.69167 24.5 9.33333V18.6667C24.5 19.3083 24.2715 19.8576 23.8146 20.3146C23.3576 20.7715 22.8083 21 22.1667 21H5.83333ZM5.83333 18.6667H22.1667V9.33333H5.83333V18.6667Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
