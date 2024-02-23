import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "swirl-tree-navigation-item.css",
  tag: "swirl-tree-navigation-item",
})
export class SwirlTreeNavigationItem {
  @Element() el: HTMLElement;

  @Prop() active?: boolean;
  @Prop() href?: string;
  @Prop() icon?: string;
  @Prop() label!: string;
  @Prop() target?: string;

  render() {
    const isLink = Boolean(this.href);

    const Tag = isLink ? "a" : "button";

    const className = classnames("tree-navigation-item", {
      "tree-navigation-item--active": this.active,
      "tree-navigation-item--has-icon": Boolean(this.icon),
    });

    return (
      <Host>
        <Tag
          class={className}
          href={this.href}
          target={this.target}
          type={isLink ? undefined : "button"}
        >
          {this.icon && (
            <span
              class="tree-navigation-item__icon"
              innerHTML={this.icon}
            ></span>
          )}
          <span class="tree-navigation-item__label">{this.label}</span>
        </Tag>
      </Host>
    );
  }
}
