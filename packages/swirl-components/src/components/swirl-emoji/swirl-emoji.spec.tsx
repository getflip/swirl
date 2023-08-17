import { newSpecPage } from "@stencil/core/testing";

import { SwirlEmojiClap } from "./emojis/swirl-emoji-clap";

describe("swirl-emoji", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlEmojiClap],
      html: `<swirl-emoji-clap></swirl-emoji-clap>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-emoji-clap>
        <mock:shadow-root>
          <img class="emoji" src="/emojis/Clap24.png" alt="">
        </mock:shadow-root>
      </swirl-emoji-clap>
    `);
  });
});
