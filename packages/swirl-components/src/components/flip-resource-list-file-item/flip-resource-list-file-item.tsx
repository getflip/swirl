import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";
import { getDesktopMediaQuery } from "../../utils";

@Component({
  shadow: true,
  styleUrl: "flip-resource-list-file-item.css",
  tag: "flip-resource-list-file-item",
})
export class FlipResourceListFileItem {
  @Prop() description?: string;
  @Prop() errorMessage?: string;
  @Prop() icon?: string = "<flip-icon-file></flip-icon-file>";
  @Prop() label!: string;
  @Prop() loading: boolean;
  @Prop() removable?: boolean;
  @Prop() removeButtonLabel?: string = "Remove file";

  @Event() remove: EventEmitter<MouseEvent>;

  private desktopMediaQuery: MediaQueryList = getDesktopMediaQuery();
  private iconEl: HTMLElement;

  componentDidLoad() {
    this.forceIconProps(this.desktopMediaQuery.matches);

    this.desktopMediaQuery.addEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  disconnectedCallback() {
    this.desktopMediaQuery.removeEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  private desktopMediaQueryHandler = (event: MediaQueryListEvent) => {
    this.forceIconProps(event.matches);
  };

  private forceIconProps(smallIcon: boolean) {
    if (!Boolean(this.iconEl)) {
      return;
    }

    const icon = this.iconEl.children[0];

    icon?.setAttribute("size", smallIcon ? "20" : "24");
  }

  render() {
    const showError = Boolean(this.errorMessage);
    const showDescription = !showError && Boolean(this.description);
    const showSpinner = !showError && this.loading;
    const showRemoveButton = this.removable && !showSpinner;

    const className = classnames("resource-list-file-item", {
      "resource-list-file-item--has-control": showSpinner || showRemoveButton,
    });

    return (
      <Host role="row">
        <div class={className} part="resource-list-file-item" role="gridcell">
          <span
            class="resource-list-file-item__icon"
            innerHTML={this.icon}
            ref={(el) => (this.iconEl = el)}
          ></span>
          <span class="resource-list-file-item__label-container">
            <span class="resource-list-file-item__label" id="label">
              {this.label}
            </span>
            {showDescription && (
              <span class="resource-list-file-item__description">
                {this.description}
              </span>
            )}
            {showError && (
              <span
                aria-live="polite"
                class="resource-list-file-item__error-message"
              >
                <flip-inline-error
                  message={this.errorMessage}
                  size="s"
                ></flip-inline-error>
              </span>
            )}
          </span>
          {showSpinner && (
            <span class="resource-list-file-item__spinner">
              <flip-spinner size="s"></flip-spinner>
            </span>
          )}
          {showRemoveButton && (
            <span class="resource-list-file-item__remove-button">
              <flip-button
                hideLabel
                icon="<flip-icon-close></flip-icon-close>"
                label={this.removeButtonLabel}
                onClick={this.remove.emit}
              ></flip-button>
            </span>
          )}
        </div>
      </Host>
    );
  }
}
