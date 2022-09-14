import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
} from "@stencil/core";
import classnames from "classnames";

export type FlipSwitchSize = "s" | "m";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "flip-switch.css",
  tag: "flip-switch",
})
export class FlipSwitch {
  @Element() el: HTMLElement;

  @Prop({ mutable: true }) checked?: boolean = false;
  @Prop() disabled?: boolean = false;
  @Prop() inputId!: string;
  @Prop() inputName!: string;
  @Prop() label?: string;
  @Prop() size?: FlipSwitchSize = "m";
  @Prop() value?: string;

  @Event() valueChange: EventEmitter<boolean>;

  private control: HTMLElement;
  private dragging = false;
  private recentlyDragged = false;
  private thumb: HTMLElement;

  @Listen("pointerup", { target: "window" })
  onWindowPointerUp() {
    this.onEndDrag();
  }

  private onChange = () => {
    if (this.dragging) {
      return;
    }

    if (this.recentlyDragged) {
      this.recentlyDragged = false;
      return;
    }

    this.checked = !this.checked;
    this.valueChange.emit(this.checked);
  };

  private onStartDrag = () => {
    if (this.disabled) {
      return;
    }

    this.dragging = true;
    this.thumb.style.transition = "none";
  };

  private onEndDrag = () => {
    if (this.disabled) {
      return;
    }

    if (this.recentlyDragged) {
      const controlBonds = this.control.getBoundingClientRect();
      const thumbBounds = this.thumb.getBoundingClientRect();

      const on =
        this.thumb.offsetLeft + thumbBounds.width / 2 > controlBonds.width / 2;

      if (this.checked !== on) {
        this.checked = on;
        this.valueChange.emit(on);
      }
    }

    this.thumb.style.left = "";
    this.thumb.style.transition = "";

    this.dragging = false;

    setTimeout(() => {
      this.recentlyDragged = false;
    });
  };

  private onDrag = (event: PointerEvent) => {
    if (!this.dragging) {
      return;
    }

    this.recentlyDragged = true;

    const controlBonds = this.control.getBoundingClientRect();
    const thumbBounds = this.thumb.getBoundingClientRect();

    let pos = Math.round(event.offsetX - thumbBounds.width / 2);

    if (pos < 0) {
      pos = 0;
    }

    if (pos > Math.round(controlBonds.width - thumbBounds.width)) {
      pos = Math.round(controlBonds.width - thumbBounds.width);
    }

    this.thumb.style.left = `${pos}px`;
  };

  render() {
    const off = !this.checked;
    const on = this.checked;

    const ariaCheckedLabel = on ? "true" : "false";

    const className = classnames("switch", `switch--size-${this.size}`, {
      "switch--off": off,
      "switch--on": on,
      "switch--disabled": this.disabled,
    });

    return (
      <Host>
        <label class={className} htmlFor={this.inputId}>
          <span
            class="switch__control"
            onPointerDown={this.onStartDrag}
            onPointerMove={this.onDrag}
            onPointerUp={this.onEndDrag}
            ref={(el) => (this.control = el)}
          >
            <flip-visually-hidden>
              <input
                aria-checked={ariaCheckedLabel}
                checked={on}
                class="switch__input"
                disabled={this.disabled}
                id={this.inputId}
                name={this.inputName}
                onChange={this.onChange}
                role="switch"
                type="checkbox"
                value={this.value}
              />
            </flip-visually-hidden>
            <span
              aria-hidden="true"
              class="switch__thumb"
              ref={(el) => (this.thumb = el)}
            ></span>
          </span>
          {this.label && <span class="switch__label">{this.label}</span>}
        </label>
      </Host>
    );
  }
}
