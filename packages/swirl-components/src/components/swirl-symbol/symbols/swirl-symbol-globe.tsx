// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-globe",
})
export class SwirlSymbolGlobe {
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
            d="M12 2C10.0222 2 8.08879 2.58649 6.44429 3.6853C4.7998 4.78412 3.51808 6.3459 2.7612 8.17317C2.00433 10.0004 1.80629 12.0111 2.19214 13.9509C2.578 15.8907 3.5304 17.6725 4.92893 19.0711C6.32745 20.4696 8.10928 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9996 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM11 19.93C9.06694 19.6891 7.28855 18.75 5.99939 17.2896C4.71024 15.8292 3.99918 13.948 4 12C4.00334 11.3974 4.07378 10.797 4.21 10.21L9 15V16C9.00158 16.5299 9.2128 17.0377 9.58753 17.4125C9.96226 17.7872 10.4701 17.9984 11 18V19.93ZM17.9 17.39C17.7732 16.9858 17.5203 16.6329 17.1784 16.3827C16.8366 16.1326 16.4236 15.9985 16 16H15V13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12H8V10H10C10.2652 10 10.5196 9.89464 10.7071 9.70711C10.8946 9.51957 11 9.26522 11 9V7H13C13.5299 6.99842 14.0377 6.7872 14.4125 6.41247C14.7872 6.03773 14.9984 5.52995 15 5V4.59C16.1968 5.07199 17.2589 5.83692 18.0954 6.81926C18.9319 7.80159 19.5177 8.97205 19.8028 10.2304C20.0879 11.4887 20.0637 12.7974 19.7323 14.0443C19.4009 15.2912 18.7722 16.4392 17.9 17.39Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
