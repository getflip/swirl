// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-backup",
})
export class SwirlSymbolBackup {
  @Prop() size: SwirlSymbolSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

    const className = classnames(
      "swirl-symbol",
      `swirl-symbol--size-${this.size}`
    );

    return (
      <svg
        class={className}
        fill="none"
        height={this.size}
        part="symbol"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Fragment>
          <path
            d="M19 11C19.001 9.30604 18.3871 7.66929 17.2725 6.39373C16.1578 5.11818 14.6181 4.29053 12.9393 4.06449C11.2605 3.83845 9.55667 4.22938 8.14432 5.16469C6.73198 6.1 5.70709 7.5161 5.26 9.15C3.95216 9.46173 2.80381 10.2417 2.03194 11.3426C1.26008 12.4434 0.91817 13.7888 1.07083 15.1246C1.22349 16.4604 1.86015 17.694 2.86048 18.5923C3.86082 19.4906 5.15555 19.9914 6.5 20H18.5C19.6508 19.9951 20.7562 19.551 21.5905 18.7584C22.4248 17.9657 22.925 16.8845 22.9888 15.7355C23.0526 14.5865 22.6753 13.4565 21.934 12.5763C21.1926 11.6962 20.1431 11.1323 19 11ZM13 13V15C13 15.2652 12.8946 15.5196 12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16C11.7348 16 11.4804 15.8946 11.2929 15.7071C11.1054 15.5196 11 15.2652 11 15V13H9.21C9.11214 12.9986 9.01683 12.9686 8.93589 12.9135C8.85495 12.8585 8.79195 12.7809 8.75468 12.6904C8.71742 12.5999 8.70753 12.5005 8.72625 12.4044C8.74498 12.3083 8.79148 12.2199 8.86 12.15L11.65 9.36C11.6965 9.31313 11.7518 9.27594 11.8127 9.25055C11.8736 9.22517 11.939 9.2121 12.005 9.2121C12.071 9.2121 12.1364 9.22517 12.1973 9.25055C12.2582 9.27594 12.3135 9.31313 12.36 9.36L15.15 12.15C15.2185 12.2199 15.265 12.3083 15.2837 12.4044C15.3025 12.5005 15.2926 12.5999 15.2553 12.6904C15.2181 12.7809 15.155 12.8585 15.0741 12.9135C14.9932 12.9686 14.8979 12.9986 14.8 13H13Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
