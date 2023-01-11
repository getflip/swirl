import { newSpecPage } from "@stencil/core/testing";
import { FlipDescriptionList } from "./swirl-description-list";

describe("flip-description-list", () => {
  it("renders its items", async () => {
    const page = await newSpecPage({
      components: [FlipDescriptionList],
      html: `<flip-description-list>
        <flip-description-list-item term="Term #1">
          A short description
        </flip-description-list-item>
        <flip-description-list-item term="Term #2">
          A short description
        </flip-description-list-item>
      </flip-description-list>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-description-list>
        <mock:shadow-root>
          <dl class="description-list">
            <slot></slot>
          </dl>
        </mock:shadow-root>
        <flip-description-list-item term="Term #1">
          A short description
        </flip-description-list-item>
        <flip-description-list-item term="Term #2">
          A short description
        </flip-description-list-item>
      </flip-description-list>
    `);
  });
});
