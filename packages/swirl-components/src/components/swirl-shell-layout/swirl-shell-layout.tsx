import { Component, h, Host, Prop, State } from "@stencil/core";
import classnames from "classnames";

/**
 * @slot logo-expanded - Logo shown inside expanded sidebar.
 * @slot logo-collapsed - Logo shown inside collapsed sidebar.
 * @slot tools - Items shown in the upper sidebar part.
 * @slot main-navigation - Items shown in the lower sidebar part.
 * @slot main - Contents of the main area.
 */
@Component({
  shadow: true,
  styleUrl: "swirl-shell-layout.css",
  tag: "swirl-shell-layout",
})
export class SwirlShellLayout {
  @Prop() mainNavigationLabel: string = "Main";
  @Prop() sidebarToggleLabel: string = "Toggle sidebar";

  @State() collapsedSidebar: boolean;

  private toggleSidebar = () => {
    this.collapsedSidebar = !this.collapsedSidebar;
  };

  render() {
    const className = classnames("shell-layout", {
      "shell-layout--collapsed-sidebar": this.collapsedSidebar,
    });

    return (
      <Host>
        <div class={className}>
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
                        ? "<swirl-icon-arrow-forward></swirl-icon-arrow-forward>"
                        : "<swirl-icon-arrow-back></swirl-icon-arrow-back>"
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
          <main class="shell-layout__main">
            <slot name="main"></slot>
          </main>
        </div>
      </Host>
    );
  }
}
