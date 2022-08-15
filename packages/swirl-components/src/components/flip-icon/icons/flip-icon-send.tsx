// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-send",
})
export class FlipIconSend {
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
        {this.size === 16 && <Fragment><path d="M2.933 12.95a.66.66 0 0 1-.633-.059.621.621 0 0 1-.3-.558V9.85a.69.69 0 0 1 .133-.417A.589.589 0 0 1 2.5 9.2L7.333 8 2.5 6.8a.589.589 0 0 1-.367-.233A.69.69 0 0 1 2 6.15V3.667c0-.245.1-.431.3-.559a.66.66 0 0 1 .633-.058L13.2 7.383c.278.123.417.328.417.617s-.14.494-.417.617L2.933 12.95Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M4.4 19.425a.99.99 0 0 1-.95-.088c-.3-.191-.45-.47-.45-.837v-3.725c0-.233.067-.442.2-.625a.884.884 0 0 1 .55-.35L11 12l-7.25-1.8a.884.884 0 0 1-.55-.35 1.036 1.036 0 0 1-.2-.625V5.5c0-.367.15-.646.45-.838a.99.99 0 0 1 .95-.087l15.4 6.5c.417.183.625.492.625.925 0 .433-.208.742-.625.925l-15.4 6.5Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M5.133 22.663a1.154 1.154 0 0 1-1.108-.103c-.35-.223-.525-.549-.525-.977v-4.345c0-.273.078-.516.233-.73.156-.214.37-.35.642-.408l8.458-2.1-8.458-2.1a1.031 1.031 0 0 1-.642-.408 1.209 1.209 0 0 1-.233-.73V6.417c0-.428.175-.754.525-.978.35-.223.72-.257 1.108-.102L23.1 12.921c.486.214.73.573.73 1.079 0 .505-.244.865-.73 1.08L5.133 22.662Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
