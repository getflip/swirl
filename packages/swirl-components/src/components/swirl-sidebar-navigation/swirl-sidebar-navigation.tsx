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
import { debounce } from "../../utils";

/**
 * @slot logo - Custom logo/brand mark shown in the header (32×32). Falls back to the Flip logo mark.
 * @slot (default) - Navigation content (e.g. swirl-tree-navigation)
 * @slot user - User profile content pinned to the bottom
 */
@Component({
  shadow: true,
  styleUrl: "swirl-sidebar-navigation.css",
  tag: "swirl-sidebar-navigation",
})
export class SwirlSidebarNavigation {
  @Element() el: HTMLElement;

  @Prop() appName?: string;
  @Prop() collapseButtonLabel?: string = "Hide navigation";
  @Prop() elevated?: boolean;
  @Prop() hideCollapseButton?: boolean;
  @Prop() navigationLabel?: string = "Main";

  @Event() collapseButtonClick: EventEmitter<MouseEvent>;

  @State() contentScrollState = {
    scrollable: false,
    scrolledToTop: true,
    scrolledToBottom: true,
  };

  private contentEl: HTMLElement;

  componentDidLoad() {
    this.updateContentScrollState();
  }

  /**
   * Focus the collapse button.
   */
  @Method()
  async focusCollapseButton() {
    this.el.shadowRoot
      .querySelector<HTMLButtonElement>(".sidebar-navigation__collapse-button")
      ?.focus();
  }

  @Listen("resize", { target: "window" })
  onWindowResize() {
    this.updateContentScrollState();
  }

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

  private onContentScroll = debounce(() => {
    this.updateContentScrollState();
  }, 16);

  private onNavigationSlotChange = () => {
    // Items can be added/removed after slotted children hydrate; defer the
    // measurement until the next frame so layout has settled
    requestAnimationFrame(() => this.updateContentScrollState());
  };

  private onCollapseButtonClick = (event: MouseEvent) => {
    this.collapseButtonClick.emit(event);
  };

  render() {
    const className = classnames("sidebar-navigation", {
      "sidebar-navigation--elevated": this.elevated,
      "sidebar-navigation--scrollable": this.contentScrollState.scrollable,
      "sidebar-navigation--scrolled-to-top":
        this.contentScrollState.scrolledToTop,
      "sidebar-navigation--scrolled-to-bottom":
        this.contentScrollState.scrolledToBottom,
    });

    return (
      <Host>
        <div class={className}>
          <header class="sidebar-navigation__header">
            <div class="sidebar-navigation__logo-section">
              <slot name="logo">
                <svg
                  aria-hidden="true"
                  class="sidebar-navigation__logo"
                  fill="none"
                  height="32"
                  viewBox="0 0 32 32"
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect fill="#2151F5" height="32" rx="8" width="32" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.52486 276.36C5.57709 289.149 11.02 301.094 18.2296 311.628L258.719 138.748C269.874 131.507 278.35 121.993 285.395 110.766C291.904 100.212 296.922 87.3014 298.875 74.6738C300.769 61.4277 300.809 48.353 297.757 35.5639C294.705 22.7748 289.262 10.8302 282.052 0.296051L41.5626 173.176C30.4077 180.417 21.9314 189.931 14.8867 201.158C8.37746 211.712 3.35926 224.623 1.40724 237.25C-0.544773 249.878 0.0338964 262.896 2.52486 276.36ZM80.3121 424.184C83.3644 436.973 88.8073 448.918 96.0169 459.452L229.113 363.743C240.268 356.502 248.744 346.988 255.789 335.761C262.298 325.207 267.317 312.296 269.269 299.668C271.164 286.422 271.203 273.348 268.151 260.559C265.099 247.769 259.656 235.825 252.446 225.291L119.35 320.999C108.195 328.24 99.7187 337.755 92.674 348.982C86.1647 359.535 81.1465 372.446 79.1945 385.074C77.2996 398.32 77.2599 411.395 80.3121 424.184Z"
                    fill="#FFFFFF"
                    transform="translate(9.7 6.4) scale(0.0418)"
                  />
                </svg>
              </slot>
              {Boolean(this.appName) && (
                <span class="sidebar-navigation__app-name">{this.appName}</span>
              )}
            </div>
            {!this.hideCollapseButton && (
              <button
                aria-expanded="true"
                aria-label={this.collapseButtonLabel}
                class="sidebar-navigation__collapse-button"
                onClick={this.onCollapseButtonClick}
                type="button"
              >
                <swirl-icon-double-arrow-left
                  size={24}
                ></swirl-icon-double-arrow-left>
              </button>
            )}
          </header>
          <nav
            aria-label={this.navigationLabel}
            class="sidebar-navigation__content"
            onScroll={this.onContentScroll}
            ref={(el) => (this.contentEl = el)}
          >
            <slot onSlotchange={this.onNavigationSlotChange}></slot>
          </nav>
          <div class="sidebar-navigation__footer">
            <slot name="user"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
