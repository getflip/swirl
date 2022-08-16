// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-comment",
})
export class FlipIconComment {
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
        {this.size === 16 && <Fragment><path d="M11.3333 2.66659V7.33325C11.3333 8.06963 10.7364 8.66659 10 8.66659H4.00001L1.90238 10.7642C1.69239 10.9742 1.33334 10.8255 1.33334 10.5285V2.66659C1.33334 1.93021 1.9303 1.33325 2.66668 1.33325H10C10.7364 1.33325 11.3333 1.93021 11.3333 2.66659Z" fill="currentColor"/><path d="M4.00001 9.99992H12.6667V3.99992H13.3333C14.0697 3.99992 14.6667 4.59687 14.6667 5.33325V13.8618C14.6667 14.1588 14.3076 14.3075 14.0976 14.0976L12 11.9999H5.33334C4.59696 11.9999 4.00001 11.403 4.00001 10.6666V9.99992Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M17 4V11C17 12.1046 16.1046 13 15 13H6L2.85355 16.1464C2.53857 16.4614 2 16.2383 2 15.7929V4C2 2.89543 2.89543 2 4 2H15C16.1046 2 17 2.89543 17 4Z" fill="currentColor"/><path d="M6 15H19V6H20C21.1046 6 22 6.89543 22 8V20.7929C22 21.2383 21.4614 21.4614 21.1464 21.1464L18 18H8C6.89543 18 6 17.1046 6 16V15Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M19.8333 4.66659V12.8333C19.8333 14.1219 18.7887 15.1666 17.5 15.1666H7.00001L3.32916 18.8374C2.96168 19.2049 2.33334 18.9447 2.33334 18.425V4.66659C2.33334 3.37792 3.37801 2.33325 4.66668 2.33325H17.5C18.7887 2.33325 19.8333 3.37792 19.8333 4.66659Z" fill="currentColor"/><path d="M7.00001 17.4999H22.1667V6.99992H23.3333C24.622 6.99992 25.6667 8.04459 25.6667 9.33325V24.2583C25.6667 24.778 25.0383 25.0383 24.6709 24.6708L21 20.9999H9.33334C8.04468 20.9999 7.00001 19.9552 7.00001 18.6666V17.4999Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
