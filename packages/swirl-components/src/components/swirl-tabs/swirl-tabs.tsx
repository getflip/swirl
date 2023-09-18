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
import { SwirlTabBarTab } from "../swirl-tab-bar/swirl-tab-bar";

@Component({
  scoped: true,
  shadow: false,
  styleUrl: "swirl-tabs.css",
  tag: "swirl-tabs",
})
export class SwirlTabs {
  @Element() el: HTMLElement;

  @Prop() initialTab?: string;
  @Prop() label!: string;

  @State() activeTab?: string;
  @State() tabBarTabs: SwirlTabBarTab[] = [];

  @Event() tabActivated: EventEmitter<HTMLSwirlTabElement>;

  private tabs: HTMLSwirlTabElement[] = [];

  componentWillLoad() {
    this.collectTabs();
    this.updateTabBarTabs();
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

    this.updateTabBarTabs();
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
    this.tabs = Array.from(this.el.querySelectorAll("swirl-tab"));

    if (this.tabs.length === 0) {
      return;
    }

    const initialTab = this.tabs.find((tab) => tab.tabId === this.initialTab);

    this.activateTab(
      Boolean(initialTab) ? initialTab.tabId : this.tabs[0].tabId
    );
  }

  private updateTabBarTabs() {
    this.tabBarTabs = this.tabs.map((tab) => ({
      icon: tab.icon,
      id: tab.tabId,
      label: tab.label,
      active: this.activeTab === tab.tabId,
    }));
  }

  private onActivateNextTab = () => {
    this.activateNextTab();
  };

  private onActivatePreviousTab = () => {
    this.activatePreviousTab();
  };

  private onActivateTab = (event: CustomEvent<string>) => {
    this.activateTab(event.detail);
  };

  render() {
    return (
      <Host>
        <div class="tabs">
          <swirl-tab-bar
            label={this.label}
            onActivateNextTab={this.onActivateNextTab}
            onActivatePreviousTab={this.onActivatePreviousTab}
            onActivateTab={this.onActivateTab}
            tabs={this.tabBarTabs}
          ></swirl-tab-bar>
        </div>
        <slot></slot>
      </Host>
    );
  }
}
