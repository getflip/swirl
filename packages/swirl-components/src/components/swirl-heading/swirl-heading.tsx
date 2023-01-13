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
  @Prop() headingId?: string;
  @Prop() level?: SwirlHeadingLevel = 1;
  @Prop() text!: string;

  render() {
    const Tag = this.as || `h${this.level}`;

    const className = classnames(
      "heading",
      `heading--align-${this.align}`,
      `heading--level-${this.level}`
    );

    return (
      <Host>
        <Tag class={className} id={this.headingId}>
          {this.text}
        </Tag>
      </Host>
    );
  }
}
