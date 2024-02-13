// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-file",
})
export class SwirlIconFile {
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
              d="M4.00002 14.6666C3.63335 14.6666 3.31958 14.5362 3.05869 14.2753C2.79735 14.014 2.66669 13.7 2.66669 13.3333V2.66665C2.66669 2.29998 2.79735 1.98598 3.05869 1.72465C3.31958 1.46376 3.63335 1.33331 4.00002 1.33331H8.78335C8.96113 1.33331 9.13069 1.36665 9.29202 1.43331C9.45291 1.49998 9.59446 1.59442 9.71669 1.71665L12.95 4.94998C13.0722 5.0722 13.1667 5.21376 13.2334 5.37465C13.3 5.53598 13.3334 5.70553 13.3334 5.88331V13.3333C13.3334 13.7 13.2029 14.014 12.942 14.2753C12.6807 14.5362 12.3667 14.6666 12 14.6666H4.00002ZM8.66669 5.33331V2.66665H4.00002V13.3333H12V5.99998H9.33335C9.14446 5.99998 8.98624 5.93598 8.85869 5.80798C8.73069 5.68042 8.66669 5.5222 8.66669 5.33331Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M6 22C5.45 22 4.97933 21.8043 4.588 21.413C4.196 21.021 4 20.55 4 20V4C4 3.45 4.196 2.979 4.588 2.587C4.97933 2.19567 5.45 2 6 2H13.175C13.4417 2 13.696 2.05 13.938 2.15C14.1793 2.25 14.3917 2.39167 14.575 2.575L19.425 7.425C19.6083 7.60833 19.75 7.82067 19.85 8.062C19.95 8.304 20 8.55833 20 8.825V20C20 20.55 19.8043 21.021 19.413 21.413C19.021 21.8043 18.55 22 18 22H6ZM13 8V4H6V20H18V9H14C13.7167 9 13.4793 8.904 13.288 8.712C13.096 8.52067 13 8.28333 13 8Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M7.00002 25.6666C6.35835 25.6666 5.80924 25.4384 5.35269 24.9818C4.89535 24.5245 4.66669 23.975 4.66669 23.3333V4.66665C4.66669 4.02498 4.89535 3.47548 5.35269 3.01815C5.80924 2.56159 6.35835 2.33331 7.00002 2.33331H15.3709C15.682 2.33331 15.9787 2.39165 16.261 2.50831C16.5426 2.62498 16.7903 2.79026 17.0042 3.00415L22.6625 8.66248C22.8764 8.87637 23.0417 9.12409 23.1584 9.40565C23.275 9.68798 23.3334 9.9847 23.3334 10.2958V23.3333C23.3334 23.975 23.1051 24.5245 22.6485 24.9818C22.1912 25.4384 21.6417 25.6666 21 25.6666H7.00002ZM15.1667 9.33331V4.66665H7.00002V23.3333H21V10.5H16.3334C16.0028 10.5 15.7259 10.388 15.5027 10.164C15.2787 9.94076 15.1667 9.66387 15.1667 9.33331Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
