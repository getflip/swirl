// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-pause",
})
export class SwirlIconPause {
  @Prop() size: SwirlIconSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

    const className = classnames("swirl-icon", `swirl-icon--size-${this.size}`);

    return (
      <svg
        class={className}
        fill="none"
        height={this.size}
        part="icon"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.size === 16 && (
          <Fragment>
            <path
              d="M5.33333 12.6666C6.06667 12.6666 6.66667 12.0666 6.66667 11.3333V4.66659C6.66667 3.93325 6.06667 3.33325 5.33333 3.33325C4.6 3.33325 4 3.93325 4 4.66659V11.3333C4 12.0666 4.6 12.6666 5.33333 12.6666ZM9.33333 4.66659V11.3333C9.33333 12.0666 9.93333 12.6666 10.6667 12.6666C11.4 12.6666 12 12.0666 12 11.3333V4.66659C12 3.93325 11.4 3.33325 10.6667 3.33325C9.93333 3.33325 9.33333 3.93325 9.33333 4.66659Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M8 19C9.1 19 10 18.1 10 17V7C10 5.9 9.1 5 8 5C6.9 5 6 5.9 6 7V17C6 18.1 6.9 19 8 19ZM14 7V17C14 18.1 14.9 19 16 19C17.1 19 18 18.1 18 17V7C18 5.9 17.1 5 16 5C14.9 5 14 5.9 14 7Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M9.33333 22.1666C10.6167 22.1666 11.6667 21.1166 11.6667 19.8333V8.16659C11.6667 6.88325 10.6167 5.83325 9.33333 5.83325C8.05 5.83325 7 6.88325 7 8.16659V19.8333C7 21.1166 8.05 22.1666 9.33333 22.1666ZM16.3333 8.16659V19.8333C16.3333 21.1166 17.3833 22.1666 18.6667 22.1666C19.95 22.1666 21 21.1166 21 19.8333V8.16659C21 6.88325 19.95 5.83325 18.6667 5.83325C17.3833 5.83325 16.3333 6.88325 16.3333 8.16659Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
