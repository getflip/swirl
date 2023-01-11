import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
} from "@stencil/core";
import classnames from "classnames";

@Component({
  scoped: true,
  shadow: false,
  styleUrl: "swirl-tabs.css",
  tag: "flip-tabs",
})
export class FlipTabs {
  @Element() el: HTMLElement;

  @Prop() initialTab?: string;
  @Prop() label!: string;

  @State() activeTab?: string;

  @Event() tabActivated: EventEmitter<HTMLFlipTabElement>;

  private tabs: HTMLFlipTabElement[] = [];

  componentWillLoad() {
    this.collectTabs();
  }

  /**
   * Activate a tab.
   * @param tabId
   */
  @Method()
  public async activateTab(tabId: string) {
    if (this.activeTab === tabId) {
      return;
    }

    this.activeTab = tabId;
    this.tabs.forEach((tab) => (tab.active = false));

    const tab = this.tabs.find((tab) => tab.tabId === tabId);

    if (!Boolean(tab)) {
      return;
    }

    tab.active = true;
    this.tabActivated.emit(tab);
  }

  private activateNextTab() {
    const currentIndex = this.tabs.findIndex(
      (tab) => tab.tabId === this.activeTab
    );

    const nextIndex = Math.min(this.tabs.length - 1, currentIndex + 1);

    this.activateTab(this.tabs[nextIndex].tabId);

    requestAnimationFrame(() => {
      this.el.querySelector<HTMLButtonElement>(".tabs__tab--active")?.focus();
    });
  }

  private activatePreviousTab() {
    const currentIndex = this.tabs.findIndex(
      (tab) => tab.tabId === this.activeTab
    );

    const previousIndex = Math.max(0, currentIndex - 1);

    this.activateTab(this.tabs[previousIndex].tabId);

    requestAnimationFrame(() => {
      this.el.querySelector<HTMLButtonElement>(".tabs__tab--active")?.focus();
    });
  }

  private collectTabs() {
    this.tabs = Array.from(this.el.querySelectorAll("flip-tab"));

    if (this.tabs.length === 0) {
      return;
    }

    const initialTab = this.tabs.find((tab) => tab.tabId === this.initialTab);

    this.activateTab(
      Boolean(initialTab) ? initialTab.tabId : this.tabs[0].tabId
    );
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "ArrowLeft") {
      event.preventDefault();
      this.activatePreviousTab();
    } else if (event.code === "ArrowRight") {
      event.preventDefault();
      this.activateNextTab();
    }
  };

  render() {
    return (
      <Host>
        <div class="tabs">
          <div
            aria-label={this.label}
            class="tabs__tab-bar"
            onKeyDown={this.onKeyDown}
            role="tablist"
          >
            {this.tabs.map((tab) => {
              const isActive = tab.tabId === this.activeTab;
              const className = classnames("tabs__tab", {
                "tabs__tab--active": isActive,
              });

              return (
                <button
                  aria-controls={tab.tabId}
                  aria-selected={isActive ? "true" : "false"}
                  class={className}
                  id={`tab-${tab.tabId}`}
                  key={tab.tabId}
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={() => this.activateTab(tab.tabId)}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                >
                  <span class="tabs__tab-label">{tab.label}</span>
                </button>
              );
            })}
          </div>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
