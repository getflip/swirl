// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-date-range",
})
export class FlipIconDateRange {
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
        {this.size === 16 && <Fragment><path d="M12.667 2.667H12V2c0-.367-.3-.667-.667-.667-.366 0-.666.3-.666.667v.667H5.333V2c0-.367-.3-.667-.666-.667C4.3 1.333 4 1.633 4 2v.667h-.667c-.74 0-1.326.6-1.326 1.333L2 13.333c0 .734.593 1.334 1.333 1.334h9.334c.733 0 1.333-.6 1.333-1.334V4c0-.733-.6-1.333-1.333-1.333Zm0 10c0 .366-.3.666-.667.666H4a.669.669 0 0 1-.667-.666V6h9.334v6.667Zm-8-5.334H6v1.334H4.667V7.333Zm2.666 0h1.334v1.334H7.333V7.333Zm2.667 0h1.333v1.334H10V7.333Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M19 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 15c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V9h14v10ZM7 11h2v2H7v-2Zm4 0h2v2h-2v-2Zm4 0h2v2h-2v-2Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M22.167 4.667H21V3.5a1.17 1.17 0 0 0-1.167-1.167A1.17 1.17 0 0 0 18.667 3.5v1.167H9.333V3.5a1.17 1.17 0 0 0-1.166-1.167A1.17 1.17 0 0 0 7 3.5v1.167H5.833A2.323 2.323 0 0 0 3.512 7L3.5 23.333a2.333 2.333 0 0 0 2.333 2.334h16.334a2.34 2.34 0 0 0 2.333-2.334V7a2.34 2.34 0 0 0-2.333-2.333Zm0 17.5A1.17 1.17 0 0 1 21 23.333H7a1.17 1.17 0 0 1-1.167-1.166V10.5h16.334v11.667Zm-14-9.334H10.5v2.334H8.167v-2.334Zm4.666 0h2.334v2.334h-2.334v-2.334Zm4.667 0h2.333v2.334H17.5v-2.334Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
