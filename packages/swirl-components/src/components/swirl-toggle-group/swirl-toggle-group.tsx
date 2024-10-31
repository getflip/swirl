import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  Watch,
} from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "swirl-toggle-group.css",
  tag: "swirl-toggle-group",
})
export class SwirlToggleGroup {
  @Element() el: HTMLElement;

  @Prop({ mutable: true }) selectedToggleId!: string;

  @Event() selectedToggleChange: EventEmitter<string>;

  private toggleButtons: HTMLSwirlToggleButtonElement[] = [];

  @Watch("selectedToggleId")
  watchSelectedToggleId(newValue: string, oldValue: string): void {
    if (newValue !== oldValue) {
      this.selectedToggleChange.emit(newValue);
      this.setTogglePressedStates();
    }
  }

  private onSlotChange = (): void => {
    this.toggleButtons = Array.from(
      this.el.querySelectorAll("swirl-toggle-button")
    );

    this.setTogglePressedStates();
  };

  private setTogglePressedStates(): void {
    if (!this.toggleButtons?.length) {
      return;
    }

    if (!this.selectedToggleId) {
      this.toggleButtonWithId(this.toggleButtons[0].identifier);
      return;
    }

    const toggleWithIdentifierExists = this.toggleButtons.some(
      (toggleButton) => toggleButton.identifier === this.selectedToggleId
    );

    if (!toggleWithIdentifierExists) {
      this.toggleButtonWithId(this.toggleButtons[0].identifier);
      return;
    }

    this.toggleButtonWithId(this.selectedToggleId);
  }

  private toggleButtonWithId(identifier: string): void {
    if (!this.toggleButtons?.length) {
      return;
    }

    this.toggleButtons.forEach((toggleButton) => {
      if (toggleButton.identifier === identifier) {
        toggleButton.isPressed = true;
      } else {
        toggleButton.isPressed = false;
      }
    });
  }

  private onGroupClick = (event: MouseEvent): void => {
    console.log("MATEJ-TEST click", event);
    const target = event.target as HTMLElement;

    if (target?.tagName === "SWIRL-TOGGLE-BUTTON") {
      event.stopPropagation();

      const toggleButton = target as HTMLSwirlToggleButtonElement;
      this.selectedToggleId = toggleButton.identifier;
    }
  };

  render() {
    return (
      <swirl-stack
        class="toggle-group"
        spacing="4"
        orientation="horizontal"
        align="center"
        role="group"
        onClick={this.onGroupClick}
      >
        <slot onSlotchange={this.onSlotChange}></slot>
      </swirl-stack>
    );
  }
}
