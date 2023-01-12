// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-phone",
})
export class SwirlIconPhone {
  @Prop() size: SwirlIconSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

    const className = classnames("swirl-icon", `swirl-icon--size-${this.size}`);

    return (
      <svg
        class={className}
        fill="none"
        height={this.size}
        part="icon"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.size === 16 && (
          <Fragment>
            <path
              d="M12.8145 10.1788L11.1212 9.98545C10.7145 9.93878 10.3145 10.0788 10.0279 10.3654L8.8012 11.5921C6.91453 10.6321 5.36787 9.09211 4.40787 7.19878L5.6412 5.96545C5.92787 5.67878 6.06787 5.27878 6.0212 4.87212L5.82787 3.19212C5.74787 2.51878 5.1812 2.01212 4.5012 2.01212H3.34787C2.59453 2.01212 1.96787 2.63878 2.01453 3.39212C2.36787 9.08545 6.9212 13.6321 12.6079 13.9854C13.3612 14.0321 13.9879 13.4054 13.9879 12.6521V11.4988C13.9945 10.8254 13.4879 10.2588 12.8145 10.1788Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M19.2218 15.2682L16.6818 14.9782C16.0718 14.9082 15.4718 15.1182 15.0418 15.5482L13.2018 17.3882C10.3718 15.9482 8.0518 13.6382 6.6118 10.7982L8.4618 8.94816C8.8918 8.51816 9.1018 7.91816 9.0318 7.30816L8.7418 4.78816C8.6218 3.77816 7.7718 3.01816 6.7518 3.01816H5.0218C3.8918 3.01816 2.9518 3.95816 3.0218 5.08816C3.5518 13.6282 10.3818 20.4482 18.9118 20.9782C20.0418 21.0482 20.9818 20.1082 20.9818 18.9782V17.2482C20.9918 16.2382 20.2318 15.3882 19.2218 15.2682Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M22.4254 17.8129L19.4621 17.4745C18.7504 17.3929 18.0504 17.6379 17.5488 18.1395L15.4021 20.2862C12.1004 18.6062 9.39377 15.9112 7.71377 12.5979L9.8721 10.4395C10.3738 9.93786 10.6188 9.23786 10.5371 8.52619L10.1988 5.58619C10.0588 4.40786 9.0671 3.52119 7.8771 3.52119H5.85877C4.54043 3.52119 3.44377 4.61786 3.52543 5.93619C4.14377 15.8995 12.1121 23.8562 22.0638 24.4745C23.3821 24.5562 24.4788 23.4595 24.4788 22.1412V20.1229C24.4904 18.9445 23.6038 17.9529 22.4254 17.8129Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
