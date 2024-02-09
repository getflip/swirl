// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-stop",
})
export class SwirlIconStop {
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
              d="M4 10.6667V5.33333C4 4.96667 4.13056 4.65278 4.39167 4.39167C4.65278 4.13056 4.96667 4 5.33333 4H10.6667C11.0333 4 11.3472 4.13056 11.6083 4.39167C11.8694 4.65278 12 4.96667 12 5.33333V10.6667C12 11.0333 11.8694 11.3472 11.6083 11.6083C11.3472 11.8694 11.0333 12 10.6667 12H5.33333C4.96667 12 4.65278 11.8694 4.39167 11.6083C4.13056 11.3472 4 11.0333 4 10.6667ZM5.33333 10.6667H10.6667V5.33333H5.33333V10.6667Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M6 16V8C6 7.45 6.19583 6.97917 6.5875 6.5875C6.97917 6.19583 7.45 6 8 6H16C16.55 6 17.0208 6.19583 17.4125 6.5875C17.8042 6.97917 18 7.45 18 8V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H8C7.45 18 6.97917 17.8042 6.5875 17.4125C6.19583 17.0208 6 16.55 6 16ZM8 16H16V8H8V16Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M7 18.6667V9.33333C7 8.69167 7.22847 8.14236 7.68542 7.68542C8.14236 7.22847 8.69167 7 9.33333 7H18.6667C19.3083 7 19.8576 7.22847 20.3146 7.68542C20.7715 8.14236 21 8.69167 21 9.33333V18.6667C21 19.3083 20.7715 19.8576 20.3146 20.3146C19.8576 20.7715 19.3083 21 18.6667 21H9.33333C8.69167 21 8.14236 20.7715 7.68542 20.3146C7.22847 19.8576 7 19.3083 7 18.6667ZM9.33333 18.6667H18.6667V9.33333H9.33333V18.6667Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
