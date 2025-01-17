// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-ai-filled",
})
export class SwirlIconAiFilled {
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
              d="M6.66665 12.6667L4.99998 9L1.33331 7.33333L4.99998 5.66667L6.66665 2L8.33331 5.66667L12 7.33333L8.33331 9L6.66665 12.6667ZM12 14L11.1666 12.1667L9.33331 11.3333L11.1666 10.5L12 8.66667L12.8333 10.5L14.6666 11.3333L12.8333 12.1667L12 14Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M10 19L7.5 13.5L2 11L7.5 8.5L10 3L12.5 8.5L18 11L12.5 13.5L10 19ZM18 21L16.75 18.25L14 17L16.75 15.75L18 13L19.25 15.75L22 17L19.25 18.25L18 21Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M11.6666 22.1667L8.74998 15.75L2.33331 12.8333L8.74998 9.91667L11.6666 3.5L14.5833 9.91667L21 12.8333L14.5833 15.75L11.6666 22.1667ZM21 24.5L19.5416 21.2917L16.3333 19.8333L19.5416 18.375L21 15.1667L22.4583 18.375L25.6666 19.8333L22.4583 21.2917L21 24.5Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
