// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-add-reaction",
})
export class SwirlIconAddReaction {
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
            <g clip-path="url(#clip0_336_89)">
              <path
                d="M8.00004 14.6665C7.07782 14.6665 6.21115 14.4915 5.40004 14.1415C4.58893 13.7915 3.88337 13.3165 3.28337 12.7165C2.68337 12.1165 2.20837 11.4109 1.85837 10.5998C1.50837 9.78873 1.33337 8.92206 1.33337 7.99984C1.33337 7.07762 1.50837 6.21095 1.85837 5.39984C2.20837 4.58873 2.68337 3.88317 3.28337 3.28317C3.88337 2.68317 4.58893 2.20817 5.40004 1.85817C6.21115 1.50817 7.07782 1.33317 8.00004 1.33317C8.47782 1.33317 8.93893 1.38039 9.38337 1.47484C9.82782 1.56928 10.2556 1.70539 10.6667 1.88317V3.38317C10.2778 3.16095 9.85837 2.98595 9.40837 2.85817C8.95837 2.73039 8.48893 2.6665 8.00004 2.6665C6.52226 2.6665 5.26393 3.18595 4.22504 4.22484C3.18615 5.26373 2.66671 6.52206 2.66671 7.99984C2.66671 9.47762 3.18615 10.7359 4.22504 11.7748C5.26393 12.8137 6.52226 13.3332 8.00004 13.3332C9.47782 13.3332 10.7362 12.8137 11.775 11.7748C12.8139 10.7359 13.3334 9.47762 13.3334 7.99984C13.3334 7.64428 13.2973 7.29984 13.225 6.9665C13.1528 6.63317 13.0556 6.31095 12.9334 5.99984H14.3667C14.4667 6.32206 14.5417 6.64706 14.5917 6.97484C14.6417 7.30262 14.6667 7.64428 14.6667 7.99984C14.6667 8.92206 14.4917 9.78873 14.1417 10.5998C13.7917 11.4109 13.3167 12.1165 12.7167 12.7165C12.1167 13.3165 11.4112 13.7915 10.6 14.1415C9.78893 14.4915 8.92226 14.6665 8.00004 14.6665ZM13.3334 3.33317H12.6667C12.4778 3.33317 12.3195 3.26928 12.1917 3.1415C12.0639 3.01373 12 2.85539 12 2.6665C12 2.47762 12.0639 2.31928 12.1917 2.1915C12.3195 2.06373 12.4778 1.99984 12.6667 1.99984H13.3334V1.33317C13.3334 1.14428 13.3973 0.985948 13.525 0.858171C13.6528 0.730393 13.8112 0.666504 14 0.666504C14.1889 0.666504 14.3473 0.730393 14.475 0.858171C14.6028 0.985948 14.6667 1.14428 14.6667 1.33317V1.99984H15.3334C15.5223 1.99984 15.6806 2.06373 15.8084 2.1915C15.9362 2.31928 16 2.47762 16 2.6665C16 2.85539 15.9362 3.01373 15.8084 3.1415C15.6806 3.26928 15.5223 3.33317 15.3334 3.33317H14.6667V3.99984C14.6667 4.18873 14.6028 4.34706 14.475 4.47484C14.3473 4.60262 14.1889 4.6665 14 4.6665C13.8112 4.6665 13.6528 4.60262 13.525 4.47484C13.3973 4.34706 13.3334 4.18873 13.3334 3.99984V3.33317ZM10.3334 7.33317C10.6112 7.33317 10.8473 7.23595 11.0417 7.0415C11.2362 6.84706 11.3334 6.61095 11.3334 6.33317C11.3334 6.05539 11.2362 5.81928 11.0417 5.62484C10.8473 5.43039 10.6112 5.33317 10.3334 5.33317C10.0556 5.33317 9.81949 5.43039 9.62504 5.62484C9.4306 5.81928 9.33337 6.05539 9.33337 6.33317C9.33337 6.61095 9.4306 6.84706 9.62504 7.0415C9.81949 7.23595 10.0556 7.33317 10.3334 7.33317ZM5.66671 7.33317C5.94449 7.33317 6.1806 7.23595 6.37504 7.0415C6.56949 6.84706 6.66671 6.61095 6.66671 6.33317C6.66671 6.05539 6.56949 5.81928 6.37504 5.62484C6.1806 5.43039 5.94449 5.33317 5.66671 5.33317C5.38893 5.33317 5.15282 5.43039 4.95837 5.62484C4.76393 5.81928 4.66671 6.05539 4.66671 6.33317C4.66671 6.61095 4.76393 6.84706 4.95837 7.0415C5.15282 7.23595 5.38893 7.33317 5.66671 7.33317ZM8.00004 11.6665C8.64449 11.6665 9.23893 11.5109 9.78337 11.1998C10.3278 10.8887 10.7667 10.4665 11.1 9.93317C11.1667 9.79984 11.1612 9.6665 11.0834 9.53317C11.0056 9.39984 10.8889 9.33317 10.7334 9.33317H5.26671C5.11115 9.33317 4.99449 9.39984 4.91671 9.53317C4.83893 9.6665 4.83337 9.79984 4.90004 9.93317C5.23337 10.4665 5.67504 10.8887 6.22504 11.1998C6.77504 11.5109 7.36671 11.6665 8.00004 11.6665Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_336_89">
                <rect width="16" height="16" fill="currentColor" />
              </clipPath>
            </defs>
          </Fragment>
        )}
        {(this.size === 20 || this.size === 24) && (
          <Fragment>
            <path
              d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C12.7167 2 13.4083 2.07083 14.075 2.2125C14.7417 2.35417 15.3833 2.55833 16 2.825V5.075C15.4167 4.74167 14.7875 4.47917 14.1125 4.2875C13.4375 4.09583 12.7333 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.4667 19.9458 10.95 19.8375 10.45C19.7292 9.95 19.5833 9.46667 19.4 9H21.55C21.7 9.48333 21.8125 9.97083 21.8875 10.4625C21.9625 10.9542 22 11.4667 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM20 5H19C18.7167 5 18.4792 4.90417 18.2875 4.7125C18.0958 4.52083 18 4.28333 18 4C18 3.71667 18.0958 3.47917 18.2875 3.2875C18.4792 3.09583 18.7167 3 19 3H20V2C20 1.71667 20.0958 1.47917 20.2875 1.2875C20.4792 1.09583 20.7167 1 21 1C21.2833 1 21.5208 1.09583 21.7125 1.2875C21.9042 1.47917 22 1.71667 22 2V3H23C23.2833 3 23.5208 3.09583 23.7125 3.2875C23.9042 3.47917 24 3.71667 24 4C24 4.28333 23.9042 4.52083 23.7125 4.7125C23.5208 4.90417 23.2833 5 23 5H22V6C22 6.28333 21.9042 6.52083 21.7125 6.7125C21.5208 6.90417 21.2833 7 21 7C20.7167 7 20.4792 6.90417 20.2875 6.7125C20.0958 6.52083 20 6.28333 20 6V5ZM15.5 11C15.9167 11 16.2708 10.8542 16.5625 10.5625C16.8542 10.2708 17 9.91667 17 9.5C17 9.08333 16.8542 8.72917 16.5625 8.4375C16.2708 8.14583 15.9167 8 15.5 8C15.0833 8 14.7292 8.14583 14.4375 8.4375C14.1458 8.72917 14 9.08333 14 9.5C14 9.91667 14.1458 10.2708 14.4375 10.5625C14.7292 10.8542 15.0833 11 15.5 11ZM8.5 11C8.91667 11 9.27083 10.8542 9.5625 10.5625C9.85417 10.2708 10 9.91667 10 9.5C10 9.08333 9.85417 8.72917 9.5625 8.4375C9.27083 8.14583 8.91667 8 8.5 8C8.08333 8 7.72917 8.14583 7.4375 8.4375C7.14583 8.72917 7 9.08333 7 9.5C7 9.91667 7.14583 10.2708 7.4375 10.5625C7.72917 10.8542 8.08333 11 8.5 11ZM12 17.5C12.9667 17.5 13.8583 17.2667 14.675 16.8C15.4917 16.3333 16.15 15.7 16.65 14.9C16.75 14.7 16.7417 14.5 16.625 14.3C16.5083 14.1 16.3333 14 16.1 14H7.9C7.66667 14 7.49167 14.1 7.375 14.3C7.25833 14.5 7.25 14.7 7.35 14.9C7.85 15.7 8.5125 16.3333 9.3375 16.8C10.1625 17.2667 11.05 17.5 12 17.5Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              d="M14 25.6665C12.3862 25.6665 10.8695 25.3603 9.45004 24.7478C8.0306 24.1353 6.79587 23.304 5.74587 22.254C4.69587 21.204 3.86462 19.9693 3.25212 18.5498C2.63962 17.1304 2.33337 15.6137 2.33337 13.9998C2.33337 12.3859 2.63962 10.8693 3.25212 9.44984C3.86462 8.03039 4.69587 6.79567 5.74587 5.74567C6.79587 4.69567 8.0306 3.86442 9.45004 3.25192C10.8695 2.63942 12.3862 2.33317 14 2.33317C14.8362 2.33317 15.6431 2.41581 16.4209 2.58109C17.1987 2.74636 17.9473 2.98456 18.6667 3.29567V5.92067C17.9862 5.53178 17.2521 5.22553 16.4646 5.00192C15.6771 4.77831 14.8556 4.6665 14 4.6665C11.4139 4.6665 9.21185 5.57553 7.39379 7.39359C5.57574 9.21164 4.66671 11.4137 4.66671 13.9998C4.66671 16.5859 5.57574 18.788 7.39379 20.6061C9.21185 22.4241 11.4139 23.3332 14 23.3332C16.5862 23.3332 18.7882 22.4241 20.6063 20.6061C22.4243 18.788 23.3334 16.5859 23.3334 13.9998C23.3334 13.3776 23.2702 12.7748 23.1438 12.1915C23.0174 11.6082 22.8473 11.0443 22.6334 10.4998H25.1417C25.3167 11.0637 25.448 11.6325 25.5355 12.2061C25.623 12.7797 25.6667 13.3776 25.6667 13.9998C25.6667 15.6137 25.3605 17.1304 24.748 18.5498C24.1355 19.9693 23.3042 21.204 22.2542 22.254C21.2042 23.304 19.9695 24.1353 18.55 24.7478C17.1306 25.3603 15.6139 25.6665 14 25.6665ZM23.3334 5.83317H22.1667C21.8362 5.83317 21.5591 5.72136 21.3355 5.49775C21.1118 5.27414 21 4.99706 21 4.6665C21 4.33595 21.1118 4.05887 21.3355 3.83525C21.5591 3.61164 21.8362 3.49984 22.1667 3.49984H23.3334V2.33317C23.3334 2.00261 23.4452 1.72553 23.6688 1.50192C23.8924 1.27831 24.1695 1.1665 24.5 1.1665C24.8306 1.1665 25.1077 1.27831 25.3313 1.50192C25.5549 1.72553 25.6667 2.00261 25.6667 2.33317V3.49984H26.8334C27.1639 3.49984 27.441 3.61164 27.6646 3.83525C27.8882 4.05887 28 4.33595 28 4.6665C28 4.99706 27.8882 5.27414 27.6646 5.49775C27.441 5.72136 27.1639 5.83317 26.8334 5.83317H25.6667V6.99984C25.6667 7.33039 25.5549 7.60748 25.3313 7.83109C25.1077 8.0547 24.8306 8.1665 24.5 8.1665C24.1695 8.1665 23.8924 8.0547 23.6688 7.83109C23.4452 7.60748 23.3334 7.33039 23.3334 6.99984V5.83317ZM18.0834 12.8332C18.5695 12.8332 18.9827 12.663 19.323 12.3228C19.6632 11.9825 19.8334 11.5693 19.8334 11.0832C19.8334 10.5971 19.6632 10.1839 19.323 9.84359C18.9827 9.50331 18.5695 9.33317 18.0834 9.33317C17.5973 9.33317 17.1841 9.50331 16.8438 9.84359C16.5035 10.1839 16.3334 10.5971 16.3334 11.0832C16.3334 11.5693 16.5035 11.9825 16.8438 12.3228C17.1841 12.663 17.5973 12.8332 18.0834 12.8332ZM9.91671 12.8332C10.4028 12.8332 10.816 12.663 11.1563 12.3228C11.4966 11.9825 11.6667 11.5693 11.6667 11.0832C11.6667 10.5971 11.4966 10.1839 11.1563 9.84359C10.816 9.50331 10.4028 9.33317 9.91671 9.33317C9.4306 9.33317 9.0174 9.50331 8.67712 9.84359C8.33685 10.1839 8.16671 10.5971 8.16671 11.0832C8.16671 11.5693 8.33685 11.9825 8.67712 12.3228C9.0174 12.663 9.4306 12.8332 9.91671 12.8332ZM14 20.4165C15.1278 20.4165 16.1681 20.1443 17.1209 19.5998C18.0737 19.0554 18.8417 18.3165 19.425 17.3832C19.5417 17.1498 19.532 16.9165 19.3959 16.6832C19.2598 16.4498 19.0556 16.3332 18.7834 16.3332H9.21671C8.94449 16.3332 8.74032 16.4498 8.60421 16.6832C8.4681 16.9165 8.45837 17.1498 8.57504 17.3832C9.15837 18.3165 9.93129 19.0554 10.8938 19.5998C11.8563 20.1443 12.8917 20.4165 14 20.4165Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}