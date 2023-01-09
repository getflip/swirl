// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { FlipIconSize } from "../flip-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-tasks-filled",
})
export class FlipIconTasksFilled {
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM10.5303 7.03033C10.8232 6.73744 10.8232 6.26256 10.5303 5.96967C10.2374 5.67678 9.76257 5.67678 9.46967 5.96967L7 8.43934L6.53033 7.96967C6.23744 7.67678 5.76256 7.67678 5.46967 7.96967C5.17678 8.26256 5.17678 8.73744 5.46967 9.03033L6.46967 10.0303C6.76257 10.3232 7.23744 10.3232 7.53033 10.0303L10.5303 7.03033Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM15.7955 10.5455C16.2348 10.1062 16.2348 9.39384 15.7955 8.9545C15.3562 8.51516 14.6438 8.51516 14.2045 8.9545L10.5 12.659L9.79549 11.9545C9.35615 11.5152 8.64384 11.5152 8.2045 11.9545C7.76516 12.3938 7.76517 13.1062 8.20451 13.5455L9.70451 15.0455C10.1438 15.4848 10.8562 15.4848 11.2955 15.0455L15.7955 10.5455Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.20101 19.799 3.5 14 3.5C8.20101 3.5 3.5 8.20101 3.5 14C3.5 19.799 8.20101 24.5 14 24.5ZM18.4281 12.3031C18.9406 11.7905 18.9406 10.9595 18.4281 10.4469C17.9155 9.93436 17.0845 9.93436 16.5719 10.4469L12.25 14.7688L11.4281 13.9469C10.9155 13.4344 10.0845 13.4344 9.57192 13.9469C9.05936 14.4595 9.05936 15.2905 9.57192 15.8031L11.3219 17.5531C11.8345 18.0656 12.6655 18.0656 13.1781 17.5531L18.4281 12.3031Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
