import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from "@stencil/core";
import classnames from "classnames";
import { getCircularArrayIndex } from "../../utils";

export type SwirlTabBarTab = {
  active?: boolean;
  icon?: string;
  id: string;
  label: string;
  suffix?: string;
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
  @Element() el: HTMLElement;

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

  private onTabFocus(event: FocusEvent): void {
    (event.target as HTMLElement).scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "ArrowLeft") {
      event.preventDefault();
      this.focusAdjacentTab(true);
      this.activatePreviousTab.emit();
    } else if (event.code === "ArrowRight") {
      event.preventDefault();
      this.focusAdjacentTab(false);
      this.activateNextTab.emit();
    }
  };

  private focusAdjacentTab(previous: boolean): void {
    const tabs = this.getTabs();
    const selectedTabIndex = tabs.findIndex(
      (tab) => tab.ariaSelected === "true"
    );
    const nextIndex = getCircularArrayIndex(
      previous ? selectedTabIndex - 1 : selectedTabIndex + 1,
      tabs.length
    );

    tabs[nextIndex].focus();
  }

  private getTabs(): HTMLElement[] {
    return Array.from(this.el.querySelectorAll('[role="tab"]'));
  }

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
                onFocus={this.onTabFocus}
                role={this.disableTabSemantics ? undefined : "tab"}
                tabIndex={
                  this.disableTabSemantics ? undefined : tab.active ? 0 : -1
                }
                type="button"
              >
                {tab.icon && (
                  <span class="tab-bar__tab-icon" innerHTML={tab.icon}></span>
                )}
                <span class={labelClassName}>
                  {tab.label}
                  {tab.suffix && (
                    <span class="tab-bar__tab-suffix">{tab.suffix}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </Host>
    );
  }
}
