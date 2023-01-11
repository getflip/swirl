import { newSpecPage } from "@stencil/core/testing";

import { SwirlList } from "./swirl-list";

describe("swirl-list", () => {
  it("render its native list", async () => {
    const page = await newSpecPage({
      components: [SwirlList],
      html: `
        <swirl-list>
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
        </swirl-list>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-list>
        <div class="swirl-list">
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
      </swirl-list>
    `);
  });

  it("should warn if provided with unallowed children", async () => {
    const spy = jest.fn();
    global.console.warn = spy;

    await newSpecPage({
      components: [SwirlList],
      html: `
        <swirl-list>
          <div>Test</div>
        </swirl-list>
      `,
    });

    expect(spy).toHaveBeenCalledWith(
      "[FlipList] Only ul and ol elements are allowed as direct children of <swirl-list />."
    );
  });
});
