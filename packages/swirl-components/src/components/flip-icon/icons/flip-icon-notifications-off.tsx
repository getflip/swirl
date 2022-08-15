// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-notifications-off",
})
export class FlipIconNotificationsOff {
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
        {this.size === 16 && <Fragment><path d="M7.537 14.5c.733 0 1.333-.6 1.333-1.333H6.203c0 .733.594 1.333 1.334 1.333Zm4-7.333c0-2.047-1.094-3.76-3-4.214V2.5a1 1 0 1 0-2 0v.453c-.16.04-.314.1-.46.154l5.46 5.46v-1.4Zm-8.394-5.1-.94.94L4.077 4.88a4.925 4.925 0 0 0-.54 2.287V10.5l-.86.86c-.42.42-.127 1.14.466 1.14h8.554l1.16 1.16.94-.94L3.143 2.067Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M11.305 21.75c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2Zm6-11c0-3.07-1.64-5.64-4.5-6.32v-.68c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68c-.24.06-.47.15-.69.23l8.19 8.19v-2.1ZM4.715 3.1l-1.41 1.41 2.81 2.81c-.52 1-.81 2.16-.81 3.43v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h12.83l1.74 1.74 1.41-1.41L4.715 3.1Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M13.19 25.375a2.34 2.34 0 0 0 2.333-2.333h-4.667a2.333 2.333 0 0 0 2.333 2.333Zm7-12.833c0-3.582-1.914-6.58-5.25-7.374v-.793c0-.968-.782-1.75-1.75-1.75-.97 0-1.75.782-1.75 1.75v.793c-.28.07-.55.175-.806.269l9.555 9.555v-2.45ZM5.5 3.617 3.857 5.262 7.134 8.54c-.607 1.167-.945 2.52-.945 4.002v5.833L4.684 19.88c-.735.735-.221 1.995.817 1.995h14.968l2.03 2.03 1.645-1.645L5.501 3.617Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
