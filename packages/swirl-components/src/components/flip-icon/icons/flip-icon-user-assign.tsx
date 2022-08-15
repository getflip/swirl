// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-user-assign",
})
export class FlipIconUserAssign {
  @Prop() size: FlipIconSize = 24;

  render() {
    return (
      <svg
        class="flip-icon"
        fill="none"
        height={this.size}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.size === 16 && <Fragment><path d="M5.333 13.333a.667.667 0 0 1-.666-.666V12c0-1.773 3.554-2.667 5.333-2.667 1.78 0 5.333.894 5.333 2.667v.667a.667.667 0 0 1-.666.666H5.333Zm-2-4.622v-.71h-2a.667.667 0 0 1 0-1.334h2v-.712a.534.534 0 0 1 .91-.378l1.38 1.38a.533.533 0 0 1 0 .754l-1.38 1.378a.524.524 0 0 1-.578.118.534.534 0 0 1-.332-.495Zm4-3.378a2.667 2.667 0 1 1 5.334 0 2.667 2.667 0 0 1-5.334 0Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M8 20a1 1 0 0 1-1-1v-1c0-2.659 5.331-4 8-4 2.669 0 8 1.34 8 4v1a1 1 0 0 1-1 1H8Zm-3-6.933V12H2a1 1 0 0 1 0-2h3V8.932a.801.801 0 0 1 1.365-.567l2.068 2.07a.8.8 0 0 1 0 1.13l-2.068 2.069a.786.786 0 0 1-.868.176.8.8 0 0 1-.497-.742v-.001ZM11 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M9.333 23.333a1.167 1.167 0 0 1-1.166-1.166V21c0-3.102 6.22-4.667 9.333-4.667 3.114 0 9.333 1.564 9.333 4.667v1.167a1.166 1.166 0 0 1-1.166 1.166H9.333Zm-3.5-8.088V14h-3.5a1.167 1.167 0 0 1 0-2.333h3.5V10.42a.934.934 0 0 1 1.593-.661l2.413 2.414a.933.933 0 0 1 0 1.32l-2.413 2.412a.918.918 0 0 1-1.013.206.935.935 0 0 1-.58-.866v-.001Zm7-5.912a4.667 4.667 0 1 1 9.335 0 4.667 4.667 0 0 1-9.335 0Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
