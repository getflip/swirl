// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-mail",
})
export class SwirlIconMail {
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
              d="M2.66665 13.3333C2.29998 13.3333 1.9862 13.2028 1.72531 12.942C1.46398 12.6806 1.33331 12.3666 1.33331 12V3.99996C1.33331 3.63329 1.46398 3.31951 1.72531 3.05863C1.9862 2.79729 2.29998 2.66663 2.66665 2.66663H13.3333C13.7 2.66663 14.014 2.79729 14.2753 3.05863C14.5362 3.31951 14.6666 3.63329 14.6666 3.99996V12C14.6666 12.3666 14.5362 12.6806 14.2753 12.942C14.014 13.2028 13.7 13.3333 13.3333 13.3333H2.66665ZM13.3333 5.33329L8.34998 8.44996C8.29442 8.48329 8.23598 8.50818 8.17465 8.52463C8.11376 8.54151 8.05554 8.54996 7.99998 8.54996C7.94442 8.54996 7.8862 8.54151 7.82531 8.52463C7.76398 8.50818 7.70554 8.48329 7.64998 8.44996L2.66665 5.33329V12H13.3333V5.33329ZM7.99998 7.33329L13.3333 3.99996H2.66665L7.99998 7.33329ZM2.66665 5.49996V4.51663V4.53329V4.52463V5.49996Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.196 19.021 2 18.55 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.97933 4.196 3.45 4 4 4H20C20.55 4 21.021 4.196 21.413 4.588C21.8043 4.97933 22 5.45 22 6V18C22 18.55 21.8043 19.021 21.413 19.413C21.021 19.8043 20.55 20 20 20H4ZM20 8L12.525 12.675C12.4417 12.725 12.354 12.7623 12.262 12.787C12.1707 12.8123 12.0833 12.825 12 12.825C11.9167 12.825 11.8293 12.8123 11.738 12.787C11.646 12.7623 11.5583 12.725 11.475 12.675L4 8V18H20V8ZM12 11L20 6H4L12 11ZM4 8.25V6.775V6.8V6.787V8.25Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M4.66665 23.3334C4.02498 23.3334 3.47587 23.1051 3.01931 22.6485C2.56198 22.1912 2.33331 21.6417 2.33331 21V7.00002C2.33331 6.35835 2.56198 5.80924 3.01931 5.35269C3.47587 4.89535 4.02498 4.66669 4.66665 4.66669H23.3333C23.975 4.66669 24.5245 4.89535 24.9818 5.35269C25.4384 5.80924 25.6666 6.35835 25.6666 7.00002V21C25.6666 21.6417 25.4384 22.1912 24.9818 22.6485C24.5245 23.1051 23.975 23.3334 23.3333 23.3334H4.66665ZM23.3333 9.33335L14.6125 14.7875C14.5153 14.8459 14.413 14.8894 14.3056 14.9182C14.1991 14.9477 14.0972 14.9625 14 14.9625C13.9028 14.9625 13.8009 14.9477 13.6943 14.9182C13.587 14.8894 13.4847 14.8459 13.3875 14.7875L4.66665 9.33335V21H23.3333V9.33335ZM14 12.8334L23.3333 7.00002H4.66665L14 12.8334ZM4.66665 9.62502V7.90419V7.93335V7.91819V9.62502Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
