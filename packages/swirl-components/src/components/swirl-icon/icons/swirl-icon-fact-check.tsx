// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-fact-check",
})
export class SwirlIconFactCheck {
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
              d="M2.66732 14C2.30065 14 1.98676 13.8694 1.72565 13.6083C1.46454 13.3472 1.33398 13.0333 1.33398 12.6667V3.33333C1.33398 2.96667 1.46454 2.65278 1.72565 2.39167C1.98676 2.13056 2.30065 2 2.66732 2H13.334C13.7007 2 14.0145 2.13056 14.2757 2.39167C14.5368 2.65278 14.6673 2.96667 14.6673 3.33333V12.6667C14.6673 13.0333 14.5368 13.3472 14.2757 13.6083C14.0145 13.8694 13.7007 14 13.334 14H2.66732ZM2.66732 12.6667H13.334V3.33333H2.66732V12.6667ZM3.33398 11.3333H6.66732V10H3.33398V11.3333ZM9.70065 10L13.0007 6.7L12.0507 5.75L9.70065 8.11667L8.75065 7.16667L7.81732 8.11667L9.70065 10ZM3.33398 8.66667H6.66732V7.33333H3.33398V8.66667ZM3.33398 6H6.66732V4.66667H3.33398V6Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M4 21C3.45 21 2.97917 20.8042 2.5875 20.4125C2.19583 20.0208 2 19.55 2 19V5C2 4.45 2.19583 3.97917 2.5875 3.5875C2.97917 3.19583 3.45 3 4 3H20C20.55 3 21.0208 3.19583 21.4125 3.5875C21.8042 3.97917 22 4.45 22 5V19C22 19.55 21.8042 20.0208 21.4125 20.4125C21.0208 20.8042 20.55 21 20 21H4ZM4 19H20V5H4V19ZM5 17H10V15H5V17ZM14.55 15L19.5 10.05L18.075 8.625L14.55 12.175L13.125 10.75L11.725 12.175L14.55 15ZM5 13H10V11H5V13ZM5 9H10V7H5V9Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M4.66732 24.5C4.02565 24.5 3.47635 24.2715 3.0194 23.8146C2.56246 23.3576 2.33398 22.8083 2.33398 22.1667V5.83333C2.33398 5.19167 2.56246 4.64236 3.0194 4.18542C3.47635 3.72847 4.02565 3.5 4.66732 3.5H23.334C23.9757 3.5 24.525 3.72847 24.9819 4.18542C25.4388 4.64236 25.6673 5.19167 25.6673 5.83333V22.1667C25.6673 22.8083 25.4388 23.3576 24.9819 23.8146C24.525 24.2715 23.9757 24.5 23.334 24.5H4.66732ZM4.66732 22.1667H23.334V5.83333H4.66732V22.1667ZM5.83398 19.8333H11.6673V17.5H5.83398V19.8333ZM16.9757 17.5L22.7507 11.725L21.0882 10.0625L16.9757 14.2042L15.3132 12.5417L13.6798 14.2042L16.9757 17.5ZM5.83398 15.1667H11.6673V12.8333H5.83398V15.1667ZM5.83398 10.5H11.6673V8.16667H5.83398V10.5Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
