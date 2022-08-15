// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-chat-bubble",
})
export class FlipIconChatBubble {
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
        {this.size === 16 && <Fragment><path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5v2.793a.5.5 0 0 0 .854.353L9 11h3.5A1.5 1.5 0 0 0 14 9.5v-6A1.5 1.5 0 0 0 12.5 2h-9Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M5.25 3A2.25 2.25 0 0 0 3 5.25v9a2.25 2.25 0 0 0 2.25 2.25H7.5v4.19a.75.75 0 0 0 1.28.53l4.72-4.72h5.25A2.25 2.25 0 0 0 21 14.25v-9A2.25 2.25 0 0 0 18.75 3H5.25Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M6.125 3.5A2.625 2.625 0 0 0 3.5 6.125v10.5a2.625 2.625 0 0 0 2.625 2.625H8.75v4.888c0 .78.943 1.17 1.494.618l5.506-5.506h6.125a2.625 2.625 0 0 0 2.625-2.625v-10.5A2.625 2.625 0 0 0 21.875 3.5H6.125Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
