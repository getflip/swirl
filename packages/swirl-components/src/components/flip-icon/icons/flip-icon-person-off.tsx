// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-person-off",
})
export class FlipIconPersonOff {
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
        {this.size === 16 && <Fragment><path d="M6.237 3.41a2.666 2.666 0 1 1 3.687 3.687L6.237 3.41Zm7.567 7.567A2.006 2.006 0 0 0 12.73 9.23a8.721 8.721 0 0 0-1.18-.507l2.254 2.254Zm.326 2.213L2.81 1.87a.664.664 0 1 0-.94.94l5.454 5.453a9.519 9.519 0 0 0-3.134.974 2.002 2.002 0 0 0-1.053 1.773v1.853h8.78l1.267 1.267c.26.26.68.26.94 0a.658.658 0 0 0 .006-.94Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M9.356 5.115a3.999 3.999 0 1 1 5.53 5.53l-5.53-5.53Zm11.35 11.35c-.02-1.1-.63-2.11-1.61-2.62-.54-.28-1.13-.54-1.77-.76l3.38 3.38Zm.49 3.32L4.216 2.805a.996.996 0 1 0-1.41 1.41l8.18 8.18c-1.82.23-3.41.8-4.7 1.46-.98.52-1.58 1.55-1.58 2.66v2.78h13.17l1.9 1.9c.39.39 1.02.39 1.41 0 .4-.39.4-1.02.01-1.41Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M10.915 5.968a4.665 4.665 0 1 1 6.452 6.452l-6.452-6.452Zm13.242 13.241a3.51 3.51 0 0 0-1.879-3.056c-.63-.327-1.318-.63-2.065-.887l3.944 3.943Zm.571 3.873L4.918 3.273a1.162 1.162 0 0 0-1.645 0 1.162 1.162 0 0 0 0 1.646l9.544 9.543a16.656 16.656 0 0 0-5.484 1.703 3.504 3.504 0 0 0-1.843 3.103v3.244h15.365l2.217 2.216a1.16 1.16 0 0 0 1.645 0c.466-.454.466-1.19.011-1.645Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
