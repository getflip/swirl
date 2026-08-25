import { newSpecPage } from "@stencil/core/testing";
import { SwirlTab } from "../swirl-tab/swirl-tab";

import { SwirlTabBar } from "../swirl-tab-bar/swirl-tab-bar";
import { SwirlTabs } from "./swirl-tabs";

describe("swirl-tabs", () => {
  it("renders its tabs", async () => {
    const page = await newSpecPage({
      components: [SwirlTabs, SwirlTab],
      html: `
        <swirl-tabs label="Tabs">
          <swirl-tab label="Tab #1" tab-id="tab-1">Tab 1</swirl-tab>
          <swirl-tab label="Tab #2" tab-id="tab-2">Tab 2</swirl-tab>
          <swirl-tab label="Tab Number 3" tab-id="tab-3">Tab 3</swirl-tab>
        </swirl-tabs>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-tabs label="Tabs">
        <div class="tabs">
          <swirl-tab-bar label="Tabs" variant="default"></swirl-tab-bar>
        </div>
        <swirl-tab aria-labelledby="tab-tab-1" class="tab tab--active" id="tab-1" label="Tab #1" role="tabpanel" tab-id="tab-1" tabindex="0" style="padding: var(--s-space-8);">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          Tab 1
        </swirl-tab>
        <swirl-tab aria-labelledby="tab-tab-2" class="tab" id="tab-2" label="Tab #2" role="tabpanel" tab-id="tab-2" tabindex="-1" style="padding: var(--s-space-8);">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          Tab 2
        </swirl-tab>
        <swirl-tab aria-labelledby="tab-tab-3" class="tab" id="tab-3" label="Tab Number 3" role="tabpanel" tab-id="tab-3" tabindex="-1" style="padding: var(--s-space-8);">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          Tab 3
        </swirl-tab>
      </swirl-tabs>
    `);
  });

  it("activates initial tab", async () => {
    const page = await newSpecPage({
      components: [SwirlTabs, SwirlTab],
      html: `
        <swirl-tabs initial-tab="tab-2" label="Tabs">
          <swirl-tab label="Tab #1" tab-id="tab-1">Tab 1</swirl-tab>
          <swirl-tab label="Tab #2" tab-id="tab-2">Tab 2</swirl-tab>
          <swirl-tab label="Tab Number 3" tab-id="tab-3">Tab 3</swirl-tab>
        </swirl-tabs>
      `,
    });

    const tabs = Array.from(page.root.querySelectorAll("swirl-tab"));
    const activeTab = tabs.find((tab) => tab.active);

    expect(activeTab.tabId).toBe("tab-2");
  });

  it("activates tabs via click", async () => {
    const page = await newSpecPage({
      components: [SwirlTabs, SwirlTab, SwirlTabBar],
      html: `
        <swirl-tabs label="Tabs">
          <swirl-tab label="Tab #1" tab-id="tab-1">Tab 1</swirl-tab>
          <swirl-tab label="Tab #2" tab-id="tab-2">Tab 2</swirl-tab>
          <swirl-tab label="Tab Number 3" tab-id="tab-3">Tab 3</swirl-tab>
        </swirl-tabs>
      `,
    });

    const tabs = Array.from(page.root.querySelectorAll("swirl-tab"));

    expect(tabs.find((tab) => tab.active).tabId).toBe("tab-1");

    page.root.querySelector<HTMLButtonElement>("#tab-tab-2").click();

    expect(tabs.find((tab) => tab.active).tabId).toBe("tab-2");
  });

  it("forwards tab badges to the tab bar", async () => {
    const page = await newSpecPage({
      components: [SwirlTabs, SwirlTab, SwirlTabBar],
      html: `
        <swirl-tabs label="Tabs">
          <swirl-tab label="Tab #1" tab-id="tab-1">Tab 1</swirl-tab>
          <swirl-tab label="Tab #2" tab-id="tab-2">Tab 2</swirl-tab>
        </swirl-tabs>
      `,
    });

    expect(page.root.querySelector("#tab-tab-2 swirl-badge")).toBeNull();

    page.root.querySelector<HTMLSwirlTabElement>(
      "swirl-tab[tab-id='tab-2']"
    ).badge = {
      intent: "info",
      label: "Batches running",
    };

    // the tab bar renders from a snapshot taken on load and on activation, so
    // the badge reaches it with the next activation
    await page.rootInstance.activateTab("tab-2");
    await page.waitForChanges();

    const badge = page.root.querySelector("#tab-tab-2 swirl-badge");

    expect(badge).not.toBeNull();
    expect(badge.getAttribute("variant")).toBe("dot");
    expect(badge.getAttribute("intent")).toBe("info");
    expect(badge.getAttribute("label")).toBe("Batches running");

    // and clearing it removes the badge again
    page.root.querySelector<HTMLSwirlTabElement>(
      "swirl-tab[tab-id='tab-2']"
    ).badge = undefined;

    await page.rootInstance.activateTab("tab-1");
    await page.waitForChanges();

    expect(page.root.querySelector("#tab-tab-2 swirl-badge")).toBeNull();
  });

  it("activates tabs via keyboard", async () => {
    const page = await newSpecPage({
      components: [SwirlTabs, SwirlTab, SwirlTabBar],
      html: `
        <swirl-tabs label="Tabs">
          <swirl-tab label="Tab #1" tab-id="tab-1">Tab 1</swirl-tab>
          <swirl-tab label="Tab #2" tab-id="tab-2">Tab 2</swirl-tab>
          <swirl-tab label="Tab Number 3" tab-id="tab-3">Tab 3</swirl-tab>
        </swirl-tabs>
      `,
    });

    const tabs = Array.from(page.root.querySelectorAll("swirl-tab"));

    expect(tabs.find((tab) => tab.active).tabId).toBe("tab-1");

    page.root
      .querySelector<HTMLElement>(".tab-bar")
      .dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowRight" }));

    expect(tabs.find((tab) => tab.active).tabId).toBe("tab-2");

    page.root
      .querySelector<HTMLElement>(".tab-bar")
      .dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowLeft" }));

    expect(tabs.find((tab) => tab.active).tabId).toBe("tab-1");
  });
});
