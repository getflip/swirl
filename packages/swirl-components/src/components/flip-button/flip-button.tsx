import { Component, Element, h, Prop } from '@stencil/core';

export type FlipButtonType = "button" | "submit";

/**
 * @slot left-icon - Left icon element (optional)
 */
@Component({
  tag: "flip-button",
  shadow: true,
  styleUrl: "flip-button.css",
})
export class FlipButton {
  @Prop() disabled?: boolean;
  @Prop() label!: string;
  @Prop() type?: FlipButtonType = "button";

  @Element() hostElement: HTMLElement;

  hasIconLeft: boolean;

  componentWillLoad() {
    this.hasIconLeft = !!this.hostElement.querySelector('[slot="left-icon"]');
  }

  render() {
    const className = {
      button: true,
      "button--has-left-icon": this.hasIconLeft,
    };

    return (
      <button
        aria-disabled={this.disabled ? "true" : undefined}
        class={className}
        disabled={this.disabled}
        type={this.type}
      >
        <span class="button__left-icon">
          <slot name="left-icon"></slot>
        </span>
        {this.label}
      </button>
    );
  }
}
