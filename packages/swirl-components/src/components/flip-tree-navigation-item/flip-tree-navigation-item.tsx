import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "flip-tree-navigation-item.css",
  tag: "flip-tree-navigation-item",
})
export class FlipTreeNavigationItem {
  @Prop() active?: boolean;
  @Prop() icon?: string;
  @Prop() label!: string;

  render() {
    const className = classnames("tree-navigation-item", {
      "tree-navigation-item--active": this.active,
      "tree-navigation-item--has-icon": Boolean(this.icon),
    });

    return (
      <Host>
        <button class={className} type="button">
          {this.icon && (
            <span
              class="tree-navigation-item__icon"
              innerHTML={this.icon}
            ></span>
          )}
          <span class="tree-navigation-item__label">{this.label}</span>
        </button>
      </Host>
    );
  }
}
