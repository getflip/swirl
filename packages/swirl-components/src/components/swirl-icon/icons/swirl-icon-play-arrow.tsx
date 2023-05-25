// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-play-arrow",
})
export class SwirlIconPlayArrow {
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
              d="M6.35004 12.0167C6.12782 12.1611 5.90282 12.1695 5.67504 12.0417C5.44726 11.9139 5.33337 11.7167 5.33337 11.45V4.55001C5.33337 4.28334 5.44726 4.08612 5.67504 3.95834C5.90282 3.83057 6.12782 3.8389 6.35004 3.98334L11.7834 7.43334C11.9834 7.56668 12.0834 7.75557 12.0834 8.00001C12.0834 8.24445 11.9834 8.43334 11.7834 8.56668L6.35004 12.0167Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M9.525 18.025C9.19167 18.2417 8.85417 18.2542 8.5125 18.0625C8.17083 17.8708 8 17.575 8 17.175V6.825C8 6.425 8.17083 6.12917 8.5125 5.9375C8.85417 5.74583 9.19167 5.75833 9.525 5.975L17.675 11.15C17.975 11.35 18.125 11.6333 18.125 12C18.125 12.3667 17.975 12.65 17.675 12.85L9.525 18.025Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M11.1125 21.0292C10.7237 21.282 10.3299 21.2965 9.93129 21.0729C9.53268 20.8493 9.33337 20.5042 9.33337 20.0375V7.96251C9.33337 7.49584 9.53268 7.1507 9.93129 6.92709C10.3299 6.70348 10.7237 6.71807 11.1125 6.97084L20.6209 13.0083C20.9709 13.2417 21.1459 13.5722 21.1459 14C21.1459 14.4278 20.9709 14.7583 20.6209 14.9917L11.1125 21.0292Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
