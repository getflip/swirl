// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-notifications",
})
export class SwirlSymbolNotifications {
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
            d="M12 22C12.5299 21.9984 13.0377 21.7872 13.4125 21.4125C13.7872 21.0377 13.9984 20.5299 14 20H10C10 20.5304 10.2107 21.0391 10.5858 21.4142C10.9609 21.7893 11.4696 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.60218 13.342 3.22064 13.0607 2.93934C12.7794 2.65804 12.3978 2.5 12 2.5C11.6022 2.5 11.2206 2.65804 10.9393 2.93934C10.658 3.22064 10.5 3.60218 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4.71 17.29C4.56958 17.4293 4.47361 17.6071 4.43422 17.8009C4.39484 17.9947 4.41381 18.1958 4.48873 18.3789C4.56366 18.5619 4.69117 18.7186 4.85516 18.8292C5.01914 18.9397 5.21223 18.9992 5.41 19H18.58C18.7786 19.0012 18.9731 18.9431 19.1386 18.8333C19.3041 18.7235 19.4332 18.5669 19.5094 18.3835C19.5855 18.2 19.6054 17.9981 19.5663 17.8033C19.5272 17.6086 19.431 17.4299 19.29 17.29L18 16Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
