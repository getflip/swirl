// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-poll",
})
export class SwirlIconPoll {
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
              d="M13.3333 2.66659V5.99992H2.66665V2.66659H13.3333ZM2.66665 1.33325C1.93027 1.33325 1.33331 1.93021 1.33331 2.66659V5.99992C1.33331 6.7363 1.93027 7.33325 2.66665 7.33325H13.3333C14.0697 7.33325 14.6666 6.7363 14.6666 5.99992V2.66659C14.6666 1.93021 14.0697 1.33325 13.3333 1.33325H2.66665Z"
              fill="currentColor"
            />
            <path
              d="M10.6666 9.99992V13.3333H2.66665V9.99992H10.6666ZM2.66665 8.66658C1.93027 8.66658 1.33331 9.26354 1.33331 9.99992V13.3333C1.33331 14.0696 1.93027 14.6666 2.66665 14.6666H10.6666C11.403 14.6666 12 14.0696 12 13.3333V9.99992C12 9.26354 11.403 8.66658 10.6666 8.66658H2.66665Z"
              fill="currentColor"
            />
            <path
              d="M3.33331 11.6666C3.33331 11.1143 3.78103 10.6666 4.33331 10.6666C4.8856 10.6666 5.33331 11.1143 5.33331 11.6666C5.33331 12.2189 4.8856 12.6666 4.33331 12.6666C3.78103 12.6666 3.33331 12.2189 3.33331 11.6666Z"
              fill="currentColor"
            />
            <path
              d="M3.33331 4.33325C3.33331 3.78097 3.78103 3.33325 4.33331 3.33325C4.8856 3.33325 5.33331 3.78097 5.33331 4.33325C5.33331 4.88554 4.8856 5.33325 4.33331 5.33325C3.78103 5.33325 3.33331 4.88554 3.33331 4.33325Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M20 4V9H4V4H20ZM4 2C2.89543 2 2 2.89543 2 4V9C2 10.1046 2.89543 11 4 11H20C21.1046 11 22 10.1046 22 9V4C22 2.89543 21.1046 2 20 2H4Z"
              fill="currentColor"
            />
            <path
              d="M16 15V20H4V15H16ZM4 13C2.89543 13 2 13.8954 2 15V20C2 21.1046 2.89543 22 4 22H16C17.1046 22 18 21.1046 18 20V15C18 13.8954 17.1046 13 16 13H4Z"
              fill="currentColor"
            />
            <path
              d="M5 17.5C5 16.6716 5.67157 16 6.5 16C7.32843 16 8 16.6716 8 17.5C8 18.3284 7.32843 19 6.5 19C5.67157 19 5 18.3284 5 17.5Z"
              fill="currentColor"
            />
            <path
              d="M5 6.5C5 5.67157 5.67157 5 6.5 5C7.32843 5 8 5.67157 8 6.5C8 7.32843 7.32843 8 6.5 8C5.67157 8 5 7.32843 5 6.5Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M23.3333 4.66659V10.4999H4.66665V4.66659H23.3333ZM4.66665 2.33325C3.37798 2.33325 2.33331 3.37792 2.33331 4.66658V10.4999C2.33331 11.7886 3.37798 12.8333 4.66665 12.8333H23.3333C24.622 12.8333 25.6666 11.7886 25.6666 10.4999V4.66659C25.6666 3.37792 24.622 2.33325 23.3333 2.33325H4.66665Z"
              fill="currentColor"
            />
            <path
              d="M18.6666 17.4999V23.3333H4.66665V17.4999H18.6666ZM4.66665 15.1666C3.37798 15.1666 2.33331 16.2113 2.33331 17.4999V23.3333C2.33331 24.6219 3.37798 25.6666 4.66665 25.6666H18.6666C19.9553 25.6666 21 24.6219 21 23.3333V17.4999C21 16.2113 19.9553 15.1666 18.6666 15.1666H4.66665Z"
              fill="currentColor"
            />
            <path
              d="M5.83331 20.4166C5.83331 19.4501 6.61681 18.6666 7.58331 18.6666C8.54981 18.6666 9.33331 19.4501 9.33331 20.4166C9.33331 21.3831 8.54981 22.1666 7.58331 22.1666C6.61681 22.1666 5.83331 21.3831 5.83331 20.4166Z"
              fill="currentColor"
            />
            <path
              d="M5.83331 7.58325C5.83331 6.61675 6.61681 5.83325 7.58331 5.83325C8.54981 5.83325 9.33331 6.61675 9.33331 7.58325C9.33331 8.54975 8.54981 9.33325 7.58331 9.33325C6.61681 9.33325 5.83331 8.54975 5.83331 7.58325Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
