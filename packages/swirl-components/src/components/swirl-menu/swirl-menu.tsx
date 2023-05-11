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
} from "@stencil/core";
import classnames from "classnames";
import {
  closestPassShadow,
  getActiveElement,
  isMobileViewport,
  parentsPassShadow,
  querySelectorAllDeep,
} from "../../utils";

@Component({
  shadow: true,
  styleUrl: "swirl-menu.css",
  tag: "swirl-menu",
})
export class SwirlMenu {
  @Element() el: HTMLElement;

  @Prop() activeLevel: number = 0;
  @Prop({ mutable: true }) active?: boolean = true;
  @Prop() label!: string;
  @Prop({ mutable: true }) level: number = 0;
  @Prop() mobileBackButtonLabel?: string = "Back";
  @Prop() mobileCloseMenuButtonLabel?: string = "Close menu";
  @Prop() mobileDoneButtonLabel?: string = "Done";

  @State() mobile: boolean;

  @Event() close: EventEmitter<void>;
  @Event() done: EventEmitter<void>;

  private items: HTMLElement[];
  private mobileMediaQuery = window.matchMedia("(min-width: 768px)");
  private observer: MutationObserver;
  private parentMenu: HTMLSwirlMenuElement;
  private rootMenu: HTMLSwirlMenuElement;

  componentDidLoad() {
    this.mobileMediaQuery.addEventListener?.("change", this.mediaQueryHandler);
    this.parentMenu = closestPassShadow(this.el.parentElement, "swirl-menu");
    this.rootMenu = parentsPassShadow(this.el, "swirl-menu").pop();

    if (Boolean(this.parentMenu)) {
      this.active = false;
    }

    this.updateLevel();
    this.updateMobileState();
    this.updateItems();
    this.observeSlotChanges();
  }

  disconnectedCallback() {
    this.mobileMediaQuery.removeEventListener?.(
      "change",
      this.mediaQueryHandler
    );

    this.observer?.disconnect();
  }

  /**
   * Activates a menu item with a sub menu. Only callable on root menu.
   * @returns
   */
  @Method()
  async activateMenuItem(menuItem: HTMLSwirlMenuItemElement) {
    if (Boolean(this.parentMenu)) {
      return;
    }

    const subMenu = await menuItem.getSubMenu();

    if (!Boolean(subMenu)) {
      return;
    }

    menuItem.expanded = true;
    subMenu.active = true;
    this.activeLevel = subMenu.level;

    // wait for animation
    setTimeout(() => {
      subMenu.focusFirstItem();
    }, 200);
  }

  /**
   * Activate parent menu. Only callable on root menu.
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
   * Focus the first item of the menu.
   * @returns
   */
  @Method()
  async focusFirstItem() {
    this.focusItem(this.items[0]);
  }

  /**
   * Focus item at index.
   * @returns
   */
  @Method()
  async focusItemAtIndex(index: number) {
    this.focusItem(this.items[index]);
  }

  private observeSlotChanges() {
    this.observer = new MutationObserver(() => {
      this.updateItems();
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
    this.items = querySelectorAllDeep(this.el, '[role="menuitem"]').filter(
      (item) => {
        return closestPassShadow(item, "swirl-menu") === this.el;
      }
    );
  }

  private updateLevel() {
    const parents = parentsPassShadow(this.el.parentNode, "swirl-menu");
    this.level = parents.length;
  }

  private focusItem(item: HTMLElement) {
    const items = querySelectorAllDeep(this.parentMenu, '[role="menuitem"]');

    items.forEach((item) => {
      item.tabIndex = -1;
    });

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
        item === activeElement?.querySelector('[role="menuitem"]')
    );
  }

  private closeMenu() {
    this.items.forEach((item) => {
      item.tabIndex = -1;
    });

    closestPassShadow(this.el, "swirl-popover")?.close();
  }

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
      );

      if (!Boolean(activeItem)) {
        return;
      }

      this.rootMenu.activateMenuItem(activeItem);
    }
  };

  private onClose = () => {
    this.closeMenu();
    this.close.emit();
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
                intent="primary"
                label={this.mobileDoneButtonLabel}
                onClick={this.onDone}
                variant="plain"
              ></swirl-button>
            </div>
          )}
          <div
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-orientation="vertical"
            class="menu__menu"
            onKeyDown={this.onKeyDown}
            role={role}
            style={{
              left: isTopLevelMenu
                ? `calc(-100% * ${this.activeLevel})`
                : "100%",
            }}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
