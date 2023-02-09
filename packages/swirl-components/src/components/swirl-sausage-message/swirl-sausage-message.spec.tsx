import { newSpecPage } from "@stencil/core/testing";

import { SwirlSausageMessage } from "./swirl-sausage-message";

describe("swirl-sausage-message", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlSausageMessage],
      html: `<swirl-sausage-message></swirl-sausage-message>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-sausage-message>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </swirl-sausage-message>
    `);
  });
});
