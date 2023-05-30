import {
  Component,
  Element,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { closestPassShadow, parentsPassShadow } from "../../utils";
import { SwirlActionListItemIntent } from "../swirl-action-list-item/swirl-action-list-item";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "swirl-menu-item.css",
  tag: "swirl-menu-item",
})
export class SwirlMenuItem {
  @Element() el: HTMLSwirlMenuItemElement;

  @Prop() description?: string;
  @Prop() disabled?: boolean;
  @Prop() expanded?: boolean;
  @Prop() icon?: string;
  @Prop() intent?: SwirlActionListItemIntent = "default";
  @Prop() label!: string;
  @Prop() value?: string;

  @State() parentMenu?: HTMLSwirlMenuElement;
  @State() subMenu?: HTMLSwirlMenuElement;

  private actionListItem: HTMLSwirlActionListItemElement | undefined;
  private optionListItem: HTMLSwirlOptionListItemElement | undefined;
  private rootMenu: HTMLSwirlMenuElement;

  componentWillLoad() {
    this.parentMenu = closestPassShadow(this.el, "swirl-menu");
    this.rootMenu = parentsPassShadow(this.el, "swirl-menu").pop();
    this.subMenu = this.el.querySelector("swirl-menu");
  }

  @Watch("expanded")
  watchExpanded() {
    this.updateActionListItemProps();
  }

  /**
   * Get the items sub menu
   */
  @Method()
  async getSubMenu() {
    return this.subMenu;
  }

  /**
   * Get the items parent menu
   */
  @Method()
  async getParentMenu() {
    return this.parentMenu;
  }

  private onSlotChange = () => {
    this.subMenu = this.el.querySelector("swirl-menu");

    this.updateActionListItemProps();
  };

  private updateActionListItemProps() {
    if (!Boolean(this.actionListItem)) {
      return;
    }

    this.actionListItem.swirlAriaExpanded = this.expanded ? "true" : undefined;
    this.actionListItem.swirlAriaHaspopup = Boolean(this.subMenu)
      ? "true"
      : undefined;

    this.actionListItem.suffix = Boolean(this.subMenu)
      ? '<swirl-icon-chevron-right size="16"></swirl-icon-chevron-right>'
      : undefined;
  }

  private onActionListItemClick = () => {
    if (this.actionListItem.disabled) {
      return;
    }

    this.rootMenu.activateMenuItem(this.el);
  };

  private onOptionListItemClick = () => {
    if (this.optionListItem.disabled) {
      return;
    }

    this.parentMenu.updateSelection(this.optionListItem);
  };

  private onOptionListItemKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault();
    } else if (event.code === "Enter") {
      if (this.optionListItem.disabled) {
        return;
      }

      event.preventDefault();

      this.parentMenu.updateSelection(this.optionListItem);
    }
  };

  private onOptionListItemKeyUp = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      if (this.optionListItem.disabled) {
        return;
      }

      event.preventDefault();

      this.parentMenu.updateSelection(this.optionListItem);
    }
  };

  private renderActionListItem() {
    const badge = Boolean(this.subMenu?.value)
      ? Array.from(
          this.subMenu?.querySelectorAll("swirl-menu-item") || []
        ).find((item) => item.value === this.subMenu?.value)?.label
      : undefined;

    return (
      <swirl-action-list-item
        badge={badge}
        description={this.description}
        disabled={this.disabled}
        icon={this.icon}
        intent={this.intent}
        label={this.label}
        onClick={this.onActionListItemClick}
        ref={(el) => (this.actionListItem = el)}
      ></swirl-action-list-item>
    );
  }

  private renderOptionListItem() {
    return (
      <swirl-option-list-item
        disabled={this.disabled}
        icon={this.icon}
        label={this.label}
        onClick={this.onOptionListItemClick}
        onKeyDown={this.onOptionListItemKeyDown}
        onKeyUp={this.onOptionListItemKeyUp}
        ref={(el) => (this.optionListItem = el)}
        selected={this.parentMenu?.value === this.value}
        swirlAriaRole="menuitemradio"
        value={this.value}
      ></swirl-option-list-item>
    );
  }

  render() {
    const className = classnames("menu-item", {
      "menu-item--expanded": this.expanded,
    });

    return (
      <Host>
        <div class={className}>
          {this.parentMenu?.variant === "selection"
            ? this.renderOptionListItem()
            : this.renderActionListItem()}
          <slot onSlotchange={this.onSlotChange}></slot>
        </div>
      </Host>
    );
  }
}
