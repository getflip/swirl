import { Component, h, Host, Prop, State } from "@stencil/core";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "swirl-app-icon.css",
  tag: "swirl-app-icon",
})
export class SwirlAppIcon {
  @Prop() label!: string;
  @Prop() icon?: string;
  @Prop() src?: string;
  @Prop() hideBorder?: boolean = false;

  @State() imageAvailable: boolean | undefined;

  private setImageAvailable = () => {
    this.imageAvailable = true;
  };

  private setImageUnavailable = () => {
    this.imageAvailable = false;
  };

  render() {
    const showImage =
      Boolean(this.src) &&
      (this.imageAvailable || this.imageAvailable === undefined);

    const showIcon = !showImage && Boolean(this.icon);
    const showFallbackIcon = !showImage && !showIcon;

    const className = classnames("app-icon", {
      "app-icon--has-icon": showIcon || showFallbackIcon,
      "app-icon--hide-border": this.hideBorder,
    });

    return (
      <Host aria-label={this.label}>
        <span class={className}>
          {showImage && (
            <img
              alt=""
              height="40"
              onError={this.setImageUnavailable}
              onLoad={this.setImageAvailable}
              src={this.src}
              width="40"
            />
          )}
          {showIcon && (
            <span class="app-icon__icon" innerHTML={this.icon}></span>
          )}
          {showFallbackIcon && (
            <span class="app-icon__icon">
              <swirl-icon-link></swirl-icon-link>
            </span>
          )}
        </span>
      </Host>
    );
  }
}
