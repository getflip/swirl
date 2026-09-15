// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-tab-move",
})
export class SwirlIconTabMove {
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
              d="M3.3333 14q-0.55 0-0.9416-0.3917T2 12.6667v-1.3334q0-0.2833 0.1917-0.475T2.6667 10.6667q0.2833 0 0.475 0.1916T3.3333 11.3333v1.3334h9.3334v-8H3.3333v1.3333q0 0.2833-0.1916 0.475T2.6667 6.6667q-0.2833 0-0.475-0.1917T2 6v-2.6667q0-0.55 0.3917-0.9416T3.3333 2h9.3334q0.55 0 0.9416 0.3917T14 3.3333v9.3334q0 0.55-0.3917 0.9416T12.6667 14H3.3333Zm4.7834-4.6667H2.6667q-0.2833 0-0.475-0.1916T2 8.6667q0-0.2833 0.1917-0.475T2.6667 8h5.45l-0.9167-0.9333q-0.1833-0.1833-0.1917-0.4584T7.2 6.1333q0.1833-0.1833 0.4667-0.1833t0.4666 0.1833l2.0667 2.0667q0.2 0.2 0.2 0.4667t-0.2 0.4666L8.1333 11.2q-0.1833 0.1833-0.4583 0.1917T7.2 11.2q-0.1833-0.1833-0.1833-0.4667t0.1833-0.4666l0.9167-0.9334Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M5 21q-0.825 0-1.4125-0.5875T3 19v-2q0-0.425 0.2875-0.7125T4 16q0.425 0 0.7125 0.2875T5 17v2h14v-12H5v2q0 0.425-0.2875 0.7125T4 10q-0.425 0-0.7125-0.2875T3 9v-4q0-0.825 0.5875-1.4125T5 3h14q0.825 0 1.4125 0.5875T21 5v14q0 0.825-0.5875 1.4125T19 21H5Zm7.175-7H4q-0.425 0-0.7125-0.2875T3 13q0-0.425 0.2875-0.7125T4 12h8.175l-1.375-1.4q-0.275-0.275-0.2875-0.6875T10.8 9.2q0.275-0.275 0.7-0.275t0.7 0.275l3.1 3.1q0.3 0.3 0.3 0.7t-0.3 0.7L12.2 16.8q-0.275 0.275-0.6875 0.2875T10.8 16.8q-0.275-0.275-0.275-0.7t0.275-0.7l1.375-1.4Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M5.8333 24.5q-0.9625 0-1.6479-0.6854T3.5 22.1667v-2.3334q0-0.4958 0.3354-0.8312T4.6667 18.6667q0.4958 0 0.8312 0.3354T5.8333 19.8333v2.3334h16.3334v-14H5.8333v2.3333q0 0.4958-0.3354 0.8313T4.6667 11.6667q-0.4958 0-0.8313-0.3354T3.5 10.5v-4.6667q0-0.9625 0.6854-1.6479T5.8333 3.5h16.3334q0.9625 0 1.6479 0.6854T24.5 5.8333v16.3334q0 0.9625-0.6854 1.6479T22.1667 24.5H5.8333Zm8.3709-8.1667H4.6667q-0.4958 0-0.8313-0.3354T3.5 15.1667q0-0.4958 0.3354-0.8313T4.6667 14h9.5375l-1.6042-1.6333q-0.3208-0.3208-0.3354-0.8021T12.6 10.7333q0.3208-0.3208 0.8167-0.3208t0.8166 0.3208l3.6167 3.6167q0.35 0.35 0.35 0.8167t-0.35 0.8166L14.2333 19.6q-0.3208 0.3208-0.802 0.3354T12.6 19.6q-0.3208-0.3208-0.3208-0.8167t0.3208-0.8166l1.6042-1.6334Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
