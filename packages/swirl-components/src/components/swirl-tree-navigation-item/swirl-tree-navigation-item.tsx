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
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "swirl-tree-navigation-item.css",
  tag: "swirl-tree-navigation-item",
})
export class SwirlTreeNavigationItem {
  @Element() el: HTMLSwirlTreeNavigationItemElement;

  @Prop() active?: boolean;
  @Prop() href?: string;
  @Prop() icon?: string;
  @Prop() label!: string;
  @Prop() target?: string;
  @Prop() expandable?: boolean = true;
  @Prop() navigationItemId!: string;

  @Event() expandedChange!: EventEmitter<boolean>;

  @State() expanded = false;

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
    const isLink = Boolean(this.href);

    const Tag = isLink ? "a" : "button";

    const linkClassName = classnames("tree-navigation-item__link", {
      "tree-navigation-item__link--active": this.active,
      "tree-navigation-item__link--has-icon": Boolean(this.icon),
    });

    const hasChildren = Boolean(
      this.el.querySelector("swirl-tree-navigation-item")
    );

    return (
      <Host>
        <li class="tree-navigation-item">
          <Tag
            onClick={this.expanded ? this.onClickCollapse : this.onClickExpand}
            class={linkClassName}
            href={this.href}
            target={this.target}
            type={isLink ? undefined : "button"}
          >
            <span class="tree-navigation-item__content">
              {this.icon && (
                <swirl-icon
                  class="tree-navigation-item__icon"
                  glyph={this.icon}
                  size={20}
                ></swirl-icon>
              )}
              <span class="tree-navigation-item__label">{this.label}</span>
            </span>
            {this.expandable && (
              <span class="tree-navigation-item__toggle-icon">
                {hasChildren && (
                  <Fragment>
                    {this.expanded ? (
                      <swirl-icon-expand-more
                        size={16}
                      ></swirl-icon-expand-more>
                    ) : (
                      <swirl-icon-chevron-right
                        size={16}
                      ></swirl-icon-chevron-right>
                    )}
                  </Fragment>
                )}
              </span>
            )}
          </Tag>
          <ul
            aria-label={this.label}
            class="tree-navigation-item__children"
            id={`${this.navigationItemId}-children`}
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
