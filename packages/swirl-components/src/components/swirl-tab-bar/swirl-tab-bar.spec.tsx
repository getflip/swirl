import { newSpecPage } from "@stencil/core/testing";

import { SwirlTabBar } from "./swirl-tab-bar";

describe("swirl-tab-bar", () => {
  it("renders its tabs", async () => {
    const page = await newSpecPage({
      components: [SwirlTabBar],
      html: `<swirl-tab-bar label="Tabs"></swirl-tab-bar>`,
    });

    page.root.tabs = [
      {
        active: false,
        id: "tab1",
        label: "Tab #1",
        suffix: "2",
      },
      {
        active: true,
        id: "tab2",
        label: "Tab #2",
      },
      {
        active: false,
        id: "tab3",
        label: "Tab #3",
      },
    ];

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <swirl-tab-bar label="Tabs">
        <div aria-label="Tabs" class="tab-bar tab-bar--justify-start tab-bar--variant-default" role="tablist">
          <button aria-controls="tab1" aria-selected="false" class="tab-bar__tab tab-bar__tab--variant-default" id="tab-tab1" role="tab" tabindex="-1" type="button">
            <span class="tab-bar__tab-label">
              Tab #1
              <span class="tab-bar__tab-suffix">2</span>
            </span>
          </button>
          <button aria-controls="tab2" aria-selected="true" class="tab-bar__tab tab-bar__tab--variant-default tab-bar__tab--active" id="tab-tab2" role="tab" tabindex="0" type="button">
            <span class="tab-bar__tab-label">
              Tab #2
            </span>
          </button>
          <button aria-controls="tab3" aria-selected="false" class="tab-bar__tab  tab-bar__tab--variant-default" id="tab-tab3" role="tab" tabindex="-1" type="button">
            <span class="tab-bar__tab-label">
              Tab #3
            </span>
          </button>
        </div>
      </swirl-tab-bar>
    `);
  });

  it("fires events", async () => {
    const page = await newSpecPage({
      components: [SwirlTabBar],
      html: `<swirl-tab-bar label="Tabs"></swirl-tab-bar>`,
    });

    page.root.tabs = [
      {
        active: false,
        id: "tab1",
        label: "Tab #1",
      },
      {
        active: true,
        id: "tab2",
        label: "Tab #2",
      },
      {
        active: false,
        id: "tab3",
        label: "Tab #3",
      },
    ];

    await page.waitForChanges();

    const spy = jest.fn();

    page.root.addEventListener("activateTab", spy);
    page.root.addEventListener("activatePreviousTab", spy);
    page.root.addEventListener("activateNextTab", spy);

    page.root.querySelector<HTMLButtonElement>("#tab-tab1").click();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe("tab1");

    page.root.querySelector<HTMLButtonElement>("#tab-tab2").click();
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[1][0].detail).toBe("tab2");

    page.root
      .querySelector('[role="tablist"]')
      .dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowRight" }));
    expect(spy).toHaveBeenCalledTimes(3);

    page.root
      .querySelector('[role="tablist"]')
      .dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowLeft" }));
    expect(spy).toHaveBeenCalledTimes(4);
  });
});
