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
import { debounce, isMobileViewport } from "../../utils";

/**
 * @slot app-bar - Custom app bar content (replaces the default app bar when provided)
 * @slot content - The main content
 * @slot content-header-tools - Button positioned next to the heading
 * @slot footer - Footer content positioned at the bottom of the layout
 * @slot heading - The main content's heading (only rendered if "heading" prop is not set).
 * @slot navigation - The main navigation
 * @slot overlays - Overlays like dialogs, modals and toasts
 * @slot user - The signed in user information at the bottom of the sidebar
 */
@Component({
  shadow: true,
  styleUrl: "swirl-console-layout.css",
  tag: "swirl-console-layout",
})
export class SwirlConsoleLayout {
  @Element() el: HTMLElement;

  @Prop() appName?: string;
  @Prop() backButonLabel?: string = "Back";
  @Prop() heading?: string;
  @Prop() helpButonLabel?: string = "Help";
  @Prop() hideNavigationButtonLabel?: string = "Hide main navigation";
  @Prop() logoText?: string = "Admin";
  @Prop() navigationLabel?: string = "Main";
  @Prop() maxContentWidth?: string;
  @Prop() showBackButton?: boolean;
  @Prop() showHelpButton?: boolean;
  @Prop() showNavigationButtonLabel?: string = "Show main navigation";
  @Prop() subheading?: string;

  @State() sidebarActive: boolean;
  @State() contentScrollState = {
    scrollable: false,
    scrolledToTop: false,
    scrolledToBottom: false,
  };
  @State() hasCustomAppBar: boolean;
  @State() hasFooter: boolean;
  @Event() backButtonClick: EventEmitter<MouseEvent>;
  @Event() helpButtonClick: EventEmitter<MouseEvent>;

  private sidebarEl: HTMLElement;
  private contentEl: HTMLElement;

  componentDidLoad() {
    queueMicrotask(() => {
      if (!isMobileViewport()) {
        this.activateSidebar();
      } else {
        this.deactivateSidebar();
      }

      // Update initial scroll state
      this.updateContentScrollState();

      // Update initial slot states
      this.updateCustomAppBarStatus();
      this.updateFooterStatus();
    });
  }

  private updateCustomAppBarStatus = () => {
    this.hasCustomAppBar = Boolean(this.el.querySelector('[slot="app-bar"]'));
  };

  private updateFooterStatus = () => {
    this.hasFooter = Boolean(this.el.querySelector('[slot="footer"]'));
  };

  private updateContentScrollState() {
    if (!this.contentEl) {
      return;
    }

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

  private onMainScroll = debounce(() => {
    this.updateContentScrollState();
  }, 16);

  @Listen("resize", { target: "window" })
  onWindowResize() {
    const mobileViewport = isMobileViewport();

    if (!mobileViewport && !this.sidebarActive) {
      this.activateSidebar();
    } else if (mobileViewport) {
      this.deactivateSidebar();
    }
  }

  /**
   * Toggle the mobile navigation visibility.
   */
  @Method()
  async toggleSidebar() {
    if (this.sidebarActive) {
      this.deactivateSidebar();
    } else {
      this.activateSidebar();
    }
  }

  /**
   * Show the mobile navigation.
   */
  @Method()
  async showSidebar() {
    if (!this.sidebarActive) {
      this.activateSidebar();
    }
  }

  /**
   * Hide the mobile navigation.
   */
  @Method()
  async hideSidebar() {
    if (this.sidebarActive) {
      this.deactivateSidebar();
    }
  }

  private activateSidebar() {
    this.sidebarActive = true;
    this.sidebarEl.removeAttribute("inert");

    if (isMobileViewport()) {
      this.el.querySelector("swirl-tree-navigation-item")?.focus();
    }
  }

  private deactivateSidebar() {
    this.sidebarActive = false;

    if (isMobileViewport()) {
      this.sidebarEl.setAttribute("inert", "");
    }
  }

  private onBackButtonClick = (event: MouseEvent) => {
    this.backButtonClick.emit(event);
  };

  private onHelpButtonClick = (event: MouseEvent) => {
    this.helpButtonClick.emit(event);
  };

  private onMobileNavigationToggleClick = () => {
    this.toggleSidebar();
  };

  private onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    const clickOnToggle = Boolean(
      target.closest(".console-layout__mobile-navigation-button")
    );

    const clickOnOverlay = target.closest("[slot]")?.slot === "overlays";
    const clickInsideSidebar = event.composedPath().includes(this.sidebarEl);

    if (
      !clickInsideSidebar &&
      !clickOnToggle &&
      !clickOnOverlay &&
      this.sidebarActive
    ) {
      this.deactivateSidebar();
    }
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape" && this.sidebarActive) {
      this.deactivateSidebar();
    }
  };

  render() {
    const contentStyles = Boolean(this.maxContentWidth)
      ? {
          maxWidth: this.maxContentWidth,
          justifySelf: "center",
          width: "100%",
        }
      : undefined;

    this.updateCustomAppBarStatus();
    this.updateFooterStatus();

    const className = classnames("console-layout", {
      "console-layout--sidebar-active": this.sidebarActive,
      "console-layout--empty-app-bar":
        !Boolean(this.appName) && !this.showHelpButton && !this.hasCustomAppBar,
      "console-layout--has-footer": this.hasFooter,
      "console-layout--has-custom-app-bar": this.hasCustomAppBar,
      "console-layout--main-scrollable": this.contentScrollState.scrollable,
      "console-layout--main-scrolled-to-top":
        this.contentScrollState.scrolledToTop,
      "console-layout--main-scrolled-to-bottom":
        this.contentScrollState.scrolledToBottom,
    });

    return (
      <Host>
        <div
          class={className}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
        >
          <header
            aria-hidden={String(!this.sidebarActive)}
            class="console-layout__sidebar"
            ref={(el) => (this.sidebarEl = el)}
          >
            <div class="console-layout__header">
              <div class="console-layout__logo">
                <svg
                  class="console-layout__logo-mark"
                  fill="none"
                  height="26"
                  viewBox="0 0 16 26"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.624238 14.0705C0.326496 13.5353 0.118077 12.9406 0.0287543 12.3161C-0.0307941 11.662 -0.0010199 11.0375 0.147851 10.4428C0.296722 9.84813 0.594464 9.25343 0.951754 8.77767C1.33882 8.27217 1.78543 7.85588 2.35114 7.55853L14.6181 0.362671C14.9159 0.8979 15.1243 1.4926 15.2136 2.11703C15.3029 2.74147 15.2434 3.3659 15.0945 3.99034C14.9456 4.58504 14.6479 5.17974 14.2906 5.6555C13.9035 6.16099 13.4569 6.57728 12.8912 6.87463L0.624238 14.0705Z"
                    fill="#145AF5"
                  />
                  <path
                    d="M3.69214 21.4743C3.3944 20.9391 3.18598 20.3444 3.09666 19.72C3.00733 19.0956 3.06688 18.4711 3.21575 17.8467C3.36462 17.252 3.66237 16.6573 4.01966 16.1815C4.40672 15.676 4.85333 15.2597 5.41904 14.9624L12.2076 10.9779C12.5053 11.5131 12.7137 12.1078 12.803 12.7323C12.8924 13.3567 12.8328 13.9811 12.6839 14.6056C12.5351 15.2003 12.2373 15.795 11.88 16.2707C11.493 16.7762 11.0464 17.1925 10.4807 17.4899L3.69214 21.4743Z"
                    fill="#145AF5"
                  />
                  <path
                    d="M3.69141 21.4739L7.77047 19.0951C8.39573 20.1953 8.5446 21.5036 8.24686 22.7228C7.91934 23.9419 7.14521 24.9826 6.04357 25.6368L3.69141 21.4739Z"
                    fill="#80A8F4"
                  />
                  <path
                    d="M12.2072 10.9785L7.32419 10.1459L0.625 14.0709L5.38887 14.9629L12.2072 10.9785Z"
                    fill="#80A8F4"
                  />
                </svg>
                <swirl-text class="console-layout__logo-text" weight="medium">
                  {this.logoText}
                </swirl-text>
              </div>
            </div>
            <nav
              aria-label={this.navigationLabel}
              class="console-layout__navigation"
            >
              <slot name="navigation"></slot>
            </nav>
            <div class="console-layout__user">
              <slot name="user"></slot>
            </div>
          </header>
          <main
            aria-labelledby={Boolean(this.appName) ? "app-name" : undefined}
            class="console-layout__main"
          >
            <header class="console-layout__app-bar console-layout__app-bar--custom">
              <slot
                name="app-bar"
                onSlotchange={this.updateCustomAppBarStatus}
              ></slot>
            </header>
            <header class="console-layout__app-bar">
              <span class="console-layout__mobile-navigation-button">
                <swirl-button
                  swirlAriaExpanded={String(this.sidebarActive)}
                  hideLabel
                  icon={
                    this.sidebarActive
                      ? "<swirl-icon-close></swirl-icon-close>"
                      : "<swirl-icon-menu></swirl-icon-menu>"
                  }
                  label={
                    this.sidebarActive
                      ? this.hideNavigationButtonLabel
                      : this.showNavigationButtonLabel
                  }
                  onClick={this.onMobileNavigationToggleClick}
                ></swirl-button>
              </span>
              <div class="console-layout__app-name">
                {this.appName && (
                  <swirl-heading
                    as="h1"
                    headingId="app-name"
                    level={4}
                    text={this.appName}
                  ></swirl-heading>
                )}
              </div>
              {this.showHelpButton && (
                <swirl-button
                  class="console-layout__help-button"
                  hideLabel
                  icon="<swirl-icon-help></swirl-icon-help>"
                  label={this.helpButonLabel}
                  onClick={this.onHelpButtonClick}
                ></swirl-button>
              )}
            </header>
            <section
              aria-labelledby="heading"
              class="console-layout__content"
              onScroll={this.onMainScroll}
              ref={(el) => (this.contentEl = el)}
            >
              <div class="console-layout__content-container">
                <header
                  class="console-layout__content-header"
                  style={contentStyles}
                >
                  {this.showBackButton && (
                    <swirl-button
                      class="console-layout__back-button"
                      hideLabel
                      icon="<swirl-icon-arrow-back></swirl-icon-arrow-back>"
                      label={this.backButonLabel}
                      onClick={this.onBackButtonClick}
                    ></swirl-button>
                  )}
                  {Boolean(this.heading) && (
                    <div class="console-layout__heading-container">
                      <swirl-heading
                        as={Boolean(this.appName) ? "h2" : "h1"}
                        class="console-layout__heading"
                        headingId="heading"
                        level={1}
                        text={this.heading}
                      ></swirl-heading>
                      {this.subheading && (
                        <swirl-text
                          class="console-layout__subheading"
                          color="subdued"
                        >
                          {this.subheading}
                        </swirl-text>
                      )}
                    </div>
                  )}
                  {!Boolean(this.heading) && (
                    <div class="console-layout__heading-container">
                      <slot name="heading"></slot>
                    </div>
                  )}
                  <div class="console-layout__content-header-tools">
                    <slot name="content-header-tools"></slot>
                  </div>
                </header>
                <div class="console-layout__integration" style={contentStyles}>
                  <slot name="content"></slot>
                </div>
              </div>
            </section>
            <footer class="console-layout__footer">
              <slot name="footer" onSlotchange={this.updateFooterStatus}></slot>
            </footer>
            <div class="console-layout__overlays">
              <slot name="overlays"></slot>
            </div>
          </main>
        </div>
      </Host>
    );
  }
}
