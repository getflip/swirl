// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-ratio-sixteen-to-nine",
})
export class SwirlIconRatioSixteenToNine {
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
              d="M3.33333 11.3332C2.96667 11.3332 2.65278 11.2026 2.39167 10.9415C2.13056 10.6804 2 10.3665 2 9.99984V5.99984C2 5.63317 2.13056 5.31928 2.39167 5.05817C2.65278 4.79706 2.96667 4.6665 3.33333 4.6665H12.6667C13.0333 4.6665 13.3472 4.79706 13.6083 5.05817C13.8694 5.31928 14 5.63317 14 5.99984V9.99984C14 10.3665 13.8694 10.6804 13.6083 10.9415C13.3472 11.2026 13.0333 11.3332 12.6667 11.3332H3.33333ZM3.33333 9.99984H12.6667V5.99984H3.33333V9.99984Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M5 17C4.45 17 3.97917 16.8042 3.5875 16.4125C3.19583 16.0208 3 15.55 3 15V9C3 8.45 3.19583 7.97917 3.5875 7.5875C3.97917 7.19583 4.45 7 5 7H19C19.55 7 20.0208 7.19583 20.4125 7.5875C20.8042 7.97917 21 8.45 21 9V15C21 15.55 20.8042 16.0208 20.4125 16.4125C20.0208 16.8042 19.55 17 19 17H5ZM5 15H19V9H5V15Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M5.83333 19.8332C5.19167 19.8332 4.64236 19.6047 4.18542 19.1478C3.72847 18.6908 3.5 18.1415 3.5 17.4998V10.4998C3.5 9.85817 3.72847 9.30887 4.18542 8.85192C4.64236 8.39498 5.19167 8.1665 5.83333 8.1665H22.1667C22.8083 8.1665 23.3576 8.39498 23.8146 8.85192C24.2715 9.30887 24.5 9.85817 24.5 10.4998V17.4998C24.5 18.1415 24.2715 18.6908 23.8146 19.1478C23.3576 19.6047 22.8083 19.8332 22.1667 19.8332H5.83333ZM5.83333 17.4998H22.1667V10.4998H5.83333V17.4998Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
