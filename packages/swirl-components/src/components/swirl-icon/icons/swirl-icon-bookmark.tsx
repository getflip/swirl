// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-bookmark",
})
export class SwirlIconBookmark {
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
              d="M4.66666 11.9667L7.99999 10.5333L11.3333 11.9667V3.33333H4.66666V11.9667ZM4.26666 13.6C4.04444 13.6889 3.83333 13.6693 3.63333 13.5413C3.43333 13.4138 3.33333 13.2278 3.33333 12.9833V3.33333C3.33333 2.96667 3.46399 2.65267 3.72533 2.39133C3.98622 2.13044 4.29999 2 4.66666 2H11.3333C11.7 2 12.014 2.13044 12.2753 2.39133C12.5362 2.65267 12.6667 2.96667 12.6667 3.33333V12.9833C12.6667 13.2278 12.5667 13.4138 12.3667 13.5413C12.1667 13.6693 11.9556 13.6889 11.7333 13.6L7.99999 12L4.26666 13.6Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M7 17.95L12 15.8L17 17.95V5H7V17.95ZM6.4 20.4C6.06667 20.5333 5.75 20.504 5.45 20.312C5.15 20.1207 5 19.8417 5 19.475V5C5 4.45 5.196 3.979 5.588 3.587C5.97933 3.19567 6.45 3 7 3H17C17.55 3 18.021 3.19567 18.413 3.587C18.8043 3.979 19 4.45 19 5V19.475C19 19.8417 18.85 20.1207 18.55 20.312C18.25 20.504 17.9333 20.5333 17.6 20.4L12 18L6.4 20.4Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M8.16666 20.9417L14 18.4333L19.8333 20.9417V5.83333H8.16666V20.9417ZM7.46666 23.8C7.07777 23.9556 6.70833 23.9213 6.35833 23.6973C6.00833 23.4741 5.83333 23.1486 5.83333 22.7208V5.83333C5.83333 5.19167 6.06199 4.64217 6.51933 4.18483C6.97588 3.72828 7.525 3.5 8.16666 3.5H19.8333C20.475 3.5 21.0245 3.72828 21.4818 4.18483C21.9384 4.64217 22.1667 5.19167 22.1667 5.83333V22.7208C22.1667 23.1486 21.9917 23.4741 21.6417 23.6973C21.2917 23.9213 20.9222 23.9556 20.5333 23.8L14 21L7.46666 23.8Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
