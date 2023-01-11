import { newSpecPage } from "@stencil/core/testing";

import { FlipList } from "./swirl-list";

describe("flip-list", () => {
  it("render its native list", async () => {
    const page = await newSpecPage({
      components: [FlipList],
      html: `
        <flip-list>
          <ul>
            <li>Level 1</li>
            <li>Level 1
              <ul>
                <li>Level 2</li>
                <li>Level 2</li>
              </ul>
            </li>
            <li>Level 1</li>
          </ul>
        </flip-list>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-list>
        <div class="flip-list">
          <ul>
            <li>Level 1</li>
            <li>
              Level 1
              <ul>
                <li>Level 2</li>
                <li>Level 2</li>
              </ul>
            </li>
            <li>Level 1</li>
          </ul>
        </div>
      </flip-list>
    `);
  });

  it("should warn if provided with unallowed children", async () => {
    const spy = jest.fn();
    global.console.warn = spy;

    await newSpecPage({
      components: [FlipList],
      html: `
        <flip-list>
          <div>Test</div>
        </flip-list>
      `,
    });

    expect(spy).toHaveBeenCalledWith(
      "[FlipList] Only ul and ol elements are allowed as direct children of <flip-list />."
    );
  });
});
