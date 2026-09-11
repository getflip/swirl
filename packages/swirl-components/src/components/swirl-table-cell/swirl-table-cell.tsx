import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Watch,
} from "@stencil/core";
import classnames from "classnames";

export type SwirlTableCellToggleEventDetail = {
  expanded: boolean;
};

/**
 * @slot slot - The cell content.
 */
@Component({
  shadow: true,
  styleUrl: "swirl-table-cell.css",
  tag: "swirl-table-cell",
})
export class SwirlTableCell {
  @Element() el: HTMLElement;

  /**
   * Enable the tree affordance (indent + optional expand/collapse toggle).
   */
  @Prop({ reflect: true }) tree?: boolean = false;

  /**
   * 0-indexed depth. Drives computed inline-start indent when `tree` is true.
   */
  @Prop() level?: number = 0;

  /**
   * When true, the cell has children and renders a toggle. When false, it is a
   * leaf and content sits flush after the level indent (no toggle zone).
   */
  @Prop() expandable?: boolean = false;

  /**
   * Open/closed state. Controlled by the consumer; ignored when not expandable.
   */
  @Prop() expanded?: boolean = false;

  /**
   * Accessible name of the tree node, used to build the toggle label
   * (`Expand {label}` / `Collapse {label}`).
   */
  @Prop() label?: string;

  /**
   * Glyph override for the collapsed toggle. Defaults to `chevron-right`.
   */
  @Prop() collapsedIcon?: string = "chevron-right";

  /**
   * Glyph override for the expanded toggle. Defaults to `expand-more`.
   */
  @Prop() expandedIcon?: string = "expand-more";

  /**
   * Emitted when the toggle is activated. The payload is the requested next
   * state. The component does not own expand state.
   */
  @Event() toggle: EventEmitter<SwirlTableCellToggleEventDetail>;

  componentWillLoad() {
    this.updateTreeLevel();
  }

  @Watch("tree")
  @Watch("level")
  watchTreeIndent() {
    this.updateTreeLevel();
  }

  private updateTreeLevel() {
    if (this.tree) {
      this.el.style.setProperty(
        "--swirl-table-cell-tree-level",
        String(this.level ?? 0)
      );
      this.el.style.setProperty("--swirl-link-text-decoration", "none");
    } else {
      this.el.style.removeProperty("--swirl-table-cell-tree-level");
      this.el.style.removeProperty("--swirl-link-text-decoration");
    }
  }

  private getToggleLabel() {
    const action = this.expanded ? "Collapse" : "Expand";

    return this.label ? `${action} ${this.label}` : action;
  }

  private onToggleClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    this.toggle.emit({ expanded: !this.expanded });
  };

  render() {
    const className = classnames("table-cell", {
      "table-cell--tree": this.tree,
      "table-cell--tree-expandable": this.tree && this.expandable,
    });

    if (!this.tree) {
      return (
        <Host class={className} role="cell">
          <slot></slot>
        </Host>
      );
    }

    const glyph = this.expanded
      ? this.expandedIcon ?? "expand-more"
      : this.collapsedIcon ?? "chevron-right";

    return (
      <Host class={className} role="cell">
        <div class="table-cell__tree">
          {this.expandable && (
            <button
              aria-expanded={String(Boolean(this.expanded))}
              aria-label={this.getToggleLabel()}
              class="table-cell__tree-toggle"
              onClick={this.onToggleClick}
              type="button"
            >
              <swirl-icon
                aria-hidden="true"
                glyph={glyph}
                size={24}
              ></swirl-icon>
            </button>
          )}
          <div class="table-cell__tree-content">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
