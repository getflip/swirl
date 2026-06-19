// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-mark-email-read",
})
export class SwirlIconMarkEmailRead {
  @Prop() color?: SwirlIconColor;
  @Prop() label?: string;
  @Prop() size: SwirlIconSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

    const styles = {
      color: Boolean(this.color) ? `var(--s-icon-${this.color})` : undefined,
    };

    const className = classnames("swirl-icon", `swirl-icon--size-${this.size}`);

    const hasLabel = Boolean(this.label);

    return (
      <svg
        aria-hidden={hasLabel ? undefined : "true"}
        class={className}
        fill="none"
        height={this.size}
        part="icon"
        role={hasLabel ? "img" : undefined}
        style={styles}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {hasLabel && <title>{this.label}</title>}
        {this.size === 16 && (
          <Fragment>
            <path
              d="M10.634 14.6665L7.80065 11.8332L8.73398 10.8998L10.634 12.7998L14.4007 9.03317L15.334 9.9665L10.634 14.6665ZM8.00065 7.33317L13.334 3.99984H2.66732L8.00065 7.33317ZM8.00065 8.6665L2.66732 5.33317V11.9998H6.10065L7.43398 13.3332H2.66732C2.30065 13.3332 1.98676 13.2026 1.72565 12.9415C1.46454 12.6804 1.33398 12.3665 1.33398 11.9998V3.99984C1.33398 3.63317 1.46454 3.31928 1.72565 3.05817C1.98676 2.79706 2.30065 2.6665 2.66732 2.6665H13.334C13.7007 2.6665 14.0145 2.79706 14.2757 3.05817C14.5368 3.31928 14.6673 3.63317 14.6673 3.99984V6.89984L13.334 8.23317V5.33317L8.00065 8.6665Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M15.95 22L11.7 17.75L13.1 16.35L15.95 19.2L21.6 13.55L23 14.95L15.95 22ZM12 11L20 6H4L12 11ZM12 13L4 8V18H9.15L11.15 20H4C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V10.35L20 12.35V8L12 13Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M18.609 25.6665L13.6507 20.7082L15.284 19.0748L18.609 22.3998L25.2007 15.8082L26.834 17.4415L18.609 25.6665ZM14.0007 12.8332L23.334 6.99984H4.66732L14.0007 12.8332ZM14.0007 15.1665L4.66732 9.33317V20.9998H10.6757L13.009 23.3332H4.66732C4.02565 23.3332 3.47635 23.1047 3.0194 22.6478C2.56246 22.1908 2.33398 21.6415 2.33398 20.9998V6.99984C2.33398 6.35817 2.56246 5.80887 3.0194 5.35192C3.47635 4.89498 4.02565 4.6665 4.66732 4.6665H23.334C23.9757 4.6665 24.525 4.89498 24.9819 5.35192C25.4388 5.80887 25.6673 6.35817 25.6673 6.99984V12.0748L23.334 14.4082V9.33317L14.0007 15.1665Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
