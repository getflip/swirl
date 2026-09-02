import { newSpecPage } from "@stencil/core/testing";

import { SwirlAvatarGroup } from "./swirl-avatar-group";

describe("swirl-avatar-group", () => {
  it("renders two avatars and badge", async () => {
    const page = await newSpecPage({
      components: [SwirlAvatarGroup],
      html: `
        <swirl-avatar-group badge="<swirl-badge aria-label=&quot;3 new messages&quot; label=&quot;3&quot;></swirl-badge>" label="Label">
          <swirl-avatar label="Jane Doe" src="https://api.dicebear.com/7.x/bottts-neutral/svg?size=144&seed=a" size="s"></swirl-avatar>
          <swirl-avatar label="John Doe" src="https://api.dicebear.com/7.x/bottts-neutral/svg?size=144&seed=b" size="s"></swirl-avatar>
        </swirl-avatar-group>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-avatar-group badge="<swirl-badge aria-label=&quot;3 new messages&quot; label=&quot;3&quot;></swirl-badge>" label="Label">
        <mock:shadow-root>
          <div aria-label="Label" class="avatar-group avatar-group--diagonal-stack avatar-group--has-badge" role="group">
            <slot></slot>
            <span class="avatar-group__badge">
              <swirl-badge aria-label="3 new messages" label="3" size="s"></swirl-badge>
            </span>
          </div>
        </mock:shadow-root>
       <swirl-avatar label="Jane Doe" size="s" src="https://api.dicebear.com/7.x/bottts-neutral/svg?size=144&seed=a"></swirl-avatar>
       <swirl-avatar label="John Doe" size="s" src="https://api.dicebear.com/7.x/bottts-neutral/svg?size=144&seed=b"></swirl-avatar>
      </swirl-avatar-group>
    `);
  });

  describe("centered layout", () => {
    const buildAvatarMarkup = (count: number, size = "l") =>
      Array.from(
        { length: count },
        (_, index) =>
          `<swirl-avatar label="Person ${index}" size="${size}" variant="square"></swirl-avatar>`
      ).join("\n");

    it("caps at the 3-avatar arrangement for 4 avatars", async () => {
      const page = await newSpecPage({
        components: [SwirlAvatarGroup],
        html: `
          <swirl-avatar-group layout="centered">
            ${buildAvatarMarkup(4)}
          </swirl-avatar-group>
        `,
      });
      const slot = page.root.shadowRoot.querySelector("slot");
      slot.dispatchEvent(new Event("slotchange"));

      await page.waitForChanges();

      const div = page.root.shadowRoot.querySelector(".avatar-group");

      expect(div.className).toContain("avatar-group--centered-stack");
      expect(div.className).toContain("avatar-group--centered-3");
    });

    it("caps at the 5-avatar arrangement for 6 avatars", async () => {
      const page = await newSpecPage({
        components: [SwirlAvatarGroup],
        html: `
          <swirl-avatar-group layout="centered">
            ${buildAvatarMarkup(6)}
          </swirl-avatar-group>
        `,
      });
      const slot = page.root.shadowRoot.querySelector("slot");
      slot.dispatchEvent(new Event("slotchange"));

      await page.waitForChanges();

      const div = page.root.shadowRoot.querySelector(".avatar-group");

      expect(div.className).toContain("avatar-group--centered-5");
    });

    it.each([
      [1, "1"],
      [2, "2"],
      [3, "3"],
      [5, "5"],
    ])(
      "uses the %i-avatar arrangement for %i avatars",
      async (count, expectedBucket) => {
        const page = await newSpecPage({
          components: [SwirlAvatarGroup],
          html: `
            <swirl-avatar-group layout="centered">
              ${buildAvatarMarkup(count)}
            </swirl-avatar-group>
          `,
        });
        const slot = page.root.shadowRoot.querySelector("slot");
        slot.dispatchEvent(new Event("slotchange"));

        await page.waitForChanges();

        const div = page.root.shadowRoot.querySelector(".avatar-group");

        expect(div.className).toContain(
          `avatar-group--centered-${expectedBucket}`
        );
      }
    );

    it("does not set position/z-index inline styles on its avatars", async () => {
      const page = await newSpecPage({
        components: [SwirlAvatarGroup],
        html: `
          <swirl-avatar-group layout="centered">
            ${buildAvatarMarkup(3)}
          </swirl-avatar-group>
        `,
      });
      const slot = page.root.shadowRoot.querySelector("slot");
      slot.dispatchEvent(new Event("slotchange"));

      await page.waitForChanges();

      const avatars = Array.from(
        page.root.querySelectorAll("swirl-avatar")
      ) as HTMLElement[];

      avatars.forEach((avatar) => {
        expect(avatar.style.position).toBe("");
        expect(avatar.style.zIndex).toBe("");
      });
    });
  });
});
