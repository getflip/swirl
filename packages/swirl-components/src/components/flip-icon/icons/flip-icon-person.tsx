// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-person",
})
export class FlipIconPerson {
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
        {this.size === 16 && <Fragment><path d="M8 8a2.666 2.666 0 1 0 0-5.333A2.666 2.666 0 1 0 8 8Zm0 1.333c-1.78 0-5.333.894-5.333 2.667v.667c0 .366.3.666.666.666h9.334c.366 0 .666-.3.666-.666V12c0-1.773-3.553-2.667-5.333-2.667Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M14 14a4.665 4.665 0 0 0 4.667-4.667A4.665 4.665 0 0 0 14 4.667a4.665 4.665 0 0 0-4.667 4.666A4.665 4.665 0 0 0 14 14Zm0 2.333c-3.115 0-9.333 1.564-9.333 4.667v1.167a1.17 1.17 0 0 0 1.166 1.166h16.334a1.17 1.17 0 0 0 1.166-1.166V21c0-3.103-6.218-4.667-9.333-4.667Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
