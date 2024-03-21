// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-place",
})
export class SwirlIconPlace {
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
              d="M8.00002 8.00016C7.26669 8.00016 6.66669 7.40016 6.66669 6.66683C6.66669 5.9335 7.26669 5.3335 8.00002 5.3335C8.73335 5.3335 9.33335 5.9335 9.33335 6.66683C9.33335 7.40016 8.73335 8.00016 8.00002 8.00016ZM12 6.80016C12 4.38016 10.2334 2.66683 8.00002 2.66683C5.76669 2.66683 4.00002 4.38016 4.00002 6.80016C4.00002 8.36016 5.30002 10.4268 8.00002 12.8935C10.7 10.4268 12 8.36016 12 6.80016ZM8.00002 1.3335C10.8 1.3335 13.3334 3.48016 13.3334 6.80016C13.3334 9.0135 11.5534 11.6335 8.00002 14.6668C4.44669 11.6335 2.66669 9.0135 2.66669 6.80016C2.66669 3.48016 5.20002 1.3335 8.00002 1.3335Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12ZM18 10.2C18 6.57 15.35 4 12 4C8.65 4 6 6.57 6 10.2C6 12.54 7.95 15.64 12 19.34C16.05 15.64 18 12.54 18 10.2ZM12 2C16.2 2 20 5.22 20 10.2C20 13.52 17.33 17.45 12 22C6.67 17.45 4 13.52 4 10.2C4 5.22 7.8 2 12 2Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M14 14.0002C12.7167 14.0002 11.6667 12.9502 11.6667 11.6668C11.6667 10.3835 12.7167 9.3335 14 9.3335C15.2834 9.3335 16.3334 10.3835 16.3334 11.6668C16.3334 12.9502 15.2834 14.0002 14 14.0002ZM21 11.9002C21 7.66516 17.9084 4.66683 14 4.66683C10.0917 4.66683 7.00002 7.66516 7.00002 11.9002C7.00002 14.6302 9.27502 18.2468 14 22.5635C18.725 18.2468 21 14.6302 21 11.9002ZM14 2.3335C18.9 2.3335 23.3334 6.09016 23.3334 11.9002C23.3334 15.7735 20.2184 20.3585 14 25.6668C7.78169 20.3585 4.66669 15.7735 4.66669 11.9002C4.66669 6.09016 9.10002 2.3335 14 2.3335Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
