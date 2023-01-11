import { newSpecPage } from "@stencil/core/testing";

import { SwirlFormGroup } from "./swirl-form-group";

describe("swirl-form-group", () => {
  it("renders its controls", async () => {
    const page = await newSpecPage({
      components: [SwirlFormGroup],
      html: `
        <swirl-form-group orientation="horizontal">
          <swirl-form-control label="First name">
            <swirl-text-input type="text" value="John"></swirl-text-input>
          </swirl-form-control>
          <swirl-form-control label="Last name">
            <swirl-text-input type="text" value="Doe"></swirl-text-input>
          </swirl-form-control>
        </swirl-form-group>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-form-group orientation="horizontal">
        <div class="form-group form-group--orientation-horizontal">
          <swirl-form-control label="First name">
            <swirl-text-input type="text" value="John"></swirl-text-input>
          </swirl-form-control>
          <swirl-form-control label="Last name">
            <swirl-text-input type="text" value="Doe"></swirl-text-input>
          </swirl-form-control>
        </div>
      </swirl-form-group>
    `);
  });
});
