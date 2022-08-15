// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-groups-custom",
})
export class FlipIconGroupsCustom {
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
        {this.size === 16 && <Fragment><path d="M4 7a1.166 1.166 0 1 1 0-2.333A1.166 1.166 0 0 1 4 7Zm8 0a1.167 1.167 0 1 1 0-2.334A1.167 1.167 0 0 1 12 7Zm.666 1h-1.145a2.485 2.485 0 0 1 .812 1.834V12h1.083a1.25 1.25 0 0 0 1.25-1.25V10a2 2 0 0 0-2-2ZM8 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm1.834 6H6.167a1.5 1.5 0 0 1-1.5-1.5v-1.084a2.75 2.75 0 0 1 2.75-2.75h1.167a2.75 2.75 0 0 1 2.75 2.75V11.5a1.5 1.5 0 0 1-1.5 1.5ZM3.667 9.834A2.485 2.485 0 0 1 4.479 8H3.333a2 2 0 0 0-2 2v.75A1.25 1.25 0 0 0 2.583 12h1.084V9.834Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M6 10.5a1.75 1.75 0 1 1 0-3.499A1.75 1.75 0 0 1 6 10.5Zm12 0a1.75 1.75 0 1 1 0-3.499 1.75 1.75 0 0 1 0 3.499Zm1 1.5h-1.718a3.728 3.728 0 0 1 1.218 2.75V18h1.625A1.875 1.875 0 0 0 22 16.125V15a3 3 0 0 0-3-3Zm-7-1.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm2.75 9h-5.5A2.25 2.25 0 0 1 7 17.25v-1.625a4.125 4.125 0 0 1 4.126-4.125h1.75A4.125 4.125 0 0 1 17 15.625v1.625a2.25 2.25 0 0 1-2.25 2.25ZM5.5 14.75A3.729 3.729 0 0 1 6.718 12H5a3 3 0 0 0-3 3v1.125A1.875 1.875 0 0 0 3.875 18H5.5v-3.25Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M7 12.25a2.041 2.041 0 1 1 0-4.083 2.041 2.041 0 0 1 0 4.083Zm14 0a2.041 2.041 0 1 1 0-4.083 2.041 2.041 0 0 1 0 4.083ZM22.166 14h-2.003a4.349 4.349 0 0 1 1.42 3.209V21h1.896a2.188 2.188 0 0 0 2.187-2.188V17.5a3.5 3.5 0 0 0-3.5-3.5ZM14 12.25a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Zm3.209 10.5h-6.417a2.625 2.625 0 0 1-2.625-2.625v-1.896a4.812 4.812 0 0 1 4.813-4.813h2.041a4.813 4.813 0 0 1 4.813 4.813v1.896a2.625 2.625 0 0 1-2.625 2.625ZM6.416 17.209A4.35 4.35 0 0 1 7.837 14H5.833a3.5 3.5 0 0 0-3.5 3.5v1.313A2.187 2.187 0 0 0 4.52 21h1.896v-3.791Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
