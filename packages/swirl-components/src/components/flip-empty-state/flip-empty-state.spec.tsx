import { newSpecPage } from "@stencil/core/testing";

import { FlipEmptyState } from "./flip-empty-state";

describe("flip-empty-state", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [FlipEmptyState],
      html: `
        <flip-empty-state heading="Nothing to see here." illustration="/assets/images/empty-state-1.svg">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
          eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
          voluptua.
        </flip-empty-state>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-empty-state heading="Nothing to see here." illustration="/assets/images/empty-state-1.svg">
        <mock:shadow-root>
          <div class="empty-state">
            <img alt="" class="empty-state__illustration" src="/assets/images/empty-state-1.svg">
            <div class="empty-state__body">
              <flip-heading as="p" text="Nothing to see here."></flip-heading>
              <div class="empty-state__content">
                <flip-text align="center" color="subdued">
                  <slot></slot>
                </flip-text>
              </div>
            </div>
          </div>
        </mock:shadow-root>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      </flip-empty-state>
    `);
  });
});
