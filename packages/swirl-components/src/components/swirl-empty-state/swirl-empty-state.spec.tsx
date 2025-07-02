import { newSpecPage } from "@stencil/core/testing";

import { SwirlEmptyState } from "./swirl-empty-state";

describe("swirl-empty-state", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [SwirlEmptyState],
      html: `
        <swirl-empty-state heading="Nothing to see here." illustration="/assets/images/empty-state-1.svg">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
          eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
          voluptua.
        </swirl-empty-state>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-empty-state heading="Nothing to see here." illustration="/assets/images/empty-state-1.svg">
        <mock:shadow-root>
          <div class="empty-state">
            <img alt="" class="empty-state__illustration" src="/assets/images/empty-state-1.svg">
            <div class="empty-state__slotted-illustration">
              <slot name="illustration"></slot>
            </div>
            <div class="empty-state__body">
              <swirl-stack align="stretch" spacing="8">
                <swirl-heading align="center" level="4" text="Nothing to see here."></swirl-heading>
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
        </mock:shadow-root>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      </swirl-empty-state>
    `);
  });
});
