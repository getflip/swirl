import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Host,
  Method,
  Prop,
  State,
} from "@stencil/core";
import classNames from "classnames";
import { SwirlIconColor } from "../swirl-icon/swirl-icon";

/**
 * @slot slot - The children of the tree view item
 * @slot tags - The tags of the tree view item
 */
@Component({
  scoped: true,
  shadow: false,
  styleUrl: "swirl-tree-view-item.css",
  tag: "swirl-tree-view-item",
})
export class SwirlTreeViewItem {
  @Element() el!: HTMLSwirlTreeViewItemElement;

  @Prop() active?: boolean;
  @Prop() expandable?: boolean = true;
  @Prop() href?: string;
  @Prop() icon?: string;
  @Prop() iconColor?: SwirlIconColor;
  @Prop() itemId!: string;
  @Prop() label!: string;

  @Event() expandedChange!: EventEmitter<boolean>;
  @Event() itemSelected!: EventEmitter<HTMLSwirlTreeViewItemElement>;

  @State() expanded = false;
  @State() level = 0;
  @State() selected = false;

  private link?: HTMLAnchorElement;

  componentWillLoad() {
    this.updateLevel();
  }

  @Method()
  async expand() {
    if (this.expanded || !this.expandable) {
      return;
    }

    this.expanded = true;
    this.expandedChange.emit(this.expanded);
  }

  @Method()
  async collapse() {
    if (!this.expanded || !this.expandable) {
      return;
    }

    this.expanded = false;
    this.expandedChange.emit(this.expanded);
  }

  @Method()
  async select(focus?: boolean) {
    this.selected = true;

    if (focus) {
      this.link?.focus();
    }

    this.itemSelected.emit(this.el);
  }

  @Method()
  async unselect() {
    this.selected = false;
  }

  private updateLevel() {
    let parentItem = this.el.parentElement?.closest("swirl-tree-view-item");

    while (Boolean(parentItem)) {
      this.level += 1;
      parentItem = parentItem.parentElement?.closest("swirl-tree-view-item");
    }
  }

  private onFocus = () => {
    if (!this.selected) {
      this.select();
    }
  };

  private onClickCollapse = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    this.collapse();
  };

  private onClickExpand = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    this.expand();
  };

  render() {
    const hasTags = Boolean(this.el.querySelector('[slot="tags"]'));
    const iconIsEmoji =
      Boolean(this.icon) && /\p{Extended_Pictographic}/u.test(this.icon);

    const className = classNames("tree-view-item", {
      "tree-view-item--active": this.active,
      "tree-view-item--has-tags": hasTags,
    });

    const hasChildren = Boolean(this.el.querySelector("swirl-tree-view-item"));

    return (
      <Host id={this.itemId} role="none">
        <li class={className} role="none">
          <a
            aria-current={this.active ? "page" : undefined}
            aria-expanded={!hasChildren ? undefined : String(this.expanded)}
            aria-level={this.level + 1}
            aria-owns={hasChildren ? `${this.itemId}-children` : undefined}
            aria-selected={String(this.selected)}
            class="tree-view-item__link"
            href={this.href}
            onFocus={this.onFocus}
            style={{
              paddingLeft: `calc(${
                this.level
              } * var(--s-space-12) + var(--s-space-${
                this.expandable ? "4" : "8"
              }))`,
            }}
            ref={(el) => (this.link = el)}
            role="treeitem"
            tabIndex={this.selected ? 0 : -1}
          >
            {this.expandable && (
              <span class="tree-view-item__toggle-icon">
                {hasChildren && (
                  <Fragment>
                    {this.expanded ? (
                      <swirl-icon-expand-more
                        onClick={this.onClickCollapse}
                        size={24}
                      ></swirl-icon-expand-more>
                    ) : (
                      <swirl-icon-chevron-right
                        onClick={this.onClickExpand}
                        size={24}
                      ></swirl-icon-chevron-right>
                    )}
                  </Fragment>
                )}
              </span>
            )}
            {Boolean(this.icon) && (
              <Fragment>
                <span class="tree-view-item__icon">
                  {iconIsEmoji ? (
                    this.icon
                  ) : (
                    <swirl-icon
                      glyph={this.icon}
                      size={24}
                      color={this.iconColor}
                    ></swirl-icon>
                  )}
                </span>
              </Fragment>
            )}
            <span class="tree-view-item__label">{this.label}</span>
            <span class="tree-view-item__tags">
              <slot name="tags"></slot>
            </span>
          </a>
          <ul
            aria-label={this.label}
            class="tree-view-item__children"
            id={`${this.itemId}-children`}
            role="group"
            style={{
              display: !this.expanded || !hasChildren ? "none" : undefined,
            }}
          >
            <slot></slot>
          </ul>
        </li>
      </Host>
    );
  }
}
