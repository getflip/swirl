import { newSpecPage } from "@stencil/core/testing";
import { SwirlAppIcon } from "./swirl-app-icon";

describe("swirl-app-icon", () => {
  it("renders with the fallback icon", async () => {
    const page = await newSpecPage({
      components: [SwirlAppIcon],
      html: `<swirl-app-icon label="link"></swirl-app-icon>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-app-icon label="link">
        <mock:shadow-root>
          <span class="app-icon app-icon--has-icon"></span>
        </mock:shadow-root>
      </swirl-app-icon>
    `);
  });

  it("renders with an image", async () => {
    // simulate successful image loading
    global.Image = class Image {
      constructor() {
        (this as any).onload();
      }
    } as typeof Image;

    const page = await newSpecPage({
      components: [SwirlAppIcon],
      html: `<swirl-app-icon label="link" src="https://"></swirl-app-icon>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-app-icon label="link" src="https://">
        <mock:shadow-root>
          <span class="app-icon">
            <img alt="" height="40" src="https://" width="40">
          </span>
        </mock:shadow-root>
      </swirl-app-icon>
    `);
  });

  it("renders with an icon", async () => {
    const page = await newSpecPage({
      components: [SwirlAppIcon],
      html: `<swirl-app-icon label="link" icon="<swirl-icon-link></swirl-icon-link>"></swirl-app-icon>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-app-icon label="link" icon="<swirl-icon-link></swirl-icon-link>">
        <mock:shadow-root>
          <span class="app-icon app-icon--has-icon">
            <span class="app-icon__icon">
              <swirl-icon-link></swirl-icon-link>
            </span>
          </span>
        </mock:shadow-root>
      </swirl-app-icon>
    `);
  });
});
