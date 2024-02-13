import { newSpecPage } from "@stencil/core/testing";

import { SwirlIconClose } from "./icons/swirl-icon-close";

describe("swirl-icon", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlIconClose],
      html: `<swirl-icon-close></swirl-icon-close>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-icon-close>
        <mock:shadow-root>
          <svg aria-hidden="true" class="swirl-icon swirl-icon--size-24" fill="none" height="24" width="24" part="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 13.6L7.19999 18.4C6.98333 18.6167 6.71666 18.725 6.39999 18.725C6.08333 18.725 5.81666 18.6167 5.59999 18.4C5.38333 18.1834 5.27499 17.9167 5.27499 17.6C5.27499 17.2834 5.38333 17.0167 5.59999 16.8L10.4 12L5.59999 7.20002C5.38333 6.98336 5.27499 6.71669 5.27499 6.40002C5.27499 6.08336 5.38333 5.81669 5.59999 5.60002C5.81666 5.38336 6.08333 5.27502 6.39999 5.27502C6.71666 5.27502 6.98333 5.38336 7.19999 5.60002L12 10.4L16.8 5.60002C17.0167 5.38336 17.2833 5.27502 17.6 5.27502C17.9167 5.27502 18.1833 5.38336 18.4 5.60002C18.6167 5.81669 18.725 6.08336 18.725 6.40002C18.725 6.71669 18.6167 6.98336 18.4 7.20002L13.6 12L18.4 16.8C18.6167 17.0167 18.725 17.2834 18.725 17.6C18.725 17.9167 18.6167 18.1834 18.4 18.4C18.1833 18.6167 17.9167 18.725 17.6 18.725C17.2833 18.725 17.0167 18.6167 16.8 18.4L12 13.6Z" fill="currentColor"></path>
          </svg>
        </mock:shadow-root>
      </swirl-icon-close>
    `);
  });
});
