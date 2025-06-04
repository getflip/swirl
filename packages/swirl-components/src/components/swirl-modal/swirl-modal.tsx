import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Method,
  Prop,
  State,
  h,
} from "@stencil/core";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import classnames from "classnames";
import * as focusTrap from "focus-trap";

export type SwirlModalVariant = "default" | "drawer";

export type SwirlModalSpacing =
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
 * @slot slot - Modal contents
 * @slot secondary-content - Secondary content
 * @slot header-tools - Used to display elements inside the sticky header, below the label
 * @slot custom-header - Optional custom header; should be used hidden label
 * @slot custom-footer - Optional custom footer; replaces the default footer with primary and secondary actions
 * @slot sidebar-content - Sidebar content; Only visible on viewports larger than tablet
 * @slot sidebar-footer - Optional custom footer below the Sidebar
 */
@Component({
  shadow: false,
  styleUrl: "swirl-modal.css",
  tag: "swirl-modal",
})
export class SwirlModal {
  @Element() el: HTMLElement;

  @Prop() allowFullscreen?: boolean;
  @Prop() closable?: boolean = true;
  @Prop() closeButtonLabel?: string = "Close modal";
  @Prop() fullscreenEnableButtonLabel?: string = "Full screen";
  @Prop() fullscreenDisableButtonLabel?: string = "Exit full screen";
  @Prop() height?: string;
  @Prop() hideCloseButton?: boolean;
  @Prop() hideLabel?: boolean;
  @Prop() label!: string;
  @Prop() maxHeight?: string;
  @Prop() minHeight?: string;
  @Prop() maxWidth?: string;
  @Prop() padded?: boolean = true;
  @Prop() primaryActionLabel?: string;
  @Prop() secondaryActionLabel?: string;
  @Prop() variant?: SwirlModalVariant = "default";
  @Prop() contentGap?: SwirlModalSpacing;
  @Prop() hideSecondaryContent?: boolean;
  @Prop() primaryContentMaxWidth?: string;
  @Prop() secondaryContentMaxWidth?: string;
  @Prop() primaryContentFlex?: string;
  @Prop() secondaryContentFlex?: string;
  @Prop() hideSecondaryContentBorders?: boolean;
  @Prop() secondaryContentPadding?: SwirlModalSpacing;
  @Prop() secondaryContentPaddingBlockEnd?: SwirlModalSpacing;
  @Prop() secondaryContentPaddingBlockStart?: SwirlModalSpacing;
  @Prop() secondaryContentPaddingInlineEnd?: SwirlModalSpacing;
  @Prop() secondaryContentPaddingInlineStart?: SwirlModalSpacing;
  @Prop() sidebarLabel?: string;
  @Prop() sidebarPadded?: boolean = true;
  @Prop() sidebarFooterPadded?: boolean = true;
  @Prop() hideSidebarContent?: boolean;
  @Prop() hasSidebarCloseButton?: boolean;
  @Prop() sidebarCloseButtonLabel?: string = "Close sidebar";

  @Event() toggleFullscreen: EventEmitter<boolean>;
  @Event() modalClose: EventEmitter<void>;
  @Event() modalOpen: EventEmitter<void>;
  @Event() primaryAction: EventEmitter<MouseEvent>;
  @Event() requestModalClose: EventEmitter<void>;
  @Event() secondaryAction: EventEmitter<MouseEvent>;
  @Event() sidebarClose: EventEmitter<void>;

  @State() isOpen = false;
  @State() isFullscreen = false;
  @State() isFullscreenTransitioning = false;
  @State() closing = false;
  @State() hasCustomHeader: boolean;
  @State() hasCustomFooter: boolean;
  @State() hasHeaderTools: boolean;
  @State() hasSecondaryContent: boolean;
  @State() scrollable = false;
  @State() scrolled = false;
  @State() scrolledDown = false;
  @State() hasSidebarContent: boolean;
  @State() hasSidebarFooter: boolean;
  @State() sidebarScrolled = false;
  @State() sidebarScrolledDown = false;
  @State() sidebarScrollable = false;

  private focusTrap: focusTrap.FocusTrap;
  private modalEl: HTMLElement;
  private scrollContainer: HTMLElement;
  private sidebarScrollContainer: HTMLElement;

  componentDidLoad() {
    this.focusTrap = focusTrap.createFocusTrap(this.modalEl, {
      allowOutsideClick: true,

      // We don't always close the modal when ESC is pressed. So we manage the
      // deactivation of the focus trap manually.
      escapeDeactivates: false,

      tabbableOptions: {
        getShadowRoot: (node) => {
          return node.shadowRoot;
        },
      },
    });

    this.determineScrollStatus();

    this.updateCustomFooterStatus();
    this.updateCustomHeaderStatus();
    this.updateHeaderToolsStatus();
    this.updateSecondaryContentStatus();
    this.updateSidebarContentStatus();
    this.updateSidebarFooterStatus();
  }

  componentDidRender() {
    this.focusTrap?.updateContainerElements(this.modalEl);
  }

  disconnectedCallback() {
    this.focusTrap?.deactivate();
    this.unlockBodyScroll();
  }

  @Listen("resize", { target: "window" })
  onWindowResize() {
    this.determineScrollStatus();
  }

  /**
   * Open the modal.
   */
  @Method()
  async open() {
    this.isOpen = true;
    this.modalOpen.emit();

    setTimeout(() => {
      this.lockBodyScroll();
      this.determineScrollStatus();
    });

    setTimeout(() => {
      this.focusTrap.activate();
      this.handleAutoFocus();
    }, 200);
  }

  /**
   * Close the modal. Pass `true` to force close even if the modal is not closable.
   */
  @Method()
  async close(force?: boolean) {
    if (this.closing) {
      return;
    }

    this.requestModalClose.emit();

    if (!this.closable && !force) {
      return;
    }

    this.closing = true;
    this.unlockBodyScroll();

    setTimeout(() => {
      this.focusTrap.deactivate();
      this.isOpen = false;
      this.modalClose.emit();
      this.closing = false;
    }, 150);
  }

  @Method()
  async setFullscreen(isFullscreen: boolean) {
    if (this.isFullscreen === isFullscreen) {
      return;
    }

    this.isFullscreenTransitioning = true;
    this.isFullscreen = isFullscreen;
    this.toggleFullscreen.emit(this.isFullscreen);

    setTimeout(() => (this.isFullscreenTransitioning = false), 150);
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      event.stopImmediatePropagation();
      this.close();
    }
  };

  private onBackdropClick = () => {
    this.close();
  };

  private onCloseButtonClick = () => {
    this.close();
  };

  private onFullscreenButtonClick = () => {
    this.setFullscreen(!this.isFullscreen);
  };

  private onSidebarCloseButtonClick = () => {
    this.hideSidebarContent = true;
    this.sidebarClose.emit();
  };

  private onPrimaryAction = (event: MouseEvent) => {
    this.primaryAction.emit(event);
  };

  private onSecondaryAction = (event: MouseEvent) => {
    this.secondaryAction.emit(event);
  };

  private updateCustomFooterStatus() {
    this.hasCustomFooter = Boolean(
      this.el.querySelector('[slot="custom-footer"]')
    );
  }

  private updateCustomHeaderStatus() {
    this.hasCustomHeader = Boolean(
      this.el.querySelector('[slot="custom-header"]')
    );
  }

  private updateHeaderToolsStatus() {
    this.hasHeaderTools = Boolean(
      this.el.querySelector('[slot="header-tools"]')
    );
  }

  private updateSecondaryContentStatus() {
    this.hasSecondaryContent = Boolean(
      this.el.querySelector('[slot="secondary-content"]')
    );
  }

  private updateSidebarContentStatus() {
    this.hasSidebarContent = Boolean(
      this.el.querySelector('[slot="sidebar-content"]')
    );
  }

  private updateSidebarFooterStatus() {
    this.hasSidebarFooter = Boolean(
      this.el.querySelector('[slot="sidebar-footer"]')
    );
  }

  private determineScrollStatus = () => {
    this.determineMainScrollStatus();
    this.determineSidebarScrollStatus();
  };

  private determineMainScrollStatus = () => {
    const scrolled = this.scrollContainer?.scrollTop > 0;

    const scrolledDown =
      Math.ceil(
        this.scrollContainer?.scrollTop + this.scrollContainer?.offsetHeight
      ) >= this.scrollContainer?.scrollHeight;

    const scrollable =
      this.scrollContainer?.scrollHeight > this.scrollContainer?.offsetHeight;

    if (scrolled !== this.scrolled) {
      this.scrolled = scrolled;
    }

    if (scrolledDown !== this.scrolledDown) {
      this.scrolledDown = scrolledDown;
    }

    if (scrollable !== this.scrollable) {
      this.scrollable = scrollable;
    }
  };

  private determineSidebarScrollStatus = () => {
    const scrolled = this.sidebarScrollContainer?.scrollTop > 0;

    const scrolledDown =
      Math.ceil(
        this.sidebarScrollContainer?.scrollTop +
          this.sidebarScrollContainer?.offsetHeight
      ) >= this.sidebarScrollContainer?.scrollHeight;

    const scrollable =
      this.sidebarScrollContainer?.scrollHeight >
      this.sidebarScrollContainer?.offsetHeight;

    if (scrolled !== this.sidebarScrolled) {
      this.sidebarScrolled = scrolled;
    }

    if (scrolledDown !== this.sidebarScrolledDown) {
      this.sidebarScrolledDown = scrolledDown;
    }

    if (scrollable !== this.sidebarScrollable) {
      this.sidebarScrollable = scrollable;
    }
  };

  private handleAutoFocus() {
    this.modalEl.querySelector<HTMLInputElement>("input[autofocus]")?.focus();
  }

  private lockBodyScroll() {
    disableBodyScroll(this.scrollContainer);
    disableBodyScroll(this.sidebarScrollContainer);
  }

  private unlockBodyScroll() {
    if (this.scrollContainer) {
      enableBodyScroll(this.scrollContainer);
    }

    if (this.sidebarScrollContainer) {
      enableBodyScroll(this.sidebarScrollContainer);
    }
  }

  render() {
    const showControls =
      Boolean(this.primaryActionLabel) || Boolean(this.secondaryActionLabel);

    const className = classnames("modal", `modal--variant-${this.variant}`, {
      "modal--closing": this.closing,
      "modal--fullscreen": this.isFullscreen,
      "modal--fullscreen-transitioning": this.isFullscreenTransitioning,
      "modal--has-custom-footer": this.hasCustomFooter,
      "modal--has-custom-header": this.hasCustomHeader,
      "modal--has-header-tools": this.hasHeaderTools,
      "modal--has-secondary-content":
        this.hasSecondaryContent && !this.hideSecondaryContent,
      "modal--hide-label": this.hideLabel,
      "modal--padded": this.padded,
      "modal--scrollable": this.scrollable,
      "modal--scrolled": this.scrolled,
      "modal--scrolled-down": this.scrolledDown,
      "modal--hide-secondary-content-borders": this.hideSecondaryContentBorders,
      "modal--has-sidebar-content":
        this.hasSidebarContent && !this.hideSidebarContent,
      "modal--sidebar-padded": this.sidebarPadded,
      "modal--has-sidebar-footer":
        this.hasSidebarFooter &&
        this.hasSidebarContent &&
        !this.hideSidebarContent,
      "modal--sidebar-footer-padded": this.sidebarFooterPadded,
      "modal--sidebar-scrolled": this.sidebarScrolled,
      "modal--sidebar-scrolled-down": this.sidebarScrolledDown,
      "modal--sidebar-scrollable": this.sidebarScrollable,
    });

    return (
      <Host>
        <section
          aria-hidden={String(!this.isOpen)}
          aria-label={this.label}
          aria-modal="true"
          class={className}
          onKeyDown={this.onKeyDown}
          role="dialog"
          ref={(el) => (this.modalEl = el)}
        >
          <div class="modal__backdrop" onClick={this.onBackdropClick}></div>
          <div
            class="modal__body"
            style={
              !this.isFullscreen && {
                "--swirl-modal-max-height": this.maxHeight,
                "--swirl-modal-height": this.height,
                minHeight: this.minHeight,
                maxWidth: this.maxWidth,
              }
            }
          >
            <aside class="modal__sidebar">
              {this.sidebarLabel && (
                <header
                  class={classnames("modal__sidebar-header", {
                    "modal__sidebar-header--has-close-button":
                      this.hasSidebarCloseButton,
                  })}
                >
                  {this.hasSidebarCloseButton && (
                    <swirl-button
                      hideLabel
                      icon="<swirl-icon-double-arrow-right></swirl-icon-double-arrow-right>"
                      label={this.sidebarCloseButtonLabel}
                      onClick={this.onSidebarCloseButtonClick}
                    ></swirl-button>
                  )}

                  <swirl-heading
                    as="h3"
                    class="modal__sidebar-heading"
                    level={5}
                    text={this.sidebarLabel}
                  ></swirl-heading>
                </header>
              )}
              <div
                class="modal__sidebar-content"
                onScroll={this.determineSidebarScrollStatus}
                ref={(el) => (this.sidebarScrollContainer = el)}
              >
                <slot name="sidebar-content"></slot>
              </div>

              <div class="modal__sidebar-footer">
                <slot name="sidebar-footer"></slot>
              </div>
            </aside>

            <div class="modal__main-content">
              <header class="modal__custom-header">
                <slot name="custom-header"></slot>
              </header>
              {(!this.hideLabel || !this.hideCloseButton) && (
                <header class="modal__header">
                  <div class="modal__header-bar">
                    {!this.hideCloseButton && (
                      <swirl-button
                        class="modal__close-button"
                        hideLabel
                        icon={
                          this.variant === "default"
                            ? "<swirl-icon-close></swirl-icon-close>"
                            : "<swirl-icon-double-arrow-right></swirl-icon-double-arrow-right>"
                        }
                        label={this.closeButtonLabel}
                        onClick={this.onCloseButtonClick}
                      ></swirl-button>
                    )}
                    {this.allowFullscreen && (
                      <swirl-button
                        class="modal__fullscreen-button"
                        hideLabel
                        icon={
                          this.isFullscreen
                            ? "<swirl-icon-close-fullscreen></swirl-icon-close-fullscreen>"
                            : "<swirl-icon-open-in-full></swirl-icon-open-in-full>"
                        }
                        label={
                          this.isFullscreen
                            ? this.fullscreenDisableButtonLabel
                            : this.fullscreenEnableButtonLabel
                        }
                        onClick={this.onFullscreenButtonClick}
                      ></swirl-button>
                    )}
                    {!this.hideLabel && (
                      <swirl-heading
                        as="h2"
                        class="modal__heading"
                        level={3}
                        text={this.label}
                      ></swirl-heading>
                    )}
                  </div>
                </header>
              )}
              <div
                class="modal__content-container"
                style={{
                  gap: this.contentGap
                    ? `var(--s-space-${this.contentGap})`
                    : undefined,
                }}
              >
                <div
                  class="modal__primary-content"
                  style={{
                    maxWidth: this.primaryContentMaxWidth,
                    flex: this.primaryContentFlex,
                  }}
                >
                  <div class="modal__header-tools">
                    <slot name="header-tools"></slot>
                  </div>
                  <div
                    class="modal__content"
                    onScroll={this.determineMainScrollStatus}
                    ref={(el) => (this.scrollContainer = el)}
                  >
                    <slot></slot>
                  </div>
                </div>
                <div
                  class="modal__secondary-content"
                  style={{
                    maxWidth: this.secondaryContentMaxWidth,
                    flex: this.secondaryContentFlex,
                    padding: Boolean(this.secondaryContentPadding)
                      ? `var(--s-space-${this.secondaryContentPadding})`
                      : undefined,
                    paddingBlockEnd: Boolean(
                      this.secondaryContentPaddingBlockEnd
                    )
                      ? `var(--s-space-${this.secondaryContentPaddingBlockEnd})`
                      : undefined,
                    paddingBlockStart: Boolean(
                      this.secondaryContentPaddingBlockStart
                    )
                      ? `var(--s-space-${this.secondaryContentPaddingBlockStart})`
                      : undefined,
                    paddingInlineEnd: Boolean(
                      this.secondaryContentPaddingInlineEnd
                    )
                      ? `var(--s-space-${this.secondaryContentPaddingInlineEnd})`
                      : undefined,
                    paddingInlineStart: Boolean(
                      this.secondaryContentPaddingInlineStart
                    )
                      ? `var(--s-space-${this.secondaryContentPaddingInlineStart})`
                      : undefined,
                  }}
                >
                  <slot name="secondary-content"></slot>
                </div>
              </div>
              <div class="modal__custom-footer">
                <slot name="custom-footer"></slot>
              </div>
              {showControls && (
                <footer class="modal__controls">
                  <swirl-button-group wrap>
                    {this.secondaryActionLabel && (
                      <swirl-button
                        label={this.secondaryActionLabel}
                        onClick={this.onSecondaryAction}
                      ></swirl-button>
                    )}
                    {this.primaryActionLabel && (
                      <swirl-button
                        intent="primary"
                        label={this.primaryActionLabel}
                        onClick={this.onPrimaryAction}
                        variant="flat"
                      ></swirl-button>
                    )}
                  </swirl-button-group>
                </footer>
              )}
            </div>
          </div>
        </section>
      </Host>
    );
  }
}
