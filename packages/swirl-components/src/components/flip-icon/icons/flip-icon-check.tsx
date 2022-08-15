// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-check",
})
export class FlipIconCheck {
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
        {this.size === 16 && <Fragment><path d="M6.367 11.817a.705.705 0 0 1-.533-.217L2.966 8.733a.707.707 0 0 1-.208-.542.763.763 0 0 1 .224-.541.735.735 0 0 1 .542-.217.68.68 0 0 1 .525.217l2.317 2.317 5.583-5.584a.69.69 0 0 1 .533-.216c.223 0 .406.072.55.216.134.145.2.325.2.542a.768.768 0 0 1-.2.542L6.9 11.6a.705.705 0 0 1-.533.217Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M9.55 17.725a1.2 1.2 0 0 1-.425-.075 1.056 1.056 0 0 1-.375-.25l-4.3-4.3a1.06 1.06 0 0 1-.312-.813c.008-.325.12-.595.337-.812.217-.217.488-.325.813-.325.325 0 .587.108.787.325L9.55 14.95l8.375-8.375c.2-.217.467-.325.8-.325s.608.108.825.325c.2.217.3.487.3.812 0 .325-.1.596-.3.813l-9.2 9.2c-.117.117-.242.2-.375.25a1.2 1.2 0 0 1-.425.075Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M11.142 20.68a1.4 1.4 0 0 1-.496-.088 1.233 1.233 0 0 1-.438-.292l-5.016-5.017a1.237 1.237 0 0 1-.364-.948c.009-.379.14-.695.393-.948a1.29 1.29 0 0 1 .948-.379c.38 0 .685.127.919.38l4.054 4.054 9.77-9.771c.234-.253.545-.38.934-.38s.71.127.962.38c.234.253.35.568.35.947 0 .38-.116.696-.35.949L12.075 20.3a1.232 1.232 0 0 1-.438.292 1.4 1.4 0 0 1-.495.087Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
