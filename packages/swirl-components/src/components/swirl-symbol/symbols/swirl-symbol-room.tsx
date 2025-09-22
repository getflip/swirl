// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-room",
})
export class SwirlSymbolRoom {
  @Prop() size: SwirlSymbolSize = 24;

  render() {
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
        viewBox="0 0 24 24"
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Fragment>
          <path
            d="M12 2C10.9306 1.99344 9.87089 2.20257 8.88416 2.61488C7.89743 3.02719 7.00397 3.63422 6.25718 4.39968C5.51039 5.16514 4.9256 6.07332 4.53777 7.06992C4.14995 8.06653 3.96705 9.1311 4 10.2C4 13.38 6.44667 17.1233 11.34 21.43C11.5248 21.5897 11.7608 21.6775 12.005 21.6775C12.2492 21.6775 12.4852 21.5897 12.67 21.43C17.55 17.12 19.9933 13.3767 20 10.2C20.033 9.1311 19.8501 8.06653 19.4622 7.06992C19.0744 6.07332 18.4896 5.16514 17.7428 4.39968C16.996 3.63422 16.1026 3.02719 15.1158 2.61488C14.1291 2.20257 13.0694 1.99344 12 2ZM12 12C11.6044 12 11.2178 11.8827 10.8889 11.6629C10.56 11.4432 10.3036 11.1308 10.1522 10.7654C10.0009 10.3999 9.96126 9.99778 10.0384 9.60982C10.1156 9.22185 10.3061 8.86549 10.5858 8.58578C10.8655 8.30608 11.2219 8.1156 11.6098 8.03843C11.9978 7.96126 12.3999 8.00086 12.7654 8.15224C13.1308 8.30361 13.4432 8.55996 13.6629 8.88886C13.8827 9.21776 14 9.60443 14 10C13.9984 10.5299 13.7872 11.0377 13.4125 11.4125C13.0377 11.7872 12.5299 11.9984 12 12Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
