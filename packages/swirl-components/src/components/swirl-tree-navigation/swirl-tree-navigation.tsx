import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "swirl-tree-navigation.css",
  tag: "swirl-tree-navigation",
})
export class SwirlTreeNavigation {
  @Prop() label: string;

  render() {
    return (
      <Host>
        <ul aria-label={this.label} class="tree-navigation" role="tree">
          <slot></slot>
        </ul>
      </Host>
    );
  }
}
