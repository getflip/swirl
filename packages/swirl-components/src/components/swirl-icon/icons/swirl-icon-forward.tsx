// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-forward",
})
export class SwirlIconForward {
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
              d="M9.88562 9.66993V12.1154L14 8.00284L9.88562 3.88659V6.33662H8.55225C5.47436 6.33662 2.93779 8.65416 2.59236 11.6395C4.2563 10.4028 6.3195 9.66993 8.55225 9.66993H9.88562ZM7.21893 11.1052C5.35408 11.3932 3.68545 12.2756 2.41288 13.5529C2.02762 13.9395 1.34619 13.8098 1.27756 13.2683C1.23888 12.9632 1.21893 12.6522 1.21893 12.3366C1.21893 8.2865 4.50219 5.00327 8.55225 5.00327V3.08159C8.55225 2.19058 9.62962 1.74446 10.2596 2.37465L14.943 7.06027C15.4636 7.58107 15.4634 8.4253 14.9426 8.94587L10.2592 13.6271C9.62916 14.2568 8.55225 13.8106 8.55225 12.9198V11.0032H8.54996C8.09733 11.0034 7.65282 11.0382 7.21893 11.1052Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M14.8284 14.5049V18.173L21 12.0043L14.8284 5.82989V9.50492H12.8283C8.21151 9.50492 4.40665 12.9812 3.88851 17.4592C6.38443 15.6043 9.47923 14.5049 12.8283 14.5049H14.8284ZM10.8284 16.6578C8.03108 17.0898 5.52814 18.4135 3.61928 20.3294C3.0414 20.9093 2.01925 20.7146 1.91631 19.9025C1.85828 19.4448 1.82837 18.9783 1.82837 18.5049C1.82837 12.4298 6.75325 7.50491 12.8283 7.50491V4.62239C12.8283 3.28587 14.4444 2.61669 15.3893 3.56198L22.4145 10.5904C23.1954 11.3716 23.1951 12.638 22.4138 13.4188L15.3888 20.4406C14.4437 21.3853 12.8283 20.7159 12.8283 19.3797V16.5049H12.8249C12.146 16.5051 11.4792 16.5573 10.8284 16.6578Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M17.2998 16.9225V21.202L24.5 14.0051L17.2998 6.80166V11.0892H14.9664C9.58012 11.0892 5.14112 15.1449 4.53662 20.3692C7.44852 18.2051 11.0591 16.9225 14.9664 16.9225H17.2998ZM12.6331 19.4342C9.36962 19.9382 6.44952 21.4825 4.22252 23.7177C3.54832 24.3943 2.35582 24.1672 2.23572 23.2197C2.16802 22.6857 2.13312 22.1415 2.13312 21.5892C2.13312 14.5015 7.87882 8.75585 14.9664 8.75585V5.39291C14.9664 3.83364 16.8518 3.05293 17.9542 4.15576L26.1503 12.3556C27.0613 13.267 27.0609 14.7444 26.1495 15.6554L17.9536 23.8475C16.851 24.9496 14.9664 24.1687 14.9664 22.6098V19.2558H14.9624C14.1703 19.2561 13.3924 19.317 12.6331 19.4342Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
