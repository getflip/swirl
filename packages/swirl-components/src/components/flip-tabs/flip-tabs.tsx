import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
} from "@stencil/core";
import classnames from "classnames";

@Component({
  scoped: true,
  shadow: false,
  styleUrl: "flip-tabs.css",
  tag: "flip-tabs",
})
export class FlipTabs {
  @Element() el: HTMLElement;

  @Prop() initialTab?: string;
  @Prop() label!: string;

  @State() activeTab?: string;
  @State() highlightedTab: HTMLElement | undefined;

  @Event() tabActivated: EventEmitter<HTMLFlipTabElement>;

  private indicatorEl: HTMLElement;
  private tabs: HTMLFlipTabElement[] = [];

  componentWillLoad() {
    this.collectTabs();
  }

  componentDidRender() {
    this.updateIndicatorPosition();
  }

  @Listen("resize", { target: "window" })
  onWindowResize() {
    this.updateIndicatorPosition();
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

    this.highlightedTab = undefined;

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

  private updateIndicatorPosition() {
    const activeTab = this.tabs.find((tab) => tab.tabId === this.activeTab);

    if (!Boolean(activeTab) && !Boolean(this.highlightedTab)) {
      this.indicatorEl.style.width = "";
      this.indicatorEl.style.transform = "";
      this.indicatorEl.style.backgroundColor = "";
      return;
    }

    const activeTabEl =
      this.highlightedTab ||
      this.el.querySelector<HTMLButtonElement>(`#tab-${activeTab.tabId}`);

    const activeTabLabelEl =
      activeTabEl.querySelector<HTMLSpanElement>(".tabs__tab-label");

    this.indicatorEl.style.width = `${
      activeTabLabelEl.getBoundingClientRect().width / 16
    }rem`;

    this.indicatorEl.style.transform = `translate3d(${
      activeTabLabelEl.offsetLeft / 16
    }rem, 0, 0)`;

    this.indicatorEl.style.backgroundColor = Boolean(this.highlightedTab)
      ? "var(--s-border-default)"
      : "";
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

  private onMouseEnter = (event: MouseEvent, tab: HTMLFlipTabElement) => {
    if (tab.tabId === this.activeTab) {
      this.highlightedTab = undefined;
      return;
    }

    this.highlightedTab =
      (event.target as HTMLElement).closest(".tabs__tab") || undefined;
  };

  private onMouseLeave = () => {
    this.highlightedTab = undefined;
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
                  // eslint-disable-next-line react/jsx-no-bind
                  onMouseEnter={(event) => this.onMouseEnter(event, tab)}
                  onMouseLeave={this.onMouseLeave}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                >
                  <span class="tabs__tab-label">{tab.label}</span>
                </button>
              );
            })}

            <span
              class="tabs__indicator"
              ref={(el) => (this.indicatorEl = el)}
            ></span>
          </div>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
