// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { FlipIconSize } from "../flip-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-tasks-outlined",
})
export class FlipIconTasksOutlined {
  @Prop() size: FlipIconSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

    const className = classnames("flip-icon", `flip-icon--size-${this.size}`);

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
              d="M10.3536 6.85355C10.5488 6.65829 10.5488 6.34171 10.3536 6.14645C10.1583 5.95118 9.84171 5.95118 9.64645 6.14645L7 8.79289L6.35355 8.14645C6.15829 7.95118 5.84171 7.95118 5.64645 8.14645C5.45118 8.34171 5.45118 8.65829 5.64645 8.85355L6.64645 9.85355C6.84171 10.0488 7.15829 10.0488 7.35356 9.85355L10.3536 6.85355Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM13 8C13 10.7614 10.7614 13 8 13C5.23858 13 3 10.7614 3 8C3 5.23858 5.23858 3 8 3C10.7614 3 13 5.23858 13 8Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M15.5303 10.2803C15.8232 9.98744 15.8232 9.51256 15.5303 9.21967C15.2374 8.92678 14.7626 8.92678 14.4697 9.21967L10.5 13.1893L9.53033 12.2197C9.23744 11.9268 8.76256 11.9268 8.46967 12.2197C8.17678 12.5126 8.17678 12.9874 8.46967 13.2803L9.96967 14.7803C10.2626 15.0732 10.7374 15.0732 11.0303 14.7803L15.5303 10.2803Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M18.1187 11.9937C18.4604 11.652 18.4604 11.098 18.1187 10.7563C17.777 10.4146 17.223 10.4146 16.8813 10.7563L12.25 15.3876L11.1187 14.2563C10.777 13.9146 10.223 13.9146 9.88128 14.2563C9.53957 14.598 9.53957 15.152 9.88128 15.4937L11.6313 17.2437C11.973 17.5854 12.527 17.5854 12.8687 17.2437L18.1187 11.9937Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24.5 14C24.5 19.799 19.799 24.5 14 24.5C8.20101 24.5 3.5 19.799 3.5 14C3.5 8.20101 8.20101 3.5 14 3.5C19.799 3.5 24.5 8.20101 24.5 14ZM22.75 14C22.75 18.8325 18.8325 22.75 14 22.75C9.16751 22.75 5.25 18.8325 5.25 14C5.25 9.16751 9.16751 5.25 14 5.25C18.8325 5.25 22.75 9.16751 22.75 14Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
