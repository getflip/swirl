// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-chat-bubble",
})
export class SwirlIconChatBubble {
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
              d="M5.33331 10.6667H2.66665L2.66665 3.33333H13.3333V10.6667H6.78103L5.33331 12.1144V10.6667ZM13.3333 2H2.66665C1.93027 2 1.33331 2.59695 1.33331 3.33333V10.6667C1.33331 11.403 1.93027 12 2.66665 12H3.99998V13.7239C3.99998 14.3178 4.71807 14.6152 5.13805 14.1953L7.33331 12H13.3333C14.0697 12 14.6666 11.403 14.6666 10.6667V3.33333C14.6666 2.59695 14.0697 2 13.3333 2Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M8 16H4L4 5H20V16H10.1716L8 18.1716V16ZM20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H6V20.5858C6 21.4767 7.07714 21.9229 7.70711 21.2929L11 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M9.33331 18.6667H4.66665L4.66665 5.83333H23.3333V18.6667H11.8668L9.33331 21.2002V18.6667ZM23.3333 3.5H4.66665C3.37798 3.5 2.33331 4.54467 2.33331 5.83333V18.6667C2.33331 19.9553 3.37798 21 4.66665 21H6.99998V24.0168C6.99998 25.0561 8.25665 25.5767 8.9916 24.8417L12.8333 21H23.3333C24.622 21 25.6666 19.9553 25.6666 18.6667V5.83333C25.6666 4.54467 24.622 3.5 23.3333 3.5Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
