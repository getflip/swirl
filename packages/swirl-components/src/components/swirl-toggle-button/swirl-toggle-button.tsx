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
  @Prop({ mutable: true }) isPressed = false;

  private onClick = (): void => {
    this.isPressed = true;
  };

  render() {
    const classNames = classnames("button", {
      "button--pressed": this.isPressed,
    });

    return (
      <button
        class={classNames}
        aria-pressed={this.isPressed ? "true" : "false"}
        onClick={this.onClick}
      >
        <span>{this.label}</span>
      </button>
    );
  }
}
