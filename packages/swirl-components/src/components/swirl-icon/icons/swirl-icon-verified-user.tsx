// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-verified-user",
})
export class SwirlIconVerifiedUser {
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
              d="M7.30002 10.3673L11.0667 6.60065L10.1167 5.65065L7.30002 8.46732L5.90002 7.06732L4.95002 8.01732L7.30002 10.3673ZM8.00002 14.6673C6.45558 14.2784 5.18058 13.3923 4.17502 12.009C3.16946 10.6257 2.66669 9.08954 2.66669 7.40065V3.33398L8.00002 1.33398L13.3334 3.33398V7.40065C13.3334 9.08954 12.8306 10.6257 11.825 12.009C10.8195 13.3923 9.54447 14.2784 8.00002 14.6673ZM8.00002 13.2673C9.15558 12.9007 10.1111 12.1673 10.8667 11.0673C11.6222 9.96732 12 8.74509 12 7.40065V4.25065L8.00002 2.75065L4.00002 4.25065V7.40065C4.00002 8.74509 4.3778 9.96732 5.13335 11.0673C5.88891 12.1673 6.84446 12.9007 8.00002 13.2673Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M10.95 15.55L16.6 9.9L15.175 8.475L10.95 12.7L8.85 10.6L7.425 12.025L10.95 15.55ZM12 22C9.68333 21.4167 7.77083 20.0875 6.2625 18.0125C4.75417 15.9375 4 13.6333 4 11.1V5L12 2L20 5V11.1C20 13.6333 19.2458 15.9375 17.7375 18.0125C16.2292 20.0875 14.3167 21.4167 12 22ZM12 19.9C13.7333 19.35 15.1667 18.25 16.3 16.6C17.4333 14.95 18 13.1167 18 11.1V6.375L12 4.125L6 6.375V11.1C6 13.1167 6.56667 14.95 7.7 16.6C8.83333 18.25 10.2667 19.35 12 19.9Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M12.775 18.1423L19.3666 11.5507L17.7041 9.88815L12.775 14.8173L10.325 12.3673L8.66246 14.0298L12.775 18.1423ZM14 25.6673C11.2972 24.9868 9.06593 23.4361 7.30621 21.0152C5.54649 18.5944 4.66663 15.9062 4.66663 12.9507V5.83398L14 2.33398L23.3333 5.83398V12.9507C23.3333 15.9062 22.4534 18.5944 20.6937 21.0152C18.934 23.4361 16.7027 24.9868 14 25.6673ZM14 23.2173C16.0222 22.5757 17.6944 21.2923 19.0166 19.3673C20.3388 17.4423 21 15.3034 21 12.9507V7.43815L14 4.81315L6.99996 7.43815V12.9507C6.99996 15.3034 7.66107 17.4423 8.98329 19.3673C10.3055 21.2923 11.9777 22.5757 14 23.2173Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
