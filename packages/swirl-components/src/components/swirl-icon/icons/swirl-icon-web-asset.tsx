// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-web-asset",
})
export class SwirlIconWebAsset {
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
              d="M2.66665 13.3332C2.29998 13.3332 1.98609 13.2026 1.72498 12.9415C1.46387 12.6804 1.33331 12.3665 1.33331 11.9998V3.99984C1.33331 3.63317 1.46387 3.31928 1.72498 3.05817C1.98609 2.79706 2.29998 2.6665 2.66665 2.6665H13.3333C13.7 2.6665 14.0139 2.79706 14.275 3.05817C14.5361 3.31928 14.6666 3.63317 14.6666 3.99984V11.9998C14.6666 12.3665 14.5361 12.6804 14.275 12.9415C14.0139 13.2026 13.7 13.3332 13.3333 13.3332H2.66665ZM2.66665 11.9998H13.3333V5.33317H2.66665V11.9998Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM4 18H20V8H4V18Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M4.66665 23.3332C4.02498 23.3332 3.47567 23.1047 3.01873 22.6478C2.56179 22.1908 2.33331 21.6415 2.33331 20.9998V6.99984C2.33331 6.35817 2.56179 5.80886 3.01873 5.35192C3.47567 4.89498 4.02498 4.6665 4.66665 4.6665H23.3333C23.975 4.6665 24.5243 4.89498 24.9812 5.35192C25.4382 5.80886 25.6666 6.35817 25.6666 6.99984V20.9998C25.6666 21.6415 25.4382 22.1908 24.9812 22.6478C24.5243 23.1047 23.975 23.3332 23.3333 23.3332H4.66665ZM4.66665 20.9998H23.3333V9.33317H4.66665V20.9998Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
