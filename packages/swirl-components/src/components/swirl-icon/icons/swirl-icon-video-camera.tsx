// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-video-camera",
})
export class SwirlIconVideoCamera {
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
              d="M2.66665 13.3334C2.29998 13.3334 1.9862 13.203 1.72531 12.9421C1.46398 12.6807 1.33331 12.3667 1.33331 12.0001V4.00008C1.33331 3.63341 1.46398 3.31964 1.72531 3.05875C1.9862 2.79741 2.29998 2.66675 2.66665 2.66675H10.6666C11.0333 2.66675 11.3473 2.79741 11.6086 3.05875C11.8695 3.31964 12 3.63341 12 4.00008V7.00008L14.1 4.90008C14.2111 4.78897 14.3333 4.76119 14.4666 4.81675C14.6 4.8723 14.6666 4.97786 14.6666 5.13341V10.8667C14.6666 11.0223 14.6 11.1279 14.4666 11.1834C14.3333 11.239 14.2111 11.2112 14.1 11.1001L12 9.00008V12.0001C12 12.3667 11.8695 12.6807 11.6086 12.9421C11.3473 13.203 11.0333 13.3334 10.6666 13.3334H2.66665ZM2.66665 12.0001H10.6666V4.00008H2.66665V12.0001Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.196 19.021 2 18.55 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.97933 4.196 3.45 4 4 4H16C16.55 4 17.021 4.196 17.413 4.588C17.8043 4.97933 18 5.45 18 6V10.5L21.15 7.35C21.3167 7.18333 21.5 7.14167 21.7 7.225C21.9 7.30833 22 7.46667 22 7.7V16.3C22 16.5333 21.9 16.6917 21.7 16.775C21.5 16.8583 21.3167 16.8167 21.15 16.65L18 13.5V18C18 18.55 17.8043 19.021 17.413 19.413C17.021 19.8043 16.55 20 16 20H4ZM4 18H16V6H4V18Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M4.66665 23.3334C4.02498 23.3334 3.47587 23.1051 3.01931 22.6486C2.56198 22.1912 2.33331 21.6417 2.33331 21.0001V7.00008C2.33331 6.35841 2.56198 5.8093 3.01931 5.35275C3.47587 4.89541 4.02498 4.66675 4.66665 4.66675H18.6666C19.3083 4.66675 19.8578 4.89541 20.3151 5.35275C20.7717 5.8093 21 6.35841 21 7.00008V12.2501L24.675 8.57508C24.8694 8.38064 25.0833 8.33203 25.3166 8.42925C25.55 8.52647 25.6666 8.71119 25.6666 8.98341V19.0167C25.6666 19.289 25.55 19.4737 25.3166 19.5709C25.0833 19.6681 24.8694 19.6195 24.675 19.4251L21 15.7501V21.0001C21 21.6417 20.7717 22.1912 20.3151 22.6486C19.8578 23.1051 19.3083 23.3334 18.6666 23.3334H4.66665ZM4.66665 21.0001H18.6666V7.00008H4.66665V21.0001Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
