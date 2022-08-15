// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-edit",
})
export class FlipIconEdit {
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
        {this.size === 16 && <Fragment><path d="M12.703 6.06 9.912 3.3l.92-.92a1.26 1.26 0 0 1 .926-.38c.366 0 .675.126.927.378l.92.92c.251.253.382.557.393.913.011.356-.11.66-.36.912l-.936.937ZM2.657 14a.633.633 0 0 1-.468-.19.635.635 0 0 1-.189-.468v-1.857a.678.678 0 0 1 .197-.477L8.96 4.236l2.79 2.794-6.762 6.773A.657.657 0 0 1 4.51 14H2.657Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="m19.054 9.09-4.186-4.142 1.379-1.38A1.89 1.89 0 0 1 17.639 3c.55 0 1.013.189 1.39.567l1.379 1.38c.378.379.575.835.591 1.37.016.534-.164.99-.542 1.368L19.054 9.09ZM3.984 21a.95.95 0 0 1-.7-.284.953.953 0 0 1-.284-.702v-2.787a1.018 1.018 0 0 1 .295-.715L13.44 6.353l4.186 4.192L7.48 20.705a.985.985 0 0 1-.714.295H3.985Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="m22.23 10.605-4.884-4.832 1.609-1.611c.44-.441.981-.662 1.623-.662.641 0 1.182.22 1.623.662l1.608 1.61c.44.442.67.974.69 1.598a2.08 2.08 0 0 1-.632 1.596l-1.638 1.64ZM4.648 24.5c-.326 0-.598-.11-.818-.331a1.115 1.115 0 0 1-.331-.82V20.1a1.187 1.187 0 0 1 .345-.835L15.68 7.412l4.883 4.89L8.728 24.156a1.148 1.148 0 0 1-.833.345H4.65Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
