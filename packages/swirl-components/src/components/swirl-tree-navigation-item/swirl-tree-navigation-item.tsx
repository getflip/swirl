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
  @Prop() navigationItemId!: string;
  @Prop() level?: number = 1;
  @Prop() expandable?: boolean = true;
  @Prop() external?: boolean = false;

  @Event() expandedChange!: EventEmitter<boolean>;
  @State() expanded = false;
  @State() hasChildren = false;

  private buttonId = `${this.navigationItemId}-button`;
  private childrenId = `${this.navigationItemId}-children`;

  componentWillLoad() {
    this.checkForChildren();
  }

  @Watch("expanded")
  handleExpandedChange() {
    this.expandedChange.emit(this.expanded);
  }

  private checkForChildren() {
    this.hasChildren = Boolean(
      this.el.querySelector("swirl-tree-navigation-item")
    );
  }

  @Method()
  async expand() {
    if (this.expanded || !this.expandable || !this.hasChildren) {
      return;
    }
    this.expanded = true;
  }

  @Method()
  async collapse() {
    if (!this.expanded || !this.expandable || !this.hasChildren) {
      return;
    }
    this.expanded = false;
  }

  private onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        this.toggleExpanded(event);
        break;
      case "ArrowRight":
        event.preventDefault();
        if (!this.expanded && this.hasChildren) {
          this.expand();
        }
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (this.expanded) {
          this.collapse();
        }
        break;
    }
  };

  private toggleExpanded = (event: Event) => {
    if (!this.href) {
      event.preventDefault();
      event.stopPropagation();

      if (this.expanded) {
        this.collapse();
      } else {
        this.expand();
      }
    }
  };

  render() {
    const isLink = Boolean(this.href);
    const Tag = isLink ? "a" : "button";
    const linkClassName = classnames("tree-navigation-item__link", {
      "tree-navigation-item__link--active": this.active,
      "tree-navigation-item__link--has-icon": Boolean(this.icon),
    });

    return (
      <Host role="none">
        <li
          class="tree-navigation-item"
          role="treeitem"
          aria-expanded={this.hasChildren ? this.expanded : undefined}
          aria-level={this.level}
        >
          <Tag
            onClick={this.toggleExpanded}
            onKeyDown={this.onKeyDown}
            class={linkClassName}
            href={this.href}
            target={this.target}
            type={isLink ? undefined : "button"}
            id={this.buttonId}
            aria-current={this.active ? "page" : undefined}
            aria-controls={this.hasChildren ? this.childrenId : undefined}
            aria-expanded={this.hasChildren ? this.expanded : undefined}
          >
            <span class="tree-navigation-item__content">
              {this.icon && (
                <swirl-icon
                  class="tree-navigation-item__icon"
                  glyph={this.icon}
                  size={20}
                  aria-hidden="true"
                  role="img"
                  aria-label={`${this.label} icon`}
                ></swirl-icon>
              )}
              <span class="tree-navigation-item__label">{this.label}</span>
            </span>
            {this.expandable && this.hasChildren && !this.external && (
              <span
                class="tree-navigation-item__toggle-icon"
                aria-hidden="true"
              >
                {this.expanded ? (
                  <swirl-icon-expand-more
                    size={16}
                    role="img"
                    aria-label="Collapse"
                  ></swirl-icon-expand-more>
                ) : (
                  <swirl-icon-chevron-right
                    size={16}
                    role="img"
                    aria-label="Expand"
                  ></swirl-icon-chevron-right>
                )}
              </span>
            )}
            {this.external && (
              <span
                class="tree-navigation-item__external-icon"
                aria-hidden="true"
              >
                <swirl-icon-open-in-new
                  size={16}
                  role="img"
                  aria-label="External link"
                ></swirl-icon-open-in-new>
              </span>
            )}
          </Tag>
          {this.hasChildren && (
            <ul
              class="tree-navigation-item__children"
              id={this.childrenId}
              role="group"
              aria-label={`${this.label} submenu`}
              style={{
                display: !this.expanded ? "none" : undefined,
              }}
            >
              <slot></slot>
            </ul>
          )}
        </li>
      </Host>
    );
  }
}
