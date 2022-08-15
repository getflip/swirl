// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-poll",
})
export class FlipIconPoll {
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
        {this.size === 16 && <Fragment><path d="M10 8.667H3.333A1.337 1.337 0 0 0 2 10v2.667A1.337 1.337 0 0 0 3.333 14H10a1.337 1.337 0 0 0 1.333-1.333V10A1.337 1.337 0 0 0 10 8.667Zm-5.333 4a1.333 1.333 0 1 1 0-2.667 1.333 1.333 0 0 1 0 2.667Zm8-10.667H3.333A1.337 1.337 0 0 0 2 3.333V6a1.337 1.337 0 0 0 1.333 1.333h9.334A1.337 1.337 0 0 0 14 6V3.333A1.338 1.338 0 0 0 12.667 2Zm-8 4a1.333 1.333 0 1 1 0-2.667 1.333 1.333 0 0 1 0 2.667Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M15 13H5a2.006 2.006 0 0 0-2 2v4a2.006 2.006 0 0 0 2 2h10a2.006 2.006 0 0 0 2-2v-4a2.006 2.006 0 0 0-2-2Zm-8 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM19 3H5a2.006 2.006 0 0 0-2 2v4a2.006 2.006 0 0 0 2 2h14a2.006 2.006 0 0 0 2-2V5a2.006 2.006 0 0 0-2-2ZM7 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M17.5 15.167H5.833A2.34 2.34 0 0 0 3.5 17.5v4.667A2.34 2.34 0 0 0 5.833 24.5H17.5a2.34 2.34 0 0 0 2.333-2.333V17.5a2.34 2.34 0 0 0-2.333-2.333Zm-9.333 7a2.333 2.333 0 1 1 2.333-2.334 2.34 2.34 0 0 1-2.333 2.334Zm14-18.667H5.833A2.34 2.34 0 0 0 3.5 5.833V10.5a2.34 2.34 0 0 0 2.333 2.333h16.334A2.34 2.34 0 0 0 24.5 10.5V5.833A2.34 2.34 0 0 0 22.167 3.5Zm-14 7A2.333 2.333 0 1 1 10.5 8.167 2.34 2.34 0 0 1 8.167 10.5Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
