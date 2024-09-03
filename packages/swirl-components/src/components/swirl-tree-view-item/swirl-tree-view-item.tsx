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

@Component({
  scoped: true,
  shadow: false,
  styleUrl: "swirl-tree-view-item.css",
  tag: "swirl-tree-view-item",
})
export class SwirlTreeViewItem {
  @Element() el!: HTMLSwirlTreeViewItemElement;

  @Prop() active?: boolean;
  @Prop() href?: string;
  @Prop() icon?: string;
  @Prop() itemId!: string;
  @Prop() label!: string;

  @Event() expandedChange!: EventEmitter<boolean>;
  @Event() itemSelected!: EventEmitter<HTMLSwirlTreeViewItemElement>;

  @State() expanded = false;
  @State() hasChildren = false;
  @State() level = 0;
  @State() selected = false;

  private link?: HTMLAnchorElement;

  componentWillLoad() {
    this.updateLevel();
    this.hasChildren = Boolean(this.el.querySelector("swirl-tree-view-item"));
  }

  @Method()
  async expand() {
    this.expanded = true;
    this.expandedChange.emit(this.expanded);
  }

  @Method()
  async collapse() {
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
    this.collapse();
  };

  private onClickExpand = (event: Event) => {
    event.preventDefault();
    this.expand();
  };

  render() {
    const hasTags = Boolean(this.el.querySelector('[slot="tags"]'));

    const className = classNames("tree-view-item", {
      "tree-view-item--active": this.active,
      "tree-view-item--has-tags": hasTags,
    });

    return (
      <Host id={this.itemId} role="none">
        <li class={className} role="none">
          <a
            aria-current={this.active ? "page" : undefined}
            aria-expanded={
              !this.hasChildren ? undefined : String(this.expanded)
            }
            aria-level={this.level + 1}
            aria-owns={this.hasChildren ? `${this.itemId}-children` : undefined}
            aria-selected={String(this.selected)}
            class="tree-view-item__link"
            href={this.href}
            onFocus={this.onFocus}
            style={{
              paddingLeft: `calc(${this.level} * var(--s-space-12) + var(--s-space-4))`,
            }}
            ref={(el) => (this.link = el)}
            role="treeitem"
            tabIndex={this.selected ? 0 : -1}
          >
            <span class="tree-view-item__toggle-icon">
              {this.hasChildren && (
                <Fragment>
                  {this.expanded ? (
                    <swirl-icon-expand-more
                      onClick={this.onClickCollapse}
                      size={20}
                    ></swirl-icon-expand-more>
                  ) : (
                    <swirl-icon-chevron-right
                      onClick={this.onClickExpand}
                      size={20}
                    ></swirl-icon-chevron-right>
                  )}
                </Fragment>
              )}
            </span>
            {Boolean(this.icon) && (
              <span class="tree-view-item__icon">{this.icon}</span>
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
              display: !this.expanded || !this.hasChildren ? "none" : undefined,
            }}
          >
            <slot></slot>
          </ul>
        </li>
      </Host>
    );
  }
}
