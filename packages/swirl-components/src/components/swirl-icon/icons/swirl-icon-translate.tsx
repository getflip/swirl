// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-translate",
})
export class SwirlIconTranslate {
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
              d="M7.93335 14.6666L10.9667 6.66658H12.3667L15.4 14.6666H14L13.3 12.6333H10.0667L9.33335 14.6666H7.93335ZM10.4667 11.4666H12.8667L11.7 8.16658H11.6334L10.4667 11.4666ZM2.66669 12.6666L1.73335 11.7333L5.10002 8.36658C4.6778 7.89992 4.30835 7.41658 3.99169 6.91658C3.67502 6.41658 3.40002 5.88881 3.16669 5.33325H4.56669C4.76669 5.73325 4.98058 6.09436 5.20835 6.41658C5.43613 6.73881 5.71113 7.0777 6.03335 7.43325C6.52224 6.89992 6.9278 6.3527 7.25002 5.79159C7.57224 5.23047 7.84447 4.63325 8.06669 3.99992H0.666687V2.66659H5.33335V1.33325H6.66669V2.66659H11.3334V3.99992H9.40002C9.16669 4.78881 8.85002 5.55547 8.45002 6.29992C8.05002 7.04436 7.55558 7.74436 6.96669 8.39992L8.56669 10.0333L8.06669 11.3999L6.00002 9.33325L2.66669 12.6666Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M11.9 22L16.45 10H18.55L23.1 22H21L19.95 18.95H15.1L14 22H11.9ZM15.7 17.2H19.3L17.55 12.25H17.45L15.7 17.2ZM4 19L2.6 17.6L7.65 12.55C7.01667 11.85 6.4625 11.125 5.9875 10.375C5.5125 9.625 5.1 8.83333 4.75 8H6.85C7.15 8.6 7.47083 9.14167 7.8125 9.625C8.15417 10.1083 8.56667 10.6167 9.05 11.15C9.78333 10.35 10.3917 9.52917 10.875 8.6875C11.3583 7.84583 11.7667 6.95 12.1 6H1V4H8V2H10V4H17V6H14.1C13.75 7.18333 13.275 8.33333 12.675 9.45C12.075 10.5667 11.3333 11.6167 10.45 12.6L12.85 15.05L12.1 17.1L9 14L4 19Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M13.8834 25.6666L19.1917 11.6666H21.6417L26.95 25.6666H24.5L23.275 22.1083H17.6167L16.3334 25.6666H13.8834ZM18.3167 20.0666H22.5167L20.475 14.2916H20.3584L18.3167 20.0666ZM4.66669 22.1666L3.03335 20.5333L8.92502 14.6416C8.18613 13.8249 7.5396 12.9791 6.98544 12.1041C6.43127 11.2291 5.95002 10.3055 5.54169 9.33325H7.99169C8.34169 10.0333 8.71599 10.6652 9.1146 11.2291C9.51321 11.793 9.99446 12.386 10.5584 13.0083C11.4139 12.0749 12.1236 11.1173 12.6875 10.1353C13.2514 9.15339 13.7278 8.10825 14.1167 6.99992H1.16669V4.66659H9.33335V2.33325H11.6667V4.66659H19.8334V6.99992H16.45C16.0417 8.38047 15.4875 9.72214 14.7875 11.0249C14.0875 12.3277 13.2222 13.5527 12.1917 14.6999L14.9917 17.5583L14.1167 19.9499L10.5 16.3333L4.66669 22.1666Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
