import { newSpecPage } from "@stencil/core/testing";

import { FlipAvatarGroup } from "./flip-avatar-group";

describe("flip-avatar-group", () => {
  it("renders two avatars and badge", async () => {
    const page = await newSpecPage({
      components: [FlipAvatarGroup],
      html: `
        <flip-avatar-group badge="<flip-badge aria-label=&quot;3 new messages&quot; label=&quot;3&quot;></flip-badge>">
          <flip-avatar label="Jane Doe" src="https://avatars.dicebear.com/api/adventurer-neutral/a.svg?size=144" size="s"></flip-avatar>
          <flip-avatar label="John Doe" src="https://avatars.dicebear.com/api/adventurer-neutral/b.svg?size=144" size="s"></flip-avatar>
        </flip-avatar-group>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-avatar-group badge="<flip-badge aria-label=&quot;3 new messages&quot; label=&quot;3&quot;></flip-badge>">
        <mock:shadow-root>
          <div class="avatar-group avatar-group--has-badge" role="group">
            <slot></slot>
            <span class="avatar-group__badge">
              <flip-badge aria-label="3 new messages" label="3"></flip-badge>
            </span>
          </div>
        </mock:shadow-root>
       <flip-avatar label="Jane Doe" size="s" src="https://avatars.dicebear.com/api/adventurer-neutral/a.svg?size=144"></flip-avatar>
       <flip-avatar label="John Doe" size="s" src="https://avatars.dicebear.com/api/adventurer-neutral/b.svg?size=144"></flip-avatar>
      </flip-avatar-group>
    `);
  });
});
