// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";

export type FlipIconSize = 16 | 24 | 28;

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-arrow-right-small",
})
export class FlipIconArrowRightSmall {
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
        {this.size === 16 && (
          <Fragment>
            <path
              d="M7.60918 10.1958L9.33584 8.46918C9.59584 8.20918 9.59584 7.78918 9.33584 7.52918L7.60918 5.80251C7.18918 5.38251 6.46918 5.68251 6.46918 6.27584L6.46918 9.72918C6.46918 10.3225 7.18918 10.6158 7.60918 10.1958Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 24 && (
          <Fragment>
            <path
              d="M11.4137 15.2938L14.0037 12.7038C14.3937 12.3138 14.3937 11.6838 14.0037 11.2938L11.4137 8.70379C10.7837 8.07379 9.70374 8.52379 9.70374 9.41379L9.70374 14.5938C9.70374 15.4838 10.7837 15.9238 11.4137 15.2938Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M13.316 17.8427L16.3377 14.821C16.7927 14.366 16.7927 13.631 16.3377 13.176L13.316 10.1544C12.581 9.41938 11.321 9.94438 11.321 10.9827L11.321 17.026C11.321 18.0644 12.581 18.5777 13.316 17.8427Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
