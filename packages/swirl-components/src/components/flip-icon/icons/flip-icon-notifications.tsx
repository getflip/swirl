// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-notifications",
})
export class FlipIconNotifications {
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
        {this.size === 16 && <Fragment><path d="M8 14.5c.734 0 1.334-.6 1.334-1.333H6.667c0 .733.594 1.333 1.334 1.333Zm4-4V7.167c0-2.047-1.092-3.76-3-4.214V2.5a1 1 0 1 0-2 0v.453c-1.913.454-3 2.16-3 4.214V10.5l-.86.86c-.42.42-.126 1.14.467 1.14h8.78c.594 0 .894-.72.474-1.14L12 10.5Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M12.001 21.75c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2Zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32v-.68c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68c-2.87.68-4.5 3.24-4.5 6.32v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71l-1.29-1.29Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M14.001 25.375a2.34 2.34 0 0 0 2.334-2.333h-4.667a2.333 2.333 0 0 0 2.333 2.333Zm7-7v-5.833c0-3.582-1.913-6.58-5.25-7.374v-.793c0-.968-.781-1.75-1.75-1.75-.968 0-1.75.782-1.75 1.75v.793c-3.348.794-5.25 3.78-5.25 7.374v5.833L5.496 19.88c-.735.735-.221 1.995.817 1.995h15.365c1.038 0 1.563-1.26.828-1.995l-1.505-1.505Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
