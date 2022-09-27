import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  assetsDirs: ["../../assets/images"],
  shadow: true,
  styleUrl: "flip-empty-state.css",
  tag: "flip-empty-state",
})
export class FlipEmptyState {
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
              <flip-heading
                align="center"
                as="p"
                text={this.heading}
              ></flip-heading>
            )}

            <div class="empty-state__content">
              <flip-text align="center" color="subdued">
                <slot></slot>
              </flip-text>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
