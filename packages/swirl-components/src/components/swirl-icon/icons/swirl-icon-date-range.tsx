// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-date-range",
})
export class SwirlIconDateRange {
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
              d="M12.6667 2.66671H12V2.00004C12 1.63337 11.7 1.33337 11.3333 1.33337C10.9667 1.33337 10.6667 1.63337 10.6667 2.00004V2.66671H5.33333V2.00004C5.33333 1.63337 5.03333 1.33337 4.66667 1.33337C4.3 1.33337 4 1.63337 4 2.00004V2.66671H3.33333C2.59333 2.66671 2.00667 3.26671 2.00667 4.00004L2 13.3334C2 14.0667 2.59333 14.6667 3.33333 14.6667H12.6667C13.4 14.6667 14 14.0667 14 13.3334V4.00004C14 3.26671 13.4 2.66671 12.6667 2.66671ZM12.6667 12.6667C12.6667 13.0334 12.3667 13.3334 12 13.3334H4C3.63333 13.3334 3.33333 13.0334 3.33333 12.6667V6.00004H12.6667V12.6667ZM4.66667 7.33337H6V8.66671H4.66667V7.33337ZM7.33333 7.33337H8.66667V8.66671H7.33333V7.33337ZM10 7.33337H11.3333V8.66671H10V7.33337Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M19 4H18V3C18 2.45 17.55 2 17 2C16.45 2 16 2.45 16 3V4H8V3C8 2.45 7.55 2 7 2C6.45 2 6 2.45 6 3V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 19C19 19.55 18.55 20 18 20H6C5.45 20 5 19.55 5 19V9H19V19ZM7 11H9V13H7V11ZM11 11H13V13H11V11ZM15 11H17V13H15V11Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M22.1667 4.66671H21V3.50004C21 2.85837 20.475 2.33337 19.8333 2.33337C19.1917 2.33337 18.6667 2.85837 18.6667 3.50004V4.66671H9.33333V3.50004C9.33333 2.85837 8.80833 2.33337 8.16667 2.33337C7.525 2.33337 7 2.85837 7 3.50004V4.66671H5.83333C4.53833 4.66671 3.51167 5.71671 3.51167 7.00004L3.5 23.3334C3.5 24.6167 4.53833 25.6667 5.83333 25.6667H22.1667C23.45 25.6667 24.5 24.6167 24.5 23.3334V7.00004C24.5 5.71671 23.45 4.66671 22.1667 4.66671ZM22.1667 22.1667C22.1667 22.8084 21.6417 23.3334 21 23.3334H7C6.35833 23.3334 5.83333 22.8084 5.83333 22.1667V10.5H22.1667V22.1667ZM8.16667 12.8334H10.5V15.1667H8.16667V12.8334ZM12.8333 12.8334H15.1667V15.1667H12.8333V12.8334ZM17.5 12.8334H19.8333V15.1667H17.5V12.8334Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
