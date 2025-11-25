// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-checkbox-filled",
})
export class SwirlIconCheckboxFilled {
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
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 2C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4C2 2.89543 2.89543 2 4 2H12ZM10.8333 5.44987C10.6444 5.44987 10.4888 5.51124 10.3665 5.63346L7.06641 8.93359L5.63346 7.5C5.51126 7.37779 5.35553 7.31642 5.16667 7.31641C4.97778 7.31641 4.82209 7.37778 4.69987 7.5C4.57767 7.62222 4.51693 7.77793 4.51693 7.9668C4.51696 8.15562 4.57768 8.3114 4.69987 8.43359L6.60026 10.3333C6.73351 10.4665 6.88878 10.5332 7.06641 10.5332C7.24417 10.5332 7.39988 10.4666 7.5332 10.3333L11.3001 6.56641C11.4221 6.44428 11.483 6.28891 11.4831 6.10026C11.4831 5.91146 11.4222 5.75566 11.3001 5.63346C11.1779 5.51126 11.0222 5.44988 10.8333 5.44987Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18 3C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34315 4.34315 3 6 3H18ZM16.25 8.1748C15.9667 8.1748 15.7331 8.26686 15.5498 8.4502L10.5996 13.4004L8.4502 11.25C8.26688 11.0667 8.03329 10.9746 7.75 10.9746C7.46667 10.9746 7.23314 11.0667 7.0498 11.25C6.86651 11.4333 6.77539 11.6669 6.77539 11.9502C6.77544 12.2334 6.86652 12.4671 7.0498 12.6504L9.90039 15.5C10.1003 15.6998 10.3332 15.7997 10.5996 15.7998C10.8663 15.7998 11.0998 15.7 11.2998 15.5L16.9502 9.84961C17.1332 9.66641 17.2245 9.43337 17.2246 9.15039C17.2246 8.86719 17.1334 8.63349 16.9502 8.4502C16.7669 8.26688 16.5333 8.17483 16.25 8.1748Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21 3.5C22.933 3.5 24.5 5.067 24.5 7V21C24.5 22.933 22.933 24.5 21 24.5H7C5.067 24.5 3.5 22.933 3.5 21V7C3.5 5.067 5.067 3.5 7 3.5H21ZM18.9583 9.53727C18.6278 9.53727 18.3553 9.64467 18.1414 9.85856L12.3662 15.6338L9.85856 13.125C9.6447 12.9111 9.37217 12.8037 9.04167 12.8037C8.71111 12.8037 8.43866 12.9111 8.22477 13.125C8.01093 13.3389 7.90462 13.6114 7.90462 13.9419C7.90467 14.2723 8.01094 14.545 8.22477 14.7588L11.5505 18.0833C11.7836 18.3164 12.0554 18.433 12.3662 18.4331C12.6773 18.4331 12.9498 18.3166 13.1831 18.0833L19.7752 11.4912C19.9888 11.2775 20.0953 11.0056 20.0954 10.6755C20.0954 10.3451 19.9889 10.0724 19.7752 9.85856C19.5614 9.6447 19.2888 9.5373 18.9583 9.53727Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
