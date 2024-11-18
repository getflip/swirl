// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-post-approval",
})
export class SwirlIconPostApproval {
  @Prop() color?: SwirlIconColor;
  @Prop() size: SwirlIconSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

    const styles = {
      color: Boolean(this.color) ? `var(--s-icon-${this.color})` : undefined,
    };

    const className = classnames("swirl-icon", `swirl-icon--size-${this.size}`);

    return (
      <svg
        aria-hidden="true"
        class={className}
        fill="none"
        height={this.size}
        part="icon"
        style={styles}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.size === 16 && (
          <Fragment>
            <path
              d="M4 3.33333H12C12.3682 3.33333 12.6667 3.63181 12.6667 4V5.33333H14V4C14 2.89543 13.1046 2 12 2H4C2.89543 2 2 2.89543 2 4V12C2 13.1046 2.89543 14 4 14H5.33333V12.6667H4C3.63181 12.6667 3.33333 12.3682 3.33333 12V4C3.33333 3.63181 3.63181 3.33333 4 3.33333Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.4714 8.19526C14.7318 8.45561 14.7318 8.87772 14.4714 9.13807L9.80474 13.8047C9.54439 14.0651 9.12228 14.0651 8.86193 13.8047L6.86193 11.8047C6.60158 11.5444 6.60158 11.1223 6.86193 10.8619C7.12228 10.6016 7.54439 10.6016 7.80474 10.8619L9.33333 12.3905L13.5286 8.19526C13.7889 7.93491 14.2111 7.93491 14.4714 8.19526Z"
              fill="currentColor"
            />
            <path
              d="M4.66667 5.33333C4.66667 4.96514 4.96514 4.66667 5.33333 4.66667H10.6667C11.0349 4.66667 11.3333 4.96514 11.3333 5.33333C11.3333 5.70152 11.0349 6 10.6667 6H5.33333C4.96514 6 4.66667 5.70152 4.66667 5.33333Z"
              fill="currentColor"
            />
            <path
              d="M4.66667 8C4.66667 7.63181 4.96514 7.33333 5.33333 7.33333H8.66667C9.03486 7.33333 9.33333 7.63181 9.33333 8C9.33333 8.36819 9.03486 8.66667 8.66667 8.66667H5.33333C4.96514 8.66667 4.66667 8.36819 4.66667 8Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M6 5H18C18.5523 5 19 5.44772 19 6V8H21V6C21 4.34315 19.6569 3 18 3H6C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H8V19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.7071 12.2929C22.0976 12.6834 22.0976 13.3166 21.7071 13.7071L14.7071 20.7071C14.3166 21.0976 13.6834 21.0976 13.2929 20.7071L10.2929 17.7071C9.90237 17.3166 9.90237 16.6834 10.2929 16.2929C10.6834 15.9024 11.3166 15.9024 11.7071 16.2929L14 18.5858L20.2929 12.2929C20.6834 11.9024 21.3166 11.9024 21.7071 12.2929Z"
              fill="currentColor"
            />
            <path
              d="M7 8C7 7.44772 7.44772 7 8 7H16C16.5523 7 17 7.44772 17 8C17 8.55228 16.5523 9 16 9H8C7.44772 9 7 8.55228 7 8Z"
              fill="currentColor"
            />
            <path
              d="M7 12C7 11.4477 7.44772 11 8 11H13C13.5523 11 14 11.4477 14 12C14 12.5523 13.5523 13 13 13H8C7.44772 13 7 12.5523 7 12Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M7 5.83333H21C21.6443 5.83333 22.1667 6.35567 22.1667 7V9.33333H24.5V7C24.5 5.067 22.933 3.5 21 3.5H7C5.067 3.5 3.5 5.067 3.5 7V21C3.5 22.933 5.067 24.5 7 24.5H9.33333V22.1667H7C6.35567 22.1667 5.83333 21.6443 5.83333 21V7C5.83333 6.35567 6.35567 5.83333 7 5.83333Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M25.325 14.3417C25.7806 14.7973 25.7806 15.536 25.325 15.9916L17.1583 24.1583C16.7027 24.6139 15.964 24.6139 15.5084 24.1583L12.0084 20.6583C11.5528 20.2027 11.5528 19.464 12.0084 19.0084C12.464 18.5528 13.2027 18.5528 13.6583 19.0084L16.3333 21.6834L23.675 14.3417C24.1307 13.8861 24.8693 13.8861 25.325 14.3417Z"
              fill="currentColor"
            />
            <path
              d="M8.16667 9.33333C8.16667 8.689 8.689 8.16667 9.33333 8.16667H18.6667C19.311 8.16667 19.8333 8.689 19.8333 9.33333C19.8333 9.97767 19.311 10.5 18.6667 10.5H9.33333C8.689 10.5 8.16667 9.97767 8.16667 9.33333Z"
              fill="currentColor"
            />
            <path
              d="M8.16667 14C8.16667 13.3557 8.689 12.8333 9.33333 12.8333H15.1667C15.811 12.8333 16.3333 13.3557 16.3333 14C16.3333 14.6443 15.811 15.1667 15.1667 15.1667H9.33333C8.689 15.1667 8.16667 14.6443 8.16667 14Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
