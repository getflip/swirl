// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-file",
})
export class FlipIconFile {
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
        {this.size === 16 && <Fragment><path d="M4 1.333c-.733 0-1.327.6-1.327 1.334l-.006 10.666c0 .734.593 1.334 1.326 1.334H12c.733 0 1.333-.6 1.333-1.334V5.887c0-.354-.14-.694-.393-.94l-3.22-3.22a1.31 1.31 0 0 0-.94-.394H4Zm4.667 4v-3L12.333 6h-3a.669.669 0 0 1-.666-.667Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8.83c0-.53-.21-1.04-.59-1.41l-4.83-4.83c-.37-.38-.88-.59-1.41-.59H6Zm7 6V3.5L18.5 9H14c-.55 0-1-.45-1-1Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M7 2.333a2.33 2.33 0 0 0-2.322 2.334l-.011 18.666a2.33 2.33 0 0 0 2.321 2.334H21a2.34 2.34 0 0 0 2.333-2.334V10.302c0-.619-.245-1.214-.688-1.645L17.01 3.022a2.294 2.294 0 0 0-1.645-.689H7Zm8.167 7v-5.25l6.416 6.417h-5.25a1.17 1.17 0 0 1-1.166-1.167Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
