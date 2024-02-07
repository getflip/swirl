// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-send",
})
export class SwirlIconSend {
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
              d="M2 12.3332V3.66654C2 3.4221 2.1 3.23587 2.3 3.10787C2.5 2.98032 2.71111 2.96099 2.93333 3.04987L13.2 7.38321C13.4778 7.50543 13.6167 7.71099 13.6167 7.99987C13.6167 8.28876 13.4778 8.49432 13.2 8.61654L2.93333 12.9499C2.71111 13.0388 2.5 13.0192 2.3 12.8912C2.1 12.7637 2 12.5777 2 12.3332ZM3.33333 11.3332L11.2333 7.99987L3.33333 4.66654V6.99987L7.33333 7.99987L3.33333 8.99987V11.3332Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M3 18.5001V5.50006C3 5.13339 3.15 4.85406 3.45 4.66206C3.75 4.47072 4.06667 4.44172 4.4 4.57506L19.8 11.0751C20.2167 11.2584 20.425 11.5667 20.425 12.0001C20.425 12.4334 20.2167 12.7417 19.8 12.9251L4.4 19.4251C4.06667 19.5584 3.75 19.5291 3.45 19.3371C3.15 19.1457 3 18.8667 3 18.5001ZM5 17.0001L16.85 12.0001L5 7.00006V10.5001L11 12.0001L5 13.5001V17.0001Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M3.5 21.5834V6.41669C3.5 5.98891 3.675 5.66302 4.025 5.43902C4.375 5.2158 4.74444 5.18197 5.13333 5.33752L23.1 12.9209C23.5861 13.1347 23.8292 13.4945 23.8292 14C23.8292 14.5056 23.5861 14.8653 23.1 15.0792L5.13333 22.6625C4.74444 22.8181 4.375 22.7839 4.025 22.5599C3.675 22.3366 3.5 22.0111 3.5 21.5834ZM5.83333 19.8334L19.6583 14L5.83333 8.16669V12.25L12.8333 14L5.83333 15.75V19.8334Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
