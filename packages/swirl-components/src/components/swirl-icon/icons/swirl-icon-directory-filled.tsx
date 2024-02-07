// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-directory-filled",
})
export class SwirlIconDirectoryFilled {
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
              d="M0.666626 4C0.666626 3.63181 0.965103 3.33333 1.33329 3.33333C1.70148 3.33333 1.99996 3.63181 1.99996 4V12C1.99996 12.3682 1.70148 12.6667 1.33329 12.6667C0.965103 12.6667 0.666626 12.3682 0.666626 12V4Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.66663 4C2.66663 2.89543 3.56206 2 4.66663 2H12.6666C13.7712 2 14.6666 2.89543 14.6666 4V12C14.6666 13.1046 13.7712 14 12.6666 14H4.66663C3.56206 14 2.66663 13.1046 2.66663 12V4ZM4.83671 12.6667C5.68001 11.4577 7.08109 10.6667 8.66692 10.6667C10.2527 10.6667 11.6538 11.4577 12.4971 12.6667H4.83671ZM8.66663 9.33333C9.7712 9.33333 10.6666 8.4379 10.6666 7.33333C10.6666 6.22876 9.7712 5.33333 8.66663 5.33333C7.56206 5.33333 6.66663 6.22876 6.66663 7.33333C6.66663 8.4379 7.56206 9.33333 8.66663 9.33333Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M1 6C1 5.44772 1.44772 5 2 5C2.55228 5 3 5.44772 3 6V18C3 18.5523 2.55228 19 2 19C1.44772 19 1 18.5523 1 18V6Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4 6C4 4.34315 5.34315 3 7 3H19C20.6569 3 22 4.34315 22 6V18C22 19.6569 20.6569 21 19 21H7C5.34315 21 4 19.6569 4 18V6ZM7.25513 19C8.52007 17.1865 10.6217 16 13.0004 16C15.3792 16 17.4808 17.1865 18.7457 19H7.25513ZM13 14C14.6569 14 16 12.6569 16 11C16 9.34315 14.6569 8 13 8C11.3431 8 10 9.34315 10 11C10 12.6569 11.3431 14 13 14Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M1.16663 7C1.16663 6.35567 1.68896 5.83333 2.33329 5.83333C2.97762 5.83333 3.49996 6.35567 3.49996 7V21C3.49996 21.6443 2.97762 22.1667 2.33329 22.1667C1.68896 22.1667 1.16663 21.6443 1.16663 21V7Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.66663 7C4.66663 5.067 6.23363 3.5 8.16663 3.5H22.1666C24.0996 3.5 25.6666 5.067 25.6666 7V21C25.6666 22.933 24.0996 24.5 22.1666 24.5H8.16663C6.23363 24.5 4.66663 22.933 4.66663 21V7ZM8.46427 22.1667C9.94004 20.0509 12.3919 18.6667 15.1671 18.6667C17.9423 18.6667 20.3942 20.0509 21.87 22.1667H8.46427ZM15.1666 16.3333C17.0996 16.3333 18.6666 14.7663 18.6666 12.8333C18.6666 10.9003 17.0996 9.33333 15.1666 9.33333C13.2336 9.33333 11.6666 10.9003 11.6666 12.8333C11.6666 14.7663 13.2336 16.3333 15.1666 16.3333Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
