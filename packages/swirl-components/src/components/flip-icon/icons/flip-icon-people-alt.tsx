// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-people-alt",
})
export class FlipIconPeopleAlt {
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
        {this.size === 16 && <Fragment><path fill-rule="evenodd" clip-rule="evenodd" d="M11.113 8.753c.914.62 1.554 1.46 1.554 2.58v2h2c.366 0 .666-.3.666-.666v-1.334c0-1.453-2.38-2.313-4.22-2.58Z" fill="currentColor"/><path d="M6 8a2.667 2.667 0 1 0 0-5.333A2.667 2.667 0 0 0 6 8Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 8a2.666 2.666 0 1 0 0-5.333 2.77 2.77 0 0 0-.887.16 3.986 3.986 0 0 1 0 5.013c.28.093.574.16.887.16Zm-4 .667c-1.78 0-5.333.893-5.333 2.666v1.334c0 .366.3.666.666.666h9.334c.366 0 .666-.3.666-.666v-1.334C11.333 9.56 7.78 8.667 6 8.667Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path fill-rule="evenodd" clip-rule="evenodd" d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h3c.55 0 1-.45 1-1v-2c0-2.18-3.57-3.47-6.33-3.87Z" fill="currentColor"/><path d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24Zm-6 1c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path fill-rule="evenodd" clip-rule="evenodd" d="M19.448 15.318c1.599 1.085 2.719 2.555 2.719 4.515v3.5h3.5a1.17 1.17 0 0 0 1.166-1.166v-2.334c0-2.543-4.165-4.048-7.385-4.515Z" fill="currentColor"/><path d="M10.5 14a4.667 4.667 0 1 0 0-9.334 4.667 4.667 0 0 0 0 9.334Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 14a4.665 4.665 0 0 0 4.667-4.667A4.665 4.665 0 0 0 17.5 4.667c-.548 0-1.062.116-1.552.28a6.976 6.976 0 0 1 0 8.773c.49.163 1.004.28 1.552.28Zm-7 1.167c-3.115 0-9.333 1.563-9.333 4.666v2.334a1.17 1.17 0 0 0 1.166 1.166h16.334a1.17 1.17 0 0 0 1.166-1.166v-2.334c0-3.103-6.218-4.666-9.333-4.666Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
