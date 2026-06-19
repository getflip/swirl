// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-password",
})
export class SwirlIconPassword {
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
              d="M1.33268 12.6665V11.3332H14.666V12.6665H1.33268ZM2.09935 8.63317L1.23268 8.13317L1.79935 7.13317H0.666016V6.13317H1.79935L1.23268 5.1665L2.09935 4.6665L2.66602 5.63317L3.23268 4.6665L4.09935 5.1665L3.53268 6.13317H4.66602V7.13317H3.53268L4.09935 8.13317L3.23268 8.63317L2.66602 7.63317L2.09935 8.63317ZM7.43268 8.63317L6.56602 8.13317L7.13268 7.13317H5.99935V6.13317H7.13268L6.56602 5.1665L7.43268 4.6665L7.99935 5.63317L8.56602 4.6665L9.43268 5.1665L8.86602 6.13317H9.99935V7.13317H8.86602L9.43268 8.13317L8.56602 8.63317L7.99935 7.63317L7.43268 8.63317ZM12.766 8.63317L11.8993 8.13317L12.466 7.13317H11.3327V6.13317H12.466L11.8993 5.1665L12.766 4.6665L13.3327 5.63317L13.8993 4.6665L14.766 5.1665L14.1993 6.13317H15.3327V7.13317H14.1993L14.766 8.13317L13.8993 8.63317L13.3327 7.63317L12.766 8.63317Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M2 19V17H22V19H2ZM3.15 12.95L1.85 12.2L2.7 10.7H1V9.2H2.7L1.85 7.75L3.15 7L4 8.45L4.85 7L6.15 7.75L5.3 9.2H7V10.7H5.3L6.15 12.2L4.85 12.95L4 11.45L3.15 12.95ZM11.15 12.95L9.85 12.2L10.7 10.7H9V9.2H10.7L9.85 7.75L11.15 7L12 8.45L12.85 7L14.15 7.75L13.3 9.2H15V10.7H13.3L14.15 12.2L12.85 12.95L12 11.45L11.15 12.95ZM19.15 12.95L17.85 12.2L18.7 10.7H17V9.2H18.7L17.85 7.75L19.15 7L20 8.45L20.85 7L22.15 7.75L21.3 9.2H23V10.7H21.3L22.15 12.2L20.85 12.95L20 11.45L19.15 12.95Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M2.33268 22.1665V19.8332H25.666V22.1665H2.33268ZM3.67435 15.1082L2.15768 14.2332L3.14935 12.4832H1.16602V10.7332H3.14935L2.15768 9.0415L3.67435 8.1665L4.66602 9.85817L5.65768 8.1665L7.17435 9.0415L6.18268 10.7332H8.16602V12.4832H6.18268L7.17435 14.2332L5.65768 15.1082L4.66602 13.3582L3.67435 15.1082ZM13.0077 15.1082L11.491 14.2332L12.4827 12.4832H10.4993V10.7332H12.4827L11.491 9.0415L13.0077 8.1665L13.9993 9.85817L14.991 8.1665L16.5077 9.0415L15.516 10.7332H17.4993V12.4832H15.516L16.5077 14.2332L14.991 15.1082L13.9993 13.3582L13.0077 15.1082ZM22.341 15.1082L20.8243 14.2332L21.816 12.4832H19.8327V10.7332H21.816L20.8243 9.0415L22.341 8.1665L23.3327 9.85817L24.3243 8.1665L25.841 9.0415L24.8493 10.7332H26.8327V12.4832H24.8493L25.841 14.2332L24.3243 15.1082L23.3327 13.3582L22.341 15.1082Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
