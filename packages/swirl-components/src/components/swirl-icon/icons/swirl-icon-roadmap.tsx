// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-roadmap",
})
export class SwirlIconRoadmap {
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
              d="M2.66663 3.66667C2.66663 3.11439 3.11434 2.66667 3.66663 2.66667H6.99996C7.55224 2.66667 7.99996 3.11439 7.99996 3.66667C7.99996 4.21896 7.55224 4.66667 6.99996 4.66667H3.66663C3.11434 4.66667 2.66663 4.21896 2.66663 3.66667Z"
              fill="currentColor"
            />
            <path
              d="M2.66663 12.3333C2.66663 11.7811 3.11434 11.3333 3.66663 11.3333H5.66663C6.21891 11.3333 6.66663 11.7811 6.66663 12.3333C6.66663 12.8856 6.21891 13.3333 5.66663 13.3333H3.66663C3.11434 13.3333 2.66663 12.8856 2.66663 12.3333Z"
              fill="currentColor"
            />
            <path
              d="M5.33329 8.00001C5.33329 7.44772 5.78101 7.00001 6.33329 7.00001H12.3333C12.8856 7.00001 13.3333 7.44772 13.3333 8.00001C13.3333 8.55229 12.8856 9.00001 12.3333 9.00001H6.33329C5.78101 9.00001 5.33329 8.55229 5.33329 8.00001Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M4 5.5C4 4.67157 4.67157 4 5.5 4H10.5C11.3284 4 12 4.67157 12 5.5C12 6.32843 11.3284 7 10.5 7H5.5C4.67157 7 4 6.32843 4 5.5Z"
              fill="currentColor"
            />
            <path
              d="M4 18.5C4 17.6716 4.67157 17 5.5 17H8.5C9.32843 17 10 17.6716 10 18.5C10 19.3284 9.32843 20 8.5 20H5.5C4.67157 20 4 19.3284 4 18.5Z"
              fill="currentColor"
            />
            <path
              d="M8 12C8 11.1716 8.67157 10.5 9.5 10.5H18.5C19.3284 10.5 20 11.1716 20 12C20 12.8284 19.3284 13.5 18.5 13.5H9.5C8.67157 13.5 8 12.8284 8 12Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M4.66663 6.41667C4.66663 5.45017 5.45013 4.66667 6.41663 4.66667H12.25C13.2165 4.66667 14 5.45017 14 6.41667C14 7.38317 13.2165 8.16667 12.25 8.16667H6.41663C5.45013 8.16667 4.66663 7.38317 4.66663 6.41667Z"
              fill="currentColor"
            />
            <path
              d="M4.66663 21.5833C4.66663 20.6168 5.45013 19.8333 6.41663 19.8333H9.91663C10.8831 19.8333 11.6666 20.6168 11.6666 21.5833C11.6666 22.5498 10.8831 23.3333 9.91663 23.3333H6.41663C5.45013 23.3333 4.66663 22.5498 4.66663 21.5833Z"
              fill="currentColor"
            />
            <path
              d="M9.33329 14C9.33329 13.0335 10.1168 12.25 11.0833 12.25H21.5833C22.5498 12.25 23.3333 13.0335 23.3333 14C23.3333 14.9665 22.5498 15.75 21.5833 15.75H11.0833C10.1168 15.75 9.33329 14.9665 9.33329 14Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
