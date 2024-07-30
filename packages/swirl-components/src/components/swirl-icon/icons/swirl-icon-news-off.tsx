// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-news-off",
})
export class SwirlIconNewsOff {
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.6569 13.6569C13.9172 13.9172 13.9172 14.3393 13.6569 14.5997C13.3965 14.86 12.9744 14.86 12.714 14.5997L12.1113 13.997C12.0745 13.999 12.0374 14 12 14H4C2.89543 14 2 13.1046 2 12V4C2 3.96264 2.00102 3.92552 2.00305 3.88866L1.40034 3.28596C1.13999 3.02561 1.13999 2.6035 1.40034 2.34315C1.66069 2.0828 2.0828 2.0828 2.34315 2.34315L13.6569 13.6569ZM3.33333 5.21895V7.33333H5.44772L3.33333 5.21895ZM6.78105 8.66667H3.33333V12C3.33333 12.3682 3.63181 12.6667 4 12.6667H10.781L6.78105 8.66667Z"
              fill="currentColor"
            />
            <path
              d="M12.6667 7.33333H8.93221L10.2655 8.66667H12.6667V11.0678L13.9663 12.3674C13.9884 12.2483 14 12.1255 14 12V4C14 2.89543 13.1046 2 12 2H4C3.87448 2 3.75167 2.01156 3.63256 2.03368L4.93221 3.33333H12C12.3682 3.33333 12.6667 3.63181 12.6667 4V7.33333Z"
              fill="currentColor"
            />
            <path
              d="M7.33333 5.33333C7.33333 4.96514 7.63181 4.66667 8 4.66667H10.6667C11.0349 4.66667 11.3333 4.96514 11.3333 5.33333C11.3333 5.70152 11.0349 6 10.6667 6H8C7.63181 6 7.33333 5.70152 7.33333 5.33333Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.4853 20.4853C20.8758 20.8758 20.8758 21.509 20.4853 21.8995C20.0948 22.29 19.4616 22.29 19.0711 21.8995L18.167 20.9954C18.1117 20.9985 18.056 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 5.94396 3.00154 5.88828 3.00457 5.833L2.10051 4.92894C1.70999 4.53841 1.70999 3.90525 2.10051 3.51472C2.49103 3.1242 3.1242 3.1242 3.51472 3.51472L20.4853 20.4853ZM5 7.82843V11H8.17157L5 7.82843ZM10.1716 13H5V18C5 18.5523 5.44772 19 6 19H16.1716L10.1716 13Z"
              fill="currentColor"
            />
            <path
              d="M19 11H13.3983L15.3983 13H19V16.6017L20.9495 18.5512C20.9827 18.3725 21 18.1883 21 18V6C21 4.34315 19.6569 3 18 3H6C5.81172 3 5.6275 3.01734 5.44884 3.05052L7.39831 5H18C18.5523 5 19 5.44772 19 6V11Z"
              fill="currentColor"
            />
            <path
              d="M11 8C11 7.44772 11.4477 7 12 7H16C16.5523 7 17 7.44772 17 8C17 8.55228 16.5523 9 16 9H12C11.4477 9 11 8.55228 11 8Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M23.8995 23.8995C24.3551 24.3551 24.3551 25.0938 23.8995 25.5494C23.4439 26.005 22.7052 26.005 22.2496 25.5494L21.1948 24.4947C21.1303 24.4982 21.0654 24.5 21 24.5H7C5.067 24.5 3.5 22.933 3.5 21V7C3.5 6.93462 3.50179 6.86966 3.50533 6.80516L2.4506 5.75043C1.99498 5.29482 1.99498 4.55612 2.4506 4.10051C2.90621 3.6449 3.6449 3.6449 4.10051 4.10051L23.8995 23.8995ZM5.83333 9.13316V12.8333H9.5335L5.83333 9.13316ZM11.8668 15.1667H5.83333V21C5.83333 21.6443 6.35567 22.1667 7 22.1667H18.8668L11.8668 15.1667Z"
              fill="currentColor"
            />
            <path
              d="M22.1667 12.8333H15.6314L17.9647 15.1667H22.1667V19.3686L24.4411 21.643C24.4798 21.4346 24.5 21.2197 24.5 21V7C24.5 5.067 22.933 3.5 21 3.5H7C6.78034 3.5 6.56542 3.52023 6.35698 3.55894L8.63137 5.83333H21C21.6443 5.83333 22.1667 6.35567 22.1667 7V12.8333Z"
              fill="currentColor"
            />
            <path
              d="M12.8333 9.33333C12.8333 8.689 13.3557 8.16667 14 8.16667H18.6667C19.311 8.16667 19.8333 8.689 19.8333 9.33333C19.8333 9.97766 19.311 10.5 18.6667 10.5H14C13.3557 10.5 12.8333 9.97766 12.8333 9.33333Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
