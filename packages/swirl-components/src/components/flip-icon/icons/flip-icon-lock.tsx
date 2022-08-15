// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-lock",
})
export class FlipIconLock {
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
        {this.size === 16 && <Fragment><path d="M12 5.667h-.667V4.333a3.335 3.335 0 0 0-6.666 0v1.334H4c-.733 0-1.333.6-1.333 1.333v6.667C2.667 14.4 3.267 15 4 15h8c.733 0 1.333-.6 1.333-1.333V7c0-.733-.6-1.333-1.333-1.333Zm-4 6c-.733 0-1.333-.6-1.333-1.334C6.667 9.6 7.267 9 8 9s1.333.6 1.333 1.333c0 .734-.6 1.334-1.333 1.334Zm-2-6V4.333c0-1.106.893-2 2-2s2 .894 2 2v1.334H6Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M18 8.5h-1v-2c0-2.76-2.24-5-5-5s-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-10c0-1.1-.9-2-2-2Zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm-3-9v-2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M21 9.917h-1.167V7.583A5.835 5.835 0 0 0 14 1.75a5.835 5.835 0 0 0-5.833 5.833v2.334H7a2.34 2.34 0 0 0-2.333 2.333v11.667A2.34 2.34 0 0 0 7 26.25h14a2.34 2.34 0 0 0 2.333-2.333V12.25A2.34 2.34 0 0 0 21 9.917Zm-7 10.5a2.34 2.34 0 0 1-2.333-2.334A2.34 2.34 0 0 1 14 15.75a2.34 2.34 0 0 1 2.333 2.333A2.34 2.34 0 0 1 14 20.417Zm-3.5-10.5V7.583c0-1.936 1.563-3.5 3.5-3.5s3.5 1.564 3.5 3.5v2.334h-7Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
