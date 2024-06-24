// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-ratio-three-to-four",
})
export class SwirlIconRatioThreeToFour {
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
              d="M11.9999 14.6668H3.9999C3.63323 14.6668 3.31934 14.5363 3.05823 14.2752C2.79712 14.0141 2.66656 13.7002 2.66656 13.3335V2.66683C2.66656 2.30016 2.79712 1.98627 3.05823 1.72516C3.31934 1.46405 3.63323 1.3335 3.9999 1.3335H11.9999C12.3666 1.3335 12.6805 1.46405 12.9416 1.72516C13.2027 1.98627 13.3332 2.30016 13.3332 2.66683V13.3335C13.3332 13.7002 13.2027 14.0141 12.9416 14.2752C12.6805 14.5363 12.3666 14.6668 11.9999 14.6668ZM3.9999 13.3335H11.9999V2.66683H3.9999V13.3335Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M17.9999 22H5.99988C5.44988 22 4.97904 21.8042 4.58738 21.4125C4.19571 21.0208 3.99988 20.55 3.99988 20V4C3.99988 3.45 4.19571 2.97917 4.58738 2.5875C4.97904 2.19583 5.44988 2 5.99988 2H17.9999C18.5499 2 19.0207 2.19583 19.4124 2.5875C19.804 2.97917 19.9999 3.45 19.9999 4V20C19.9999 20.55 19.804 21.0208 19.4124 21.4125C19.0207 21.8042 18.5499 22 17.9999 22ZM5.99988 20H17.9999V4H5.99988V20Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M20.9998 25.6668H6.99984C6.35817 25.6668 5.80887 25.4384 5.35192 24.9814C4.89498 24.5245 4.6665 23.9752 4.6665 23.3335V4.66683C4.6665 4.02516 4.89498 3.47586 5.35192 3.01891C5.80887 2.56197 6.35817 2.3335 6.99984 2.3335H20.9998C21.6415 2.3335 22.1908 2.56197 22.6478 3.01891C23.1047 3.47586 23.3332 4.02516 23.3332 4.66683V23.3335C23.3332 23.9752 23.1047 24.5245 22.6478 24.9814C22.1908 25.4384 21.6415 25.6668 20.9998 25.6668ZM6.99984 23.3335H20.9998V4.66683H6.99984V23.3335Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
