// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-check-circle",
})
export class SwirlIconCheckCircle {
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
              d="M8.00001 1.33337C4.32001 1.33337 1.33334 4.32004 1.33334 8.00004C1.33334 11.68 4.32001 14.6667 8.00001 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8.00004C14.6667 4.32004 11.68 1.33337 8.00001 1.33337ZM6.19334 10.86L3.80001 8.46671C3.54001 8.20671 3.54001 7.78671 3.80001 7.52671C4.06001 7.26671 4.48001 7.26671 4.74001 7.52671L6.66668 9.44671L11.2533 4.86004C11.5133 4.60004 11.9333 4.60004 12.1933 4.86004C12.4533 5.12004 12.4533 5.54004 12.1933 5.80004L7.13334 10.86C6.88001 11.12 6.45334 11.12 6.19334 10.86Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM9.29 16.29L5.7 12.7C5.31 12.31 5.31 11.68 5.7 11.29C6.09 10.9 6.72 10.9 7.11 11.29L10 14.17L16.88 7.29C17.27 6.9 17.9 6.9 18.29 7.29C18.68 7.68 18.68 8.31 18.29 8.7L10.7 16.29C10.32 16.68 9.68 16.68 9.29 16.29Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M14 2.33337C7.56001 2.33337 2.33334 7.56004 2.33334 14C2.33334 20.44 7.56001 25.6667 14 25.6667C20.44 25.6667 25.6667 20.44 25.6667 14C25.6667 7.56004 20.44 2.33337 14 2.33337ZM10.8383 19.005L6.65001 14.8167C6.19501 14.3617 6.19501 13.6267 6.65001 13.1717C7.10501 12.7167 7.84001 12.7167 8.29501 13.1717L11.6667 16.5317L19.6933 8.50504C20.1483 8.05004 20.8833 8.05004 21.3383 8.50504C21.7933 8.96004 21.7933 9.69504 21.3383 10.15L12.4833 19.005C12.04 19.46 11.2933 19.46 10.8383 19.005Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
