// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-check-strong",
})
export class FlipIconCheckStrong {
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
        {this.size === 16 && <Fragment><path fill-rule="evenodd" clip-rule="evenodd" d="M13.04 4.293a1 1 0 0 1 0 1.414L6.707 12.04a1 1 0 0 1-1.414 0L2.96 9.707a1 1 0 0 1 1.414-1.414L6 9.919l5.626-5.626a1 1 0 0 1 1.414 0Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path fill-rule="evenodd" clip-rule="evenodd" d="M19.56 6.44a1.5 1.5 0 0 1 0 2.12l-9.5 9.5a1.5 1.5 0 0 1-2.12 0l-3.5-3.5a1.5 1.5 0 0 1 2.12-2.12L9 14.878l8.44-8.44a1.5 1.5 0 0 1 2.12 0Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path fill-rule="evenodd" clip-rule="evenodd" d="M22.82 7.513a1.75 1.75 0 0 1 0 2.474L11.738 21.071a1.75 1.75 0 0 1-2.474 0L5.18 16.987a1.75 1.75 0 1 1 2.475-2.474l2.846 2.845 9.846-9.845a1.75 1.75 0 0 1 2.475 0Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
