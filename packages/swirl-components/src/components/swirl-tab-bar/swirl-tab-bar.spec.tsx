import { newSpecPage } from "@stencil/core/testing";

import { SwirlTooltip } from "../swirl-tooltip/swirl-tooltip";
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

  it("renders tab status badges", async () => {
    const page = await newSpecPage({
      components: [SwirlTabBar],
      html: `<swirl-tab-bar label="Tabs"></swirl-tab-bar>`,
    });

    page.root.tabs = [
      {
        active: false,
        badge: { intent: "info", label: "Batches running" },
        id: "tab1",
        label: "Tab #1",
      },
      {
        active: true,
        badge: { label: "Syncing" },
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
              <swirl-badge class="tab-bar__tab-badge" intent="info" label="Batches running" size="xs" variant="dot"></swirl-badge>
            </span>
          </button>
          <button aria-controls="tab2" aria-selected="true" class="tab-bar__tab tab-bar__tab--variant-default tab-bar__tab--active" id="tab-tab2" role="tab" tabindex="0" type="button">
            <span class="tab-bar__tab-label">
              Tab #2
              <swirl-badge class="tab-bar__tab-badge" intent="info" label="Syncing" size="xs" variant="dot"></swirl-badge>
            </span>
          </button>
          <button aria-controls="tab3" aria-selected="false" class="tab-bar__tab tab-bar__tab--variant-default" id="tab-tab3" role="tab" tabindex="-1" type="button">
            <span class="tab-bar__tab-label">
              Tab #3
            </span>
          </button>
        </div>
      </swirl-tab-bar>
    `);

    // the badge carries its own accessible label, which swirl-badge renders
    // into a swirl-visually-hidden for the dot variant
    expect(
      page.root.querySelector("#tab-tab1 swirl-badge").getAttribute("label")
    ).toBe("Batches running");

    // an omitted intent falls back to "info" rather than swirl-badge's own
    // "critical" default
    expect(
      page.root.querySelector("#tab-tab2 swirl-badge").getAttribute("intent")
    ).toBe("info");

    // tabs without a badge render none
    expect(page.root.querySelector("#tab-tab3 swirl-badge")).toBeNull();
  });

  it("renders tab status badges in the pill variant", async () => {
    const page = await newSpecPage({
      components: [SwirlTabBar],
      html: `<swirl-tab-bar label="Tabs" variant="pill"></swirl-tab-bar>`,
    });

    page.root.tabs = [
      {
        active: true,
        badge: { intent: "info", label: "Batches running" },
        id: "tab1",
        label: "Tab #1",
      },
      {
        active: false,
        badge: { intent: "info", label: "Syncing" },
        id: "tab2",
        label: "Tab #2",
      },
    ];

    await page.waitForChanges();

    expect(page.root.querySelector("#tab-tab1").className).toContain(
      "tab-bar__tab--variant-pill"
    );

    // an `info` dot would be invisible against the active pill, so its intent
    // is forced to `critical`. inactive pills keep the requested intent
    expect(
      page.root.querySelector("#tab-tab1 swirl-badge").getAttribute("intent")
    ).toBe("critical");

    expect(
      page.root.querySelector("#tab-tab2 swirl-badge").getAttribute("intent")
    ).toBe("info");
  });

  it("wraps tabs with tooltips in swirl-tooltip", async () => {
    const page = await newSpecPage({
      components: [SwirlTabBar, SwirlTooltip],
      html: `<swirl-tab-bar label="Tabs"></swirl-tab-bar>`,
    });

    page.root.tabs = [
      {
        active: true,
        id: "tab1",
        label: "Tab #1",
        tooltip: "First tab tooltip",
      },
      {
        active: false,
        id: "tab2",
        label: "Tab #2",
      },
    ];

    await page.waitForChanges();

    const tooltip = page.root.querySelector("swirl-tooltip");

    expect(tooltip).not.toBeNull();
    expect(tooltip.content).toBe("First tab tooltip");
    expect(
      page.root
        .querySelector<HTMLButtonElement>("#tab-tab1")
        ?.getAttribute("role")
    ).toBe("tab");
    expect(page.root.querySelector("#tab-tab2")?.closest("swirl-tooltip")).toBe(
      null
    );
  });
});
