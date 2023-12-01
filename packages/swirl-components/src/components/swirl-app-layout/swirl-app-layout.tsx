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
  Watch,
} from "@stencil/core";
import classnames from "classnames";
import { isMobileViewport } from "../../utils";

export type SwirlAppLayoutMobileView = "navigation" | "body" | "sidebar";

export type SwirlAppLayoutTransitionStyle = "none" | "slides" | "dialog";

/**
 * @slot content - Main content area
 * @slot navigation - The navigation area content
 * @slot navigation-controls - Controls for the navigation header
 * @slot navigation-mobile-menu-button - Used to add a mobile shell layout menu button to navigation
 * @slot app-bar - The app bar contents
 * @slot custom-app-bar-back-button - Replaces the mobile default back button of the content app bar
 * @slot app-bar-mobile-menu-button - Used to add a mobile shell layout menu button to the app bar
 * @slot banner - Used to show a banner below the app bar
 * @slot sidebar - Content of the right sidebar
 * @slot custom-sidebar-header - Replaces the default sidebar header
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
  @Prop() ctaIcon?: string;
  @Prop() ctaLabel?: string;
  @Prop() hideAppBar?: boolean;
  @Prop() navigationBackButtonLabel?: string = "Go back";
  @Prop() navigationLabel?: string;
  @Prop() showNavigationBackButton?: boolean;
  @Prop() sidebarCloseButtonLabel?: string = "Close sidebar";
  @Prop() sidebarHeading?: string;
  @Prop() transitionStyle?: string = "slides";

  @State() hasCustomAppBarBackButton: boolean;
  @State() hasNavigation: boolean;
  @State() hasSidebar: boolean;
  @State() mobileView: SwirlAppLayoutMobileView = "navigation";
  @State() sidebarActive: boolean;
  @State() sidebarClosing: boolean;
  @State() transitioningFrom: string;
  @State() transitioningTo: string;

  @Event() ctaClick: EventEmitter<MouseEvent>;
  @Event() mobileViewChange: EventEmitter<SwirlAppLayoutMobileView>;
  @Event() navigationBackButtonClick: EventEmitter<MouseEvent>;
  @Event() sidebarToggle: EventEmitter<boolean>;

  private mutationObserver: MutationObserver;
  private sidebarClosingTimeout: NodeJS.Timeout;
  private transitionTimeout: NodeJS.Timeout;

  componentWillLoad() {
    this.mutationObserver = new MutationObserver(() => {
      this.updateCustomAppBarBackButtonStatus();
      this.updateNavigationStatus();
      this.updateSidebarStatus();
    });

    this.mutationObserver.observe(this.el, { childList: true });

    queueMicrotask(() => {
      this.updateCustomAppBarBackButtonStatus();
      this.updateSidebarStatus();
      this.updateNavigationStatus();
      this.checkMobileView();
    });
  }

  disconnectedCallback() {
    this.mutationObserver?.disconnect();
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

    this.sidebarActive = true;
    this.changeMobileView("sidebar");

    this.sidebarToggle.emit(true);
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

    const delay = isMobileViewport() ? 0 : 300;

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

    let delay = 0;

    if (this.transitionStyle === "slides") {
      delay = 400;
    } else if (this.transitionStyle === "dialog") {
      delay = 300;
    }

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

    const className = classnames(
      "app-layout",
      `app-layout--mobile-view-${this.mobileView}`,
      `app-layout--transitioning-from-${this.transitioningFrom}`,
      `app-layout--transitioning-to-${this.transitioningTo}`,
      `app-layout--transition-style-${this.transitionStyle}`,
      {
        "app-layout--has-app-bar-mobile-menu-button": hasAppBarMobileMenuButton,
        "app-layout--has-app-bar-controls": hasAppBarControls,
        "app-layout--has-custom-app-bar-back-button":
          this.hasCustomAppBarBackButton,
        "app-layout--has-custom-sidebar-header": hasCustomSidebarHeader,
        "app-layout--has-navigation": this.hasNavigation,
        "app-layout--has-sidebar": this.hasSidebar,
        "app-layout--hide-app-bar": this.hideAppBar,
        "app-layout--sidebar-active":
          this.mobileView === "sidebar" || this.sidebarActive,
        "app-layout--sidebar-closing": this.sidebarClosing,
      }
    );

    return (
      <Host>
        <section
          aria-labelledby="app-name"
          class={className}
          role="document"
          tabIndex={0}
        >
          <div class="app-layout__grid">
            <header class="app-layout__header">
              <span class="app-layout__navigation-mobile-menu-button">
                <slot name="navigation-mobile-menu-button"></slot>
              </span>
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
              {this.hasNavigation && (
                <span class="app-layout__navigation-controls">
                  <slot name="navigation-controls"></slot>
                </span>
              )}
            </header>
            <nav
              aria-label={this.navigationLabel}
              class="app-layout__navigation"
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
              <div class="app-layout__content">
                <slot name="content"></slot>
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
              <div class="app-layout__sidebar-content">
                <slot name="sidebar"></slot>
              </div>
            </aside>
            {this.ctaLabel && (
              <span class="app-layout__floating-cta">
                <swirl-button
                  hideLabel={Boolean(this.ctaIcon)}
                  icon={this.ctaIcon}
                  intent="primary"
                  label={this.ctaLabel}
                  onClick={this.onCtaClick}
                  variant="floating"
                ></swirl-button>
              </span>
            )}
          </div>
        </section>
      </Host>
    );
  }
}
