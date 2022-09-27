import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

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
