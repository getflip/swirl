import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlHeadingAlign = "start" | "center" | "end";

export type SwirlHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type SwirlHeadingTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div";

@Component({
  scoped: true,
  shadow: false,
  styleUrl: "swirl-heading.css",
  tag: "swirl-heading",
})
export class SwirlHeading {
  @Prop() align?: SwirlHeadingAlign = "start";
  @Prop() as?: SwirlHeadingTag;
  @Prop() balance?: boolean = true;
  @Prop() headingId?: string;
  @Prop() level?: SwirlHeadingLevel = 1;
  @Prop() lines?: number;
  @Prop() text!: string;
  @Prop() truncate?: boolean;

  render() {
    const Tag = this.as || `h${this.level}`;

    const styles = Boolean(this.lines)
      ? {
          display: "-webkit-box",
          overflow: "hidden",
          "-webkit-line-clamp": String(this.lines),
          "-webkit-box-orient": "vertical",
          whiteSpace: "normal",
        }
      : undefined;

    const className = classnames(
      "heading",
      `heading--align-${this.align}`,
      `heading--level-${this.level}`,
      {
        "heading--balanced": this.balance,
        "heading--truncate": this.truncate,
      }
    );

    return (
      <Host>
        <Tag class={className} id={this.headingId} style={styles}>
          {this.text}
        </Tag>
      </Host>
    );
  }
}
