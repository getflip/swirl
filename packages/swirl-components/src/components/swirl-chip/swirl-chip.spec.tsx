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

  it("renders avatar", async () => {
    const page = await newSpecPage({
      components: [SwirlChip],
      html: `<swirl-chip label="Label"><swirl-avatar initials="JD" size="xs"></swirl-avatar></swirl-chip>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-chip label="Label">
        <mock:shadow-root>
          <span class="chip chip--intent-default">
            <span class="chip__label">
              Label
            </span>
          </span>
        </mock:shadow-root>
        <swirl-avatar initials="JD" size="xs"></swirl-avatar>
      </swirl-chip>
    `);
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
