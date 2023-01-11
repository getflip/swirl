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

@Component({
  shadow: true,
  styleUrl: "swirl-app-layout.css",
  tag: "swirl-app-layout",
})
export class SwirlAppLayout {
  @Element() el: HTMLElement;

  @Prop() appBarMedia?: string;
  @Prop() appName!: string;
  @Prop() backToNavigationViewButtonLabel?: string = "Back to navigation";
  @Prop() ctaIcon?: string;
  @Prop() ctaLabel?: string;
  @Prop() heading?: string;
  @Prop() navigationBackButtonLabel?: string = "Go back";
  @Prop() navigationLabel?: string;
  @Prop() showNavigationBackButton?: boolean;
  @Prop() sidebarCloseButtonLabel?: string = "Close sidebar";
  @Prop() sidebarHeading?: string;
  @Prop() subheading?: string;
  @Prop() transitionStyle?: string = "slides";

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
      this.updateNavigationStatus();
      this.updateSidebarStatus();
    });

    this.mutationObserver.observe(this.el, { childList: true });

    queueMicrotask(() => {
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
      this.hasNavigation;

    const className = classnames(
      "app-layout",
      `app-layout--mobile-view-${this.mobileView}`,
      `app-layout--transitioning-from-${this.transitioningFrom}`,
      `app-layout--transitioning-to-${this.transitioningTo}`,
      `app-layout--transition-style-${this.transitionStyle}`,
      {
        "app-layout--has-navigation": this.hasNavigation,
        "app-layout--has-sidebar": this.hasSidebar,
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
              {this.showNavigationBackButton && (
                <span class="app-layout__navigation-back-button">
                  <swirl-button
                    hideLabel
                    icon="<swirl-icon-arrow-back></swirl-icon-arrow-back>"
                    intent="primary"
                    label={this.navigationBackButtonLabel}
                    onClick={this.onNavigationBackButtonClick}
                  ></swirl-button>
                </span>
              )}
              <swirl-heading
                as="h1"
                class="app-layout__app-name"
                headingId="app-name"
                level={2}
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
            <section
              aria-labelledby={this.hasNavigation ? "heading" : "app-name"}
              class="app-layout__body"
            >
              {this.hasNavigation ? (
                <header class="app-layout__app-bar">
                  {showBackToNavigationButton && (
                    <span class="app-layout__back-to-navigation-button">
                      <swirl-button
                        hideLabel
                        icon={
                          this.transitionStyle === "dialog"
                            ? "<swirl-icon-close></swirl-icon-close>"
                            : "<swirl-icon-arrow-back></swirl-icon-arrow-back>"
                        }
                        intent="primary"
                        label={this.backToNavigationViewButtonLabel}
                        onClick={this.onBackToNavigationViewButtonClick}
                      ></swirl-button>
                    </span>
                  )}
                  {this.appBarMedia && (
                    <div
                      class="app-layout__app-bar-media"
                      innerHTML={this.appBarMedia}
                    ></div>
                  )}
                  <div class="app-layout__app-bar-heading">
                    {this.heading && (
                      <swirl-heading
                        as="h2"
                        headingId="heading"
                        level={4}
                        text={this.heading}
                      ></swirl-heading>
                    )}
                    {this.subheading && (
                      <span class="app-layout__app-bar-subheading">
                        {this.subheading}
                      </span>
                    )}
                  </div>
                  <div class="app-layout__app-bar-controls">
                    <slot name="app-bar-controls"></slot>
                  </div>
                </header>
              ) : (
                <header class="app-layout__app-bar">
                  <swirl-heading
                    as="h1"
                    headingId="app-name"
                    level={2}
                    text={this.appName}
                  ></swirl-heading>
                  <span class="app-layout__navigation-controls">
                    <slot name="navigation-controls"></slot>
                  </span>
                </header>
              )}
              <div class="app-layout__content">
                <slot name="content"></slot>
              </div>
            </section>
            <aside class="app-layout__sidebar">
              <header class="app-layout__sidebar-header">
                <swirl-button
                  class="app-layout__sidebar-close-button"
                  hideLabel
                  icon="<swirl-icon-close></swirl-icon-close>"
                  intent="primary"
                  label={this.sidebarCloseButtonLabel}
                  onClick={this.onSidebarCloseButtonClick}
                ></swirl-button>
                <swirl-heading
                  as="h3"
                  class="app-layout__sidebar-heading"
                  headingId="sidebar-heading"
                  level={2}
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
