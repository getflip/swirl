// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-phone",
})
export class FlipIconPhone {
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
        {this.size === 16 && <Fragment><path d="m12.815 10.179-1.694-.194a1.327 1.327 0 0 0-1.093.38L8.8 11.592A10.03 10.03 0 0 1 4.408 7.2L5.64 5.965c.287-.286.427-.686.38-1.093l-.193-1.68A1.334 1.334 0 0 0 4.5 2.012H3.348c-.753 0-1.38.627-1.333 1.38.353 5.693 4.906 10.24 10.593 10.593.753.047 1.38-.58 1.38-1.333V11.5a1.32 1.32 0 0 0-1.173-1.32Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="m19.222 15.268-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.045 15.045 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2.001 2.001 0 0 0-1.99-1.77h-1.73c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="m22.425 17.813-2.963-.338a2.323 2.323 0 0 0-1.913.665l-2.147 2.146a17.553 17.553 0 0 1-7.688-7.688l2.158-2.159a2.322 2.322 0 0 0 .665-1.913l-.338-2.94a2.335 2.335 0 0 0-2.322-2.065H5.86c-1.319 0-2.415 1.097-2.334 2.415.619 9.963 8.587 17.92 18.539 18.538 1.318.082 2.415-1.015 2.415-2.333v-2.018a2.312 2.312 0 0 0-2.054-2.31Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
