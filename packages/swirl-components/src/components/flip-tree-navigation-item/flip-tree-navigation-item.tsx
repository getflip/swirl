import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "flip-tree-navigation-item.css",
  tag: "flip-tree-navigation-item",
})
export class FlipTreeNavigationItem {
  @Element() el: HTMLElement;

  @Prop() active?: boolean;
  @Prop() icon?: string;
  @Prop() label!: string;

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault();
    } else if (event.code === "Enter") {
      event.preventDefault();
      this.el.click();
    }
  };

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault();
      this.el.click();
    }
  };

  render() {
    const className = classnames("tree-navigation-item", {
      "tree-navigation-item--active": this.active,
      "tree-navigation-item--has-icon": Boolean(this.icon),
    });

    return (
      <Host
        class={className}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        role="button"
        tabIndex={0}
      >
        {this.icon && (
          <span class="tree-navigation-item__icon" innerHTML={this.icon}></span>
        )}
        <span class="tree-navigation-item__label">{this.label}</span>
      </Host>
    );
  }
}
