// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-check-small",
})
export class SwirlIconCheckSmall {
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.4142 4.91924C12.8047 5.30976 12.8047 5.94293 12.4142 6.33345L7.08086 11.6667C6.69033 12.0572 6.05717 12.0572 5.66664 11.6667L3.70711 9.70707C3.31658 9.31655 3.31658 8.68338 3.70711 8.29286C4.09763 7.90233 4.7308 7.90233 5.12132 8.29286L6.37375 9.54539L11 4.91924C11.3905 4.52871 12.0237 4.52871 12.4142 4.91924Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.6213 7.37879C19.2071 7.96458 19.2071 8.91433 18.6213 9.50011L10.6213 17.5C10.0355 18.0858 9.08577 18.0858 8.49998 17.5L5.56068 14.5605C4.97489 13.9748 4.97489 13.025 5.56068 12.4392C6.14646 11.8534 7.09621 11.8534 7.682 12.4392L9.56064 14.318L16.5 7.37879C17.0858 6.79301 18.0355 6.79301 18.6213 7.37879Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.7248 8.60863C22.4083 9.29205 22.4083 10.4001 21.7248 11.0835L12.3915 20.4167C11.7081 21.1001 10.6001 21.1001 9.91663 20.4167L6.48744 16.9873C5.80403 16.3039 5.80403 15.1959 6.48744 14.5125C7.17086 13.8291 8.2789 13.8291 8.96232 14.5125L11.1541 16.7044L19.25 8.60863C19.9334 7.92521 21.0414 7.92521 21.7248 8.60863Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
