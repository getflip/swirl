import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipHeadingAlign = "start" | "center" | "end";

export type FlipHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type FlipHeadingTag =
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
  shadow: true,
  styleUrl: "flip-heading.css",
  tag: "flip-heading",
})
export class FlipHeading {
  @Prop() align?: FlipHeadingAlign = "start";
  @Prop() as?: FlipHeadingTag;
  @Prop() headingId?: string;
  @Prop() level?: FlipHeadingLevel = 1;
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
