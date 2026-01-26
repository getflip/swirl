import { Component, h, Host, Prop } from "@stencil/core";
import classNames from "classnames";

type BackgroundColor =
  | "banana"
  | "blueberry"
  | "chilli"
  | "grape"
  | "kiwi"
  | "neutral"
  | "pumpkin"
  | "radish";

type SwirlIconWrapperSize = "xs" | "s" | "m" | "l" | "xl";

@Component({
  shadow: true,
  styleUrl: "swirl-icon-wrapper.css",
  tag: "swirl-icon-wrapper",
})
export class SwirlIconWrapper {
  @Prop() icon: string;
  @Prop() backgroundColor?: BackgroundColor = "neutral";
  @Prop() size?: SwirlIconWrapperSize = "m";

  render() {
    const className = classNames(
      "icon-wrapper",
      `icon-wrapper--size-${this.size}`,
      `icon-wrapper--background-color-${this.backgroundColor}`
    );

    return (
      <Host>
        <div class={className}>
          <span class="icon-wrapper__icon" innerHTML={this.icon}></span>
        </div>
      </Host>
    );
  }
}
