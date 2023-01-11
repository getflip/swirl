// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { FlipIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "flip-icon-chat-bubble",
})
export class FlipIconChatBubble {
  @Prop() size: FlipIconSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

    const className = classnames("flip-icon", `flip-icon--size-${this.size}`);

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
              d="M3.5 2C2.67157 2 2 2.67157 2 3.5V9.5C2 10.3284 2.67157 11 3.5 11H5V13.7929C5 14.2383 5.53857 14.4614 5.85355 14.1464L9 11H12.5C13.3284 11 14 10.3284 14 9.5V3.5C14 2.67157 13.3284 2 12.5 2H3.5Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M5.25 3C4.00736 3 3 4.00736 3 5.25V14.25C3 15.4926 4.00736 16.5 5.25 16.5H7.5V20.6893C7.5 21.3575 8.30786 21.6921 8.78033 21.2197L13.5 16.5H18.75C19.9926 16.5 21 15.4926 21 14.25V5.25C21 4.00736 19.9926 3 18.75 3H5.25Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M6.125 3.5C4.67525 3.5 3.5 4.67525 3.5 6.125V16.625C3.5 18.0747 4.67525 19.25 6.125 19.25H8.75V24.1376C8.75 24.9171 9.6925 25.3075 10.2437 24.7563L15.75 19.25H21.875C23.3247 19.25 24.5 18.0747 24.5 16.625V6.125C24.5 4.67525 23.3247 3.5 21.875 3.5H6.125Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
