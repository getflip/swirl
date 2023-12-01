import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "swirl-empty-state.css",
  tag: "swirl-empty-state",
})
export class SwirlEmptyState {
  @Prop() heading?: string;
  @Prop() illustration?: string;

  render() {
    return (
      <Host>
        <div class="empty-state">
          {this.illustration && (
            <img
              alt=""
              class="empty-state__illustration"
              src={this.illustration}
            />
          )}

          <div class="empty-state__body">
            {this.heading && (
              <swirl-heading
                align="center"
                as="p"
                level={4}
                text={this.heading}
              ></swirl-heading>
            )}

            <div class="empty-state__content">
              <swirl-text align="center" color="subdued">
                <slot></slot>
              </swirl-text>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
