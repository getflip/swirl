// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-expand-less",
})
export class FlipIconExpandLess {
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
        {this.size === 16 && <Fragment><path d="M4.4 9.85a.725.725 0 0 1-.217-.533c0-.211.073-.39.217-.534l3.067-3.066A.705.705 0 0 1 8 5.5a.705.705 0 0 1 .533.217L11.617 8.8a.678.678 0 0 1 .208.517.798.798 0 0 1-.225.533.757.757 0 0 1-.533.2.757.757 0 0 1-.534-.2L8 7.3 5.45 9.867a.736.736 0 0 1-.517.2.762.762 0 0 1-.533-.217Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M6.6 14.775a1.087 1.087 0 0 1-.325-.8c0-.317.108-.583.325-.8l4.6-4.6c.117-.117.242-.2.375-.25A1.2 1.2 0 0 1 12 8.25c.15 0 .292.025.425.075.133.05.258.133.375.25l4.625 4.625c.217.217.321.475.313.775-.009.3-.121.567-.338.8-.217.2-.483.3-.8.3-.317 0-.583-.1-.8-.3L12 10.95 8.175 14.8c-.217.2-.475.3-.775.3-.3 0-.567-.108-.8-.325Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M7.7 17.238a1.269 1.269 0 0 1-.38-.934c0-.37.127-.68.38-.933l5.367-5.367a1.23 1.23 0 0 1 .437-.291A1.4 1.4 0 0 1 14 9.625c.175 0 .34.03.496.088.155.058.301.155.437.291L20.33 15.4c.253.253.375.554.365.904-.01.35-.141.661-.394.934-.253.233-.564.35-.933.35-.37 0-.68-.117-.934-.35L14 12.774l-4.463 4.492c-.252.233-.554.35-.904.35s-.66-.127-.933-.38Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
