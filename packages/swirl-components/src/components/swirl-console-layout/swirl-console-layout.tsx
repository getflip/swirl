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
  @Prop() hideContentHeader?: boolean;

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
      "console-layout--hide-content-header": this.hideContentHeader,
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
                  viewBox="0 0 301 460"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.52486 276.36C5.57709 289.149 11.02 301.094 18.2296 311.628L258.719 138.748C269.874 131.507 278.35 121.993 285.395 110.766C291.904 100.212 296.922 87.3014 298.875 74.6738C300.769 61.4277 300.809 48.353 297.757 35.5639C294.705 22.7748 289.262 10.8302 282.052 0.296051L41.5626 173.176C30.4077 180.417 21.9314 189.931 14.8867 201.158C8.37746 211.712 3.35926 224.623 1.40724 237.25C-0.544773 249.878 0.0338964 262.896 2.52486 276.36ZM80.3121 424.184C83.3644 436.973 88.8073 448.918 96.0169 459.452L229.113 363.743C240.268 356.502 248.744 346.988 255.789 335.761C262.298 325.207 267.317 312.296 269.269 299.668C271.164 286.422 271.203 273.348 268.151 260.559C265.099 247.769 259.656 235.825 252.446 225.291L119.35 320.999C108.195 328.24 99.7187 337.755 92.674 348.982C86.1647 359.535 81.1465 372.446 79.1945 385.074C77.2996 398.32 77.2599 411.395 80.3121 424.184Z"
                    fill="#2151F5"
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
                {!this.hideContentHeader && (
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
                )}
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
