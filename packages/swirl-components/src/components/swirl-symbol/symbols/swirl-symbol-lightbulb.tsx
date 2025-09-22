// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-lightbulb",
})
export class SwirlSymbolLightbulb {
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
            d="M12 22C12.53 21.9984 13.0377 21.7872 13.4125 21.4125C13.7872 21.0377 13.9984 20.5299 14 20H10C10.0016 20.5299 10.2128 21.0377 10.5875 21.4125C10.9623 21.7872 11.4701 21.9984 12 22Z"
            fill="currentColor"
          />
          <path
            d="M9 19H15C15.2652 19 15.5196 18.8946 15.7071 18.7071C15.8946 18.5196 16 18.2652 16 18C16 17.7348 15.8946 17.4804 15.7071 17.2929C15.5196 17.1054 15.2652 17 15 17H9C8.73479 17 8.48043 17.1054 8.2929 17.2929C8.10536 17.4804 8 17.7348 8 18C8 18.2652 8.10536 18.5196 8.2929 18.7071C8.48043 18.8946 8.73479 19 9 19Z"
            fill="currentColor"
          />
          <path
            d="M12 2C10.3492 2.00256 8.7453 2.54972 7.4371 3.55663C6.1289 4.56354 5.18946 5.97394 4.76445 7.56913C4.33945 9.16432 4.45263 10.8552 5.08644 12.3795C5.72025 13.9038 6.83928 15.1764 8.27 16H15.73C17.1607 15.1764 18.2798 13.9038 18.9136 12.3795C19.5474 10.8552 19.6606 9.16432 19.2356 7.56913C18.8105 5.97394 17.8711 4.56354 16.5629 3.55663C15.2547 2.54972 13.6508 2.00256 12 2Z"
            fill="currentColor"
          />
        </Fragment>
      </svg>
    );
  }
}
