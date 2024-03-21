// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-comment",
})
export class SwirlIconComment {
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
              d="M2.47138 10.8619C2.05141 11.2819 1.33331 10.9845 1.33331 10.3905V3.33333C1.33331 2.59695 1.93027 2 2.66665 2H9.99998C10.7364 2 11.3333 2.59695 11.3333 3.33333V8C11.3333 8.73638 10.7364 9.33333 9.99998 9.33333H3.99998L2.47138 10.8619ZM5.33331 12.6667C4.59693 12.6667 3.99998 12.0697 3.99998 11.3333V10.6667H10.6666C11.7712 10.6667 12.6666 9.77124 12.6666 8.66667V4.66667H13.3333C14.0697 4.66667 14.6666 5.26362 14.6666 6V13.7239C14.6666 14.3178 13.9486 14.6152 13.5286 14.1953L12 12.6667H5.33331ZM9.99998 3.33333H2.66665V8.78333L3.44998 8H9.99998V3.33333Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M3.70711 15.2929C3.07714 15.9229 2 15.4767 2 14.5858V4C2 2.89543 2.89543 2 4 2H15C16.1046 2 17 2.89543 17 4V11C17 12.1046 16.1046 13 15 13H6L3.70711 15.2929ZM8 18C6.89543 18 6 17.1046 6 16V15H16C17.6569 15 19 13.6569 19 12V6H20C21.1046 6 22 6.89543 22 8V19.5858C22 20.4767 20.9229 20.9229 20.2929 20.2929L18 18H8ZM15 4H4V12.175L5.175 11H15V4Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M4.32494 18.0084C3.58998 18.7433 2.33331 18.2228 2.33331 17.1834V4.83333C2.33331 3.54467 3.37798 2.5 4.66665 2.5H17.5C18.7886 2.5 19.8333 3.54467 19.8333 4.83333V13C19.8333 14.2887 18.7886 15.3333 17.5 15.3333H6.99998L4.32494 18.0084ZM9.33331 21.1667C8.04465 21.1667 6.99998 20.122 6.99998 18.8333V17.6667H18.6666C20.5996 17.6667 22.1666 16.0997 22.1666 14.1667V7.16667H23.3333C24.622 7.16667 25.6666 8.21134 25.6666 9.5V23.0168C25.6666 24.0561 24.41 24.5767 23.675 23.8417L21 21.1667H9.33331ZM17.5 4.83333H4.66665V14.3708L6.03748 13H17.5V4.83333Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
