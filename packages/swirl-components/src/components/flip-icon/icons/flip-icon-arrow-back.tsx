// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-arrow-back",
})
export class FlipIconArrowBack {
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
        {this.size === 16 && <Fragment><path d="m9.508 13.111-4.675-4.66a.666.666 0 0 1-.166-.444.666.666 0 0 1 .166-.444l4.675-4.674a.745.745 0 0 1 .548-.222c.217 0 .4.078.547.235a.707.707 0 0 1 .236.534.752.752 0 0 1-.236.548L6.581 8.007l4.022 4.022a.728.728 0 0 1 .222.534.752.752 0 0 1-.236.548.729.729 0 0 1-.534.222.775.775 0 0 1-.547-.222Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="m14.261 19.667-7.011-6.99A1 1 0 0 1 7 12.01a1 1 0 0 1 .25-.666l7.011-7.012c.222-.222.496-.333.823-.333.325 0 .6.118.821.354.236.222.354.489.354.8 0 .313-.118.587-.354.823L9.871 12.01l6.034 6.034c.222.222.333.489.333.8 0 .313-.118.587-.354.823a1.092 1.092 0 0 1-.801.333c-.312 0-.586-.111-.822-.333Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="m16.638 22.945-8.18-8.156a1.166 1.166 0 0 1-.291-.777 1.166 1.166 0 0 1 .29-.777l8.181-8.18c.26-.259.579-.388.96-.388.38 0 .699.137.958.412.275.26.413.57.413.934 0 .365-.138.685-.413.96l-7.04 7.04 7.04 7.039c.259.259.388.57.388.934 0 .364-.137.684-.412.959-.26.259-.571.388-.935.388a1.36 1.36 0 0 1-.959-.388Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
