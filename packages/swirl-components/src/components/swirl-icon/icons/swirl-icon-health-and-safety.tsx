// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-health-and-safety",
})
export class SwirlIconHealthAndSafety {
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
            <path d="M440-460v77q0 9 7 16t16 7h35q9.35 0 15.67-7 6.33-7 6.33-16v-77h78q9.35 0 15.67-7 6.33-7 6.33-16v-35q0-9.35-6.33-15.67Q607.35-540 598-540h-78v-78q0-9.35-6.33-15.67Q507.35-640 498-640h-35q-9 0-16 6.33-7 6.32-7 15.67v78h-77q-9 0-16 6.33-7 6.32-7 15.67v35q0 9 7 16t16 7h77Zm40 376q-5.32 0-9.88-1-4.56-1-9.12-3-139-47-220-168.5t-81-266.61V-719q0-19.26 10.88-34.66Q181.75-769.07 199-776l260-97q11-4 21-4t21 4l260 97q17.25 6.93 28.13 22.34Q800-738.26 800-719v195.89Q800-378 719-256.5T499-88q-4.56 2-9.12 3T480-84Zm0-59q115-38 187.5-143.5T740-523v-196l-260-98-260 98v196q0 131 72.5 236.5T480-143Zm0-337Z" />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path d="M440-460v77q0 9 7 16t16 7h35q9.35 0 15.67-7 6.33-7 6.33-16v-77h78q9.35 0 15.67-7 6.33-7 6.33-16v-35q0-9.35-6.33-15.67Q607.35-540 598-540h-78v-78q0-9.35-6.33-15.67Q507.35-640 498-640h-35q-9 0-16 6.33-7 6.32-7 15.67v78h-77q-9 0-16 6.33-7 6.32-7 15.67v35q0 9 7 16t16 7h77Zm40 376q-5.32 0-9.88-1-4.56-1-9.12-3-139-47-220-168.5t-81-266.61V-719q0-19.26 10.88-34.66Q181.75-769.07 199-776l260-97q11-4 21-4t21 4l260 97q17.25 6.93 28.13 22.34Q800-738.26 800-719v195.89Q800-378 719-256.5T499-88q-4.56 2-9.12 3T480-84Zm0-59q115-38 187.5-143.5T740-523v-196l-260-98-260 98v196q0 131 72.5 236.5T480-143Zm0-337Z" />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path d="M440-460v77q0 9 7 16t16 7h35q9.35 0 15.67-7 6.33-7 6.33-16v-77h78q9.35 0 15.67-7 6.33-7 6.33-16v-35q0-9.35-6.33-15.67Q607.35-540 598-540h-78v-78q0-9.35-6.33-15.67Q507.35-640 498-640h-35q-9 0-16 6.33-7 6.32-7 15.67v78h-77q-9 0-16 6.33-7 6.32-7 15.67v35q0 9 7 16t16 7h77Zm40 376q-5.32 0-9.88-1-4.56-1-9.12-3-139-47-220-168.5t-81-266.61V-719q0-19.26 10.88-34.66Q181.75-769.07 199-776l260-97q11-4 21-4t21 4l260 97q17.25 6.93 28.13 22.34Q800-738.26 800-719v195.89Q800-378 719-256.5T499-88q-4.56 2-9.12 3T480-84Zm0-59q115-38 187.5-143.5T740-523v-196l-260-98-260 98v196q0 131 72.5 236.5T480-143Zm0-337Z" />
          </Fragment>
        )}
      </svg>
    );
  }
}
