import { newSpecPage } from "@stencil/core/testing";

import { SwirlChip } from "./swirl-chip";

describe("swirl-chip", () => {
  it("renders with label and intent", async () => {
    const page = await newSpecPage({
      components: [SwirlChip],
      html: `<swirl-chip intent="critical" label="Label"></swirl-chip>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-chip intent="critical" label="Label">
        <mock:shadow-root>
          <span class="chip chip--intent-critical">
            <span class="chip__label">Label</span>
          </span>
        </mock:shadow-root>
      </swirl-chip>
    `);
  });

  it("renders as button", async () => {
    const page = await newSpecPage({
      components: [SwirlChip],
      html: `<swirl-chip interactive="true" label="Label"></swirl-chip>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-chip interactive="true" label="Label">
        <mock:shadow-root>
          <button class="chip chip--intent-default chip--interactive" type="button">
            <span class="chip__label">Label</span>
          </button>
        </mock:shadow-root>
      </swirl-chip>
    `);
  });

  it("renders avatar with overwritten props", async () => {
    const page = await newSpecPage({
      components: [SwirlChip],
      html: `<swirl-chip label="Label" avatar="<swirl-avatar badge=&quot;Badge&quot; initials=&quot;JD&quot; interactive=&quot;true&quot; show-label=&quot;true&quot; size=&quot;xl&quot; variant=&quot;square&quot;></swirl-avatar>"></swirl-chip>`,
    });

    const avatar = page.root.shadowRoot.querySelector("swirl-avatar");

    expect(avatar).toBeTruthy();
    expect(avatar.getAttribute("badge")).toBeNull();
    expect(avatar.getAttribute("interactive")).toBeNull();
    expect(avatar.getAttribute("show-label")).toBeNull();
    expect(avatar.getAttribute("variant")).toBeNull();
    expect(avatar.getAttribute("size")).toBe("xs");
  });

  it("renders icon with overwritten props", async () => {
    const page = await newSpecPage({
      components: [SwirlChip],
      html: `<swirl-chip label="Label" icon="<swirl-icon-person size=&quot;16&quot;></swirl-icon-person>"></swirl-chip>`,
    });

    const icon = page.root.shadowRoot.querySelector(".chip__icon > *");

    await page.waitForChanges();

    expect(icon).toBeTruthy();
    expect(icon.getAttribute("size")).toBe("24");
  });
});
