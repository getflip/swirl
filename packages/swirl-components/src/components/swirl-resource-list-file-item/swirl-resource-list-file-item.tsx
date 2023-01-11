import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "swirl-resource-list-file-item.css",
  tag: "swirl-resource-list-file-item",
})
export class SwirlResourceListFileItem {
  @Prop() description?: string;
  @Prop() errorMessage?: string;
  @Prop() icon?: string = "<swirl-icon-file></swirl-icon-file>";
  @Prop() label!: string;
  @Prop() loading: boolean;
  @Prop() removable?: boolean;
  @Prop() removeButtonLabel?: string = "Remove file";

  @Event() remove: EventEmitter<MouseEvent>;

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
        <div class={className} role="gridcell">
          <span
            class="resource-list-file-item__icon"
            innerHTML={this.icon}
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
                <swirl-inline-error
                  message={this.errorMessage}
                  size="s"
                ></swirl-inline-error>
              </span>
            )}
          </span>
          {showSpinner && (
            <span class="resource-list-file-item__spinner">
              <swirl-spinner size="s"></swirl-spinner>
            </span>
          )}
          {showRemoveButton && (
            <span class="resource-list-file-item__remove-button">
              <swirl-button
                hideLabel
                icon="<swirl-icon-close></swirl-icon-close>"
                label={this.removeButtonLabel}
                onClick={this.remove.emit}
              ></swirl-button>
            </span>
          )}
        </div>
      </Host>
    );
  }
}
