// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';
import { FlipIconSize } from '../flip-icon.types';

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-person",
})
export class FlipIconPerson {
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
        {this.size === 16 && <Fragment><path d="M7.99999 8.00002C9.47332 8.00002 10.6667 6.80669 10.6667 5.33335C10.6667 3.86002 9.47332 2.66669 7.99999 2.66669C6.52666 2.66669 5.33332 3.86002 5.33332 5.33335C5.33332 6.80669 6.52666 8.00002 7.99999 8.00002ZM7.99999 9.33335C6.21999 9.33335 2.66666 10.2267 2.66666 12V12.6667C2.66666 13.0334 2.96666 13.3334 3.33332 13.3334H12.6667C13.0333 13.3334 13.3333 13.0334 13.3333 12.6667V12C13.3333 10.2267 9.77999 9.33335 7.99999 9.33335Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M14 14C16.5783 14 18.6667 11.9117 18.6667 9.33335C18.6667 6.75502 16.5783 4.66669 14 4.66669C11.4217 4.66669 9.33332 6.75502 9.33332 9.33335C9.33332 11.9117 11.4217 14 14 14ZM14 16.3334C10.885 16.3334 4.66666 17.8967 4.66666 21V22.1667C4.66666 22.8084 5.19166 23.3334 5.83332 23.3334H22.1667C22.8083 23.3334 23.3333 22.8084 23.3333 22.1667V21C23.3333 17.8967 17.115 16.3334 14 16.3334Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
