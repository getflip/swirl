// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from 'classnames';

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-end-series",
})
export class SwirlIconEndSeries {
  @Prop() color?: SwirlIconColor;
  @Prop() label?: string;
  @Prop() size: SwirlIconSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

    const styles = {
      color: Boolean(this.color)
        ? `var(--s-icon-${this.color})`
        : undefined,
    };

    const className = classnames('swirl-icon', `swirl-icon--size-${this.size}`);

    const hasLabel = Boolean(this.label);

    return (
      <svg
        aria-hidden={hasLabel ? undefined : "true"}
        class={className}
        fill="none"
        height={this.size}
        part="icon"
        role={hasLabel ? "img" : undefined}
        style={styles}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {hasLabel && <title>{this.label}</title>}
        {this.size === 16 && <Fragment><path d="M6.35 12.0171C6.12778 12.1616 5.90278 12.1699 5.675 12.0421C5.44722 11.9143 5.33333 11.7171 5.33333 11.4504V8.66712H2C1.81111 8.66712 1.65278 8.60323 1.525 8.47545C1.39722 8.34767 1.33333 8.18934 1.33333 8.00045C1.33333 7.81156 1.39722 7.65323 1.525 7.52545C1.65278 7.39767 1.81111 7.33378 2 7.33378H5.33333V4.55045C5.33333 4.28378 5.44722 4.08656 5.675 3.95878C5.90278 3.831 6.12778 3.83934 6.35 3.98378L11.7833 7.43378C11.9944 7.56712 12.1 7.756 12.1 8.00045C12.1 8.24489 11.9944 8.43378 11.7833 8.56712L6.35 12.0171ZM6.66667 10.2338L10.1833 8.00045L6.66667 5.76711V10.2338Z" fill="currentColor"/><path d="M12.6667 4.33366C12.6667 3.96547 12.9651 3.66699 13.3333 3.66699C13.7015 3.66699 14 3.96547 14 4.33366V11.667C14 12.0352 13.7015 12.3337 13.3333 12.3337C12.9651 12.3337 12.6667 12.0352 12.6667 11.667V4.33366Z" fill="currentColor"/></Fragment>}
        {(this.size === 20 || this.size === 24) && <Fragment><path d="M9.525 18.0252C9.19167 18.2419 8.85417 18.2544 8.5125 18.0627C8.17083 17.871 8 17.5752 8 17.1752V13.0002H3C2.71667 13.0002 2.47917 12.9044 2.2875 12.7127C2.09583 12.521 2 12.2835 2 12.0002C2 11.7169 2.09583 11.4794 2.2875 11.2877C2.47917 11.096 2.71667 11.0002 3 11.0002H8V6.82518C8 6.42518 8.17083 6.12935 8.5125 5.93768C8.85417 5.74602 9.19167 5.75852 9.525 5.97518L17.675 11.1502C17.9917 11.3502 18.15 11.6335 18.15 12.0002C18.15 12.3669 17.9917 12.6502 17.675 12.8502L9.525 18.0252ZM10 15.3502L15.275 12.0002L10 8.65018V15.3502Z" fill="currentColor"/><path d="M19 6.5C19 5.94772 19.4477 5.5 20 5.5C20.5523 5.5 21 5.94772 21 6.5V17.5C21 18.0523 20.5523 18.5 20 18.5C19.4477 18.5 19 18.0523 19 17.5V6.5Z" fill="currentColor"/></Fragment>}
        {this.size === 28 && <Fragment><path d="M11.1125 21.0297C10.7236 21.2825 10.3299 21.2971 9.93124 21.0735C9.53263 20.8498 9.33333 20.5047 9.33333 20.038V15.1672H3.49999C3.16944 15.1672 2.89236 15.0554 2.66874 14.8318C2.44513 14.6082 2.33333 14.3311 2.33333 14.0005C2.33333 13.67 2.44513 13.3929 2.66874 13.1693C2.89236 12.9457 3.16944 12.8339 3.49999 12.8339H9.33333V7.96304C9.33333 7.49637 9.53263 7.15123 9.93124 6.92762C10.3299 6.70401 10.7236 6.71859 11.1125 6.97137L20.6208 13.0089C20.9903 13.2422 21.175 13.5728 21.175 14.0005C21.175 14.4283 20.9903 14.7589 20.6208 14.9922L11.1125 21.0297ZM11.6667 17.9089L17.8208 14.0005L11.6667 10.0922V17.9089Z" fill="currentColor"/><path d="M22.1667 7.58366C22.1667 6.93933 22.689 6.41699 23.3333 6.41699C23.9777 6.41699 24.5 6.93933 24.5 7.58366V20.417C24.5 21.0613 23.9777 21.5837 23.3333 21.5837C22.689 21.5837 22.1667 21.0613 22.1667 20.417V7.58366Z" fill="currentColor"/></Fragment>}
      </svg>
    );
  }
}
