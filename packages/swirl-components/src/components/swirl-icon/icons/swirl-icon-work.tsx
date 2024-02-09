// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-work",
})
export class SwirlIconWork {
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
              d="M2.66668 14.0002C2.30001 14.0002 1.98612 13.8696 1.72501 13.6085C1.4639 13.3474 1.33334 13.0335 1.33334 12.6668V5.3335C1.33334 4.96683 1.4639 4.65294 1.72501 4.39183C1.98612 4.13072 2.30001 4.00016 2.66668 4.00016H5.33334V2.66683C5.33334 2.30016 5.4639 1.98627 5.72501 1.72516C5.98612 1.46405 6.30001 1.3335 6.66668 1.3335H9.33334C9.70001 1.3335 10.0139 1.46405 10.275 1.72516C10.5361 1.98627 10.6667 2.30016 10.6667 2.66683V4.00016H13.3333C13.7 4.00016 14.0139 4.13072 14.275 4.39183C14.5361 4.65294 14.6667 4.96683 14.6667 5.3335V12.6668C14.6667 13.0335 14.5361 13.3474 14.275 13.6085C14.0139 13.8696 13.7 14.0002 13.3333 14.0002H2.66668ZM2.66668 12.6668H13.3333V5.3335H2.66668V12.6668ZM6.66668 4.00016H9.33334V2.66683H6.66668V4.00016Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M4 21C3.45 21 2.97917 20.8042 2.5875 20.4125C2.19583 20.0208 2 19.55 2 19V8C2 7.45 2.19583 6.97917 2.5875 6.5875C2.97917 6.19583 3.45 6 4 6H8V4C8 3.45 8.19583 2.97917 8.5875 2.5875C8.97917 2.19583 9.45 2 10 2H14C14.55 2 15.0208 2.19583 15.4125 2.5875C15.8042 2.97917 16 3.45 16 4V6H20C20.55 6 21.0208 6.19583 21.4125 6.5875C21.8042 6.97917 22 7.45 22 8V19C22 19.55 21.8042 20.0208 21.4125 20.4125C21.0208 20.8042 20.55 21 20 21H4ZM4 19H20V8H4V19ZM10 6H14V4H10V6Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M4.66668 24.5002C4.02501 24.5002 3.4757 24.2717 3.01876 23.8147C2.56182 23.3578 2.33334 22.8085 2.33334 22.1668V9.3335C2.33334 8.69183 2.56182 8.14252 3.01876 7.68558C3.4757 7.22863 4.02501 7.00016 4.66668 7.00016H9.33334V4.66683C9.33334 4.02516 9.56182 3.47586 10.0188 3.01891C10.4757 2.56197 11.025 2.3335 11.6667 2.3335H16.3333C16.975 2.3335 17.5243 2.56197 17.9813 3.01891C18.4382 3.47586 18.6667 4.02516 18.6667 4.66683V7.00016H23.3333C23.975 7.00016 24.5243 7.22863 24.9813 7.68558C25.4382 8.14252 25.6667 8.69183 25.6667 9.3335V22.1668C25.6667 22.8085 25.4382 23.3578 24.9813 23.8147C24.5243 24.2717 23.975 24.5002 23.3333 24.5002H4.66668ZM4.66668 22.1668H23.3333V9.3335H4.66668V22.1668ZM11.6667 7.00016H16.3333V4.66683H11.6667V7.00016Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
