// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-column",
})
export class SwirlIconColumn {
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
              d="M2.66667 12.0001H5.33334V4.00008H2.66667V12.0001ZM6.66667 12.0001H9.33334V4.00008H6.66667V12.0001ZM10.6667 12.0001H13.3333V4.00008H10.6667V12.0001ZM2.66667 13.3334C2.3 13.3334 1.98622 13.203 1.72534 12.9421C1.464 12.6807 1.33334 12.3667 1.33334 12.0001V4.00008C1.33334 3.63341 1.464 3.31964 1.72534 3.05875C1.98622 2.79741 2.3 2.66675 2.66667 2.66675H13.3333C13.7 2.66675 14.014 2.79741 14.2753 3.05875C14.5362 3.31964 14.6667 3.63341 14.6667 4.00008V12.0001C14.6667 12.3667 14.5362 12.6807 14.2753 12.9421C14.014 13.203 13.7 13.3334 13.3333 13.3334H2.66667Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M4 18H8V6H4V18ZM10 18H14V6H10V18ZM16 18H20V6H16V18ZM4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.196 19.021 2 18.55 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.97933 4.196 3.45 4 4 4H20C20.55 4 21.021 4.196 21.413 4.588C21.8043 4.97933 22 5.45 22 6V18C22 18.55 21.8043 19.021 21.413 19.413C21.021 19.8043 20.55 20 20 20H4Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M4.66667 21.0001H9.33334V7.00008H4.66667V21.0001ZM11.6667 21.0001H16.3333V7.00008H11.6667V21.0001ZM18.6667 21.0001H23.3333V7.00008H18.6667V21.0001ZM4.66667 23.3334C4.025 23.3334 3.47589 23.1051 3.01934 22.6486C2.562 22.1912 2.33334 21.6417 2.33334 21.0001V7.00008C2.33334 6.35841 2.562 5.8093 3.01934 5.35275C3.47589 4.89541 4.025 4.66675 4.66667 4.66675H23.3333C23.975 4.66675 24.5245 4.89541 24.9818 5.35275C25.4384 5.8093 25.6667 6.35841 25.6667 7.00008V21.0001C25.6667 21.6417 25.4384 22.1912 24.9818 22.6486C24.5245 23.1051 23.975 23.3334 23.3333 23.3334H4.66667Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
