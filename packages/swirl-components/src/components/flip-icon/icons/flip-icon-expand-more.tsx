// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from '@stencil/core';

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-expand-more",
})
export class FlipIconExpandMore {
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
        {this.size === 16 && <Fragment><path d="M8 10.05a.799.799 0 0 1-.533-.2L4.383 6.767a.686.686 0 0 1-.208-.526.744.744 0 0 1 .225-.524.725.725 0 0 1 .533-.217c.211 0 .39.072.534.217L8 8.25l2.55-2.55a.686.686 0 0 1 .525-.208.74.74 0 0 1 .525.225.725.725 0 0 1 .217.533.725.725 0 0 1-.217.533L8.533 9.85a.799.799 0 0 1-.533.2Z" fill="currentColor"/></Fragment>}
        {this.size === 24 && <Fragment><path d="M12 15.075a1.2 1.2 0 0 1-.8-.3L6.575 10.15a1.03 1.03 0 0 1-.312-.788c.008-.308.12-.57.337-.787.217-.217.483-.325.8-.325.317 0 .583.108.8.325l3.8 3.8 3.825-3.825c.217-.217.48-.32.788-.312.308.008.57.12.787.337.217.217.325.483.325.8 0 .317-.108.583-.325.8l-4.6 4.6a1.2 1.2 0 0 1-.8.3Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M14 17.588a1.4 1.4 0 0 1-.933-.35L7.67 11.842a1.2 1.2 0 0 1-.364-.92c.01-.359.14-.665.393-.918s.564-.379.933-.379c.37 0 .68.126.934.38L14 14.437l4.462-4.463a1.2 1.2 0 0 1 .92-.364c.36.01.665.14.918.393s.38.564.38.934c0 .369-.127.68-.38.933l-5.367 5.367a1.4 1.4 0 0 1-.933.35Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
