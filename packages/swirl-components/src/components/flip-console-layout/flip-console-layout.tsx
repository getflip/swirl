import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "flip-console-layout.css",
  tag: "flip-console-layout",
})
export class FlipConsoleLayout {
  @Prop() appName!: string;
  @Prop() backButonLabel?: string = "Back";
  @Prop() heading!: string;
  @Prop() helpButonLabel?: string = "Help";
  @Prop() logoText?: string = "Admin";
  @Prop() navigationLabel?: string = "Main";
  @Prop() showBackButton?: boolean;
  @Prop() showHelpButton?: boolean;
  @Prop() subheading?: string;

  @Event() backButtonClick: EventEmitter<MouseEvent>;
  @Event() helpButtonClick: EventEmitter<MouseEvent>;

  private onBackButtonClick = (event: MouseEvent) => {
    this.backButtonClick.emit(event);
  };

  private onHelpButtonClick = (event: MouseEvent) => {
    this.helpButtonClick.emit(event);
  };

  render() {
    return (
      <Host>
        <div class="console-layout">
          <div class="console-layout__sidebar">
            <header class="console-layout__header">
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
                <flip-text class="console-layout__logo-text" weight="medium">
                  {this.logoText}
                </flip-text>
              </div>
            </header>
            <nav
              aria-label={this.navigationLabel}
              class="console-layout__navigation"
            >
              <slot name="navigation"></slot>
            </nav>
            <div class="console-layout__user">
              <slot name="user"></slot>
            </div>
          </div>
          <main aria-labelledby="app-name" class="console-layout__main">
            <header class="console-layout__app-bar">
              <flip-heading
                as="h1"
                class="console-layout__app-name"
                headingId="app-name"
                level={4}
                text={this.appName}
              ></flip-heading>
              {this.showHelpButton && (
                <flip-button
                  class="console-layout__help-button"
                  hideLabel
                  icon="<flip-icon-help></flip-icon-help>"
                  label={this.helpButonLabel}
                  onClick={this.onHelpButtonClick}
                  variant="flat"
                ></flip-button>
              )}
            </header>
            <section aria-labelledby="heading" class="console-layout__content">
              <header class="console-layout__content-header">
                {this.showBackButton && (
                  <flip-button
                    class="console-layout__back-button"
                    hideLabel
                    icon="<flip-icon-arrow-back></flip-icon-arrow-back>"
                    label={this.backButonLabel}
                    onClick={this.onBackButtonClick}
                  ></flip-button>
                )}
                <div>
                  <flip-heading
                    as="h2"
                    class="console-layout__heading"
                    headingId="heading"
                    level={1}
                    text={this.heading}
                  ></flip-heading>
                  {this.subheading && (
                    <flip-text
                      class="console-layout__subheading"
                      color="subdued"
                    >
                      {this.subheading}
                    </flip-text>
                  )}
                </div>
              </header>
              <div class="console-layout__integration">
                <slot name="content"></slot>
              </div>
            </section>
          </main>
        </div>
      </Host>
    );
  }
}
