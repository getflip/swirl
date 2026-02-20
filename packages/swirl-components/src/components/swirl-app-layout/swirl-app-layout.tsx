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
import { DesktopMediaQuery } from "../../services/media-query.service";
import { debounce, isMobileViewport, prefersReducedMotion } from "../../utils";

export type SwirlAppLayoutMobileView = "navigation" | "body" | "sidebar";

export type SwirlAppLayoutNavigationExpansionState =
  | "expanded"
  | "collapsed"
  | "overlayed";

export type SwirlAppLayoutSidebarPositioning = "auto" | "overlay";

const SWIRL_APP_LAYOUT_NAV_EXPANSION_STATE_STORAGE_KEY =
  "SWIRL_APP_LAYOUT_NAV_EXPANSION_STATE";

/**
 * @slot content - Main content area
 * @slot navigation - The navigation area content
 * @slot navigation-controls - Controls for the navigation header
 * @slot navigation-mobile-menu-button - Used to add a mobile shell layout menu button to navigation
 * @slot app-bar - The app bar contents
 * @slot bottom-bar - The bottom bar contents
 * @slot custom-app-bar-back-button - Replaces the mobile default back button of the content app bar
 * @slot app-bar-mobile-menu-button - Used to add a mobile shell layout menu button to the app bar
 * @slot banner - Used to show a banner below the app bar
 * @slot sidebar - Content of the right sidebar
 * @slot custom-sidebar-header - Replaces the default sidebar header
 * @slot floating-action-button - Floating button displayed in the bottom right corner
 */
@Component({
  shadow: true,
  styleUrl: "swirl-app-layout.css",
  tag: "swirl-app-layout",
})
export class SwirlAppLayout {
  @Element() el: HTMLElement;

  @Prop() appName!: string;
  @Prop() backToNavigationViewButtonLabel?: string = "Back to navigation";
  @Prop() collapsibleNavigation?: boolean;
  @Prop() ctaIcon?: string;
  @Prop() ctaLabel?: string;
  @Prop({ mutable: true }) hasNavigation: boolean;
  @Prop() hideAppBar?: boolean;
  @Prop() initialMobileView?: SwirlAppLayoutMobileView;
  @Prop() navigationBackButtonLabel?: string = "Go back";
  @Prop() navigationExpansionStateStorageKey?: string =
    SWIRL_APP_LAYOUT_NAV_EXPANSION_STATE_STORAGE_KEY;
  @Prop() navigationToggleLabel?: string = "Toggle navigation";
  @Prop() navigationOverlayLabel?: string = "Show navigation";
  @Prop() navigationLabel?: string;
  @Prop() roundedCorners?: boolean;
  @Prop() showNavigationBackButton?: boolean;
  @Prop() sidebarPositioning?: SwirlAppLayoutSidebarPositioning = "auto";
  @Prop() sidebarCloseButtonLabel?: string = "Close sidebar";
  @Prop() sidebarHeading?: string;
  @Prop() transitionStyle?: string = "slides";

  @State() contentScrollState = {
    scrollable: false,
    scrolledToTop: false,
    scrolledToBottom: false,
  };
  @State() hasBottomBar: boolean;
  @State() hasCustomAppBarBackButton: boolean;
  @State() hasSidebar: boolean;
  @State() isDesktop: boolean;
  @State() mobileView: SwirlAppLayoutMobileView = "navigation";
  @State() navScrollState = {
    scrollable: false,
    scrolledToTop: false,
  };
  @State() navExpansionState: SwirlAppLayoutNavigationExpansionState =
    "expanded";
  @State() sidebarActive: boolean;
  @State() sidebarClosing: boolean;
  @State() sidebarOpening: boolean;
  @State() sidebarScrollState = {
    scrollable: false,
    scrolledToTop: false,
  };
  @State() transitioningFrom: string;
  @State() transitioningTo: string;

  @Event() ctaClick: EventEmitter<MouseEvent>;
  @Event() mobileViewChange: EventEmitter<SwirlAppLayoutMobileView>;
  @Event() navigationBackButtonClick: EventEmitter<MouseEvent>;
  @Event()
  navigationExpansionStateChange: EventEmitter<SwirlAppLayoutNavigationExpansionState>;
  @Event() sidebarToggle: EventEmitter<boolean>;

  private contentEl: HTMLElement;
  private headerEl: HTMLElement;
  private mutationObserver: MutationObserver;
  private navEl: HTMLElement;
  private sidebarClosingTimeout: NodeJS.Timeout;
  private sidebarOpeningTimeout: NodeJS.Timeout;
  private sidebarEl: HTMLElement;
  private transitionTimeout: NodeJS.Timeout;
  private mediaQueryUnsubscribe: () => void = () => {};

  componentWillLoad() {
    if (this.initialMobileView) {
      this.mobileView = this.initialMobileView;
    }

    this.mutationObserver = new MutationObserver(() => {
      this.updateBottomBarStatus();
      this.updateCustomAppBarBackButtonStatus();
      this.updateNavigationStatus();
      this.updateSidebarStatus();
    });

    this.mutationObserver.observe(this.el, { childList: true });

    queueMicrotask(() => {
      this.updateBottomBarStatus();
      this.updateCustomAppBarBackButtonStatus();
      this.updateSidebarStatus();
      this.updateNavigationStatus();
      this.checkMobileView();
    });
  }

  componentDidLoad() {
    this.mediaQueryUnsubscribe = DesktopMediaQuery.subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });

    queueMicrotask(() => {
      this.restoreNavExpansionState();
      this.updateContentScrollState();
      this.updateSidebarScrollState();
      this.updateNavScrollState();
    });
  }

  disconnectedCallback() {
    this.mediaQueryUnsubscribe();
    this.mutationObserver?.disconnect();
  }

  @Listen("click", { target: "document" })
  onDocumentClick(event: MouseEvent) {
    if (!this.collapsibleNavigation || this.navExpansionState !== "overlayed") {
      return;
    }

    const clickedInsideOfOverlayedNav =
      event.composedPath().includes(this.navEl) ||
      event.composedPath().includes(this.headerEl);

    if (!clickedInsideOfOverlayedNav) {
      this.setCollapsibleNavigationState("collapsed");
    }
  }

  @Listen("keydown")
  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && this.navExpansionState === "overlayed") {
      this.setCollapsibleNavigationState("collapsed");
    }
  }

  @Watch("mobileView")
  watchMobileView() {
    this.checkMobileView();
  }

  /**
   * Show the sidebar
   */
  @Method()
  async showSidebar() {
    if (this.sidebarActive || !this.hasSidebar) {
      return;
    }

    if (Boolean(this.sidebarOpeningTimeout)) {
      clearTimeout(this.sidebarOpeningTimeout);
    }

    this.sidebarOpening = true;

    const delay = isMobileViewport() || prefersReducedMotion() ? 0 : 300;

    this.sidebarOpeningTimeout = setTimeout(() => {
      this.sidebarActive = true;
      this.sidebarOpening = false;

      this.changeMobileView("sidebar");
      this.sidebarToggle.emit(true);
    }, delay);
  }

  /**
   * Hide the sidebar
   */
  @Method()
  async hideSidebar() {
    if (!this.sidebarActive || !this.hasSidebar) {
      return;
    }

    if (Boolean(this.sidebarClosingTimeout)) {
      clearTimeout(this.sidebarClosingTimeout);
    }

    this.sidebarClosing = true;

    // 10ms offset to prevent the sidebar from flickering when closing
    const delay = isMobileViewport() || prefersReducedMotion() ? 0 : 300 - 10;

    this.sidebarClosingTimeout = setTimeout(() => {
      this.sidebarActive = false;
      this.sidebarClosing = false;

      this.changeMobileView("body");
      this.sidebarToggle.emit(false);
    }, delay);
  }

  /**
   * Toggle the sidebar
   */
  @Method()
  async toggleSidebar() {
    if (!this.hasSidebar) {
      return;
    }

    if (this.sidebarActive) {
      this.hideSidebar();
    } else {
      this.showSidebar();
    }
  }

  /**
   * Get state of the collapsible navigation
   */
  @Method()
  async getCollapsibleNavigationState() {
    return this.navExpansionState;
  }

  /**
   * Set state of the collapsible navigation
   */
  @Method()
  async setCollapsibleNavigationState(
    state: SwirlAppLayoutNavigationExpansionState
  ) {
    if (!this.collapsibleNavigation) {
      return;
    }

    this.navExpansionState = state;

    this.navigationExpansionStateChange.emit(this.navExpansionState);

    localStorage.setItem(
      this.navigationExpansionStateStorageKey,
      this.navExpansionState
    );
  }

  /**
   * Change the currently displayed view on mobile viewports
   * @param mobileView
   */
  @Method()
  async changeMobileView(
    mobileView: SwirlAppLayoutMobileView,
    transition: boolean = true
  ) {
    if (
      this.mobileView === mobileView ||
      (mobileView === "navigation" && !this.hasNavigation) ||
      (mobileView === "sidebar" && !this.hasSidebar)
    ) {
      return;
    }

    const mobile = isMobileViewport();

    if (!mobile || !transition) {
      this.mobileView = mobileView;
      this.mobileViewChange.emit(this.mobileView);
      return;
    }

    if (Boolean(this.transitionTimeout)) {
      clearTimeout(this.transitionTimeout);
    }

    this.transitioningFrom = this.mobileView;
    this.transitioningTo = mobileView;

    const userPrefersReducedMotion = prefersReducedMotion();

    const delay = userPrefersReducedMotion
      ? 0
      : this.transitionStyle === "slides"
      ? 400
      : this.transitionStyle === "dialog"
      ? 300
      : 0;

    this.transitionTimeout = setTimeout(() => {
      this.mobileView = mobileView;
      this.transitioningFrom = undefined;
      this.transitioningTo = undefined;

      this.mobileViewChange.emit(this.mobileView);
    }, delay);
  }

  private checkMobileView() {
    if (
      (this.mobileView === "navigation" && !this.hasNavigation) ||
      (this.mobileView === "sidebar" && !this.hasSidebar)
    ) {
      this.mobileView = "body";
      return;
    }

    const sidebarActive = this.mobileView === "sidebar" || this.sidebarActive;

    if (sidebarActive === this.sidebarActive) {
      return;
    }

    if (sidebarActive) {
      this.showSidebar();
    } else {
      this.hideSidebar();
    }
  }

  private updateBottomBarStatus() {
    this.hasBottomBar = Boolean(
      this.el.querySelector('[slot="bottom-bar"]')
    );
  }

  private updateNavigationStatus() {
    this.hasNavigation = Boolean(this.el.querySelector('[slot="navigation"]'));
  }

  private updateCustomAppBarBackButtonStatus() {
    this.hasCustomAppBarBackButton = Boolean(
      this.el.querySelector('[slot="custom-app-bar-back-button"]')
    );
  }

  private updateSidebarStatus() {
    this.hasSidebar = Boolean(this.el.querySelector('[slot="sidebar"]'));
  }

  private onBackToNavigationViewButtonClick = () => {
    this.changeMobileView("navigation");
  };

  private onCtaClick = (event: MouseEvent) => {
    this.ctaClick.emit(event);
  };

  private onNavigationBackButtonClick = (event: MouseEvent) => {
    this.navigationBackButtonClick.emit(event);
  };

  private onSidebarCloseButtonClick = () => {
    this.hideSidebar();
  };

  private updateContentScrollState() {
    const newContentScrollState = {
      scrollable: this.contentEl.scrollHeight > this.contentEl.clientHeight,
      scrolledToTop: this.contentEl.scrollTop === 0,
      scrolledToBottom:
        Math.round(this.contentEl.scrollTop + this.contentEl.clientHeight) >=
        this.contentEl.scrollHeight,
    };

    if (
      Object.keys(newContentScrollState).some(
        (key) => newContentScrollState[key] !== this.contentScrollState[key]
      )
    ) {
      this.contentScrollState = newContentScrollState;
    }
  }

  private onContentScroll = debounce(() => {
    this.updateContentScrollState();
  }, 16);

  private updateNavScrollState() {
    const newNavScrollState = {
      scrollable: this.navEl.scrollHeight > this.navEl.clientHeight,
      scrolledToTop: this.navEl.scrollTop === 0,
    };

    if (
      Object.keys(newNavScrollState).some(
        (key) => newNavScrollState[key] !== this.navScrollState[key]
      )
    ) {
      this.navScrollState = newNavScrollState;
    }
  }

  private onNavScroll = debounce(() => {
    this.updateNavScrollState();
  }, 16);

  private updateSidebarScrollState() {
    const newSidebarScrollState = {
      scrollable: this.sidebarEl.scrollHeight > this.sidebarEl.clientHeight,
      scrolledToTop: this.sidebarEl.scrollTop === 0,
    };

    if (
      Object.keys(newSidebarScrollState).some(
        (key) => newSidebarScrollState[key] !== this.sidebarScrollState[key]
      )
    ) {
      this.sidebarScrollState = newSidebarScrollState;
    }
  }

  private onSidebarScroll = debounce(() => {
    this.updateSidebarScrollState();
  }, 16);

  private toggleNavigation = () => {
    if (!this.collapsibleNavigation) {
      return;
    }

    const newNavExpansionState =
      this.navExpansionState === "expanded" ? "collapsed" : "expanded";

    this.setCollapsibleNavigationState(newNavExpansionState);
  };

  private overlayNavigation = (event: MouseEvent) => {
    event.stopPropagation();
    this.setCollapsibleNavigationState("overlayed");
  };

  private restoreNavExpansionState() {
    if (!this.collapsibleNavigation) {
      return;
    }

    const restoredNavExpansionState = localStorage.getItem(
      this.navigationExpansionStateStorageKey
    ) as SwirlAppLayoutNavigationExpansionState | undefined;

    if (Boolean(restoredNavExpansionState)) {
      this.setCollapsibleNavigationState(restoredNavExpansionState);
    }
  }

  render() {
    const showBackToNavigationButton =
      (this.mobileView === "body" || this.transitioningTo) &&
      this.hasNavigation &&
      !this.hasCustomAppBarBackButton;

    const hasAppBarControls = Boolean(
      this.el.querySelector('[slot="app-bar-controls"]')
    );

    const hasAppBarMobileMenuButton = Boolean(
      this.el.querySelector('[slot="app-bar-mobile-menu-button"]')
    );

    const hasCustomSidebarHeader = Boolean(
      this.el.querySelector('[slot="custom-sidebar-header"]')
    );

    const hasFloatingActionButton =
      Boolean(this.el.querySelector('[slot="floating-action-button"]')) ||
      Boolean(this.ctaLabel);

    const navigationActive =
      this.hasNavigation &&
      (!this.collapsibleNavigation ||
        this.navExpansionState !== "collapsed" ||
        !this.isDesktop);

    const className = classnames(
      "app-layout",
      `app-layout--mobile-view-${this.mobileView}`,
      `app-layout--nav-${this.isDesktop ? this.navExpansionState : "expanded"}`,
      `app-layout--transitioning-from-${this.transitioningFrom}`,
      `app-layout--transitioning-to-${this.transitioningTo}`,
      `app-layout--transition-style-${this.transitionStyle}`,
      `app-layout--sidebar-positioning-${this.sidebarPositioning}`,
      {
        "app-layout--content-scrollable": this.contentScrollState.scrollable,
        "app-layout--content-scrolled-to-top":
          this.contentScrollState.scrolledToTop,
        "app-layout--content-scrolled-to-bottom":
          this.contentScrollState.scrolledToBottom,
        "app-layout--has-app-bar-mobile-menu-button": hasAppBarMobileMenuButton,
        "app-layout--has-app-bar-controls": hasAppBarControls,
        "app-layout--has-bottom-bar": this.hasBottomBar,
        "app-layout--has-custom-app-bar-back-button":
          this.hasCustomAppBarBackButton,
        "app-layout--has-custom-sidebar-header": hasCustomSidebarHeader,
        "app-layout--has-floating-action-button": hasFloatingActionButton,
        "app-layout--has-navigation": this.hasNavigation,
        "app-layout--has-sidebar": this.hasSidebar,
        "app-layout--hide-app-bar": this.hideAppBar,
        "app-layout--nav-collapsible":
          this.collapsibleNavigation && this.isDesktop,
        "app-layout--nav-scrollable": this.navScrollState.scrollable,
        "app-layout--nav-scrolled-to-top": this.navScrollState.scrolledToTop,
        "app-layout--rounded-corners": this.roundedCorners,
        "app-layout--sidebar-active":
          this.mobileView === "sidebar" || this.sidebarActive,
        "app-layout--sidebar-closing": this.sidebarClosing,
        "app-layout--sidebar-opening": this.sidebarOpening,
        "app-layout--sidebar-scrollable": this.sidebarScrollState.scrollable,
        "app-layout--sidebar-scrolled-to-top":
          this.sidebarScrollState.scrolledToTop,
      }
    );

    return (
      <Host>
        <section aria-labelledby="app-name" class={className}>
          <div class="app-layout__grid">
            <header
              class="app-layout__header"
              ref={(el) => (this.headerEl = el)}
            >
              <span class="app-layout__navigation-mobile-menu-button">
                <slot name="navigation-mobile-menu-button"></slot>
              </span>
              {this.collapsibleNavigation && (
                <span class="app-layout__nav-overlay-toggle">
                  <swirl-button
                    hideLabel
                    icon={
                      this.navExpansionState !== "expanded"
                        ? "<swirl-icon-dock-left-expand></swirl-icon-dock-left-expand>"
                        : "<swirl-icon-dock-left-collapse></swirl-icon-dock-left-collapse>"
                    }
                    label={this.navigationToggleLabel}
                    onClick={this.toggleNavigation}
                  ></swirl-button>
                </span>
              )}
              {this.showNavigationBackButton && (
                <span class="app-layout__navigation-back-button">
                  <swirl-button
                    hideLabel
                    icon="<swirl-icon-arrow-back></swirl-icon-arrow-back>"
                    label={this.navigationBackButtonLabel}
                    onClick={this.onNavigationBackButtonClick}
                  ></swirl-button>
                </span>
              )}
              <swirl-heading
                as="h1"
                class="app-layout__app-name"
                headingId="app-name"
                level={3}
                text={this.appName}
              ></swirl-heading>
              {navigationActive && (
                <span class="app-layout__navigation-controls">
                  <slot name="navigation-controls"></slot>
                </span>
              )}
            </header>
            <nav
              aria-label={this.navigationLabel}
              class="app-layout__navigation"
              onScroll={this.onNavScroll}
              ref={(el) => (this.navEl = el)}
              {...{
                inert:
                  this.isDesktop &&
                  this.collapsibleNavigation &&
                  this.navExpansionState === "collapsed",
              }}
            >
              <slot name="navigation"></slot>
            </nav>
            <section aria-labelledby="app-name" class="app-layout__body">
              {!this.hideAppBar && (
                <header class="app-layout__app-bar">
                  <span class="app-layout__app-bar-mobile-menu-button">
                    <slot name="app-bar-mobile-menu-button"></slot>
                  </span>
                  {showBackToNavigationButton && (
                    <span class="app-layout__back-to-navigation-button">
                      <swirl-button
                        hideLabel
                        icon={
                          this.transitionStyle === "dialog"
                            ? "<swirl-icon-close></swirl-icon-close>"
                            : "<swirl-icon-arrow-back></swirl-icon-arrow-back>"
                        }
                        label={this.backToNavigationViewButtonLabel}
                        onClick={this.onBackToNavigationViewButtonClick}
                      ></swirl-button>
                    </span>
                  )}
                  {this.collapsibleNavigation &&
                    this.navExpansionState !== "expanded" && (
                      <span class="app-layout__nav-expansion-toggle">
                        <swirl-button
                          hideLabel
                          icon="<swirl-icon-hamburger-menu></swirl-icon-hamburger-menu>"
                          label={this.navigationOverlayLabel}
                          onClick={this.overlayNavigation}
                        ></swirl-button>
                      </span>
                    )}
                  <span class="app-layout__custom-app-bar-back-button">
                    <slot name="custom-app-bar-back-button"></slot>
                  </span>
                  <div class="app-layout__app-bar-content">
                    <slot name="app-bar"></slot>
                  </div>
                  <div class="app-layout__app-bar-controls">
                    <slot name="app-bar-controls"></slot>
                  </div>
                </header>
              )}
              <div class="app-layout__banner">
                <slot name="banner"></slot>
              </div>
              <div
                class="app-layout__content"
                onScroll={this.onContentScroll}
                ref={(el) => (this.contentEl = el)}
              >
                <slot name="content"></slot>
              </div>
              <div class="app-layout__bottom-bar">
                <slot name="bottom-bar"></slot>
              </div>
            </section>
            <aside class="app-layout__sidebar">
              <header class="app-layout__custom-sidebar-header">
                <slot name="custom-sidebar-header"></slot>
              </header>
              <header class="app-layout__sidebar-header">
                <swirl-button
                  class="app-layout__sidebar-close-button"
                  hideLabel
                  icon="<swirl-icon-close></swirl-icon-close>"
                  label={this.sidebarCloseButtonLabel}
                  onClick={this.onSidebarCloseButtonClick}
                ></swirl-button>
                <swirl-heading
                  as="h3"
                  class="app-layout__sidebar-heading"
                  headingId="sidebar-heading"
                  level={3}
                  text={this.sidebarHeading}
                ></swirl-heading>
              </header>
              <div
                class="app-layout__sidebar-content"
                onScroll={this.onSidebarScroll}
                ref={(el) => (this.sidebarEl = el)}
              >
                <slot name="sidebar"></slot>
              </div>
            </aside>
            <span class="app-layout__floating-action-button">
              {this.ctaLabel && (
                <swirl-button
                  hideLabel={Boolean(this.ctaIcon)}
                  icon={this.ctaIcon}
                  intent="primary"
                  label={this.ctaLabel}
                  onClick={this.onCtaClick}
                  variant="floating"
                ></swirl-button>
              )}
              <slot name="floating-action-button"></slot>
            </span>
          </div>
        </section>
      </Host>
    );
  }
}
