import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "swirl-tree-navigation-item.css",
  tag: "flip-tree-navigation-item",
})
export class FlipTreeNavigationItem {
  @Element() el: HTMLElement;

  @Prop() active?: boolean;
  @Prop() icon?: string;
  @Prop() label!: string;

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Enter") {
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
        role="link"
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
