// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-folder-shared",
})
export class FlipIconFolderShared {
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
        {this.size === 16 && <Fragment><path d="M13.333 4H8l-.94-.94a1.337 1.337 0 0 0-.947-.393H2.667c-.734 0-1.327.6-1.327 1.333l-.007 8c0 .733.6 1.333 1.334 1.333h10.666c.734 0 1.334-.6 1.334-1.333V5.333c0-.733-.6-1.333-1.334-1.333ZM10 6c.733 0 1.333.6 1.333 1.333 0 .734-.6 1.334-1.333 1.334s-1.333-.6-1.333-1.334C8.667 6.6 9.267 6 10 6Zm2.667 5.333H7.333v-.666c0-.887 1.78-1.334 2.667-1.334.887 0 2.667.447 2.667 1.334v.666Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M20 6h-8l-1.41-1.41C10.21 4.21 9.7 4 9.17 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2Zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2Zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M23.333 7H14l-1.645-1.645a2.34 2.34 0 0 0-1.657-.688H4.667A2.33 2.33 0 0 0 2.345 7l-.012 14a2.34 2.34 0 0 0 2.334 2.333h18.666A2.34 2.34 0 0 0 25.667 21V9.333A2.34 2.34 0 0 0 23.333 7ZM17.5 10.5a2.34 2.34 0 0 1 2.333 2.333 2.34 2.34 0 0 1-2.333 2.334 2.34 2.34 0 0 1-2.333-2.334A2.34 2.34 0 0 1 17.5 10.5Zm4.667 9.333h-9.334v-1.166c0-1.552 3.115-2.334 4.667-2.334 1.552 0 4.667.782 4.667 2.334v1.166Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
