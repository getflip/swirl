// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-redo",
})
export class SwirlIconRedo {
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
              d="M10.8 6.66666H6.6q-1.05 0-1.825.66667T4 9q0 1 .775 1.66667t1.825.66666h4.06667q.28333 0 .475.19167t.19167.475q0 .28333-.19167.475t-.475.19167H6.6q-1.61667 0-2.775-1.05T2.66667 9q0-1.56667 1.15833-2.61667t2.775-1.05h4.2L9.53334 4.06666Q9.35 3.88333 9.35 3.6t.18334-.46667Q9.71667 2.95 10 2.95t.46667.18333l2.4 2.4q.1.1.14167.21667T13.05 6q0 .13333-.04166.25t-.14167.21666l-2.4 2.4Q10.28334 9.05 10 9.05t-.46666-.18333Q9.35 8.68333 9.35 8.4t.18334-.46667L10.8 6.66666Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M16.2 10H9.9q-1.575 0-2.7375 1T6 13.5Q6 15 7.1625 16T9.9 17H16q.425 0 .7125.2875T17 18q0 .425-.2875.7125T16 19H9.9q-2.425 0-4.1625-1.575T4 13.5q0-2.35 1.7375-3.925T9.9 8h6.3l-1.9-1.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.6 3.6q.15.15.2125.325T19.575 9q0 .2-.0625.375T19.3 9.7l-3.6 3.6q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l1.9-1.9Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M18.9 11.66666h-7.35q-1.8375 0-3.19375 1.16667T7 15.75q0 1.75 1.35625 2.91667T11.55 19.83333h7.11667q.49583 0 .83125.33542T19.83334 21q0 .49583-.33542.83125t-.83125.33542H11.55q-2.82917 0-4.85625-1.8375T4.66667 15.75q0-2.74167 2.02708-4.57917T11.55 9.33333h7.35l-2.21666-2.21667Q16.3625 6.79583 16.3625 6.3t.32084-.81667q.32083-.32083.81666-.32083t.81667.32083l4.2 4.2q.175.175.24792.37917t.07291.4375q0 .23333-.07291.4375t-.24792.37916l-4.2 4.2q-.32083.32084-.81667.32084t-.81666-.32083q-.32084-.32084-.32084-.81667t.32084-.81667L18.9 11.66666Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
