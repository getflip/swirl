// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { FlipIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "flip-icon-inventory",
})
export class FlipIconInventory {
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
              d="M13.3333 1.33334H2.66668C2.00001 1.33334 1.33334 1.93334 1.33334 2.66668V4.67334C1.33334 5.15334 1.62001 5.56668 2.00001 5.80001V13.3333C2.00001 14.0667 2.73334 14.6667 3.33334 14.6667H12.6667C13.2667 14.6667 14 14.0667 14 13.3333V5.80001C14.38 5.56668 14.6667 5.15334 14.6667 4.67334V2.66668C14.6667 1.93334 14 1.33334 13.3333 1.33334ZM9.33334 9.33334H6.66668C6.30001 9.33334 6.00001 9.03334 6.00001 8.66668C6.00001 8.30001 6.30001 8.00001 6.66668 8.00001H9.33334C9.70001 8.00001 10 8.30001 10 8.66668C10 9.03334 9.70001 9.33334 9.33334 9.33334ZM13.3333 4.66668H2.66668V2.66668H13.3333V4.66668Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M20 2H4C3 2 2 2.9 2 4V7.01C2 7.73 2.43 8.35 3 8.7V20C3 21.1 4.1 22 5 22H19C19.9 22 21 21.1 21 20V8.7C21.57 8.35 22 7.73 22 7.01V4C22 2.9 21 2 20 2ZM14 14H10C9.45 14 9 13.55 9 13C9 12.45 9.45 12 10 12H14C14.55 12 15 12.45 15 13C15 13.55 14.55 14 14 14ZM20 7H4V4H20V7Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M23.3333 2.33334H4.66668C3.50001 2.33334 2.33334 3.38334 2.33334 4.66668V8.17834C2.33334 9.01834 2.83501 9.74168 3.50001 10.15V23.3333C3.50001 24.6167 4.78334 25.6667 5.83334 25.6667H22.1667C23.2167 25.6667 24.5 24.6167 24.5 23.3333V10.15C25.165 9.74168 25.6667 9.01834 25.6667 8.17834V4.66668C25.6667 3.38334 24.5 2.33334 23.3333 2.33334ZM16.3333 16.3333H11.6667C11.025 16.3333 10.5 15.8083 10.5 15.1667C10.5 14.525 11.025 14 11.6667 14H16.3333C16.975 14 17.5 14.525 17.5 15.1667C17.5 15.8083 16.975 16.3333 16.3333 16.3333ZM23.3333 8.16668H4.66668V4.66668H23.3333V8.16668Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
