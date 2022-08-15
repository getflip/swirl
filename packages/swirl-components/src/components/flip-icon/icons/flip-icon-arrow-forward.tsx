// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-arrow-forward",
})
export class FlipIconArrowForward {
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
        {this.size === 16 && <Fragment><path d="m6.492 13.111 4.674-4.66a.665.665 0 0 0 .166-.444.665.665 0 0 0-.166-.444L6.492 2.889a.745.745 0 0 0-.549-.222.72.72 0 0 0-.547.235.707.707 0 0 0-.236.534c0 .208.079.391.236.548l4.022 4.023-4.022 4.022a.728.728 0 0 0-.222.534c0 .208.078.391.236.548a.729.729 0 0 0 .534.222c.208 0 .39-.074.548-.222Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="m9.737 19.667 7.012-6.99a.997.997 0 0 0 .25-.666.997.997 0 0 0-.25-.666L9.737 4.333A1.117 1.117 0 0 0 8.915 4c-.326 0-.6.118-.821.354a1.06 1.06 0 0 0-.354.8c0 .313.118.587.354.823l6.034 6.033-6.034 6.034a1.091 1.091 0 0 0-.333.8c0 .313.118.587.353.823.222.222.49.333.802.333.312 0 .586-.111.821-.333Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="m11.36 22.945 8.18-8.156a1.23 1.23 0 0 0 .22-.364 1.18 1.18 0 0 0 .072-.413 1.167 1.167 0 0 0-.291-.777l-8.18-8.18a1.303 1.303 0 0 0-.96-.388c-.38 0-.7.137-.958.412a1.24 1.24 0 0 0-.413.934c0 .365.138.685.413.96l7.04 7.04-7.04 7.039a1.27 1.27 0 0 0-.389.934c0 .364.138.684.413.959.259.259.57.388.935.388.364 0 .683-.13.958-.388Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
