import { newSpecPage } from '@stencil/core/testing';

import { FlipIconClose } from './icons/flip-icon-close';

describe("flip-icon", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FlipIconClose],
      html: `<flip-icon-close></flip-icon-close>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-icon-close>
        <mock:shadow-root>
          <svg class="flip-icon" fill="none" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="m12 13.6-4.8 4.8a1.087 1.087 0 0 1-.8.325c-.317 0-.583-.108-.8-.325a1.087 1.087 0 0 1-.325-.8c0-.317.108-.583.325-.8l4.8-4.8-4.8-4.8a1.087 1.087 0 0 1-.325-.8c0-.317.108-.583.325-.8.217-.217.483-.325.8-.325.317 0 .583.108.8.325l4.8 4.8 4.8-4.8c.217-.217.483-.325.8-.325.317 0 .583.108.8.325.217.217.325.483.325.8 0 .317-.108.583-.325.8L13.6 12l4.8 4.8c.217.217.325.483.325.8 0 .317-.108.583-.325.8a1.087 1.087 0 0 1-.8.325c-.317 0-.583-.108-.8-.325L12 13.6Z" fill="currentColor"></path>
          </svg>
        </mock:shadow-root>
      </flip-icon-close>
    `);
  });
});
