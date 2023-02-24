// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-folder",
})
export class SwirlIconFolder {
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
              d="M2.66668 14.1482C2.30001 14.1482 1.98623 14.0177 1.72534 13.7568C1.46401 13.4955 1.33334 13.1815 1.33334 12.8148V4.81484C1.33334 4.44817 1.46401 4.1344 1.72534 3.87351C1.98623 3.61217 2.30001 3.48151 2.66668 3.48151H6.11668C6.29445 3.48151 6.46401 3.51484 6.62534 3.58151C6.78623 3.64817 6.92779 3.74262 7.05001 3.86484L8.00001 4.81484H13.3333C13.7 4.81484 14.014 4.94551 14.2753 5.20684C14.5362 5.46773 14.6667 5.78151 14.6667 6.14817V12.8148C14.6667 13.1815 14.5362 13.4955 14.2753 13.7568C14.014 14.0177 13.7 14.1482 13.3333 14.1482H2.66668Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.196 19.021 2 18.55 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.97933 4.196 3.45 4 4 4H9.175C9.44167 4 9.696 4.05 9.938 4.15C10.1793 4.25 10.3917 4.39167 10.575 4.575L12 6H20C20.55 6 21.021 6.196 21.413 6.588C21.8043 6.97933 22 7.45 22 8V18C22 18.55 21.8043 19.021 21.413 19.413C21.021 19.8043 20.55 20 20 20H4Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M4.66668 23.3334C4.02501 23.3334 3.4759 23.1051 3.01934 22.6485C2.56201 22.1912 2.33334 21.6417 2.33334 21V7.00002C2.33334 6.35835 2.56201 5.80924 3.01934 5.35269C3.4759 4.89535 4.02501 4.66669 4.66668 4.66669H10.7042C11.0153 4.66669 11.312 4.72502 11.5943 4.84169C11.8759 4.95835 12.1236 5.12363 12.3375 5.33752L14 7.00002H23.3333C23.975 7.00002 24.5245 7.22869 24.9818 7.68602C25.4384 8.14258 25.6667 8.69169 25.6667 9.33335V21C25.6667 21.6417 25.4384 22.1912 24.9818 22.6485C24.5245 23.1051 23.975 23.3334 23.3333 23.3334H4.66668Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
