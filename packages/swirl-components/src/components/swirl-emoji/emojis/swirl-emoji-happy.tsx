// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlEmojiSize } from "../swirl-emoji.types";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "../swirl-emoji.css",
  tag: "swirl-emoji-happy",
})
export class SwirlEmojiHappy {
  @Prop() label?: string = "";
  @Prop() size?: SwirlEmojiSize = 24;

  render() {
    const className = classnames("emoji", `emoji--size-${this.size}`);

    return (
      <Fragment>
        {this.size === 16 && (
          <img
            alt={this.label}
            class={className}
            height="16"
            src="/emojis/Happy16.png"
            width="16"
          />
        )}
        {this.size === 20 && (
          <img
            alt={this.label}
            class={className}
            height="20"
            src="/emojis/Happy20.png"
            width="20"
          />
        )}
        {this.size === 24 && (
          <img
            alt={this.label}
            class={className}
            height="24"
            src="/emojis/Happy24.png"
            width="24"
          />
        )}
        {this.size === 32 && (
          <img
            alt={this.label}
            class={className}
            height="32"
            src="/emojis/Happy32.png"
            width="32"
          />
        )}
      </Fragment>
    );
  }
}
