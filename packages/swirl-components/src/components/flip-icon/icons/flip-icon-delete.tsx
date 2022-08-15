// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-delete",
})
export class FlipIconDelete {
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
        {this.size === 16 && <Fragment><path d="M5.667 2.667h-1.5a.833.833 0 1 0 0 1.666h7.666a.833.833 0 1 0 0-1.666h-1.5l-.471-.472A.667.667 0 0 0 9.39 2H6.609a.667.667 0 0 0-.47.195l-.472.472Zm-.334 2.666h5.334c.736 0 1.333.597 1.333 1.334v6c0 .736-.597 1.333-1.333 1.333H5.333A1.333 1.333 0 0 1 4 12.667v-6c0-.737.597-1.334 1.333-1.334Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M8.5 4H6.25a1.25 1.25 0 1 0 0 2.5h11.5a1.25 1.25 0 1 0 0-2.5H15.5l-.707-.707A1 1 0 0 0 14.086 3H9.914a1 1 0 0 0-.707.293L8.5 4ZM8 8h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M9.917 4.667H7.292a1.458 1.458 0 1 0 0 2.916h13.416a1.458 1.458 0 1 0 0-2.916h-2.625l-.825-.825a1.167 1.167 0 0 0-.825-.342h-4.866c-.31 0-.607.123-.825.342l-.825.825Zm-.584 4.666h9.334A2.333 2.333 0 0 1 21 11.667v10.5a2.333 2.333 0 0 1-2.333 2.333H9.333A2.333 2.333 0 0 1 7 22.167v-10.5a2.333 2.333 0 0 1 2.333-2.334Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
