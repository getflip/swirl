// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-folder",
})
export class SwirlIconFolder {
  @Prop() color?: SwirlIconColor;
  @Prop() size: SwirlIconSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

    const styles = {
      color: Boolean(this.color) ? `var(--s-icon-${this.color})` : undefined,
    };

    const className = classnames("swirl-icon", `swirl-icon--size-${this.size}`);

    return (
      <svg
        aria-hidden="true"
        class={className}
        fill="none"
        height={this.size}
        part="icon"
        style={styles}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.size === 16 && (
          <Fragment>
            <path
              d="M2.66665 13.3334C2.29998 13.3334 1.9862 13.2029 1.72531 12.942C1.46398 12.6807 1.33331 12.3667 1.33331 12V4.00002C1.33331 3.63335 1.46398 3.31958 1.72531 3.05869C1.9862 2.79735 2.29998 2.66669 2.66665 2.66669H6.11665C6.29442 2.66669 6.46398 2.70002 6.62531 2.76669C6.7862 2.83335 6.92776 2.9278 7.04998 3.05002L7.99998 4.00002H13.3333C13.7 4.00002 14.014 4.13069 14.2753 4.39202C14.5362 4.65291 14.6666 4.96669 14.6666 5.33335V12C14.6666 12.3667 14.5362 12.6807 14.2753 12.942C14.014 13.2029 13.7 13.3334 13.3333 13.3334H2.66665ZM2.66665 4.00002V12H13.3333V5.33335H7.44998L6.11665 4.00002H2.66665Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.196 19.021 2 18.55 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.97933 4.196 3.45 4 4 4H9.175C9.44167 4 9.696 4.05 9.938 4.15C10.1793 4.25 10.3917 4.39167 10.575 4.575L12 6H20C20.55 6 21.021 6.196 21.413 6.588C21.8043 6.97933 22 7.45 22 8V18C22 18.55 21.8043 19.021 21.413 19.413C21.021 19.8043 20.55 20 20 20H4ZM4 6V18H20V8H11.175L9.175 6H4Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M4.66665 23.3334C4.02498 23.3334 3.47587 23.1051 3.01931 22.6485C2.56198 22.1912 2.33331 21.6417 2.33331 21V7.00002C2.33331 6.35835 2.56198 5.80924 3.01931 5.35269C3.47587 4.89535 4.02498 4.66669 4.66665 4.66669H10.7041C11.0153 4.66669 11.312 4.72502 11.5943 4.84169C11.8759 4.95835 12.1236 5.12363 12.3375 5.33752L14 7.00002H23.3333C23.975 7.00002 24.5245 7.22869 24.9818 7.68602C25.4384 8.14258 25.6666 8.69169 25.6666 9.33335V21C25.6666 21.6417 25.4384 22.1912 24.9818 22.6485C24.5245 23.1051 23.975 23.3334 23.3333 23.3334H4.66665ZM4.66665 7.00002V21H23.3333V9.33335H13.0375L10.7041 7.00002H4.66665Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
