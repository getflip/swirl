// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-check-small",
})
export class FlipIconCheckSmall {
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
        {this.size === 16 && <Fragment><path fill-rule="evenodd" clip-rule="evenodd" d="M12.414 4.92a1 1 0 0 1 0 1.413l-5.333 5.334a1 1 0 0 1-1.414 0l-1.96-1.96a1 1 0 1 1 1.414-1.414l1.253 1.252L11 4.92a1 1 0 0 1 1.414 0Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path fill-rule="evenodd" clip-rule="evenodd" d="M18.621 7.379a1.5 1.5 0 0 1 0 2.121l-8 8a1.5 1.5 0 0 1-2.121 0l-2.94-2.94a1.5 1.5 0 1 1 2.122-2.12l1.879 1.878 6.939-6.94a1.5 1.5 0 0 1 2.121 0Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path fill-rule="evenodd" clip-rule="evenodd" d="M21.725 8.609a1.75 1.75 0 0 1 0 2.475l-9.334 9.333a1.75 1.75 0 0 1-2.474 0l-3.43-3.43a1.75 1.75 0 1 1 2.475-2.474l2.192 2.191L19.25 8.61a1.75 1.75 0 0 1 2.475 0Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
