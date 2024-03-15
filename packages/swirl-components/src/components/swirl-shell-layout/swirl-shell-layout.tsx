import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import classnames from "classnames";
import * as focusTrap from "focus-trap";

const NAVIGATION_COLLAPSE_STORAGE_KEY = "SWIRL_SHELL_NAVIGATION_COLLAPSE_STATE";
const SIDEBAR_STORAGE_KEY = "SWIRL_SHELL_SIDEBAR_STATE";

/**
 * @slot logo - Logo shown inside header.
 * @slot left-header-tools - Tools positioned on the header's left-hand side.
 * @slot right-header-tools - Tools positioned on the header's right-hand side.
 * @slot mobile-header-tools - Tools positioned in the mobile drawer header.
 * @slot avatar - User avatar positioned on the header's right-hand side.
 * @slot nav - Items shown in the lower sidebar part.
 * @slot mobile-logo - Logo shown inside the mobile navigation drawer.
 * @slot default - Contents of the main area.
 * @slot sidebar-app-bar - Contents of the right sidebar header.
 * @slot sidebar - Contents of the right sidebar.
 */
@Component({
  scoped: true,
  shadow: false,
  styleUrl: "swirl-shell-layout.css",
  tag: "swirl-shell-layout",
})
export class SwirlShellLayout {
  @Prop() brandedHeader?: boolean;
  @Prop() browserBackButtonLabel?: string = "Navigate back";
  @Prop() browserForwardButtonLabel?: string = "Navigate forward";
  @Prop() hideMobileNavigationButtonLabel?: string = "Close navigation";
  @Prop() navigationLabel?: string = "Main";
  @Prop() navigationToggleLabel?: string = "Toggle navigation";
  @Prop({ mutable: true }) sidebarActive?: boolean;
  @Prop() sidebarToggleBadge?: string | boolean;
  @Prop() sidebarToggleBadgeAriaLabel?: string;
  @Prop() sidebarToggleIcon?: string = "notifications";
  @Prop() sidebarToggleLabel?: string = "Toggle sidebar";
  @Prop() skipLinkLabel?: string = "Skip to main content";

  @Event() sidebarToggleClick: EventEmitter<MouseEvent>;
  @Event() skipLinkClick: EventEmitter<MouseEvent>;

  @State() mobileNavigationActive?: boolean;
  @State() navigationCollapsed?: boolean;

  private focusTrap: focusTrap.FocusTrap;
  private navElement: HTMLElement;

  componentWillLoad() {
    const restoredSidebarState =
      localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true";

    this.sidebarActive =
      this.sidebarActive === undefined
        ? restoredSidebarState
        : this.sidebarActive;

    const restoredNavigationCollapseState =
      localStorage.getItem(NAVIGATION_COLLAPSE_STORAGE_KEY) === "true";

    this.navigationCollapsed = restoredNavigationCollapseState;
  }

  componentDidLoad() {
    this.focusTrap = focusTrap.createFocusTrap(this.navElement, {
      allowOutsideClick: true,
      tabbableOptions: {
        getShadowRoot: (node) => {
          return node.shadowRoot;
        },
      },
    });
  }

  componentDidRender() {
    this.focusTrap?.updateContainerElements(this.navElement);
  }

  disconnectedCallback() {
    this.focusTrap?.deactivate();
  }

  @Listen("keydown", { target: "window" })
  onWindowKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && this.mobileNavigationActive) {
      this.hideMobileNavigation();
    }
  }

  @Watch("mobileNavigationActive")
  watchMobileNavigationState() {
    if (this.mobileNavigationActive) {
      // wait for animation
      setTimeout(() => {
        this.focusTrap.activate();
      }, 200);
    } else {
      this.focusTrap.deactivate();
    }
  }

  @Watch("navigationCollapsed")
  watchNavigationCollapsed() {
    localStorage.setItem(
      NAVIGATION_COLLAPSE_STORAGE_KEY,
      String(this.navigationCollapsed)
    );
  }

  @Watch("sidebarActive")
  watchSidebarActive() {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(this.sidebarActive));
  }

  /**
   * Opens the mobile navigation.
   */
  @Method()
  async showMobileNavigation() {
    this.mobileNavigationActive = true;
  }

  /**
   * Hides the mobile navigation.
   */
  @Method()
  async hideMobileNavigation() {
    this.mobileNavigationActive = false;
  }

  private onBrowserBackClick = () => {
    history.back();
  };

  private onBrowserForwardClick = () => {
    history.forward();
  };

  private onNavigationToggleClick = () => {
    this.navigationCollapsed = !this.navigationCollapsed;
  };

  private onNavigationClick = () => {
    this.hideMobileNavigation();
  };

  render() {
    const hasSidebarToggleBadgeWithLabel =
      this.sidebarToggleBadge !== true && this.sidebarToggleBadge !== "true";

    const className = classnames("shell-layout", {
      "shell-layout--branded-header": this.brandedHeader,
      "shell-layout--mobile-navigation-active": this.mobileNavigationActive,
      "shell-layout--navigation-collapsed": this.navigationCollapsed,
      "shell-layout--sidebar-active": this.sidebarActive,
    });

    return (
      <Host>
        <div class={className}>
          <header class="shell-layout__header" data-tauri-drag-region="true">
            <button
              class="shell-layout__skip-link"
              onClick={this.skipLinkClick.emit}
              type="button"
            >
              {this.skipLinkLabel}
            </button>
            <div class="shell-layout__header-left">
              <button
                class="shell-layout__header-tool shell-layout__navigation-toggle"
                onClick={this.onNavigationToggleClick}
                type="button"
              >
                <swirl-icon-hamburger-menu
                  size={20}
                ></swirl-icon-hamburger-menu>
                <swirl-icon-double-arrow-left
                  size={20}
                ></swirl-icon-double-arrow-left>
                <swirl-icon-double-arrow-right
                  size={20}
                ></swirl-icon-double-arrow-right>
                <swirl-visually-hidden>
                  {this.navigationToggleLabel}
                </swirl-visually-hidden>
              </button>
              <button
                class="shell-layout__header-tool"
                onClick={this.onBrowserBackClick}
                type="button"
              >
                <swirl-icon-arrow-back size={20}></swirl-icon-arrow-back>
                <swirl-visually-hidden>
                  {this.browserBackButtonLabel}
                </swirl-visually-hidden>
              </button>
              <button
                class="shell-layout__header-tool"
                onClick={this.onBrowserForwardClick}
                type="button"
              >
                <swirl-icon-arrow-forward size={20}></swirl-icon-arrow-forward>
                <swirl-visually-hidden>
                  {this.browserForwardButtonLabel}
                </swirl-visually-hidden>
              </button>
              <slot name="left-header-tools"></slot>
            </div>
            <div class="shell-layout__logo">
              <slot name="logo"></slot>
            </div>
            <div class="shell-layout__header-right">
              <slot name="right-header-tools"></slot>
              <button
                class="shell-layout__header-tool shell-layout__sidebar-toggle"
                onClick={this.sidebarToggleClick.emit}
                type="button"
              >
                <swirl-icon
                  glyph={this.sidebarToggleIcon}
                  size={20}
                ></swirl-icon>
                <swirl-visually-hidden>
                  {this.sidebarToggleLabel}
                </swirl-visually-hidden>
                {this.sidebarToggleBadge && (
                  <swirl-badge
                    aria-label={this.sidebarToggleBadgeAriaLabel}
                    label={
                      !hasSidebarToggleBadgeWithLabel
                        ? this.sidebarToggleBadgeAriaLabel
                        : String(this.sidebarToggleBadge)
                    }
                    size="xs"
                    variant={
                      !hasSidebarToggleBadgeWithLabel ? "dot" : "default"
                    }
                  ></swirl-badge>
                )}
              </button>
              <slot name="avatar"></slot>
            </div>
          </header>
          <div
            class="shell-layout__mobile-nav-backdrop"
            onClick={this.onNavigationClick}
          ></div>
          <nav
            aria-labelledby="main-navigation-label"
            class="shell-layout__nav"
            onClick={this.onNavigationClick}
            ref={(el) => (this.navElement = el)}
          >
            <div class="shell-layout__mobile-header">
              <slot name="mobile-logo"></slot>
              <div class="shell-layout__mobile-header-tools">
                <slot name="mobile-header-tools"></slot>
                <button class="shell-layout__header-tool" type="button">
                  <swirl-icon-double-arrow-left
                    size={20}
                  ></swirl-icon-double-arrow-left>
                  <swirl-visually-hidden>
                    {this.hideMobileNavigationButtonLabel}
                  </swirl-visually-hidden>
                </button>
              </div>
            </div>
            <div class="shell-layout__nav-body">
              <swirl-visually-hidden>
                <span id="main-navigation-label">{this.navigationLabel}</span>
              </swirl-visually-hidden>
              <slot name="nav"></slot>
            </div>
          </nav>
          <main class="shell-layout__main" id="main-content">
            <slot></slot>
          </main>
          <aside
            class="shell-layout__sidebar"
            {...{ inert: this.sidebarActive ? undefined : true }}
          >
            <div class="shell-layout__sidebar-body">
              <div class="shell-layout__sidebar-app-bar">
                <slot name="sidebar-app-bar"></slot>
              </div>
              <div class="shell-layout__sidebar-content">
                <slot name="sidebar"></slot>
              </div>
            </div>
          </aside>
        </div>
      </Host>
    );
  }
}
