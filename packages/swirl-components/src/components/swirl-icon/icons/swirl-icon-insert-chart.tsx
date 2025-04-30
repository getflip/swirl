// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-insert-chart",
})
export class SwirlIconInsertChart {
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
            <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Zm133.82 228q-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v215q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-215q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62Zm166-131q-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v346q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-346q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62Zm166 258q-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v88q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-88q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62Z" />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Zm133.82 228q-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v215q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-215q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62Zm166-131q-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v346q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-346q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62Zm166 258q-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v88q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-88q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62Z" />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Zm133.82 228q-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v215q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-215q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62Zm166-131q-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v346q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-346q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62Zm166 258q-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v88q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-88q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62Z" />
          </Fragment>
        )}
      </svg>
    );
  }
}
