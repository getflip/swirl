import { newSpecPage } from "@stencil/core/testing";

import { SwirlAvatarGroup } from "./swirl-avatar-group";

describe("swirl-avatar-group", () => {
  it("renders two avatars and badge", async () => {
    const page = await newSpecPage({
      components: [SwirlAvatarGroup],
      html: `
        <swirl-avatar-group badge="<swirl-badge aria-label=&quot;3 new messages&quot; label=&quot;3&quot;></swirl-badge>">
          <swirl-avatar label="Jane Doe" src="https://api.dicebear.com/7.x/bottts-neutral/svg?size=144&seed=a" size="s"></swirl-avatar>
          <swirl-avatar label="John Doe" src="https://api.dicebear.com/7.x/bottts-neutral/svg?size=144&seed=b" size="s"></swirl-avatar>
        </swirl-avatar-group>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-avatar-group badge="<swirl-badge aria-label=&quot;3 new messages&quot; label=&quot;3&quot;></swirl-badge>">
        <mock:shadow-root>
          <div class="avatar-group avatar-group--diagonal-stack avatar-group--has-badge" role="group">
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
});
