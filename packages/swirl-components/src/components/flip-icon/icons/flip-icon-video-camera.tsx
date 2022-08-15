// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-video-camera",
})
export class FlipIconVideoCamera {
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
        {this.size === 16 && <Fragment><path d="M2.667 13.333c-.367 0-.68-.13-.942-.391A1.284 1.284 0 0 1 1.333 12V4c0-.367.131-.68.392-.941a1.28 1.28 0 0 1 .942-.392h8c.366 0 .68.13.942.392.26.26.391.574.391.941v3l2.1-2.1c.1-.1.22-.125.359-.075.138.05.208.153.208.308v5.734c0 .155-.07.258-.208.308-.14.05-.259.025-.359-.075L12 9v3c0 .367-.13.68-.391.942a1.29 1.29 0 0 1-.942.391h-8Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M4 20c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 2 18V6c0-.55.196-1.02.588-1.412A1.923 1.923 0 0 1 4 4h12c.55 0 1.021.196 1.413.588.391.391.587.862.587 1.412v4.5l3.15-3.15c.15-.15.33-.188.538-.113.208.075.312.23.312.463v8.6c0 .233-.104.387-.312.462-.209.075-.388.038-.538-.112L18 13.5V18a1.93 1.93 0 0 1-.587 1.413A1.928 1.928 0 0 1 16 20H4Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M4.667 23.333a2.249 2.249 0 0 1-1.648-.684A2.248 2.248 0 0 1 2.333 21V7c0-.642.229-1.19.686-1.647a2.244 2.244 0 0 1 1.648-.686h14c.641 0 1.19.228 1.648.686C20.772 5.809 21 6.358 21 7v5.25l3.675-3.675c.175-.175.384-.219.628-.132.242.088.364.268.364.54v10.034c0 .272-.122.452-.364.539-.244.088-.453.044-.628-.131L21 15.75V21a2.25 2.25 0 0 1-.685 1.648 2.25 2.25 0 0 1-1.648.685h-14Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
