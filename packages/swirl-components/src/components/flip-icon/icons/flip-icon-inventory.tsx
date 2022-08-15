// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-inventory",
})
export class FlipIconInventory {
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
        {this.size === 16 && <Fragment><path d="M13.333 1.333H2.667c-.667 0-1.334.6-1.334 1.334v2.006c0 .48.287.894.667 1.127v7.533c0 .734.733 1.334 1.333 1.334h9.334c.6 0 1.333-.6 1.333-1.334V5.8c.38-.233.667-.647.667-1.127V2.667c0-.734-.667-1.334-1.334-1.334Zm-4 8H6.667A.669.669 0 0 1 6 8.667C6 8.3 6.3 8 6.667 8h2.666c.367 0 .667.3.667.667 0 .366-.3.666-.667.666Zm4-4.666H2.667v-2h10.666v2Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2Zm-6 12h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1Zm6-7H4V4h16v3Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M23.333 2.333H4.667c-1.167 0-2.334 1.05-2.334 2.334v3.511c0 .84.502 1.564 1.167 1.972v13.183c0 1.284 1.283 2.334 2.333 2.334h16.334c1.05 0 2.333-1.05 2.333-2.334V10.15c.665-.408 1.167-1.132 1.167-1.972V4.667c0-1.284-1.167-2.334-2.334-2.334Zm-7 14h-4.666a1.17 1.17 0 0 1-1.167-1.166A1.17 1.17 0 0 1 11.667 14h4.666a1.17 1.17 0 0 1 1.167 1.167 1.17 1.17 0 0 1-1.167 1.166Zm7-8.166H4.667v-3.5h18.666v3.5Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
