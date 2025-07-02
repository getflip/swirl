import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";
import { SwirlHeadingLevel } from "../swirl-heading/swirl-heading";

/**
 * @slot slot - The component content
 * @slot controls - The component content
 * @slot illustration - The placeholder illustration
 */
@Component({
  shadow: true,
  styleUrl: "swirl-empty-state.css",
  tag: "swirl-empty-state",
})
export class SwirlEmptyState {
  @Element() el: HTMLElement;

  @Prop() heading?: string;
  @Prop() headingLevel: SwirlHeadingLevel = 4;
  @Prop() illustration?: string;

  render() {
    const hasControls = Boolean(this.el.querySelector('[slot="controls"]'));
    const hasSlottedIllustration = Boolean(
      this.el.querySelector('[slot="illustration"]')
    );

    const className = classnames("empty-state", {
      "empty-state--has-controls": hasControls,
      "empty-state--has-slotted-illustration": hasSlottedIllustration,
    });

    return (
      <Host>
        <div class={className}>
          {this.illustration && !hasSlottedIllustration && (
            <img
              alt=""
              class="empty-state__illustration"
              src={this.illustration}
            />
          )}

          <div class="empty-state__slotted-illustration">
            <slot name="illustration"></slot>
          </div>

          <div class="empty-state__body">
            <swirl-stack align="stretch" spacing="8">
              {this.heading && (
                <swirl-heading
                  align="center"
                  level={this.headingLevel}
                  text={this.heading}
                ></swirl-heading>
              )}

              <div class="empty-state__content">
                <swirl-text align="center" color="subdued">
                  <slot></slot>
                </swirl-text>
              </div>
            </swirl-stack>

            <div class="empty-state__controls">
              <slot name="controls"></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
