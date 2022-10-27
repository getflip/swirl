import { newSpecPage } from "@stencil/core/testing";

import { FlipAutocomplete } from "./flip-autocomplete";

describe("flip-autocomplete", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FlipAutocomplete],
      html: `<flip-autocomplete></flip-autocomplete>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-autocomplete>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </flip-autocomplete>
    `);
  });
});
