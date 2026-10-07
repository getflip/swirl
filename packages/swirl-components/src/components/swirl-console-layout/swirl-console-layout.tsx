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
 * @slot logo - Custom logo (forwarded to the sidebar navigation)
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
  @Prop() sidebarVisibilityStateStorageKey?: string =
    "SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE";
  @Prop() subheading?: string;
  @Prop() hideContentHeader?: boolean;

  @State() sidebarActive: boolean;
  @State() contentScrollState = {
    scrollable: false,
    scrolledToTop: false,
    scrolledToBottom: false,
  };
  @State() hasCustomAppBar: boolean;
  @State() hasCustomLogo: boolean;
  @State() hasFooter: boolean;
  @Event() backButtonClick: EventEmitter<MouseEvent>;
  @Event() helpButtonClick: EventEmitter<MouseEvent>;
  @Event() sidebarVisibilityChange: EventEmitter<boolean>;

  private contentEl: HTMLElement;
  private pendingFocus?: "collapse-button" | "toggle";
  private sidebarEl: HTMLElement;

  componentWillLoad() {
    // Seed the initial state before the first render to avoid a visible
    // collapse/expand transition on load
    if (typeof window !== "undefined" && Boolean(window.matchMedia)) {
      this.sidebarActive = !isMobileViewport() && this.getStoredSidebarState();
    }
  }

  componentDidLoad() {
    queueMicrotask(() => {
      // Sync the inert attribute with the initial state seeded in
      // componentWillLoad, without emitting sidebarVisibilityChange
      if (this.sidebarActive) {
        this.sidebarEl?.removeAttribute("inert");
      } else {
        this.sidebarEl?.setAttribute("inert", "");
      }

      // Update initial scroll state
      this.updateContentScrollState();

      // Update initial slot states
      this.updateCustomAppBarStatus();
      this.updateCustomLogoStatus();
      this.updateFooterStatus();
    });
  }

  private updateCustomAppBarStatus = () => {
    this.hasCustomAppBar = Boolean(this.el.querySelector('[slot="app-bar"]'));
  };

  private updateCustomLogoStatus = () => {
    // The forwarding slot is only rendered when a logo is actually slotted;
    // otherwise it would suppress the sidebar navigation's logo fallback
    this.hasCustomLogo = Boolean(this.el.querySelector('[slot="logo"]'));
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

    if (mobileViewport) {
      if (this.sidebarActive) {
        this.deactivateSidebar(false);
      }
    } else if (this.getStoredSidebarState() !== this.sidebarActive) {
      this.restoreSidebarState();
    }
  }

  /**
   * Toggle the sidebar visibility.
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
   * Show the sidebar.
   */
  @Method()
  async showSidebar() {
    if (!this.sidebarActive) {
      this.activateSidebar();
    }
  }

  /**
   * Hide the sidebar.
   */
  @Method()
  async hideSidebar() {
    if (this.sidebarActive) {
      this.deactivateSidebar();
    }
  }

  private restoreSidebarState() {
    if (this.getStoredSidebarState()) {
      this.activateSidebar(false);
    } else {
      this.deactivateSidebar(false);
    }
  }

  private getStoredSidebarState(): boolean {
    try {
      return (
        localStorage.getItem(this.sidebarVisibilityStateStorageKey) !== "false"
      );
    } catch {
      return true;
    }
  }

  private storeSidebarState(active: boolean) {
    try {
      localStorage.setItem(
        this.sidebarVisibilityStateStorageKey,
        String(active)
      );
    } catch {
      // localStorage is unavailable; state is not persisted
    }
  }

  private activateSidebar(moveFocus: boolean = true) {
    this.sidebarActive = true;
    this.sidebarEl?.removeAttribute("inert");

    if (isMobileViewport()) {
      if (moveFocus) {
        this.el.querySelector("swirl-tree-navigation-item")?.focus();
      }
    } else {
      this.storeSidebarState(true);

      if (moveFocus) {
        this.pendingFocus = "collapse-button";
      }
    }

    this.sidebarVisibilityChange.emit(true);
  }

  private deactivateSidebar(moveFocus: boolean = true) {
    this.sidebarActive = false;
    this.sidebarEl?.setAttribute("inert", "");

    if (!isMobileViewport()) {
      this.storeSidebarState(false);
    }

    if (moveFocus) {
      this.pendingFocus = "toggle";
    }

    this.sidebarVisibilityChange.emit(false);
  }

  componentDidUpdate() {
    // Focus moves must happen after the re-render is committed: the toggle
    // buttons mount/unmount and the sidebar's visibility changes with the
    // sidebar state, so focusing earlier is dropped by the browser
    if (this.pendingFocus === "toggle") {
      this.focusSidebarToggle();
    } else if (this.pendingFocus === "collapse-button") {
      (
        this.sidebarEl as HTMLSwirlSidebarNavigationElement
      )?.focusCollapseButton?.();
    }

    this.pendingFocus = undefined;
  }

  /**
   * Move focus to the visible sidebar toggle after the sidebar was hidden,
   * so keyboard users don't lose their place
   */
  private focusSidebarToggle() {
    const candidates = [
      this.el.shadowRoot.querySelector<HTMLElement>(
        ".console-layout__show-sidebar-button"
      ),
      this.el.shadowRoot.querySelector<HTMLElement>(
        ".console-layout__mobile-navigation-button button"
      ),
    ];

    candidates.find((el) => Boolean(el) && el.offsetWidth > 0)?.focus();
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

  private onSidebarCollapseButtonClick = () => {
    this.hideSidebar();
  };

  private onShowSidebarButtonClick = () => {
    this.showSidebar();
  };

  private onClick = (event: MouseEvent) => {
    if (!isMobileViewport()) {
      return;
    }

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
    if (!isMobileViewport()) {
      return;
    }

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
    this.updateCustomLogoStatus();
    this.updateFooterStatus();

    const className = classnames("console-layout", {
      "console-layout--sidebar-active": this.sidebarActive,
      "console-layout--sidebar-hidden": !this.sidebarActive,
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
          <swirl-sidebar-navigation
            appName={this.logoText}
            aria-hidden={String(!this.sidebarActive)}
            class="console-layout__sidebar"
            collapseButtonLabel={this.hideNavigationButtonLabel}
            id="sidebar"
            navigationLabel={this.navigationLabel}
            onCollapseButtonClick={this.onSidebarCollapseButtonClick}
            ref={(el) => (this.sidebarEl = el)}
          >
            {this.hasCustomLogo && <slot name="logo" slot="logo"></slot>}
            <slot name="navigation"></slot>
            <slot name="user" slot="user"></slot>
          </swirl-sidebar-navigation>
          <main
            aria-labelledby={Boolean(this.appName) ? "app-name" : undefined}
            class="console-layout__main"
          >
            {!this.sidebarActive && (
              <button
                aria-controls="sidebar"
                aria-expanded="false"
                aria-label={this.showNavigationButtonLabel}
                class="console-layout__show-sidebar-button"
                onClick={this.onShowSidebarButtonClick}
                type="button"
              >
                <swirl-icon-hamburger-menu
                  size={20}
                ></swirl-icon-hamburger-menu>
              </button>
            )}
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
