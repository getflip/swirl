import { Component, h, Host, Prop } from "@stencil/core";

export type SwirlColumnsSpacing =
  | "0"
  | "2"
  | "4"
  | "8"
  | "12"
  | "16"
  | "24"
  | "32";

@Component({
  shadow: true,
  styleUrl: "swirl-columns.css",
  tag: "swirl-columns",
})
export class SwirlColumns {
  @Prop() columns?: string = "repeat(3, minmax(0, 1fr))";
  @Prop() spacing?: SwirlColumnsSpacing;

  render() {
    return (
      <Host>
        <div
          class="columns"
          style={{
            gridTemplateColumns: this.columns,
            gap: `var(--s-space-${this.spacing})`,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
