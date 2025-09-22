// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-account-circle",
})
export class SwirlSymbolAccountCircle {
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
            d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 5C12.5933 5 13.1734 5.17595 13.6667 5.50559C14.1601 5.83524 14.5446 6.30377 14.7716 6.85195C14.9987 7.40013 15.0581 8.00333 14.9424 8.58527C14.8266 9.16721 14.5409 9.70176 14.1213 10.1213C13.7018 10.5409 13.1672 10.8266 12.5853 10.9424C12.0033 11.0581 11.4001 10.9987 10.852 10.7716C10.3038 10.5446 9.83524 10.1601 9.5056 9.66671C9.17595 9.17336 9 8.59334 9 8C9 7.20435 9.31607 6.44129 9.87868 5.87868C10.4413 5.31607 11.2044 5 12 5ZM12 19.2C10.8119 19.2 9.64219 18.906 8.59528 18.3441C7.54838 17.7823 6.65678 16.9701 6 15.98C6.03 13.99 10 12.9 12 12.9C14 12.9 17.97 13.99 18 15.98C17.3432 16.9701 16.4516 17.7823 15.4047 18.3441C14.3578 18.906 13.1881 19.2 12 19.2Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
