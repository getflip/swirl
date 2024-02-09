// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-home",
})
export class SwirlIconHome {
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
              d="M4.00002 12.6667H6.00002V8.66667H10V12.6667H12V6.66667L8.00002 3.66667L4.00002 6.66667V12.6667ZM4.00002 14C3.63335 14 3.31946 13.8694 3.05835 13.6083C2.79724 13.3472 2.66669 13.0333 2.66669 12.6667V6.66667C2.66669 6.45555 2.71391 6.25555 2.80835 6.06667C2.9028 5.87778 3.03335 5.72222 3.20002 5.6L7.20002 2.6C7.32224 2.51111 7.45002 2.44444 7.58335 2.4C7.71669 2.35555 7.85558 2.33333 8.00002 2.33333C8.14446 2.33333 8.28335 2.35555 8.41669 2.4C8.55002 2.44444 8.6778 2.51111 8.80002 2.6L12.8 5.6C12.9667 5.72222 13.0972 5.87778 13.1917 6.06667C13.2861 6.25555 13.3334 6.45555 13.3334 6.66667V12.6667C13.3334 13.0333 13.2028 13.3472 12.9417 13.6083C12.6806 13.8694 12.3667 14 12 14H8.66669V10H7.33335V14H4.00002Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M6 19H9V13H15V19H18V10L12 5.5L6 10V19ZM6 21C5.45 21 4.97917 20.8042 4.5875 20.4125C4.19583 20.0208 4 19.55 4 19V10C4 9.68333 4.07083 9.38333 4.2125 9.1C4.35417 8.81667 4.55 8.58333 4.8 8.4L10.8 3.9C10.9833 3.76667 11.175 3.66667 11.375 3.6C11.575 3.53333 11.7833 3.5 12 3.5C12.2167 3.5 12.425 3.53333 12.625 3.6C12.825 3.66667 13.0167 3.76667 13.2 3.9L19.2 8.4C19.45 8.58333 19.6458 8.81667 19.7875 9.1C19.9292 9.38333 20 9.68333 20 10V19C20 19.55 19.8042 20.0208 19.4125 20.4125C19.0208 20.8042 18.55 21 18 21H13V15H11V21H6Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M6.99999 22.1667H10.5V15.1667H17.5V22.1667H21V11.6667L14 6.41667L6.99999 11.6667V22.1667ZM6.99999 24.5C6.35832 24.5 5.80902 24.2715 5.35207 23.8146C4.89513 23.3576 4.66666 22.8083 4.66666 22.1667V11.6667C4.66666 11.2972 4.7493 10.9472 4.91457 10.6167C5.07985 10.2861 5.30832 10.0139 5.59999 9.8L12.6 4.55C12.8139 4.39445 13.0375 4.27778 13.2708 4.2C13.5042 4.12222 13.7472 4.08334 14 4.08334C14.2528 4.08334 14.4958 4.12222 14.7292 4.2C14.9625 4.27778 15.1861 4.39445 15.4 4.55L22.4 9.8C22.6917 10.0139 22.9201 10.2861 23.0854 10.6167C23.2507 10.9472 23.3333 11.2972 23.3333 11.6667V22.1667C23.3333 22.8083 23.1049 23.3576 22.6479 23.8146C22.191 24.2715 21.6417 24.5 21 24.5H15.1667V17.5H12.8333V24.5H6.99999Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
