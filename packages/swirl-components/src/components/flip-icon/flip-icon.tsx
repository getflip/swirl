import { Component, h, Host, Prop } from '@stencil/core';

export type FlipIconSize = "s" | "m";

@Component({
  tag: "flip-icon",
  styleUrl: "flip-icon.css",
  shadow: true,
})
export class FlipIcon {
  @Prop() size: FlipIconSize = "m";

  render() {
    return <Host>Hello World {this.size}</Host>;
  }
}
