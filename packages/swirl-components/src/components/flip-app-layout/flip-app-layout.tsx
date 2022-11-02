import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import classnames from "classnames";

export type FlipAppLayoutMobileView = "navigation" | "body" | "sidebar";

@Component({
  shadow: true,
  styleUrl: "flip-app-layout.css",
  tag: "flip-app-layout",
})
export class FlipAppLayout {
  @Element() el: HTMLElement;

  @Prop() appBarMedia?: string;
  @Prop() appName!: string;
  @Prop() backToNavigationViewButtonLabel?: string = "Back to navigation";
  @Prop() ctaIcon?: string;
  @Prop() ctaLabel?: string;
  @Prop() heading!: string;
  @Prop({ mutable: true }) mobileView: FlipAppLayoutMobileView = "navigation";
  @Prop() navigationLabel?: string;
  @Prop() sidebarCloseButtonLabel?: string = "Close sidebar";
  @Prop() sidebarHeading?: string;
  @Prop({ mutable: true }) sidebarActive?: boolean;
  @Prop() subheading?: string;

  @State() hasNavigation: boolean;
  @State() hasSidebar: boolean;

  @Event() backToNavigationView: EventEmitter<MouseEvent>;
  @Event() ctaClick: EventEmitter<MouseEvent>;
  @Event() sidebarCloseButtonClick: EventEmitter<MouseEvent>;

  private mutationObserver: MutationObserver;

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

  private checkMobileView() {
    if (
      (this.mobileView === "navigation" && !this.hasNavigation) ||
      (this.mobileView === "sidebar" && !this.hasSidebar)
    ) {
      this.mobileView = "body";
      return;
    }

    this.sidebarActive = this.mobileView === "sidebar" || this.sidebarActive;
  }

  private updateNavigationStatus() {
    this.hasNavigation = Boolean(this.el.querySelector('[slot="navigation"]'));
  }

  private updateSidebarStatus() {
    this.hasSidebar = Boolean(this.el.querySelector('[slot="sidebar"]'));
  }

  private onBackToNavigationViewButtonClick = (event: MouseEvent) => {
    this.backToNavigationView.emit(event);
    this.mobileView = "navigation";
  };

  private onCtaClick = (event: MouseEvent) => {
    this.ctaClick.emit(event);
    this.mobileView = "navigation";
  };

  private onSidebarCloseButtonClick = (event: MouseEvent) => {
    this.sidebarCloseButtonClick.emit(event);
    this.mobileView = "body";
    this.sidebarActive = false;
  };

  render() {
    const showBackToNavigationButton =
      this.mobileView === "body" && this.hasNavigation;

    const className = classnames(
      "app-layout",
      `app-layout--mobile-view-${this.mobileView}`,
      {
        "app-layout--has-navigation": this.hasNavigation,
        "app-layout--has-sidebar": this.hasSidebar,
        "app-layout--sidebar-active":
          this.mobileView === "sidebar" || this.sidebarActive,
      }
    );

    return (
      <Host>
        <section class={className} role="document" tabIndex={0}>
          <div class="app-layout__grid">
            <header class="app-layout__header">
              <flip-heading
                as="h1"
                headingId="app-name"
                level={2}
                text={this.appName}
              ></flip-heading>
              {this.ctaLabel && (
                <flip-button
                  class="app-layout__cta"
                  hideLabel={Boolean(this.ctaIcon)}
                  icon={this.ctaIcon}
                  intent="primary"
                  label={this.ctaLabel}
                  onClick={this.onCtaClick}
                  variant="flat"
                ></flip-button>
              )}
            </header>
            <nav
              aria-label={this.navigationLabel}
              class="app-layout__navigation"
            >
              <slot name="navigation"></slot>
            </nav>
            <section class="app-layout__body">
              <header class="app-layout__app-bar">
                {showBackToNavigationButton && (
                  <span class="app-layout__back-to-navigation-button">
                    <flip-button
                      hideLabel={Boolean(this.ctaIcon)}
                      icon="<flip-icon-arrow-back></flip-icon-arrow-back>"
                      intent="primary"
                      label={this.backToNavigationViewButtonLabel}
                      onClick={this.onBackToNavigationViewButtonClick}
                    ></flip-button>
                  </span>
                )}
                {this.appBarMedia && (
                  <div
                    class="app-layout__app-bar-media"
                    innerHTML={this.appBarMedia}
                  ></div>
                )}
                <div class="app-layout__app-bar-heading">
                  <flip-heading
                    as="h2"
                    headingId="heading"
                    level={4}
                    text={this.heading}
                  ></flip-heading>
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
              <div class="app-layout__content">
                <slot name="content"></slot>
              </div>
            </section>
            <aside class="app-layout__sidebar">
              <header class="app-layout__sidebar-header">
                <flip-button
                  class="app-layout__sidebar-close-button"
                  hideLabel={Boolean(this.ctaIcon)}
                  icon="<flip-icon-close></flip-icon-close>"
                  intent="primary"
                  label={this.sidebarCloseButtonLabel}
                  onClick={this.onSidebarCloseButtonClick}
                ></flip-button>
                <flip-heading
                  as="h3"
                  headingId="sidebar-heading"
                  level={2}
                  text={this.sidebarHeading}
                ></flip-heading>
              </header>
              <div class="app-layout__sidebar-content">
                <slot name="sidebar"></slot>
              </div>
            </aside>
            <flip-button
              class="app-layout__floating-cta"
              hideLabel={Boolean(this.ctaIcon)}
              icon={this.ctaIcon}
              intent="primary"
              label={this.ctaLabel}
              onClick={this.onCtaClick}
              variant="floating"
            ></flip-button>
          </div>
        </section>
      </Host>
    );
  }
}
