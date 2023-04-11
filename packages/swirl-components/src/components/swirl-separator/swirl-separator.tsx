import { Component, h, Host, Prop } from "@stencil/core";

export type SwirlSeparatorSpacing =
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
  styleUrl: "swirl-separator.css",
  tag: "swirl-separator",
})
export class SwirlSeparator {
  @Prop() spacing?: SwirlSeparatorSpacing = "8";

  render() {
    const styles = {
      paddingTop: `var(--s-space-${this.spacing})`,
      paddingBottom: `var(--s-space-${this.spacing})`,
    };

    return (
      <Host class="separator" role="separator" style={styles}>
        <span class="separator__line"></span>
      </Host>
    );
  }
}
