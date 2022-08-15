// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-chevron-right",
})
export class FlipIconChevronRight {
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
        {this.size === 16 && <Fragment><path d="M5.733 11.6a.725.725 0 0 1-.216-.533c0-.211.072-.39.216-.534L8.267 8 5.733 5.467a.725.725 0 0 1-.216-.534c0-.21.072-.389.216-.533a.725.725 0 0 1 .534-.217c.21 0 .389.073.533.217l3.067 3.067a.704.704 0 0 1 .216.533.704.704 0 0 1-.217.533L6.8 11.6a.725.725 0 0 1-.533.217.725.725 0 0 1-.534-.217Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M8.6 17.4a1.087 1.087 0 0 1-.325-.8c0-.317.108-.583.325-.8l3.8-3.8-3.8-3.8a1.087 1.087 0 0 1-.325-.8c0-.317.108-.583.325-.8.217-.217.483-.325.8-.325.317 0 .583.108.8.325l4.6 4.6c.117.117.2.242.25.375a1.2 1.2 0 0 1 .075.425 1.2 1.2 0 0 1-.075.425c-.05.133-.133.258-.25.375l-4.6 4.6a1.087 1.087 0 0 1-.8.325c-.317 0-.583-.108-.8-.325Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M10.033 20.3a1.269 1.269 0 0 1-.379-.933c0-.37.127-.68.38-.934L14.466 14l-4.434-4.433a1.269 1.269 0 0 1-.379-.934c0-.37.127-.68.38-.933.252-.253.563-.38.933-.38.37 0 .68.127.933.38l5.367 5.367c.136.136.233.282.291.437a1.4 1.4 0 0 1 .088.496c0 .175-.03.34-.088.496a1.232 1.232 0 0 1-.291.437L11.9 20.3c-.253.253-.564.38-.933.38-.37 0-.68-.127-.934-.38Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
