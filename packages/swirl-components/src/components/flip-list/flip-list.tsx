import { Component, h, Host } from "@stencil/core";

@Component({
  shadow: false,
  styleUrl: "flip-list.css",
  tag: "flip-list",
})
export class FlipList {
  private containerEl: HTMLElement;

  componentDidRender() {
    const children = Array.from(this.containerEl.children);

    if (children.some((child) => !["UL", "OL"].includes(child.tagName))) {
      console.warn(
        "[FlipList] Only ul and ol elements are allowed as direct children of <flip-list />."
      );
    }
  }

  render() {
    return (
      <Host>
        <div class="flip-list" ref={(el) => (this.containerEl = el)}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
