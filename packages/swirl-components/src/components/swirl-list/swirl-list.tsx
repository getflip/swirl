import { Component, h, Host } from "@stencil/core";

@Component({
  shadow: false,
  styleUrl: "swirl-list.css",
  tag: "swirl-list",
})
export class SwirlList {
  private containerEl: HTMLElement;

  componentDidRender() {
    const children = Array.from(this.containerEl.children);

    if (children.some((child) => !["UL", "OL"].includes(child.tagName))) {
      console.warn(
        "[FlipList] Only ul and ol elements are allowed as direct children of <swirl-list />."
      );
    }
  }

  render() {
    return (
      <Host>
        <div class="swirl-list" ref={(el) => (this.containerEl = el)}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
