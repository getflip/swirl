// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';
import { FlipIconSize } from '../flip-icon.types';

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
        part="icon"
        viewBox={`0 0 ${this.size} ${this.size}`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.size === 16 && <Fragment><path d="M8.00001 1.33333C4.32001 1.33333 1.33334 4.32 1.33334 8C1.33334 11.68 4.32001 14.6667 8.00001 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8C14.6667 4.32 11.68 1.33333 8.00001 1.33333ZM8.00001 11.3333C7.63334 11.3333 7.33334 11.0333 7.33334 10.6667V8C7.33334 7.63333 7.63334 7.33333 8.00001 7.33333C8.36668 7.33333 8.66668 7.63333 8.66668 8V10.6667C8.66668 11.0333 8.36668 11.3333 8.00001 11.3333ZM8.66668 6H7.33334V4.66667H8.66668V6Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16C13 16.55 12.55 17 12 17ZM13 9H11V7H13V9Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M14 2.33333C7.56001 2.33333 2.33334 7.56 2.33334 14C2.33334 20.44 7.56001 25.6667 14 25.6667C20.44 25.6667 25.6667 20.44 25.6667 14C25.6667 7.56 20.44 2.33333 14 2.33333ZM14 19.8333C13.3583 19.8333 12.8333 19.3083 12.8333 18.6667V14C12.8333 13.3583 13.3583 12.8333 14 12.8333C14.6417 12.8333 15.1667 13.3583 15.1667 14V18.6667C15.1667 19.3083 14.6417 19.8333 14 19.8333ZM15.1667 10.5H12.8333V8.16667H15.1667V10.5Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
