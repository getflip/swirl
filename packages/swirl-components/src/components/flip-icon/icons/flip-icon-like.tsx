// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-like",
})
export class FlipIconLike {
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
        {this.size === 16 && <Fragment><path d="M5.724 4.943 9.277 1.39c.765-.765 2.051-.037 1.789 1.013l-.63 2.516a.333.333 0 0 0 .324.414H14c.736 0 1.333.597 1.333 1.334v.201c0 .747-.156 1.484-.46 2.166l-1.854 4.174A1.333 1.333 0 0 1 11.8 14H6.667a1.333 1.333 0 0 1-1.334-1.333V5.886c0-.354.14-.693.39-.943ZM4 12.667v-6a1.333 1.333 0 1 0-2.667 0v6a1.333 1.333 0 1 0 2.667 0Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="m8.586 7.414 5.33-5.33c1.147-1.147 3.077-.054 2.683 1.52l-.944 3.775A.5.5 0 0 0 16.14 8H21a2 2 0 0 1 2 2v.302a8 8 0 0 1-.69 3.25l-2.782 6.26A2 2 0 0 1 17.7 21H10a2 2 0 0 1-2-2V8.828a2 2 0 0 1 .586-1.414ZM6 19v-9a2 2 0 1 0-4 0v9a2 2 0 0 0 4 0Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="m10.017 8.65 6.218-6.218c1.338-1.339 3.59-.064 3.13 1.773l-1.1 4.404a.583.583 0 0 0 .566.724H24.5a2.333 2.333 0 0 1 2.333 2.334v.352a9.333 9.333 0 0 1-.804 3.791l-3.247 7.304A2.333 2.333 0 0 1 20.65 24.5h-8.983a2.333 2.333 0 0 1-2.334-2.333V10.3c0-.619.246-1.212.684-1.65ZM7 22.167v-10.5a2.333 2.333 0 1 0-4.667 0v10.5a2.333 2.333 0 1 0 4.667 0Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
