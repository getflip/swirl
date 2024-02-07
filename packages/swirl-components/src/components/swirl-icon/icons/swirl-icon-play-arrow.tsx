// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-play-arrow",
})
export class SwirlIconPlayArrow {
  @Prop() size: SwirlIconSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

    const className = classnames("swirl-icon", `swirl-icon--size-${this.size}`);

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
              d="M6.34998 12.0167C6.12776 12.1611 5.90265 12.1693 5.67465 12.0413C5.44709 11.9138 5.33331 11.7167 5.33331 11.45V4.55001C5.33331 4.28335 5.44709 4.08601 5.67465 3.95801C5.90265 3.83046 6.12776 3.8389 6.34998 3.98335L11.7833 7.43335C11.9833 7.56668 12.0833 7.75557 12.0833 8.00001C12.0833 8.24446 11.9833 8.43335 11.7833 8.56668L6.34998 12.0167ZM6.66665 10.2333L10.1666 8.00001L6.66665 5.76668V10.2333Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M9.525 18.025C9.19167 18.2416 8.854 18.254 8.512 18.062C8.17067 17.8706 8 17.575 8 17.175V6.82496C8 6.42496 8.17067 6.12896 8.512 5.93696C8.854 5.74562 9.19167 5.75829 9.525 5.97496L17.675 11.15C17.975 11.35 18.125 11.6333 18.125 12C18.125 12.3666 17.975 12.65 17.675 12.85L9.525 18.025ZM10 15.35L15.25 12L10 8.64996V15.35Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M11.1125 21.0292C10.7236 21.282 10.3297 21.2964 9.93068 21.0724C9.53245 20.8492 9.33334 20.5042 9.33334 20.0376V7.96255C9.33334 7.49589 9.53245 7.15055 9.93068 6.92655C10.3297 6.70333 10.7236 6.71811 11.1125 6.97089L20.6208 13.0084C20.9708 13.2417 21.1458 13.5723 21.1458 14.0001C21.1458 14.4278 20.9708 14.7584 20.6208 14.9917L11.1125 21.0292ZM11.6667 17.9084L17.7917 14.0001L11.6667 10.0917V17.9084Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
