// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-drag-handle",
})
export class SwirlIconDragHandle {
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
            <rect x="9" y="3" width="2" height="2" rx="1" fill="currentColor" />
            <rect x="9" y="7" width="2" height="2" rx="1" fill="currentColor" />
            <rect
              x="9"
              y="11"
              width="2"
              height="2"
              rx="1"
              fill="currentColor"
            />
            <rect x="5" y="3" width="2" height="2" rx="1" fill="currentColor" />
            <rect x="5" y="7" width="2" height="2" rx="1" fill="currentColor" />
            <rect
              x="5"
              y="11"
              width="2"
              height="2"
              rx="1"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <rect
              x="13.5"
              y="4.5"
              width="3"
              height="3"
              rx="1.5"
              fill="currentColor"
            />
            <rect
              x="13.5"
              y="10.5"
              width="3"
              height="3"
              rx="1.5"
              fill="currentColor"
            />
            <rect
              x="13.5"
              y="16.5"
              width="3"
              height="3"
              rx="1.5"
              fill="currentColor"
            />
            <rect
              x="7.5"
              y="4.5"
              width="3"
              height="3"
              rx="1.5"
              fill="currentColor"
            />
            <rect
              x="7.5"
              y="10.5"
              width="3"
              height="3"
              rx="1.5"
              fill="currentColor"
            />
            <rect
              x="7.5"
              y="16.5"
              width="3"
              height="3"
              rx="1.5"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <rect
              x="15.75"
              y="5.25"
              width="3.5"
              height="3.5"
              rx="1.75"
              fill="currentColor"
            />
            <rect
              x="15.75"
              y="12.25"
              width="3.5"
              height="3.5"
              rx="1.75"
              fill="currentColor"
            />
            <rect
              x="15.75"
              y="19.25"
              width="3.5"
              height="3.5"
              rx="1.75"
              fill="currentColor"
            />
            <rect
              x="8.75"
              y="5.25"
              width="3.5"
              height="3.5"
              rx="1.75"
              fill="currentColor"
            />
            <rect
              x="8.75"
              y="12.25"
              width="3.5"
              height="3.5"
              rx="1.75"
              fill="currentColor"
            />
            <rect
              x="8.75"
              y="19.25"
              width="3.5"
              height="3.5"
              rx="1.75"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
