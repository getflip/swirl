// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-mail",
})
export class FlipIconMail {
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
        {this.size === 16 && <Fragment><path d="M13.333 2.667H2.667c-.734 0-1.334.6-1.334 1.333v8c0 .733.6 1.333 1.334 1.333h10.666c.734 0 1.334-.6 1.334-1.333V4c0-.733-.6-1.333-1.334-1.333ZM13.067 5.5l-4.36 2.727a1.32 1.32 0 0 1-1.414 0L2.933 5.5a.566.566 0 1 1 .6-.96L8 7.333l4.467-2.793a.566.566 0 1 1 .6.96Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm-.4 4.25-6.54 4.09c-.65.41-1.47.41-2.12 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M23.333 4.667H4.667A2.34 2.34 0 0 0 2.333 7v14a2.34 2.34 0 0 0 2.334 2.333h18.666A2.34 2.34 0 0 0 25.667 21V7a2.34 2.34 0 0 0-2.334-2.333Zm-.466 4.958-7.63 4.772a2.311 2.311 0 0 1-2.474 0l-7.63-4.772a.99.99 0 1 1 1.05-1.68L14 12.833l7.817-4.888a.99.99 0 1 1 1.05 1.68Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
