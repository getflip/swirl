// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from 'classnames';

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-zoom-in",
})
export class SwirlIconZoomIn {
  @Prop() color?: SwirlIconColor;
  @Prop() label?: string;
  @Prop() size: SwirlIconSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

    const styles = {
      color: Boolean(this.color)
        ? `var(--s-icon-${this.color})`
        : undefined,
    };

    const className = classnames('swirl-icon', `swirl-icon--size-${this.size}`);

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
        {this.size === 16 && <Fragment><path d="M5.66667 7H5q-.28333 0-.475-.19167t-.19167-.475q0-.28333.19167-.475T5 5.66666h.66667V5q0-.28334.19166-.475t.475-.19167q.28334 0 .475.19167T7 5v.66666h.66667q.28333 0 .475.19167t.19167.475q0 .28333-.19167.475T7.66667 7H7v.66666q0 .28334-.19167.475t-.475.19167q-.28333 0-.475-.19166t-.19166-.475V7Zm.66666 3.66667q-1.81666 0-3.075-1.25834T2 6.33333q0-1.81667 1.25833-3.075T6.33333 2Q8.15 2 9.40833 3.25833t1.25834 3.075q0 .73333-.23333 1.38334T9.8 8.86667L13.53334 12.6q.18333.18333.18333.46667t-.18333.46666q-.18334.18334-.46667.18334T12.6 13.53333L8.86667 9.8q-.5.4-1.15.63333t-1.38334.23334Zm0-1.33334q1.25 0 2.125-.875t.875-2.125q0-1.25-.875-2.125t-2.125-.875q-1.25 0-2.125.875t-.875 2.125q0 1.25.875 2.125t2.125.875Z" fill="currentColor"/></Fragment>}
        {(this.size === 20 || this.size === 24) && <Fragment><path d="M8.5 10.5h-1q-.425 0-.7125-.2875T6.5 9.5q0-.425.2875-.7125T7.5 8.5h1v-1q0-.425.2875-.7125T9.5 6.5q.425 0 .7125.2875T10.5 7.5v1h1q.425 0 .7125.2875T12.5 9.5q0 .425-.2875.7125T11.5 10.5h-1v1q0 .425-.2875.7125T9.5 12.5q-.425 0-.7125-.2875T8.5 11.5v-1Zm1 5.5q-2.725 0-4.6125-1.8875T3 9.5q0-2.725 1.8875-4.6125T9.5 3q2.725 0 4.6125 1.8875T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16Zm0-2q1.875 0 3.1875-1.3125T14 9.5q0-1.875-1.3125-3.1875T9.5 5Q7.625 5 6.3125 6.3125T5 9.5q0 1.875 1.3125 3.1875T9.5 14Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M9.91667 12.25H8.75q-.49583 0-.83125-.33542t-.33542-.83125q0-.49583.33542-.83125T8.75 9.91666h1.16667V8.75q0-.49584.33541-.83125t.83125-.33542q.49584 0 .83125.33542T12.25 8.75v1.16666h1.16667q.49583 0 .83125.33542t.33541.83125q0 .49583-.33541.83125t-.83125.33542H12.25v1.16667q0 .49583-.33542.83125t-.83125.33541q-.49583 0-.83125-.33541t-.33541-.83126V12.25Zm1.16666 6.41667q-3.17916 0-5.38125-2.20209T3.5 11.08333q0-3.17917 2.20208-5.38125T11.08333 3.5q3.17917 0 5.38126 2.20208t2.20208 5.38125q0 1.28333-.40833 2.42084T17.15 15.51667L23.68334 22.05q.32083.32083.32083.81667t-.32083.81666q-.32084.32084-.81667.32084t-.81667-.32084L15.51667 17.15q-.875.7-2.0125 1.10833t-2.42084.40834Zm0-2.33334q2.1875 0 3.71876-1.53125t1.53125-3.71875q0-2.1875-1.53125-3.71875t-3.71876-1.53125q-2.1875 0-3.71875 1.53125t-1.53125 3.71875q0 2.1875 1.53125 3.71875t3.71875 1.53125Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
