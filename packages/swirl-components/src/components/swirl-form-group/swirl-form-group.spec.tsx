import { newSpecPage } from "@stencil/core/testing";

import { FlipFormGroup } from "./swirl-form-group";

describe("flip-form-group", () => {
  it("renders its controls", async () => {
    const page = await newSpecPage({
      components: [FlipFormGroup],
      html: `
        <flip-form-group orientation="horizontal">
          <flip-form-control label="First name">
            <flip-text-input type="text" value="John"></flip-text-input>
          </flip-form-control>
          <flip-form-control label="Last name">
            <flip-text-input type="text" value="Doe"></flip-text-input>
          </flip-form-control>
        </flip-form-group>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-form-group orientation="horizontal">
        <div class="form-group form-group--orientation-horizontal">
          <flip-form-control label="First name">
            <flip-text-input type="text" value="John"></flip-text-input>
          </flip-form-control>
          <flip-form-control label="Last name">
            <flip-text-input type="text" value="Doe"></flip-text-input>
          </flip-form-control>
        </div>
      </flip-form-group>
    `);
  });
});
