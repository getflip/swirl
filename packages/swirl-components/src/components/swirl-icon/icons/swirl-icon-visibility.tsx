// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-visibility",
})
export class SwirlIconVisibility {
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
              d="M8 3C4.66666 3 1.82 5.07333 0.666664 8C1.82 10.9267 4.66666 13 8 13C11.3333 13 14.18 10.9267 15.3333 8C14.18 5.07333 11.3333 3 8 3ZM8 11.3333C6.16 11.3333 4.66666 9.84 4.66666 8C4.66666 6.16 6.16 4.66667 8 4.66667C9.84 4.66667 11.3333 6.16 11.3333 8C11.3333 9.84 9.84 11.3333 8 11.3333ZM8 6C6.89333 6 6 6.89333 6 8C6 9.10667 6.89333 10 8 10C9.10666 10 10 9.10667 10 8C10 6.89333 9.10666 6 8 6Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M14 5.25C8.16666 5.25 3.185 8.87833 1.16666 14C3.185 19.1217 8.16666 22.75 14 22.75C19.8333 22.75 24.815 19.1217 26.8333 14C24.815 8.87833 19.8333 5.25 14 5.25ZM14 19.8333C10.78 19.8333 8.16666 17.22 8.16666 14C8.16666 10.78 10.78 8.16667 14 8.16667C17.22 8.16667 19.8333 10.78 19.8333 14C19.8333 17.22 17.22 19.8333 14 19.8333ZM14 10.5C12.0633 10.5 10.5 12.0633 10.5 14C10.5 15.9367 12.0633 17.5 14 17.5C15.9367 17.5 17.5 15.9367 17.5 14C17.5 12.0633 15.9367 10.5 14 10.5Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
