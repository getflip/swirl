import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "swirl-tab.css",
  tag: "swirl-tab",
})
export class SwirlTab {
  @Prop() active?: boolean;
  @Prop() icon?: string;
  @Prop() label!: string;
  @Prop() tabId!: string;

  render() {
    const className = classnames("tab", { "tab--active": this.active });

    return (
      <Host
        aria-labelledby={`tab-${this.tabId}`}
        id={this.tabId}
        role="tabpanel"
        tabIndex={this.active ? 0 : -1}
      >
        <div class={className}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
