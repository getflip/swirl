// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-description",
})
export class FlipIconDescription {
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
        {this.size === 16 && <Fragment><path d="M9.727 1.727a1.337 1.337 0 0 0-.947-.394H4c-.733 0-1.333.6-1.333 1.334v10.666c0 .734.593 1.334 1.326 1.334H12c.733 0 1.333-.6 1.333-1.334V5.887c0-.354-.14-.694-.393-.94l-3.213-3.22ZM10 12H6a.669.669 0 0 1-.667-.667c0-.366.3-.666.667-.666h4c.367 0 .667.3.667.666 0 .367-.3.667-.667.667Zm0-2.667H6a.669.669 0 0 1-.667-.666C5.333 8.3 5.633 8 6 8h4c.367 0 .667.3.667.667 0 .366-.3.666-.667.666Zm-1.333-4v-3L12.333 6h-3a.669.669 0 0 1-.666-.667Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M14.59 2.59c-.38-.38-.89-.59-1.42-.59H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8.83c0-.53-.21-1.04-.59-1.41l-4.82-4.83ZM15 18H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1Zm0-4H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1Zm-2-6V3.5L18.5 9H14c-.55 0-1-.45-1-1Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M17.022 3.022a2.34 2.34 0 0 0-1.657-.689H7a2.34 2.34 0 0 0-2.333 2.334v18.666a2.33 2.33 0 0 0 2.321 2.334H21a2.34 2.34 0 0 0 2.333-2.334V10.302c0-.619-.245-1.214-.688-1.645l-5.623-5.635ZM17.5 21h-7a1.17 1.17 0 0 1-1.167-1.167 1.17 1.17 0 0 1 1.167-1.166h7a1.17 1.17 0 0 1 1.167 1.166A1.17 1.17 0 0 1 17.5 21Zm0-4.667h-7a1.17 1.17 0 0 1-1.167-1.166A1.17 1.17 0 0 1 10.5 14h7a1.17 1.17 0 0 1 1.167 1.167 1.17 1.17 0 0 1-1.167 1.166Zm-2.333-7v-5.25l6.416 6.417h-5.25a1.17 1.17 0 0 1-1.166-1.167Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
