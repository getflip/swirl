import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "swirl-shell-navigation-item.css",
  tag: "swirl-shell-navigation-item",
})
export class SwirlShellNavigationItem {
  @Element() el: HTMLElement;

  @Prop() active?: boolean;
  @Prop() icon!: string;
  @Prop() label!: string;

  private iconEl: HTMLElement;

  componentDidLoad() {
    this.forceIconProps();
  }

  private forceIconProps() {
    if (!Boolean(this.iconEl)) {
      return;
    }

    const icon = this.iconEl.children[0];

    icon?.setAttribute("size", "20");
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Enter") {
      event.preventDefault();
      this.el.click();
    }
  };

  render() {
    const className = classnames("shell-navigation-item", {
      "shell-navigation-item--active": this.active,
      "shell-navigation-item--has-icon": Boolean(this.icon),
    });

    return (
      <Host
        class={className}
        onKeyDown={this.onKeyDown}
        role="link"
        tabIndex={0}
      >
        <span
          class="shell-navigation-item__icon"
          innerHTML={this.icon}
          ref={(el) => (this.iconEl = el)}
        ></span>
        <span class="shell-navigation-item__label">{this.label}</span>
      </Host>
    );
  }
}
