// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-bookmark-filled",
})
export class SwirlIconBookmarkFilled {
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
              d="M7.99998 12L5.19998 13.2C4.75554 13.3889 4.33331 13.3528 3.93331 13.0917C3.53331 12.8306 3.33331 12.4611 3.33331 11.9833V3.33333C3.33331 2.96667 3.46387 2.65278 3.72498 2.39167C3.98609 2.13056 4.29998 2 4.66665 2H11.3333C11.7 2 12.0139 2.13056 12.275 2.39167C12.5361 2.65278 12.6666 2.96667 12.6666 3.33333V11.9833C12.6666 12.4611 12.4666 12.8306 12.0666 13.0917C11.6666 13.3528 11.2444 13.3889 10.8 13.2L7.99998 12Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M12 18L7.8 19.8C7.13333 20.0833 6.5 20.0292 5.9 19.6375C5.3 19.2458 5 18.6917 5 17.975V5C5 4.45 5.19583 3.97917 5.5875 3.5875C5.97917 3.19583 6.45 3 7 3H17C17.55 3 18.0208 3.19583 18.4125 3.5875C18.8042 3.97917 19 4.45 19 5V17.975C19 18.6917 18.7 19.2458 18.1 19.6375C17.5 20.0292 16.8667 20.0833 16.2 19.8L12 18Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M14 21L9.10001 23.1C8.32223 23.4306 7.58334 23.3674 6.88334 22.9104C6.18334 22.4535 5.83334 21.8069 5.83334 20.9708V5.83333C5.83334 5.19167 6.06182 4.64236 6.51876 4.18542C6.9757 3.72847 7.52501 3.5 8.16668 3.5H19.8333C20.475 3.5 21.0243 3.72847 21.4813 4.18542C21.9382 4.64236 22.1667 5.19167 22.1667 5.83333V20.9708C22.1667 21.8069 21.8167 22.4535 21.1167 22.9104C20.4167 23.3674 19.6778 23.4306 18.9 23.1L14 21Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
