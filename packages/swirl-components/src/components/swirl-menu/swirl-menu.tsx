import {
  autoUpdate,
  computePosition,
  ComputePositionReturn,
  flip,
  offset,
  Placement,
  shift,
} from "@floating-ui/dom";
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import classnames from "classnames";
import {
  closestPassShadow,
  getActiveElement,
  isMobileViewport,
  parentsPassShadow,
  querySelectorAllDeep,
} from "../../utils";

export type SwirlMenuVariant = "action" | "selection";

@Component({
  shadow: true,
  styleUrl: "swirl-menu.css",
  tag: "swirl-menu",
})
export class SwirlMenu {
  @Element() el: HTMLElement;

  @Prop({ mutable: true }) active?: boolean = true;
  @Prop() label!: string;
  @Prop({ mutable: true }) level?: number = 0;
  @Prop() mobileBackButtonLabel?: string = "Back";
  @Prop() mobileCloseMenuButtonLabel?: string = "Close menu";
  @Prop() placement?: Placement = "right-start";
  @Prop() mobileDoneButtonLabel?: string = "Done";
  @Prop() value?: string;
  @Prop() variant?: SwirlMenuVariant = "action";

  @State() activeLevel: number = 0;
  @State() mobile: boolean;
  @State() position: ComputePositionReturn;

  @Event() done: EventEmitter<void>;
  @Event() valueChange: EventEmitter<string>;

  private disableAutoUpdate: any;
  private items: HTMLElement[];
  private menuContainer: HTMLElement;
  private mobileMediaQuery = window.matchMedia("(min-width: 768px)");
  private observer: MutationObserver;
  private parentMenu: HTMLSwirlMenuElement;
  private rootMenu: HTMLSwirlMenuElement;
  private swirlPopover: HTMLSwirlPopoverElement;

  componentWillLoad() {
    this.updateMobileState();
    this.updateLevel();
    this.observeSlotChanges();
  }

  componentDidLoad() {
    this.mobileMediaQuery.addEventListener("change", this.mediaQueryHandler);
    this.parentMenu = closestPassShadow(
      this.el.parentElement,
      "swirl-menu"
    ) as HTMLSwirlMenuElement;
    this.swirlPopover = closestPassShadow(
      this.el,
      "swirl-popover"
    ) as HTMLSwirlPopoverElement;
    this.rootMenu = parentsPassShadow(this.el, "swirl-menu").pop();

    if (Boolean(this.parentMenu)) {
      queueMicrotask(() => {
        this.active = false;
      });
    }

    this.swirlPopover.addEventListener("popoverClose", this.resetMenu);

    this.updateItems();
  }

  disconnectedCallback() {
    this.swirlPopover?.removeEventListener("popoverClose", this.resetMenu);

    this.mobileMediaQuery.removeEventListener?.(
      "change",
      this.mediaQueryHandler
    );

    this.observer?.disconnect();
  }

  @Watch("active")
  watchActive() {
    this.reposition();

    if (this.disableAutoUpdate) {
      this.disableAutoUpdate();
    }

    this.disableAutoUpdate = autoUpdate(
      this.el.parentElement,
      this.menuContainer,
      this.reposition
    );
  }

  @Watch("value")
  watchValue() {
    this.updateActiveItem();
  }

  /**
   * Activate a menu item with a sub menu. Only callable on a root menu.
   * @returns
   */
  @Method()
  async activateMenuItem(menuItem: HTMLSwirlMenuItemElement) {
    if (Boolean(this.parentMenu)) {
      return;
    }

    const parentMenu = await menuItem.getParentMenu();

    // deactivate sub menus of parent menu
    const subMenus = querySelectorAllDeep<HTMLSwirlMenuElement>(
      this.el,
      "swirl-menu"
    ).filter(
      (subMenu) => subMenu.level >= parentMenu.level && subMenu !== parentMenu
    );

    subMenus.forEach((subMenu) => {
      subMenu.active = false;
      (subMenu.parentElement as HTMLSwirlMenuItemElement).expanded = false;
    });

    // activate sub menu
    const subMenu = await menuItem.getSubMenu();

    if (!Boolean(subMenu)) {
      return;
    }

    menuItem.expanded = true;
    subMenu.active = true;
    this.activeLevel = subMenu.level;

    // wait for animation to focus first item of sub menu
    setTimeout(
      () => {
        subMenu.focusFirstItem();
      },
      this.mobile ? 200 : 60
    );
  }

  /**
   * Close and reset the menu. Only callable on a root menu.
   * @returns
   */
  @Method()
  async close() {
    this.closeMenu();
  }

  /**
   * Collapse the currently active sub menu. Only callable on a root menu.
   * @returns
   */
  @Method()
  async goBack() {
    if (Boolean(this.parentMenu) || this.activeLevel === 0) {
      return;
    }

    const currentlyActiveSubMenu =
      querySelectorAllDeep<HTMLSwirlMenuElement>(this.el, "swirl-menu").find(
        (subMenu) => subMenu.level === this.activeLevel && subMenu.active
      ) || this.rootMenu;

    const deactivatedMenuItem =
      currentlyActiveSubMenu.parentElement as HTMLSwirlMenuItemElement;

    deactivatedMenuItem.expanded = false;

    this.activeLevel = Math.max(this.activeLevel - 1, 0);

    const subMenus = querySelectorAllDeep<HTMLSwirlMenuElement>(
      this.el,
      "swirl-menu"
    ).filter((subMenu) => subMenu.level > this.activeLevel);

    // disable sub menus of deactivated level(s)
    subMenus.forEach((subMenu) => {
      subMenu.active = false;
    });

    const activatedMenu =
      querySelectorAllDeep<HTMLSwirlMenuElement>(this.el, "swirl-menu").find(
        (subMenu) => subMenu.level === this.activeLevel && subMenu.active
      ) || this.rootMenu;

    activatedMenu.focusItemAtIndex(
      Array.from(deactivatedMenuItem.parentElement.children).indexOf(
        deactivatedMenuItem
      )
    );
  }

  /**
   * Focus the first menu item.
   * @returns
   */
  @Method()
  async focusFirstItem() {
    this.focusItem(this.items[0]);
  }

  /**
   * Focus the menu item at index.
   * @returns
   */
  @Method()
  async focusItemAtIndex(index: number) {
    this.focusItem(this.items[index]);
  }

  /**
   * Update the selection of a menu with variant "selection".
   * @returns
   */
  @Method()
  async updateSelection(item: HTMLSwirlOptionListItemElement) {
    this.valueChange.emit(item.value);
  }

  /**
   * Update the displayed active item.
   * @returns
   */
  @Method()
  async updateActiveItem() {
    const menuItems = querySelectorAllDeep(this.el, "swirl-menu-item").filter(
      (item) => {
        return closestPassShadow(item, "swirl-menu") === this.el;
      }
    ) as HTMLSwirlMenuItemElement[];

    menuItems.forEach((item) => {
      item.updateValue();
    });

    if (this.parentMenu && this.parentMenu.variant === "action") {
      this.parentMenu.updateActiveItem();
    }
  }

  private observeSlotChanges() {
    this.observer = new MutationObserver(() => {
      requestAnimationFrame(() => {
        this.updateItems();
      });
    });

    this.observer.observe(this.el, { childList: true });
  }

  private mediaQueryHandler = () => {
    this.updateMobileState();
  };

  private updateMobileState() {
    const mobile = isMobileViewport();

    if (mobile !== this.mobile) {
      this.mobile = mobile;
    }
  }

  private updateItems() {
    this.items = [
      ...querySelectorAllDeep(this.el, '[role="menuitem"]'),
      ...querySelectorAllDeep(this.el, '[role="menuitemradio"]'),
    ].filter((item) => {
      return closestPassShadow(item, "swirl-menu") === this.el;
    });
  }

  private updateLevel() {
    const parents = parentsPassShadow(this.el.parentNode, "swirl-menu");
    this.level = parents.length;
  }

  private focusItem(item: HTMLElement) {
    const items = [
      ...querySelectorAllDeep(this.rootMenu, '[role="menuitem"]'),
      ...querySelectorAllDeep(this.rootMenu, '[role="menuitemradio"]'),
    ];

    items.forEach((item) => {
      item.tabIndex = -1;
    });

    if (!Boolean(item)) {
      return;
    }

    item.tabIndex = 0;
    item.focus();
  }

  private focusNextItem() {
    const activeItemIndex = this.getActiveItemIndex();
    const newIndex = (activeItemIndex + 1) % this.items.length;
    const item = this.items[newIndex];

    this.focusItem(item);
  }

  private focusPreviousItem() {
    const activeItemIndex = this.getActiveItemIndex();
    const newIndex =
      activeItemIndex === 0 ? this.items.length - 1 : activeItemIndex - 1;
    const item = this.items[newIndex];

    this.focusItem(item);
  }

  private getActiveItemIndex(): number {
    const activeElement = getActiveElement();

    return this.items.findIndex(
      (item) =>
        item === activeElement ||
        item === activeElement?.querySelector('[role="menuitem"]') ||
        item === activeElement?.querySelector('[role="menuitemradio"]')
    );
  }

  private resetMenu = () => {
    this.items.forEach((item) => {
      item.tabIndex = -1;
    });

    if (this.level > 0) {
      return;
    }

    // wait for animation
    setTimeout(
      () => {
        this.activeLevel = 0;

        const subMenus = querySelectorAllDeep<HTMLSwirlMenuElement>(
          this.el,
          "swirl-menu"
        );

        // disable sub menus
        subMenus.forEach((subMenu) => {
          subMenu.active = false;
          (subMenu.parentElement as HTMLSwirlMenuItemElement).expanded = false;
        });
      },
      this.mobile ? 200 : 60
    );
  };

  private closeMenu = () => {
    if (this.disableAutoUpdate) {
      this.disableAutoUpdate();
    }

    this.swirlPopover.close();
    this.resetMenu();
  };

  private reposition = async () => {
    if (this.mobile || this.level === 0) {
      this.position = undefined;
      return;
    }

    const trigger = this.el.parentElement;

    if (!Boolean(trigger) || !Boolean(this.menuContainer)) {
      return;
    }
    requestAnimationFrame(async () => {
      this.position = await computePosition(trigger, this.menuContainer, {
        placement: this.placement,
        strategy: "fixed",
        middleware: [offset({ mainAxis: -10, crossAxis: 0 }), shift(), flip()],
      });
    });
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "ArrowDown") {
      event.preventDefault();
      event.stopPropagation();

      this.focusNextItem();
    } else if (event.code === "ArrowUp") {
      event.preventDefault();
      event.stopPropagation();

      this.focusPreviousItem();
    } else if (event.code === "ArrowLeft") {
      event.preventDefault();
      event.stopPropagation();

      this.rootMenu.goBack();
    } else if (event.code === "ArrowRight") {
      event.preventDefault();

      const activeItem = closestPassShadow(
        this.items[this.getActiveItemIndex()],
        "swirl-menu-item"
      ) as HTMLSwirlMenuItemElement;

      if (!Boolean(activeItem)) {
        return;
      }

      this.rootMenu.activateMenuItem(activeItem);
    }
  };

  private onClose = () => {
    this.closeMenu();
  };

  private onDone = () => {
    this.closeMenu();
    this.done.emit();
  };

  private onGoBack = () => {
    this.rootMenu.goBack();
  };

  render() {
    const isTopLevelMenu = !Boolean(this.parentMenu);

    const ariaLabel = isTopLevelMenu && this.mobile ? undefined : this.label;
    const ariaLabelledby =
      isTopLevelMenu && this.mobile ? "menu-title" : undefined;

    const role = isTopLevelMenu ? "menubar" : "menu";

    const className = classnames("menu", `menu--level-${this.level}`, {
      "menu--active": this.active,
      "menu--mobile": this.mobile,
      "menu--root": isTopLevelMenu,
    });

    return (
      <Host>
        <div class={className}>
          {this.mobile && isTopLevelMenu && (
            <div class="menu__mobile-header">
              {this.activeLevel === 0 && (
                <swirl-button
                  hideLabel
                  icon="<swirl-icon-close></swirl-icon-close>"
                  label={this.mobileCloseMenuButtonLabel}
                  onClick={this.onClose}
                  variant="plain"
                ></swirl-button>
              )}
              {this.activeLevel > 0 && (
                <swirl-button
                  hideLabel
                  icon="<swirl-icon-chevron-left></swirl-icon-chevron-left>"
                  label={this.mobileBackButtonLabel}
                  onClick={this.onGoBack}
                  variant="plain"
                ></swirl-button>
              )}
              <span class="menu__title" id="menu-title">
                <swirl-heading
                  align="center"
                  as="span"
                  level={4}
                  text={this.label}
                  truncate
                ></swirl-heading>
              </span>
              <swirl-button
                class="menu__done-button"
                intent="primary"
                label={this.mobileDoneButtonLabel}
                onClick={this.onDone}
              ></swirl-button>
            </div>
          )}
          <div
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-orientation="vertical"
            class="menu__menu"
            onKeyDown={this.onKeyDown}
            ref={(el) => (this.menuContainer = el)}
            role={role}
            style={
              !this.mobile && this.level > 0
                ? {
                    top: Boolean(this.position) ? `${this.position?.y}px` : "",
                    left: Boolean(this.position) ? `${this.position?.x}px` : "",
                  }
                : this.mobile
                ? {
                    left: isTopLevelMenu
                      ? `calc(-100% * ${this.activeLevel})`
                      : "100%",
                  }
                : undefined
            }
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
