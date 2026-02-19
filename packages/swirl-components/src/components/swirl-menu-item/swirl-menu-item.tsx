import {
  Component,
  Element,
  forceUpdate,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import classnames from "classnames";
import { closestPassShadow, parentsPassShadow } from "../../utils";
import { SwirlActionListItemIntent } from "../swirl-action-list-item/swirl-action-list-item";

/**
 * @slot avatar - Avatar displayed inside the item
 */
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
  @Prop() iconBadge?: string;
  @Prop() intent?: SwirlActionListItemIntent = "default";
  @Prop() label!: string;
  @Prop() suffix?: string;
  @Prop() value?: string;
  @Prop() truncateLabel?: boolean = true;

  @State() hasAvatar: boolean = false;
  @State() parentMenu?: HTMLSwirlMenuElement;
  @State() subMenu?: HTMLSwirlMenuElement;

  private actionListItem: HTMLSwirlActionListItemElement | undefined;
  private optionListItem: HTMLSwirlOptionListItemElement | undefined;
  private rootMenu: HTMLSwirlMenuElement;

  componentWillLoad() {
    this.parentMenu = closestPassShadow(
      this.el,
      "swirl-menu"
    ) as HTMLSwirlMenuElement;

    this.rootMenu = parentsPassShadow(this.el, "swirl-menu").pop();
    this.subMenu = this.el.querySelector("swirl-menu");

    this.updateAvatarState();
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
   * Update the selected value
   */
  @Method()
  async updateValue() {
    forceUpdate(this);
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

  private updateAvatarState() {
    const avatarContainer = this.el.querySelector('[slot="avatar"]');
    const hasAvatar = Boolean(avatarContainer);

    if (hasAvatar !== this.hasAvatar) {
      this.hasAvatar = hasAvatar;
    }
  }

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
        iconBadge={this.iconBadge}
        intent={this.intent}
        label={this.label}
        truncateLabel={this.truncateLabel}
        onClick={this.onActionListItemClick}
        ref={(el) => (this.actionListItem = el)}
        suffix={this.suffix}
      >
        {this.hasAvatar && <slot name="avatar" slot="avatar"></slot>}
      </swirl-action-list-item>
    );
  }

  private renderOptionListItem() {
    const selected = this.parentMenu?.value === this.value;

    return (
      <swirl-option-list-item
        disabled={this.disabled}
        icon={this.icon}
        iconBadge={this.iconBadge}
        label={this.label}
        truncateLabel={this.truncateLabel}
        onClick={this.onOptionListItemClick}
        onKeyDown={this.onOptionListItemKeyDown}
        onKeyUp={this.onOptionListItemKeyUp}
        ref={(el) => (this.optionListItem = el)}
        selected={selected}
        swirlAriaRole="menuitemradio"
        value={this.value}
      >
        {this.hasAvatar && <slot name="avatar" slot="avatar"></slot>}
      </swirl-option-list-item>
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
