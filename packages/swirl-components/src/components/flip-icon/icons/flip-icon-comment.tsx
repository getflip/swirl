// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-comment",
})
export class FlipIconComment {
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
        {this.size === 16 && <Fragment><path d="M11.333 2.667v4.666c0 .737-.597 1.334-1.333 1.334H4l-2.098 2.097a.333.333 0 0 1-.569-.236V2.667c0-.737.597-1.334 1.334-1.334H10c.736 0 1.333.597 1.333 1.334Z" fill="currentColor"/><path d="M4 10h8.667V4h.666c.737 0 1.334.597 1.334 1.333v8.529c0 .297-.36.445-.57.236L12 12H5.333A1.333 1.333 0 0 1 4 10.667V10Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M17 4v7a2 2 0 0 1-2 2H6l-3.146 3.146A.5.5 0 0 1 2 15.793V4a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2Z" fill="currentColor"/><path d="M6 15h13V6h1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353L18 18H8a2 2 0 0 1-2-2v-1Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M19.833 4.667v8.166a2.333 2.333 0 0 1-2.333 2.334H7l-3.67 3.67a.583.583 0 0 1-.997-.412V4.667a2.333 2.333 0 0 1 2.334-2.334H17.5a2.333 2.333 0 0 1 2.333 2.334Z" fill="currentColor"/><path d="M7 17.5h15.167V7h1.166a2.333 2.333 0 0 1 2.334 2.333v14.925c0 .52-.629.78-.996.413L21 21H9.333A2.333 2.333 0 0 1 7 18.667V17.5Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
