// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-recieved",
})
export class FlipIconRecieved {
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
        {this.size === 16 && <Fragment><path d="m1.167 9.167 2.126 2.126a1 1 0 0 0 1.414 0L10.5 5.5a.707.707 0 0 0-1-1L4 10 2.167 8.167a.707.707 0 0 0-1 1ZM8 9.333l-1 1 .96.96a1 1 0 0 0 1.414 0L15.167 5.5a.707.707 0 0 0-1-1l-5.5 5.5L8 9.333Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="m1.75 13.75 3.19 3.19a1.5 1.5 0 0 0 2.12 0l8.69-8.69a1.06 1.06 0 0 0-1.5-1.5L6 15l-2.75-2.75a1.06 1.06 0 0 0-1.5 1.5ZM12 14l-1.5 1.5 1.44 1.44a1.5 1.5 0 0 0 2.12 0l8.69-8.69a1.06 1.06 0 0 0-1.5-1.5L13 15l-1-1Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="m2.042 16.042 3.72 3.72a1.75 1.75 0 0 0 2.475 0L18.375 9.626a1.237 1.237 0 1 0-1.75-1.75L7 17.5l-3.208-3.208a1.237 1.237 0 1 0-1.75 1.75ZM14 16.333l-1.75 1.75 1.68 1.68a1.75 1.75 0 0 0 2.474 0L26.542 9.625a1.238 1.238 0 0 0-1.75-1.75L15.167 17.5 14 16.333Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
