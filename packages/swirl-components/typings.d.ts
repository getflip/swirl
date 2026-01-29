declare module "balance-text";

/**
 * Native Popover API types
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
 */

interface HTMLElement {
  popover: "auto" | "manual" | null;
  showPopover(): void;
  hidePopover(): void;
  togglePopover(force?: boolean): boolean;
}

interface ToggleEvent extends Event {
  newState: string;
}
