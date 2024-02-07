// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-news-filled",
})
export class SwirlIconNewsFilled {
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 4C2 2.89543 2.89543 2 4 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4ZM3.33333 8.66667V12C3.33333 12.3682 3.63181 12.6667 4 12.6667H12C12.3682 12.6667 12.6667 12.3682 12.6667 12V8.66667H3.33333ZM6 5.33333C6 5.88562 5.55228 6.33333 5 6.33333C4.44772 6.33333 4 5.88562 4 5.33333C4 4.78105 4.44772 4.33333 5 4.33333C5.55228 4.33333 6 4.78105 6 5.33333ZM8 4.66667C7.63181 4.66667 7.33333 4.96514 7.33333 5.33333C7.33333 5.70152 7.63181 6 8 6H11C11.3682 6 11.6667 5.70152 11.6667 5.33333C11.6667 4.96514 11.3682 4.66667 11 4.66667H8Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM5 13V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V13H5ZM9 8C9 8.82843 8.32843 9.5 7.5 9.5C6.67157 9.5 6 8.82843 6 8C6 7.17157 6.67157 6.5 7.5 6.5C8.32843 6.5 9 7.17157 9 8ZM12 7C11.4477 7 11 7.44772 11 8C11 8.55229 11.4477 9 12 9H16.5C17.0523 9 17.5 8.55229 17.5 8C17.5 7.44772 17.0523 7 16.5 7H12Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.5 7C3.5 5.067 5.067 3.5 7 3.5H21C22.933 3.5 24.5 5.067 24.5 7V21C24.5 22.933 22.933 24.5 21 24.5H7C5.067 24.5 3.5 22.933 3.5 21V7ZM5.83333 15.1667V21C5.83333 21.6443 6.35567 22.1667 7 22.1667H21C21.6443 22.1667 22.1667 21.6443 22.1667 21V15.1667H5.83333ZM10.5 9.33333C10.5 10.2998 9.7165 11.0833 8.75 11.0833C7.7835 11.0833 7 10.2998 7 9.33333C7 8.36683 7.7835 7.58333 8.75 7.58333C9.7165 7.58333 10.5 8.36683 10.5 9.33333ZM14 8.16667C13.3557 8.16667 12.8333 8.689 12.8333 9.33333C12.8333 9.97767 13.3557 10.5 14 10.5H19.25C19.8943 10.5 20.4167 9.97767 20.4167 9.33333C20.4167 8.689 19.8943 8.16667 19.25 8.16667H14Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
