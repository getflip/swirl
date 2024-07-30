// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-ratio-four-to-three",
})
export class SwirlIconRatioFourToThree {
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
              d="M3.33333 12.6668C2.96667 12.6668 2.65278 12.5363 2.39167 12.2752C2.13056 12.0141 2 11.7002 2 11.3335V4.66683C2 4.30016 2.13056 3.98627 2.39167 3.72516C2.65278 3.46405 2.96667 3.3335 3.33333 3.3335H12.6667C13.0333 3.3335 13.3472 3.46405 13.6083 3.72516C13.8694 3.98627 14 4.30016 14 4.66683V11.3335C14 11.7002 13.8694 12.0141 13.6083 12.2752C13.3472 12.5363 13.0333 12.6668 12.6667 12.6668H3.33333ZM3.33333 11.3335H12.6667V4.66683H3.33333V11.3335Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M5 19C4.45 19 3.97917 18.8042 3.5875 18.4125C3.19583 18.0208 3 17.55 3 17V7C3 6.45 3.19583 5.97917 3.5875 5.5875C3.97917 5.19583 4.45 5 5 5H19C19.55 5 20.0208 5.19583 20.4125 5.5875C20.8042 5.97917 21 6.45 21 7V17C21 17.55 20.8042 18.0208 20.4125 18.4125C20.0208 18.8042 19.55 19 19 19H5ZM5 17H19V7H5V17Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M5.83333 22.1668C5.19167 22.1668 4.64236 21.9384 4.18542 21.4814C3.72847 21.0245 3.5 20.4752 3.5 19.8335V8.16683C3.5 7.52516 3.72847 6.97586 4.18542 6.51891C4.64236 6.06197 5.19167 5.8335 5.83333 5.8335H22.1667C22.8083 5.8335 23.3576 6.06197 23.8146 6.51891C24.2715 6.97586 24.5 7.52516 24.5 8.16683V19.8335C24.5 20.4752 24.2715 21.0245 23.8146 21.4814C23.3576 21.9384 22.8083 22.1668 22.1667 22.1668H5.83333ZM5.83333 19.8335H22.1667V8.16683H5.83333V19.8335Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
