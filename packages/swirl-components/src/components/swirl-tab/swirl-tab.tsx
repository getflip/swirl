import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlTabPadding = "0" | "2" | "4" | "8" | "12" | "16" | "20" | "24";

@Component({
  shadow: true,
  styleUrl: "swirl-tab.css",
  tag: "swirl-tab",
})
export class SwirlTab {
  @Prop() active?: boolean;
  @Prop() icon?: string;
  @Prop() label!: string;
  @Prop() padding?: SwirlTabPadding = "8";
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
        <div
          class={className}
          style={{ padding: `var(--s-space-${this.padding})` }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
