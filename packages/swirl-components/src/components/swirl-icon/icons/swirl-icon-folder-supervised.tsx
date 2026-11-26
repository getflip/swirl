// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-folder-supervised",
})
export class SwirlIconFolderSupervised {
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
              d="M2.6667 12v-8 2.8667-0.2 5.3333Zm0 1.3333q-0.55 0-0.9417-0.3917T1.3333 12v-8q0-0.55 0.3917-0.9417T2.6667 2.6667h4l1.3333 1.3333h5.3333q0.55 0 0.9417 0.3917T14.6667 5.3333v2.1833q-0.3-0.2167-0.6333-0.375T13.3333 6.8667v-1.5333H7.45l-1.3333-1.3333H2.6667v8h4.7167q0.05 0.35 0.1583 0.6833t0.2583 0.65H2.6667Zm6.6667 0v-0.3667q0-0.75 0.7333-1.1917T12 11.3333q1.2 0 1.9333 0.4417t0.7333 1.1917v0.3667H9.3333Zm1.725-3.0583Q10.6667 9.8833 10.6667 9.3333t0.3917-0.9417Q11.45 8 12 8t0.9417 0.3917Q13.3333 8.7833 13.3333 9.3333t-0.3917 0.9417Q12.55 10.6667 12 10.6667t-0.9417-0.3917Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M4 18v-12 4.3-0.3 8Zm0 2q-0.825 0-1.4125-0.5875T2 18v-12q0-0.825 0.5875-1.4125T4 4h6l2 2h8q0.825 0 1.4125 0.5875T22 8v3.275q-0.45-0.325-0.95-0.5625T20 10.3v-2.3H11.175l-2-2H4v12h7.075q0.075 0.525 0.2375 1.025t0.3875 0.975H4Zm10 0v-0.55q0-1.125 1.1-1.7875T18 17q1.8 0 2.9 0.6625t1.1 1.7875v0.55H14Zm2.5875-4.5875Q16 14.825 16 14t0.5875-1.4125Q17.175 12 18 12t1.4125 0.5875Q20 13.175 20 14t-0.5875 1.4125Q18.825 16 18 16t-1.4125-0.5875Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M4.6667 21v-14 5.0167-0.35 9.3333Zm0 2.3333q-0.9625 0-1.6479-0.6854T2.3333 21v-14q0-0.9625 0.6854-1.6479T4.6667 4.6667h7l2.3333 2.3333h9.3333q0.9625 0 1.6479 0.6854T25.6667 9.3333v3.8208q-0.525-0.3792-1.1083-0.6562T23.3333 12.0167v-2.6833H13.0375l-2.3333-2.3333H4.6667v14h8.2542q0.0875 0.6125 0.2771 1.1958t0.4521 1.1375H4.6667Zm11.6667 0v-0.6417q0-1.3125 1.2833-2.0854T21 19.8333q2.1 0 3.3833 0.7729t1.2833 2.0854v0.6417H16.3333Zm3.0188-5.3521Q18.6667 17.2958 18.6667 16.3333t0.6854-1.6479Q20.0375 14 21 14t1.6479 0.6854Q23.3333 15.3708 23.3333 16.3333t-0.6854 1.6479Q21.9625 18.6667 21 18.6667t-1.6479-0.6854Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
