import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
} from "@stencil/core";
import classnames from "classnames";

export type SwirlAppBarPadding =
  | "0"
  | "2"
  | "4"
  | "8"
  | "12"
  | "16"
  | "20"
  | "24"
  | "32";

/**
 * @slot heading - The app bar's heading element
 * @slot center-controls - Container for controls displayed in the center
 * @slot cta - Container for a call to action button
 * @slot heading - Container for controls displayed at the end of the bar
 */
@Component({
  shadow: true,
  styleUrl: "swirl-app-bar.css",
  tag: "swirl-app-bar",
})
export class SwirlAppBar {
  @Element() el: HTMLElement;

  @Prop() backButtonLabel?: string = "Go back";
  @Prop() closeButtonIcon?: string = "<swirl-icon-close></swirl-icon-close>";
  @Prop() closeButtonLabel?: string = "Close";
  @Prop() paddingInlineEnd?: SwirlAppBarPadding = "16";
  @Prop() paddingInlineStart?: SwirlAppBarPadding = "16";
  @Prop() stepUpButtonLabel?: string = "Previous item";
  @Prop() stepDownButtonLabel?: string = "Next item";
  @Prop() showBackButton?: boolean;
  @Prop() showCloseButton?: boolean;
  @Prop() showStepperControls?: boolean;

  @State() hasCta: boolean;

  @Event() backButtonClick: EventEmitter<MouseEvent>;
  @Event() closeButtonClick: EventEmitter<MouseEvent>;
  @Event() stepUpButtonClick: EventEmitter<MouseEvent>;
  @Event() stepDownButtonClick: EventEmitter<MouseEvent>;

  private mutationObserver: MutationObserver;

  componentWillLoad() {
    this.mutationObserver = new MutationObserver(() => {
      this.updateCtaStatus();
    });

    this.mutationObserver.observe(this.el, { childList: true });

    queueMicrotask(() => {
      this.updateCtaStatus();
    });
  }

  disconnectedCallback() {
    this.mutationObserver?.disconnect();
  }

  onBackButtonClick = (event: MouseEvent) => {
    this.backButtonClick.emit(event);
  };

  onCloseButtonClick = (event: MouseEvent) => {
    this.closeButtonClick.emit(event);
  };

  onStepUpButtonClick = (event: MouseEvent) => {
    this.stepUpButtonClick.emit(event);
  };

  onStepDownButtonClick = (event: MouseEvent) => {
    this.stepDownButtonClick.emit(event);
  };

  private updateCtaStatus() {
    this.hasCta = Boolean(this.el.querySelector('[slot="cta"]'));
  }

  render() {
    const showLeftControls =
      this.showBackButton || this.showCloseButton || this.showStepperControls;

    const hasRightControls = Boolean(
      this.el.querySelector('[slot="right-controls"]')
    );
    const hasHeading = Boolean(this.el.querySelector('[slot="heading"]'));

    const className = classnames("app-bar", {
      "app-bar--has-cta": this.hasCta,
      "app-bar--has-right-controls": hasRightControls,
      "app-bar--has-heading": hasHeading,
    });

    const styles = {
      paddingInlineEnd: `var(--s-space-${this.paddingInlineEnd})`,
      paddingInlineStart: `var(--s-space-${this.paddingInlineStart})`,
    };

    return (
      <Host>
        <div class={className} style={styles}>
          {showLeftControls && (
            <div class="app-bar__left-controls">
              {(this.showBackButton || this.showCloseButton) && (
                <div class="app-bar__main-navigation-control">
                  {this.showBackButton && (
                    <swirl-button
                      hideLabel
                      icon="<swirl-icon-arrow-back></swirl-icon-arrow-back>"
                      label={this.backButtonLabel}
                      onClick={this.onBackButtonClick}
                    ></swirl-button>
                  )}
                  {this.showCloseButton && (
                    <swirl-button
                      hideLabel
                      icon={this.closeButtonIcon}
                      label={this.closeButtonLabel}
                      onClick={this.onCloseButtonClick}
                    ></swirl-button>
                  )}
                </div>
              )}
              {this.showStepperControls && (
                <div class="app-bar__stepper-controls">
                  <swirl-button
                    hideLabel
                    icon="<swirl-icon-arrow-upward></swirl-icon-arrow-upward>"
                    label={this.stepUpButtonLabel}
                    onClick={this.onStepUpButtonClick}
                  ></swirl-button>
                  <swirl-button
                    hideLabel
                    icon="<swirl-icon-arrow-downward></swirl-icon-arrow-downward>"
                    label={this.stepDownButtonLabel}
                    onClick={this.onStepDownButtonClick}
                  ></swirl-button>
                </div>
              )}
            </div>
          )}
          <div class="app-bar__cta">
            <slot name="cta"></slot>
          </div>
          <div class="app-bar__heading">
            <slot name="heading"></slot>
          </div>
          <div class="app-bar__center-controls">
            <slot name="center-controls"></slot>
          </div>
          <div class="app-bar__right-controls">
            <slot name="right-controls"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
