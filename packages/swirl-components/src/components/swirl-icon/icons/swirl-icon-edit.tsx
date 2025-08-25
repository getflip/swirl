// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-edit",
})
export class SwirlIconEdit {
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
              d="M3.33333 12.6666H4.26667L10.0167 6.91659L9.08333 5.98325L3.33333 11.7333V12.6666ZM12.8667 5.94992L10.0333 3.14992L10.9667 2.21659C11.2222 1.96103 11.5362 1.83325 11.9087 1.83325C12.2807 1.83325 12.5944 1.96103 12.85 2.21659L13.7833 3.14992C14.0389 3.40547 14.1722 3.71392 14.1833 4.07525C14.1944 4.43614 14.0722 4.74436 13.8167 4.99992L12.8667 5.94992ZM2.66667 13.9999C2.47778 13.9999 2.31956 13.9359 2.192 13.8079C2.064 13.6804 2 13.5221 2 13.3333V11.4499C2 11.361 2.01667 11.275 2.05 11.1919C2.08333 11.1084 2.13333 11.0333 2.2 10.9666L9.06667 4.09992L11.9 6.93325L5.03333 13.7999C4.96667 13.8666 4.89178 13.9166 4.80867 13.9499C4.72511 13.9833 4.63889 13.9999 4.55 13.9999H2.66667Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3043 2.75 17.863 2.75C18.421 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.571 21.275 6.113C21.2917 6.65433 21.1083 7.11667 20.725 7.5L19.3 8.925ZM4 21C3.71667 21 3.47933 20.904 3.288 20.712C3.096 20.5207 3 20.2833 3 20V17.175C3 17.0417 3.025 16.9127 3.075 16.788C3.125 16.6627 3.2 16.55 3.3 16.45L13.6 6.15L17.85 10.4L7.55 20.7C7.45 20.8 7.33767 20.875 7.213 20.925C7.08767 20.975 6.95833 21 6.825 21H4Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M5.83333 22.1666H7.46667L17.5292 12.1041L15.8958 10.4708L5.83333 20.5333V22.1666ZM22.5167 10.4124L17.5583 5.51242L19.1917 3.87909C19.6389 3.43186 20.1884 3.20825 20.8402 3.20825C21.4912 3.20825 22.0403 3.43186 22.4875 3.87909L24.1208 5.51242C24.5681 5.95964 24.8014 6.49942 24.8208 7.13175C24.8403 7.76331 24.6264 8.3027 24.1792 8.74992L22.5167 10.4124ZM4.66667 24.4999C4.33611 24.4999 4.05922 24.3879 3.836 24.1639C3.612 23.9407 3.5 23.6638 3.5 23.3333V20.0374C3.5 19.8819 3.52917 19.7314 3.5875 19.5859C3.64583 19.4397 3.73333 19.3083 3.85 19.1916L15.8667 7.17492L20.825 12.1333L8.80833 24.1499C8.69167 24.2666 8.56061 24.3541 8.41517 24.4124C8.26894 24.4708 8.11806 24.4999 7.9625 24.4999H4.66667Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
