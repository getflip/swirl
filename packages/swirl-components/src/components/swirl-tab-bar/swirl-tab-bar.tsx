import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlTabBarTab = {
  active?: boolean;
  icon?: string;
  id: string;
  label: string;
};

export type SwirlTabBarJustify = "start" | "evenly";

export type SwirlTabBarPadding =
  | "0"
  | "2"
  | "4"
  | "8"
  | "12"
  | "16"
  | "20"
  | "24";

export type SwirlTabBarVariant = "default" | "pill";

@Component({
  scoped: true,
  shadow: false,
  styleUrl: "swirl-tab-bar.css",
  tag: "swirl-tab-bar",
})
export class SwirlTabBar {
  @Prop() disableTabSemantics?: boolean;
  @Prop() label!: string;
  @Prop() justify?: SwirlTabBarJustify = "start";
  @Prop() paddingBlockEnd?: SwirlTabBarPadding;
  @Prop() paddingBlockStart?: SwirlTabBarPadding;
  @Prop() paddingInlineEnd?: SwirlTabBarPadding;
  @Prop() paddingInlineStart?: SwirlTabBarPadding;

  @Prop() tabs: SwirlTabBarTab[] = [];
  @Prop() variant?: SwirlTabBarVariant = "default";

  @Event() activateNextTab: EventEmitter<void>;
  @Event() activatePreviousTab: EventEmitter<void>;
  @Event() activateTab: EventEmitter<string>;

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "ArrowLeft") {
      event.preventDefault();
      this.activatePreviousTab.emit();
    } else if (event.code === "ArrowRight") {
      event.preventDefault();
      this.activateNextTab.emit();
    }
  };

  render() {
    const className = classnames(
      "tab-bar",
      `tab-bar--justify-${this.justify}`,
      {
        "tab-bar--variant-pill": this.variant === "pill",
        "tab-bar--variant-default": this.variant === "default",
      }
    );
    const styles = {
      paddingInlineEnd: Boolean(this.paddingInlineEnd)
        ? `var(--s-space-${this.paddingInlineEnd})`
        : undefined,
      paddingInlineStart: Boolean(this.paddingInlineStart)
        ? `var(--s-space-${this.paddingInlineStart})`
        : undefined,
      paddingBlockEnd: Boolean(this.paddingBlockEnd)
        ? `var(--s-space-${this.paddingBlockEnd})`
        : undefined,
      paddingBlockStart: Boolean(this.paddingBlockStart)
        ? `var(--s-space-${this.paddingBlockStart})`
        : undefined,
    };

    return (
      <Host>
        <div
          aria-label={this.label}
          class={className}
          onKeyDown={this.onKeyDown}
          role={this.disableTabSemantics ? undefined : "tablist"}
          style={styles}
        >
          {this.tabs.map((tab) => {
            const className = classnames("tab-bar__tab", {
              "tab-bar__tab--active": tab.active,
              "tab-bar__tab--variant-pill": this.variant === "pill",
              "tab-bar__tab--variant-default": this.variant === "default",
            });

            const labelClassName = classnames("tab-bar__tab-label", {
              "tab-bar__tab-label--variant-pill": this.variant === "pill",
            });

            return (
              <button
                aria-controls={this.disableTabSemantics ? undefined : tab.id}
                aria-selected={
                  this.disableTabSemantics
                    ? undefined
                    : tab.active
                    ? "true"
                    : "false"
                }
                class={className}
                id={`tab-${tab.id}`}
                key={tab.id}
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => this.activateTab.emit(tab.id)}
                role={this.disableTabSemantics ? undefined : "tab"}
                tabIndex={
                  this.disableTabSemantics ? undefined : tab.active ? 0 : -1
                }
                type="button"
              >
                {tab.icon && (
                  <span class="tab-bar__tab-icon" innerHTML={tab.icon}></span>
                )}
                <span class={labelClassName}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </Host>
    );
  }
}
