import { newSpecPage } from "@stencil/core/testing";

import { SwirlAvatarGroup } from "./swirl-avatar-group";

describe("swirl-avatar-group", () => {
  it("renders two avatars and badge", async () => {
    const page = await newSpecPage({
      components: [SwirlAvatarGroup],
      html: `
        <swirl-avatar-group badge="<swirl-badge aria-label=&quot;3 new messages&quot; label=&quot;3&quot;></swirl-badge>">
          <swirl-avatar label="Jane Doe" src="https://avatars.dicebear.com/api/adventurer-neutral/a.svg?size=144" size="s"></swirl-avatar>
          <swirl-avatar label="John Doe" src="https://avatars.dicebear.com/api/adventurer-neutral/b.svg?size=144" size="s"></swirl-avatar>
        </swirl-avatar-group>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-avatar-group badge="<swirl-badge aria-label=&quot;3 new messages&quot; label=&quot;3&quot;></swirl-badge>">
        <mock:shadow-root>
          <div class="avatar-group avatar-group--has-badge" role="group">
            <slot></slot>
            <span class="avatar-group__badge">
              <swirl-badge aria-label="3 new messages" label="3" size="m"></swirl-badge>
            </span>
          </div>
        </mock:shadow-root>
       <swirl-avatar label="Jane Doe" size="s" src="https://avatars.dicebear.com/api/adventurer-neutral/a.svg?size=144"></swirl-avatar>
       <swirl-avatar label="John Doe" size="s" src="https://avatars.dicebear.com/api/adventurer-neutral/b.svg?size=144"></swirl-avatar>
      </swirl-avatar-group>
    `);
  });
});
