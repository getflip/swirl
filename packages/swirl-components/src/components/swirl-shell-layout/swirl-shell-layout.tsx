import {
  Component,
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
import * as focusTrap from "focus-trap";

/**
 * @slot logo - Logo shown inside header.
 * @slot header-tools - Tools positioned on the header's right-hand side.
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
  @Prop() browserBackButtonLabel?: string = "Navigate back";
  @Prop() browserForwardButtonLabel?: string = "Navigate forward";
  @Prop() navigationLabel?: string = "Main";
  @Prop() navigationToggleLabel?: string = "Toggle navigation";
  @Prop() sidebarActive?: boolean;
  @Prop() sidebarToggleLabel?: string = "Toggle sidebar";
  @Prop() skipLinkLabel?: string = "Skip to main content";

  @Event() sidebarToggleClick: EventEmitter<MouseEvent>;

  @State() mobileNavigationActive?: boolean;
  @State() navigationCollapsed?: boolean;

  private focusTrap: focusTrap.FocusTrap;
  private navElement: HTMLElement;

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
    const className = classnames("shell-layout", {
      "shell-layout--mobile-navigation-active": this.mobileNavigationActive,
      "shell-layout--navigation-collapsed": this.navigationCollapsed,
      "shell-layout--sidebar-active": this.sidebarActive,
    });

    return (
      <Host>
        <div class={className}>
          <header class="shell-layout__header">
            <a class="shell-layout__skip-link" href="#main-content">
              {this.skipLinkLabel}
            </a>
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
            </div>
            <div class="shell-layout__logo">
              <slot name="logo"></slot>
            </div>
            <div class="shell-layout__header-right">
              <button
                class="shell-layout__header-tool"
                onClick={this.sidebarToggleClick.emit}
                type="button"
              >
                <swirl-icon-notifications size={20}></swirl-icon-notifications>
                <swirl-visually-hidden>
                  {this.sidebarToggleLabel}
                </swirl-visually-hidden>
              </button>
              <slot name="header-tools"></slot>
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
            <div class="shell-layout__mobile-logo">
              <slot name="mobile-logo"></slot>
            </div>
            <swirl-visually-hidden>
              <span id="main-navigation-label">{this.navigationLabel}</span>
            </swirl-visually-hidden>
            <slot name="nav"></slot>
          </nav>
          <main class="shell-layout__main" id="main-content">
            <slot></slot>
          </main>
          <aside class="shell-layout__sidebar">
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
