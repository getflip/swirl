// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { FlipIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "flip-icon-remove",
})
export class FlipIconRemove {
  @Prop() size: FlipIconSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

    const className = classnames("flip-icon", `flip-icon--size-${this.size}`);

    return (
      <svg
        class={className}
        fill="none"
        height={this.size}
        part="icon"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.size === 16 && (
          <Fragment>
            <path
              d="M4 8.76661C3.78889 8.76661 3.60844 8.6915 3.45866 8.54128C3.30844 8.3915 3.23333 8.21105 3.23333 7.99994C3.23333 7.78883 3.30844 7.60839 3.45866 7.45861C3.60844 7.30839 3.78889 7.23328 4 7.23328H12C12.2111 7.23328 12.3916 7.30839 12.5413 7.45861C12.6916 7.60839 12.7667 7.78883 12.7667 7.99994C12.7667 8.21105 12.6916 8.3915 12.5413 8.54128C12.3916 8.6915 12.2111 8.76661 12 8.76661H4Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M6 13.15C5.68333 13.15 5.41267 13.0373 5.188 12.812C4.96267 12.5873 4.85 12.3166 4.85 12C4.85 11.6833 4.96267 11.4126 5.188 11.188C5.41267 10.9626 5.68333 10.85 6 10.85H18C18.3167 10.85 18.5873 10.9626 18.812 11.188C19.0373 11.4126 19.15 11.6833 19.15 12C19.15 12.3166 19.0373 12.5873 18.812 12.812C18.5873 13.0373 18.3167 13.15 18 13.15H6Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M7 15.3417C6.63056 15.3417 6.31478 15.2102 6.05267 14.9473C5.78978 14.6852 5.65833 14.3694 5.65833 14C5.65833 13.6305 5.78978 13.3148 6.05267 13.0527C6.31478 12.7898 6.63056 12.6583 7 12.6583H21C21.3694 12.6583 21.6852 12.7898 21.9473 13.0527C22.2102 13.3148 22.3417 13.6305 22.3417 14C22.3417 14.3694 22.2102 14.6852 21.9473 14.9473C21.6852 15.2102 21.3694 15.3417 21 15.3417H7Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
