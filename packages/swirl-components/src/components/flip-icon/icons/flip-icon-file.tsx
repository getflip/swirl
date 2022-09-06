// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { FlipIconSize } from "../flip-icon.types";

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-file",
})
export class FlipIconFile {
  @Prop() size: FlipIconSize = 24;

  render() {
    return (
      <svg
        class="flip-icon"
        fill="none"
        height={this.size}
        part="icon"
        viewBox={`0 0 ${this.size} ${this.size}`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.size === 16 && (
          <Fragment>
            <path
              d="M3.99999 1.33334C3.26666 1.33334 2.67332 1.93334 2.67332 2.66668L2.66666 13.3333C2.66666 14.0667 3.25999 14.6667 3.99332 14.6667H12C12.7333 14.6667 13.3333 14.0667 13.3333 13.3333V5.88668C13.3333 5.53334 13.1933 5.19334 12.94 4.94668L9.71999 1.72668C9.47332 1.47334 9.13332 1.33334 8.77999 1.33334H3.99999ZM8.66666 5.33334V2.33334L12.3333 6.00001H9.33332C8.96666 6.00001 8.66666 5.70001 8.66666 5.33334Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 24 && (
          <Fragment>
            <path
              d="M6 2C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8.83C20 8.3 19.79 7.79 19.41 7.42L14.58 2.59C14.21 2.21 13.7 2 13.17 2H6ZM13 8V3.5L18.5 9H14C13.45 9 13 8.55 13 8Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M6.99999 2.33334C5.71666 2.33334 4.67832 3.38334 4.67832 4.66668L4.66666 23.3333C4.66666 24.6167 5.70499 25.6667 6.98832 25.6667H21C22.2833 25.6667 23.3333 24.6167 23.3333 23.3333V10.3017C23.3333 9.68334 23.0883 9.08834 22.645 8.65668L17.01 3.02168C16.5783 2.57834 15.9833 2.33334 15.365 2.33334H6.99999ZM15.1667 9.33334V4.08334L21.5833 10.5H16.3333C15.6917 10.5 15.1667 9.97501 15.1667 9.33334Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
