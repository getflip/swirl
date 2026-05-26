// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-swap-vert",
})
export class SwirlIconSwapVert {
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
              d="M5.525 8.475Q5.33333 8.28333 5.33333 8V3.88333l-1.25 1.25Q3.9 5.31666 3.625 5.31666t-.475-.18333q-.2-.2-.2-.475t.2-.475L5.53333 1.8q.1-.1.21667-.14167T6 1.61666q.13333 0 .25.04167T6.46667 1.8l2.4 2.4q.2.2.19167.46666T8.85 5.13333q-.2.18333-.46666.19167t-.46667-.19167l-1.25-1.25V8q0 .28333-.19167.475T6 8.66667q-.28333 0-.475-.19167Zm4.225 5.86667Q9.63334 14.3 9.53334 14.2l-2.4-2.4q-.2-.2-.19167-.46667t.20833-.46666q.2-.18334.46667-.19167t.46666.19167l1.25 1.25V8q0-.28333.19167-.475T10 7.33333q.28334 0 .475.19167t.19167.475v4.11667l1.25-1.25q.18333-.18334.45833-.18334t.475.18334q.2.2.2.475t-.2.475L10.46667 14.2q-.1.1-.21667.14167t-.25.04166q-.13333 0-.25-.04166Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M8.2875 12.7125Q8 12.425 8 12V5.825L6.125 7.7q-.275.275-.6875.275T4.725 7.7q-.3-.3-.3-.7125t.3-.7125L8.3 2.7q.15-.15.325-.2125T9 2.425q.2 0 .375.0625T9.7 2.7l3.6 3.6q.3.3.2875.7t-.3125.7q-.3.275-.7.2875t-.7-.2875L10 5.825V12q0 .425-.2875.7125T9 13q-.425 0-.7125-.2875Zm6.3375 8.8Q14.45 21.45 14.3 21.3l-3.6-3.6q-.3-.3-.2875-.7t.3125-.7q.3-.275.7-.2875t.7.2875L14 18.175V12q0-.425.2875-.7125T15 11q.425 0 .7125.2875T16 12v6.175l1.875-1.875q.275-.275.6875-.275t.7125.275q.3.3.3.7125t-.3.7125L15.7 21.3q-.15.15-.325.2125T15 21.575q-.2 0-.375-.0625Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M9.66875 14.83125Q9.33333 14.49583 9.33333 14V6.79583l-2.1875 2.1875q-.32083.32083-.80208.32083t-.83125-.32083q-.35-.35-.35-.83125t.35-.83125L9.68333 3.15q.175-.175.37917-.24792t.4375-.07292q.23333 0 .4375.07292t.37917.24792l4.2 4.2q.35.35.33542.81666t-.36459.81667q-.35.32083-.81666.33542t-.81667-.33542l-2.1875-2.1875V14q0 .49583-.33542.83125t-.83125.33542q-.49583 0-.83125-.33542Zm7.39375 10.26667q-.20416-.07292-.37916-.24792l-4.2-4.2q-.35-.35-.33542-.81667t.36458-.81666q.35-.32084.81667-.33542t.81666.33542l2.1875 2.1875V14q0-.49583.33542-.83125t.83125-.33542q.49584 0 .83125.33542T18.66667 14v7.20417l2.1875-2.1875q.32083-.32084.80208-.32084t.83125.32084q.35.35.35.83125t-.35.83125L18.31667 24.85q-.175.175-.37917.24792t-.4375.07291q-.23333 0-.4375-.07291Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
