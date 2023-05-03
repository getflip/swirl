import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlTabBarTab = {
  active?: boolean;
  id: string;
  label: string;
};

@Component({
  scoped: true,
  shadow: false,
  styleUrl: "swirl-tab-bar.css",
  tag: "swirl-tab-bar",
})
export class SwirlTabBar {
  @Prop() disableTabSemantics?: boolean;
  @Prop() label!: string;
  @Prop() tabs: SwirlTabBarTab[] = [];

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
    return (
      <Host>
        <div
          aria-label={this.label}
          class="tab-bar"
          onKeyDown={this.onKeyDown}
          role={this.disableTabSemantics ? undefined : "tablist"}
        >
          {this.tabs.map((tab) => {
            const className = classnames("tab-bar__tab", {
              "tab-bar__tab--active": tab.active,
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
                <span class="tab-bar__tab-label">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </Host>
    );
  }
}
