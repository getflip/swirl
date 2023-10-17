import { newSpecPage } from "@stencil/core/testing";
import { SwirlDescriptionList } from "./swirl-description-list";

describe("swirl-description-list", () => {
  it("renders its items", async () => {
    const page = await newSpecPage({
      components: [SwirlDescriptionList],
      html: `<swirl-description-list>
        <swirl-description-list-item term="Term #1">
          A short description
        </swirl-description-list-item>
        <swirl-description-list-item term="Term #2">
          A short description
        </swirl-description-list-item>
      </swirl-description-list>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-description-list>
        <mock:shadow-root>
          <div class="description-list" role="list">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <swirl-description-list-item term="Term #1">
          A short description
        </swirl-description-list-item>
        <swirl-description-list-item term="Term #2">
          A short description
        </swirl-description-list-item>
      </swirl-description-list>
    `);
  });
});
