// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { FlipIconSize } from "../flip-icon.types";

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-warning",
})
export class FlipIconWarning {
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
        {this.size === 16 && <Fragment><path d="M8 1.33333C4.32 1.33333 1.33334 4.32 1.33334 8C1.33334 11.68 4.32 14.6667 8 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8C14.6667 4.32 11.68 1.33333 8 1.33333ZM8 8.66667C7.63334 8.66667 7.33334 8.36667 7.33334 8V5.33333C7.33334 4.96667 7.63334 4.66667 8 4.66667C8.36667 4.66667 8.66667 4.96667 8.66667 5.33333V8C8.66667 8.36667 8.36667 8.66667 8 8.66667ZM8.66667 11.3333H7.33334V10H8.66667V11.3333Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 13C11.45 13 11 12.55 11 12V8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8V12C13 12.55 12.55 13 12 13ZM13 17H11V15H13V17Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M14 2.33333C7.56 2.33333 2.33333 7.56 2.33333 14C2.33333 20.44 7.56 25.6667 14 25.6667C20.44 25.6667 25.6667 20.44 25.6667 14C25.6667 7.56 20.44 2.33333 14 2.33333ZM14 15.1667C13.3583 15.1667 12.8333 14.6417 12.8333 14V9.33333C12.8333 8.69167 13.3583 8.16667 14 8.16667C14.6417 8.16667 15.1667 8.69167 15.1667 9.33333V14C15.1667 14.6417 14.6417 15.1667 14 15.1667ZM15.1667 19.8333H12.8333V17.5H15.1667V19.8333Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
