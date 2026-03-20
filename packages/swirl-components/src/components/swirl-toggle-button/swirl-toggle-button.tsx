import { Component, h, Prop } from "@stencil/core";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "swirl-toggle-button.css",
  tag: "swirl-toggle-button",
})
export class SwirlToggleButton {
  @Prop() identifier!: string;
  @Prop() label!: string;
  @Prop() icon?: string;
  @Prop({ mutable: true }) isPressed = false;
  @Prop() hideLabel?: boolean = false;

  private onClick = (): void => {
    this.isPressed = true;
  };

  render() {
    const classNames = classnames("button", {
      "button--pressed": this.isPressed,
    });

    const ariaLabel = this.hideLabel ? this.label : undefined;

    return (
      <button
        class={classNames}
        type="button"
        aria-pressed={this.isPressed ? "true" : "false"}
        aria-label={ariaLabel}
        onClick={this.onClick}
      >
        {this.icon && (
          <swirl-icon class="button__icon" glyph={this.icon}></swirl-icon>
        )}
        {!this.hideLabel && <span class="button__label">{this.label}</span>}
      </button>
    );
  }
}
