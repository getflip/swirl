import { Component, h, Host, Method, Prop, State } from "@stencil/core";
import classnames from "classnames";
import { getDesktopMediaQuery, getActiveElement } from "../../utils";

/**
 * @slot logo-expanded - Logo shown inside expanded sidebar.
 * @slot logo-collapsed - Logo shown inside collapsed sidebar.
 * @slot tools - Items shown in the upper sidebar part.
 * @slot main-navigation - Items shown in the lower sidebar part.
 * @slot banner - Used to show a swirl-banner on top of the page.
 * @slot main - Contents of the main area.
 */
@Component({
  shadow: true,
  styleUrl: "swirl-shell-layout.css",
  tag: "swirl-shell-layout",
})
export class SwirlShellLayout {
  @Prop() hideSidebar?: boolean;
  @Prop() mainNavigationLabel: string = "Main";
  @Prop() sidebarToggleLabel: string = "Toggle sidebar";

  @State() collapsedSidebar: boolean;
  @State() collapsing: boolean;
  @State() sidebarHovered: boolean;

  private desktopMediaQuery: MediaQueryList = getDesktopMediaQuery();

  componentWillLoad() {
    if (!this.desktopMediaQuery.matches) {
      this.collapseLeftSidebar();
    }

    this.desktopMediaQuery.onchange = this.desktopMediaQueryHandler;
  }

  /**
   * Collapse the left sidebar.
   */
  @Method()
  async collapseSidebar() {
    this.collapseLeftSidebar();
  }

  /**
   * Extend the left sidebar.
   */
  @Method()
  async extendSidebar() {
    this.expandLeftSidebar();
  }

  private desktopMediaQueryHandler = (event: MediaQueryListEvent) => {
    if (event.matches) {
      this.expandLeftSidebar();
    } else {
      this.collapseLeftSidebar();
    }
  };

  private collapseLeftSidebar = () => {
    this.collapsedSidebar = true;
    this.collapsing = true;

    setTimeout(() => {
      this.collapsing = false;

      // Some browsers don't update the hovered state of an element correctly,
      // if the element was moved and is no longer underneath the cursor.
      // https://bugs.chromium.org/p/chromium/issues/detail?id=276329
      this.sidebarHovered = false;
    }, 200);
  };

  private expandLeftSidebar = () => {
    if (this.hideSidebar) {
      return;
    }

    this.collapsedSidebar = false;
  };

  private toggleSidebar = () => {
    if (this.collapsedSidebar) {
      this.expandLeftSidebar();
    } else {
      this.collapseLeftSidebar();
    }
  };

  private onBackdropClick = () => {
    if (!this.collapsedSidebar) {
      this.collapseLeftSidebar();
    }
  };

  private onSidebarClick = () => {
    if (this.collapsedSidebar) {
      (document.activeElement as HTMLElement)?.blur();
      (getActiveElement() as HTMLElement)?.blur();
    }
  };

  private onSidebarMouseEnter = () => {
    this.sidebarHovered = true;
  };

  private onSidebarMouseLeave = () => {
    this.sidebarHovered = false;
  };

  render() {
    const className = classnames("shell-layout", {
      "shell-layout--collapsed-sidebar": this.collapsedSidebar,
      "shell-layout--collapsing": this.collapsing,
      "shell-layout--hide-sidebar": this.hideSidebar,
    });

    const sidebarWrapperClassName = classnames(
      "shell-layout__sidebar-wrapper",
      {
        "shell-layout__sidebar-wrapper--hovered": this.sidebarHovered,
      }
    );

    const backdropClassName = classnames("shell-layout__backdrop", {
      "shell-layout__backdrop--fading": this.collapsing,
    });

    return (
      <Host>
        <div class={className}>
          <div class="shell-layout__banner">
            <slot name="banner"></slot>
          </div>
          <div
            class={sidebarWrapperClassName}
            onClick={this.onSidebarClick}
            onMouseEnter={this.onSidebarMouseEnter}
            onMouseLeave={this.onSidebarMouseLeave}
          >
            {!this.hideSidebar && (
              <div class="shell-layout__sidebar">
                <header class="shell-layout__header">
                  <div class="shell-layout__logo-bar">
                    <div class="shell-layout__expanded-logo">
                      <slot name="logo-expanded"></slot>
                    </div>
                    <div class="shell-layout__collapsed-logo">
                      <slot name="logo-collapsed"></slot>
                    </div>
                    <div class="shell-layout__toggle">
                      <swirl-button
                        swirlAriaExpanded={String(!this.collapsedSidebar)}
                        hideLabel
                        icon={
                          this.collapsedSidebar
                            ? "<swirl-icon-double-arrow-right></swirl-icon-double-arrow-right>"
                            : "<swirl-icon-double-arrow-left></swirl-icon-double-arrow-left>"
                        }
                        label={this.sidebarToggleLabel}
                        onClick={this.toggleSidebar}
                      ></swirl-button>
                    </div>
                  </div>
                  <div class="shell-layout__tools">
                    <slot name="tools"></slot>
                  </div>
                </header>
                <nav
                  aria-label={this.mainNavigationLabel}
                  class="shell-layout__main-navigation"
                >
                  <slot name="main-navigation"></slot>
                </nav>
              </div>
            )}
          </div>
          <main class="shell-layout__main">
            <slot name="main"></slot>
          </main>
          {(!this.collapsedSidebar || this.collapsing) && (
            <div class={backdropClassName} onClick={this.onBackdropClick}></div>
          )}
        </div>
      </Host>
    );
  }
}
