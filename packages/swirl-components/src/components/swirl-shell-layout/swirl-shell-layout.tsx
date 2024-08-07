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
  Watch,
} from "@stencil/core";
import classnames from "classnames";
import * as focusTrap from "focus-trap";

const SECONDARY_NAVIGATION_COLLAPSE_STORAGE_KEY =
  "SWIRL_SHELL_SECONDARY_NAVIGATION_COLLAPSE_STATE";
const SECONDARY_NAVIGATION_VIEW_STORAGE_KEY =
  "SWIRL_SHELL_SECONDARY_NAVIGATION_VIEW_STATE";
const NAVIGATION_COLLAPSE_STORAGE_KEY = "SWIRL_SHELL_NAVIGATION_COLLAPSE_STATE";
const SIDEBAR_STORAGE_KEY = "SWIRL_SHELL_SIDEBAR_STATE";

export type SwirlShellLayoutSecondaryNavView = "grid" | "list";

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
  @Element() el: HTMLElement;

  @Prop() brandedHeader?: boolean;
  @Prop() browserBackButtonLabel?: string = "Navigate back";
  @Prop() browserForwardButtonLabel?: string = "Navigate forward";
  @Prop() enableSecondaryNavGridLayout?: boolean = true;
  @Prop() gridNavLayoutToggleLabel?: string = "Grid";
  @Prop() hideMobileNavigationButtonLabel?: string = "Close navigation";
  @Prop() listNavLayoutToggleLabel?: string = "List";
  @Prop() navigationLabel?: string = "Main";
  @Prop() navigationToggleLabel?: string = "Toggle navigation";
  @Prop() secondaryNavCollapseLabel?: string = "Show less";
  @Prop() secondaryNavExpandLabel?: string = "Show more";
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
  @State() secondaryNavCollapsed?: boolean;
  @State() secondaryNavView?: SwirlShellLayoutSecondaryNavView = "list";

  private focusTrap: focusTrap.FocusTrap;
  private mainNavItems: HTMLSwirlShellNavigationItemElement[];
  private navElement: HTMLElement;
  private navMutationObserver: MutationObserver;
  private secondaryNavItems: HTMLSwirlShellNavigationItemElement[];

  componentWillLoad() {
    this.collectNavItems();

    const restoredSidebarState =
      localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true";

    this.sidebarActive =
      this.sidebarActive === undefined
        ? restoredSidebarState
        : this.sidebarActive;

    const restoredNavigationCollapseState =
      localStorage.getItem(NAVIGATION_COLLAPSE_STORAGE_KEY) === "true";

    this.navigationCollapsed = restoredNavigationCollapseState;

    if (this.enableSecondaryNavGridLayout) {
      const restoredSecondaryNavigationCollapseState =
        localStorage.getItem(SECONDARY_NAVIGATION_COLLAPSE_STORAGE_KEY) ===
        "true";

      this.secondaryNavCollapsed = restoredSecondaryNavigationCollapseState;

      const restoredSecondaryNavigationViewState = localStorage.getItem(
        SECONDARY_NAVIGATION_VIEW_STORAGE_KEY
      );

      this.secondaryNavView =
        restoredSecondaryNavigationViewState as SwirlShellLayoutSecondaryNavView;
    }
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

    this.toggleNavItemLabels();
    this.setSecondaryNavItemsTiled();

    this.navMutationObserver = new MutationObserver(() => {
      this.collectNavItems();
      this.setSecondaryNavItemsTiled();
    });

    this.navMutationObserver.observe(this.navElement, {
      childList: true,
      subtree: true,
    });
  }

  componentDidRender() {
    this.focusTrap?.updateContainerElements(this.navElement);
  }

  disconnectedCallback() {
    this.focusTrap?.deactivate();
    this.navMutationObserver?.disconnect();
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

    this.toggleNavItemLabels();
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

  collectNavItems = () => {
    this.mainNavItems = Array.from(
      this.el.querySelectorAll(
        "swirl-shell-navigation-item[slot='nav'], [slot='nav'] swirl-shell-navigation-item"
      )
    );

    this.secondaryNavItems = Array.from(
      this.el.querySelectorAll(
        "swirl-shell-navigation-item[slot='secondary-nav'], [slot='secondary-nav'] swirl-shell-navigation-item"
      )
    );

    this.toggleNavItemLabels();
  };

  toggleSecondaryNavView = (event: Event) => {
    event.stopPropagation();

    if (this.secondaryNavView === "grid") {
      this.secondaryNavView = "list";
    } else {
      this.secondaryNavView = "grid";
    }

    this.setSecondaryNavItemsTiled();

    localStorage.setItem(
      SECONDARY_NAVIGATION_VIEW_STORAGE_KEY,
      String(this.secondaryNavView)
    );
  };

  toggleSecondaryNavCollapse = (event: Event) => {
    event.stopPropagation();

    this.secondaryNavCollapsed = !this.secondaryNavCollapsed;

    localStorage.setItem(
      SECONDARY_NAVIGATION_COLLAPSE_STORAGE_KEY,
      String(this.secondaryNavCollapsed)
    );
  };

  /**
   * Hides the mobile navigation.
   */
  @Method()
  async hideMobileNavigation() {
    this.mobileNavigationActive = false;
  }

  private onNavigationToggleClick = () => {
    this.navigationCollapsed = !this.navigationCollapsed;
  };

  private onNavigationClick = () => {
    this.hideMobileNavigation();
  };

  private toggleNavItemLabels() {
    [...this.secondaryNavItems, ...this.mainNavItems].forEach((item) => {
      item.hideLabel =
        !!(this.enableSecondaryNavGridLayout && this.navigationCollapsed) ||
        (!this.enableSecondaryNavGridLayout && this.navigationCollapsed);
    });
  }

  private setSecondaryNavItemsTiled() {
    this.secondaryNavItems.forEach((item) => {
      item.tiled =
        this.enableSecondaryNavGridLayout && this.secondaryNavView === "grid";
    });
  }

  render() {
    const hasSidebarToggleBadgeWithLabel =
      this.sidebarToggleBadge !== true && this.sidebarToggleBadge !== "true";

    const hasSecondaryNav = Boolean(
      this.el.querySelector("[slot='secondary-nav']")
    );

    const className = classnames("shell-layout", {
      "shell-layout--branded-header": this.brandedHeader,
      "shell-layout--secondary-nav-collapsed": this.secondaryNavCollapsed,
      "shell-layout--has-secondary-nav": hasSecondaryNav,
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
                class="shell-layout__header-tool"
                onClick={this.onNavigationToggleClick}
                type="button"
              >
                <swirl-icon-dock-left size={20}></swirl-icon-dock-left>
                <swirl-visually-hidden>
                  {this.navigationToggleLabel}
                </swirl-visually-hidden>
              </button>
              <a
                class="shell-layout__header-tool"
                href="javascript:history.back()"
              >
                <swirl-icon-arrow-back size={20}></swirl-icon-arrow-back>
                <swirl-visually-hidden>
                  {this.browserBackButtonLabel}
                </swirl-visually-hidden>
              </a>
              <a
                class="shell-layout__header-tool"
                href="javascript:history.forward()"
              >
                <swirl-icon-arrow-forward size={20}></swirl-icon-arrow-forward>
                <swirl-visually-hidden>
                  {this.browserForwardButtonLabel}
                </swirl-visually-hidden>
              </a>
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
              <slot name="nav" onSlotchange={this.collectNavItems}></slot>
              <div class="shell-layout__secondary-nav">
                <swirl-separator
                  borderColor="strong"
                  spacing="16"
                ></swirl-separator>
                {this.enableSecondaryNavGridLayout && (
                  <swirl-box paddingBlockEnd="16">
                    <swirl-stack
                      justify={
                        this.navigationCollapsed ? "center" : "space-between"
                      }
                      orientation="horizontal"
                    >
                      <swirl-button
                        hideLabel={this.navigationCollapsed}
                        icon={
                          this.secondaryNavCollapsed
                            ? "<swirl-icon-expand-more></swirl-icon-expand-more>"
                            : "<swirl-icon-expand-less></swirl-icon-expand-less>"
                        }
                        label={
                          this.secondaryNavCollapsed
                            ? this.secondaryNavExpandLabel
                            : this.secondaryNavCollapseLabel
                        }
                        onClick={this.toggleSecondaryNavCollapse}
                        variant="plain"
                      ></swirl-button>
                      {!this.navigationCollapsed &&
                        !this.secondaryNavCollapsed && (
                          <swirl-button
                            icon={
                              this.secondaryNavView === "grid"
                                ? "<swirl-icon-menu></swirl-icon-menu>"
                                : "<swirl-icon-hamburger-menu></swirl-icon-hamburger-menu>"
                            }
                            iconPosition="end"
                            label={
                              this.secondaryNavView === "grid"
                                ? this.gridNavLayoutToggleLabel
                                : this.listNavLayoutToggleLabel
                            }
                            onClick={this.toggleSecondaryNavView}
                            variant="plain"
                          ></swirl-button>
                        )}
                    </swirl-stack>
                  </swirl-box>
                )}
                <div
                  class={{
                    "shell-layout__secondary-nav-items": true,
                    "shell-layout__secondary-nav-items--grid-view":
                      this.enableSecondaryNavGridLayout &&
                      this.secondaryNavView === "grid",
                  }}
                >
                  <slot
                    name="secondary-nav"
                    onSlotchange={this.collectNavItems}
                  ></slot>
                </div>
              </div>
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
