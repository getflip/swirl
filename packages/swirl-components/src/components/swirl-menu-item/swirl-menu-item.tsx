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

@Component({
  shadow: true,
  styleUrl: "swirl-menu-item.css",
  tag: "swirl-menu-item",
})
export class SwirlMenuItem {
  @Element() el: HTMLSwirlMenuItemElement;

  @Prop() description?: string;
  @Prop() expanded?: boolean;
  @Prop() icon?: string;
  @Prop() intent?: SwirlActionListItemIntent = "default";
  @Prop() label!: string;

  @State() subMenu?: HTMLSwirlMenuElement;

  private actionListItem: HTMLSwirlActionListItemElement;
  private parentMenu: HTMLSwirlMenuElement;
  private rootMenu: HTMLSwirlMenuElement;

  componentDidLoad() {
    this.parentMenu = closestPassShadow(this.el, "swirl-menu");
    this.rootMenu = parentsPassShadow(this.el, "swirl-menu").pop();
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
    this.actionListItem.swirlAriaExpanded = this.expanded ? "true" : undefined;
    this.actionListItem.swirlAriaHaspopup = Boolean(this.subMenu)
      ? "true"
      : undefined;

    this.actionListItem.suffix = Boolean(this.subMenu)
      ? '<swirl-icon-chevron-right size="16"></swirl-icon-chevron-right>'
      : undefined;
  }

  private onClick = () => {
    this.rootMenu.activateMenuItem(this.el);
  };

  render() {
    return (
      <Host>
        <div class="menu-item">
          <swirl-action-list-item
            description={this.description}
            icon={this.icon}
            intent={this.intent}
            label={this.label}
            onClick={this.onClick}
            ref={(el) => (this.actionListItem = el)}
          ></swirl-action-list-item>
          <slot onSlotchange={this.onSlotChange}></slot>
        </div>
      </Host>
    );
  }
}
