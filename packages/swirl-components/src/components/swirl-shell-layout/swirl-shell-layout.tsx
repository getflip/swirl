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
import { isDesktopViewport } from "../../utils";
import { SwirlShellNavigationItemVariant } from "../swirl-shell-navigation-item/swirl-shell-navigation-item";

const SECONDARY_NAVIGATION_COLLAPSE_STORAGE_KEY =
  "SWIRL_SHELL_SECONDARY_NAVIGATION_COLLAPSE_STATE";
const SECONDARY_NAVIGATION_VIEW_STORAGE_KEY =
  "SWIRL_SHELL_SECONDARY_NAVIGATION_VIEW_STATE";
const NAVIGATION_COLLAPSE_STORAGE_KEY = "SWIRL_SHELL_NAVIGATION_COLLAPSE_STATE";

export type SwirlShellLayoutSecondaryNavView = "grid" | "list";

export type SwirlShellLayoutSecondaryNavGridItemVariant = Exclude<
  SwirlShellNavigationItemVariant,
  "default"
>;

/**
 * @slot logo - Logo shown inside header.
 * @slot left-header-tools - Tools positioned on the header's left-hand side.
 * @slot right-header-tools - Tools positioned on the header's right-hand side.
 * @slot mobile-header-tools - Tools positioned in the mobile drawer header.
 * @slot avatar - User avatar positioned on the header's right-hand side.
 * @slot nav - Items shown in the lower sidebar part.
 * @slot mobile-logo - Logo shown inside the mobile navigation drawer.
 * @slot default - Contents of the main area.
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
  @Prop() collapseNavigationButtonLabel?: string = "Collapse navigation";
  @Prop() enableSecondaryNavGridLayout?: boolean = true;
  @Prop()
  secondaryNavGridLayoutVariant: SwirlShellLayoutSecondaryNavGridItemVariant =
    "tiled";
  @Prop() expandNavigationButtonLabel?: string = "Expand navigation";
  @Prop() gridNavLayoutToggleLabel?: string = "Grid";
  @Prop() hideMobileNavigationButtonLabel?: string = "Close navigation";
  @Prop() listNavLayoutToggleLabel?: string = "List";
  @Prop() navigationLabel?: string = "Main";
  @Prop() secondaryNavCollapseLabel?: string = "Show less";
  @Prop() secondaryNavExpandLabel?: string = "Show more";
  @Prop() skipLinkLabel?: string = "Skip to main content";

  @Event() historyBackClick: EventEmitter<MouseEvent>;
  @Event() historyForwardClick: EventEmitter<MouseEvent>;
  @Event() skipLinkClick: EventEmitter<MouseEvent>;

  @State() isDesktopViewport: boolean = true;
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
    this.isDesktopViewport = isDesktopViewport();
    this.collectNavItems();

    const restoredNavigationCollapseState =
      localStorage.getItem(NAVIGATION_COLLAPSE_STORAGE_KEY) === "true";

    this.navigationCollapsed = restoredNavigationCollapseState;

    this.restoreSecondaryNavState();
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

    this.collectNavItems();

    this.navMutationObserver = new MutationObserver(() => {
      this.collectNavItems();
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

  @Watch("enableSecondaryNavGridLayout")
  watchEnableSecondaryNavGridLayout() {
    this.restoreSecondaryNavState();
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
    this.setSecondaryNavItemsTiled();
  }

  @Listen("resize", { target: "window" })
  onWindowResize() {
    if (this.isDesktopViewport !== isDesktopViewport()) {
      this.isDesktopViewport = isDesktopViewport();
      this.collectNavItems();
    }
  }

  /**
   * Opens the mobile navigation.
   */
  @Method()
  async showMobileNavigation() {
    this.mobileNavigationActive = true;
    this.collectNavItems();
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
    this.setSecondaryNavItemsTiled();
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
    this.toggleNavItemLabels();
  }

  private onNavigationToggleClick = () => {
    this.navigationCollapsed = !this.navigationCollapsed;
  };

  private onNavigationClick = () => {
    this.hideMobileNavigation();
  };

  private toggleNavItemLabels() {
    [...this.secondaryNavItems, ...this.mainNavItems].forEach((item) => {
      item.hideLabel = this.navigationCollapsed && this.isDesktopViewport;
    });
  }

  private setSecondaryNavItemsTiled() {
    this.secondaryNavItems.forEach((item) => {
      item.variant =
        this.enableSecondaryNavGridLayout &&
        (this.secondaryNavView === "grid" ||
          (this.navigationCollapsed && this.isDesktopViewport))
          ? this.secondaryNavGridLayoutVariant
          : "default";
    });
  }

  private restoreSecondaryNavState() {
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

  render() {
    const mainNavCollapsed = this.navigationCollapsed && this.isDesktopViewport;

    const hasSecondaryNav = Boolean(
      this.el.querySelector("[slot='secondary-nav']")
    );

    const className = classnames("shell-layout", {
      "shell-layout--branded-header": this.brandedHeader,
      "shell-layout--secondary-nav-collapsed": this.secondaryNavCollapsed,
      "shell-layout--has-secondary-nav": hasSecondaryNav,
      "shell-layout--mobile-navigation-active": this.mobileNavigationActive,
      "shell-layout--navigation-collapsed": mainNavCollapsed,
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
              <swirl-tooltip
                content={
                  this.navigationCollapsed
                    ? this.expandNavigationButtonLabel
                    : this.collapseNavigationButtonLabel
                }
                delay={100}
                position="right"
              >
                <button
                  class="shell-layout__header-tool"
                  onClick={this.onNavigationToggleClick}
                  type="button"
                >
                  {this.navigationCollapsed ? (
                    <swirl-icon-dock-left-expand
                      size={20}
                    ></swirl-icon-dock-left-expand>
                  ) : (
                    <swirl-icon-dock-left-collapse
                      size={20}
                    ></swirl-icon-dock-left-collapse>
                  )}
                  <swirl-visually-hidden>
                    {this.navigationCollapsed
                      ? this.expandNavigationButtonLabel
                      : this.collapseNavigationButtonLabel}
                  </swirl-visually-hidden>
                </button>
              </swirl-tooltip>
              <a
                class="shell-layout__header-tool"
                onClick={this.historyBackClick.emit}
                href="javascript:history.back()"
              >
                <swirl-icon-arrow-back size={20}></swirl-icon-arrow-back>
                <swirl-visually-hidden>
                  {this.browserBackButtonLabel}
                </swirl-visually-hidden>
              </a>
              <a
                class="shell-layout__header-tool"
                onClick={this.historyForwardClick.emit}
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
                <swirl-separator color="strong" spacing="16"></swirl-separator>
                {this.enableSecondaryNavGridLayout && (
                  <swirl-box paddingBlockEnd="16">
                    <swirl-stack
                      justify={mainNavCollapsed ? "center" : "space-between"}
                      orientation="horizontal"
                    >
                      <swirl-button
                        hideLabel={mainNavCollapsed}
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
                      {!mainNavCollapsed && !this.secondaryNavCollapsed && (
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
                    [`shell-layout__secondary-nav-items--${this.secondaryNavGridLayoutVariant}`]:
                      true,
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
        </div>
      </Host>
    );
  }
}
