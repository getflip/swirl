// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-arrow-right-small",
})
export class FlipIconArrowRightSmall {
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
        {this.size === 16 && <Fragment><path d="m7.61 10.196 1.726-1.727c.26-.26.26-.68 0-.94L7.609 5.803a.669.669 0 0 0-1.14.473v3.453c0 .594.72.887 1.14.467Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="m11.414 15.294 2.59-2.59a.996.996 0 0 0 0-1.41l-2.59-2.59c-.63-.63-1.71-.18-1.71.71v5.18c0 .89 1.08 1.33 1.71.7Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="m13.316 17.843 3.022-3.022a1.162 1.162 0 0 0 0-1.645l-3.022-3.022c-.735-.735-1.995-.21-1.995.829v6.043c0 1.038 1.26 1.552 1.995.817Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
