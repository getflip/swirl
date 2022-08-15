// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-info",
})
export class FlipIconInfo {
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
        {this.size === 16 && <Fragment><path d="M8 1.333A6.67 6.67 0 0 0 1.333 8 6.67 6.67 0 0 0 8 14.667 6.67 6.67 0 0 0 14.667 8 6.67 6.67 0 0 0 8 1.333Zm0 10a.669.669 0 0 1-.667-.666V8c0-.367.3-.667.667-.667.367 0 .667.3.667.667v2.667c0 .366-.3.666-.667.666ZM8.667 6H7.333V4.667h1.334V6Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1Zm1-8h-2V7h2v2Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M14 2.333C7.56 2.333 2.333 7.56 2.333 14c0 6.44 5.227 11.667 11.667 11.667 6.44 0 11.667-5.227 11.667-11.667C25.667 7.56 20.44 2.333 14 2.333Zm0 17.5a1.17 1.17 0 0 1-1.167-1.166V14A1.17 1.17 0 0 1 14 12.833 1.17 1.17 0 0 1 15.167 14v4.667A1.17 1.17 0 0 1 14 19.833Zm1.167-9.333h-2.334V8.167h2.334V10.5Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
