// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-chevron-left",
})
export class FlipIconChevronLeft {
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
        {this.size === 16 && <Fragment><path d="M8.8 11.6 5.733 8.533A.705.705 0 0 1 5.517 8a.705.705 0 0 1 .217-.533L8.8 4.4a.725.725 0 0 1 .533-.217c.211 0 .39.073.534.217a.725.725 0 0 1 .216.533.725.725 0 0 1-.216.534L7.333 8l2.534 2.533a.725.725 0 0 1 .216.534.725.725 0 0 1-.216.533.725.725 0 0 1-.534.217.725.725 0 0 1-.533-.217Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="m13.2 17.4-4.6-4.6a1.056 1.056 0 0 1-.25-.375A1.2 1.2 0 0 1 8.275 12c0-.15.025-.292.075-.425.05-.133.133-.258.25-.375l4.6-4.6c.217-.217.483-.325.8-.325.317 0 .583.108.8.325.217.217.325.483.325.8 0 .317-.108.583-.325.8L11 12l3.8 3.8c.217.217.325.483.325.8 0 .317-.108.583-.325.8a1.087 1.087 0 0 1-.8.325c-.317 0-.583-.108-.8-.325Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="m15.4 20.3-5.367-5.367a1.233 1.233 0 0 1-.291-.437A1.4 1.4 0 0 1 9.654 14c0-.175.03-.34.088-.496a1.23 1.23 0 0 1 .291-.437L15.4 7.7c.253-.253.564-.38.933-.38.37 0 .68.127.934.38.253.253.379.564.379.933 0 .37-.127.68-.38.934L12.834 14l4.434 4.433c.253.253.379.564.379.934 0 .37-.127.68-.38.933-.252.253-.563.38-.933.38-.37 0-.68-.127-.933-.38Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
