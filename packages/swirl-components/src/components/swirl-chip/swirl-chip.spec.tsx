import { newSpecPage } from "@stencil/core/testing";

import { FlipChip } from "./swirl-chip";

describe("flip-chip", () => {
  it("renders with label and intent", async () => {
    const page = await newSpecPage({
      components: [FlipChip],
      html: `<flip-chip intent="critical" label="Label"></flip-chip>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-chip intent="critical" label="Label">
        <mock:shadow-root>
          <span class="chip chip--intent-critical">
            <span class="chip__label">Label</span>
          </span>
        </mock:shadow-root>
      </flip-chip>
    `);
  });

  it("renders as button", async () => {
    const page = await newSpecPage({
      components: [FlipChip],
      html: `<flip-chip interactive="true" label="Label"></flip-chip>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-chip interactive="true" label="Label">
        <mock:shadow-root>
          <button class="chip chip--intent-default chip--interactive" type="button">
            <span class="chip__label">Label</span>
          </button>
        </mock:shadow-root>
      </flip-chip>
    `);
  });

  it("renders avatar with overwritten props", async () => {
    const page = await newSpecPage({
      components: [FlipChip],
      html: `<flip-chip label="Label" avatar="<flip-avatar badge=&quot;Badge&quot; initials=&quot;JD&quot; interactive=&quot;true&quot; show-label=&quot;true&quot; size=&quot;xl&quot; variant=&quot;square&quot;></flip-avatar>"></flip-chip>`,
    });

    const avatar = page.root.shadowRoot.querySelector("flip-avatar");

    expect(avatar).toBeTruthy();
    expect(avatar.getAttribute("badge")).toBeNull();
    expect(avatar.getAttribute("interactive")).toBeNull();
    expect(avatar.getAttribute("show-label")).toBeNull();
    expect(avatar.getAttribute("variant")).toBeNull();
    expect(avatar.getAttribute("size")).toBe("xs");
  });

  it("renders icon with overwritten props", async () => {
    const page = await newSpecPage({
      components: [FlipChip],
      html: `<flip-chip label="Label" icon="<flip-icon-person size=&quot;16&quot;></flip-icon-person>"></flip-chip>`,
    });

    const icon = page.root.shadowRoot.querySelector(".chip__icon > *");

    await page.waitForChanges();

    expect(icon).toBeTruthy();
    expect(icon.getAttribute("size")).toBe("24");
  });
});
