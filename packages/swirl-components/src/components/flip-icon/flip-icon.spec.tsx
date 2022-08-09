import { newSpecPage } from '@stencil/core/testing';

import { FlipIcon } from './flip-icon';

describe("flip-icon", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FlipIcon],
      html: `<flip-icon></flip-icon>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-icon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </flip-icon>
    `);
  });
});
