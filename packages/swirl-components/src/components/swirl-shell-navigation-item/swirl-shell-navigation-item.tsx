import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

/**
 * @slot slot - image or icon to display
 */
@Component({
  shadow: true,
  styleUrl: "swirl-shell-navigation-item.css",
  tag: "swirl-shell-navigation-item",
})
export class SwirlShellNavigationItem {
  @Element() el: HTMLElement;

  @Prop() active?: boolean;
  @Prop() badgeLabel?: string;
  @Prop() label!: string;

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Enter") {
      event.preventDefault();
      this.el.click();
    }
  };

  render() {
    const className = classnames("shell-navigation-item", {
      "shell-navigation-item--active": this.active,
    });

    const indicatorClassName = classnames("shell-navigation-item__indicator", {
      "shell-navigation-item__indicator--active": this.active,
    });

    return (
      <Host
        class={className}
        onKeyDown={this.onKeyDown}
        role="link"
        tabIndex={0}
      >
        <span class={indicatorClassName}></span>
        <slot name="icon"></slot>
        <span class="shell-navigation-item__label">{this.label}</span>
        {this.badgeLabel && (
          <swirl-badge
            class="shell-navigation-item__badge"
            size="s"
            aria-label={`${this.badgeLabel} 1 new messages`}
            label={this.badgeLabel}
          ></swirl-badge>
        )}
      </Host>
    );
  }
}
