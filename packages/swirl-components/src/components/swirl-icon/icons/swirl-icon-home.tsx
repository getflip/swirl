// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-home",
})
export class SwirlIconHome {
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
              d="M3.99996 14C3.63329 14 3.3194 13.8694 3.05829 13.6083C2.79718 13.3472 2.66663 13.0333 2.66663 12.6667V6.66667C2.66663 6.45556 2.71385 6.25556 2.80829 6.06667C2.90274 5.87778 3.03329 5.72222 3.19996 5.6L7.19996 2.6C7.32218 2.51111 7.44996 2.44445 7.58329 2.4C7.71663 2.35556 7.85552 2.33334 7.99996 2.33334C8.1444 2.33334 8.28329 2.35556 8.41663 2.4C8.54996 2.44445 8.67774 2.51111 8.79996 2.6L12.8 5.6C12.9666 5.72222 13.0972 5.87778 13.1916 6.06667C13.2861 6.25556 13.3333 6.45556 13.3333 6.66667V12.6667C13.3333 13.0333 13.2027 13.3472 12.9416 13.6083C12.6805 13.8694 12.3666 14 12 14H9.33329V9.33334H6.66663V14H3.99996Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M6 21C5.45 21 4.97917 20.8042 4.5875 20.4125C4.19583 20.0208 4 19.55 4 19V10C4 9.68333 4.07083 9.38333 4.2125 9.1C4.35417 8.81667 4.55 8.58333 4.8 8.4L10.8 3.9C10.9833 3.76667 11.175 3.66667 11.375 3.6C11.575 3.53333 11.7833 3.5 12 3.5C12.2167 3.5 12.425 3.53333 12.625 3.6C12.825 3.66667 13.0167 3.76667 13.2 3.9L19.2 8.4C19.45 8.58333 19.6458 8.81667 19.7875 9.1C19.9292 9.38333 20 9.68333 20 10V19C20 19.55 19.8042 20.0208 19.4125 20.4125C19.0208 20.8042 18.55 21 18 21H14V14H10V21H6Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M6 21C5.45 21 4.97917 20.8042 4.5875 20.4125C4.19583 20.0208 4 19.55 4 19V10C4 9.68333 4.07083 9.38333 4.2125 9.1C4.35417 8.81667 4.55 8.58333 4.8 8.4L10.8 3.9C10.9833 3.76667 11.175 3.66667 11.375 3.6C11.575 3.53333 11.7833 3.5 12 3.5C12.2167 3.5 12.425 3.53333 12.625 3.6C12.825 3.66667 13.0167 3.76667 13.2 3.9L19.2 8.4C19.45 8.58333 19.6458 8.81667 19.7875 9.1C19.9292 9.38333 20 9.68333 20 10V19C20 19.55 19.8042 20.0208 19.4125 20.4125C19.0208 20.8042 18.55 21 18 21H14V14H10V21H6Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
