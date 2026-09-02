import { newSpecPage } from "@stencil/core/testing";

import { SwirlAvatar } from "./swirl-avatar";

describe("swirl-avatar", () => {
  it("renders with the fallback icon", async () => {
    const page = await newSpecPage({
      components: [SwirlAvatar],
      html: `<swirl-avatar label="John Doe"></swirl-avatar>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-avatar label="John Doe" size="m" style="--swirl-avatar-size: 40px; --swirl-avatar-square-radius: 10px;" variant="round">
        <mock:shadow-root>
          <span class="avatar avatar--color-kiwi avatar--has-icon avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__icon">
              <swirl-icon-person></swirl-icon-person>
            </span>
            <span class="avatar__tool avatar__tool--position-bottom">
              <slot name="tool"></slot>
            </span>
          </span>
        </mock:shadow-root>
      </swirl-avatar>
    `);
  });

  it("renders with an image", async () => {
    // simulate successful image loading
    global.Image = class Image {
      constructor() {
        (this as any).onload();
      }
    } as typeof Image;

    const page = await newSpecPage({
      components: [SwirlAvatar],
      html: `<swirl-avatar label="John Doe" src="https://"></swirl-avatar>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-avatar label="John Doe" size="m" src="https://" style="--swirl-avatar-size: 40px; --swirl-avatar-square-radius: 10px;" variant="round">
        <mock:shadow-root>
          <span class="avatar avatar--color-kiwi avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__image">
              <img alt="" height="40" src="https://" width="40">
            </span>
            <span class="avatar__tool avatar__tool--position-bottom">
              <slot name="tool"></slot>
            </span>
          </span>
        </mock:shadow-root>
      </swirl-avatar>
    `);
  });

  it("renders with initials", async () => {
    const page = await newSpecPage({
      components: [SwirlAvatar],
      html: `<swirl-avatar initials="JD" label="John Doe"></swirl-avatar>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-avatar initials="JD" label="John Doe" size="m" style="--swirl-avatar-size: 40px; --swirl-avatar-square-radius: 10px;" variant="round">
        <mock:shadow-root>
          <span class="avatar avatar--color-kiwi avatar--has-initials avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__initials">
              <span>
                JD
              </span>
            </span>
            <span class="avatar__tool avatar__tool--position-bottom">
              <slot name="tool"></slot>
            </span>
          </span>
        </mock:shadow-root>
      </swirl-avatar>
    `);
  });

  it("renders with an icon", async () => {
    const page = await newSpecPage({
      components: [SwirlAvatar],
      html: `<swirl-avatar icon="<swirl-icon-close></swirl-icon-close>" label="John Doe"></swirl-avatar>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-avatar icon="<swirl-icon-close></swirl-icon-close>" label="John Doe" size="m" style="--swirl-avatar-size: 40px; --swirl-avatar-square-radius: 10px;" variant="round">
        <mock:shadow-root>
          <span class="avatar avatar--color-kiwi avatar--has-icon avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__icon">
              <swirl-icon-close></swirl-icon-close>
            </span>
            <span class="avatar__tool avatar__tool--position-bottom">
              <slot name="tool"></slot>
            </span>
          </span>
        </mock:shadow-root>
      </swirl-avatar>
    `);
  });

  it("renders fallbacks in the right order", async () => {
    const pageWithInitials = await newSpecPage({
      components: [SwirlAvatar],
      html: `<swirl-avatar icon="<swirl-icon-close></swirl-icon-close>" initials="JD" label="John Doe"></swirl-avatar>`,
    });

    expect(
      pageWithInitials.root.shadowRoot.querySelector(".avatar__initials > span")
        .innerHTML
    ).toBe("JD");

    expect(
      pageWithInitials.root.shadowRoot.querySelector(".avatar__icon")
    ).toBeNull();

    const pageWithoutInitials = await newSpecPage({
      components: [SwirlAvatar],
      html: `<swirl-avatar icon="<swirl-icon-close></swirl-icon-close>" label="John Doe"></swirl-avatar>`,
    });

    expect(
      pageWithoutInitials.root.shadowRoot.querySelector(".avatar__initials")
    ).toBeNull();

    expect(
      pageWithoutInitials.root.shadowRoot.querySelector(".avatar__icon")
        .innerHTML
    ).toEqual(`<swirl-icon-close></swirl-icon-close>`);

    const pageWithoutInitialsAndIcon = await newSpecPage({
      components: [SwirlAvatar],
      html: `<swirl-avatar label="John Doe"></swirl-avatar>`,
    });

    expect(
      pageWithoutInitialsAndIcon.root.shadowRoot.querySelector(
        ".avatar__initials"
      )
    ).toBeNull();

    expect(
      pageWithoutInitialsAndIcon.root.shadowRoot.querySelector(".avatar__icon")
        .innerHTML
    ).toEqual(`<swirl-icon-person></swirl-icon-person>`);
  });

  it("renders with a badge", async () => {
    const page = await newSpecPage({
      components: [SwirlAvatar],
      html: `<swirl-avatar badge="<swirl-badge aria-label='3 new messages' label='3'></swirl-badge>" badge-position="top" label="John Doe"></swirl-avatar>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-avatar badge="<swirl-badge aria-label='3 new messages' label='3'></swirl-badge>" badge-position="top" label="John Doe" size="m" style="--swirl-avatar-size: 40px; --swirl-avatar-square-radius: 10px;" variant="round">
        <mock:shadow-root>
          <span class="avatar avatar--color-kiwi avatar--has-icon avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__icon">
              <swirl-icon-person></swirl-icon-person>
            </span>
            <span class="avatar__badge avatar__badge--position-top">
              <swirl-badge aria-label="3 new messages" label="3"></swirl-badge>
            </span>
            <span class="avatar__tool avatar__tool--position-bottom">
              <slot name="tool"></slot>
            </span>
          </span>
        </mock:shadow-root>
      </swirl-avatar>
    `);
  });

  it("renders with a visible label", async () => {
    const page = await newSpecPage({
      components: [SwirlAvatar],
      html: `<swirl-avatar label="John Doe" show-label></swirl-avatar>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-avatar label="John Doe" show-label="" size="m" style="--swirl-avatar-size: 40px; --swirl-avatar-square-radius: 10px;" variant="round">
        <mock:shadow-root>
          <span class="avatar avatar--color-kiwi avatar--has-icon avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__icon">
              <swirl-icon-person></swirl-icon-person>
            </span>
            <span class="avatar__tool avatar__tool--position-bottom">
              <slot name="tool"></slot>
            </span>
          </span>
          <span aria-hidden="" class="avatar__label">
            John Doe
          </span>
        </mock:shadow-root>
      </swirl-avatar>
    `);
  });

  it("activates when interactive", async () => {
    const page = await newSpecPage({
      components: [SwirlAvatar],
      html: `<swirl-avatar interactive="true" label="John Doe"></swirl-avatar>`,
    });

    expect(page.root.getAttribute("aria-label")).toBe("John Doe");

    const buttonSpy = jest.fn();

    page.root.addEventListener("click", buttonSpy);

    page.root.click();
    page.root.dispatchEvent(new KeyboardEvent("keydown", { code: "Enter" }));
    page.root.dispatchEvent(new KeyboardEvent("keyup", { code: "Space" }));

    await page.waitForChanges();

    expect(buttonSpy).toHaveBeenCalledTimes(3);
  });

  it("reflects size and variant to attributes so ancestors can style by them", async () => {
    const page = await newSpecPage({
      components: [SwirlAvatar],
      html: `<swirl-avatar label="John Doe"></swirl-avatar>`,
    });

    expect(page.root.getAttribute("size")).toBe("m");
    expect(page.root.getAttribute("variant")).toBe("round");

    page.root.setAttribute("variant", "square");
    page.root.setAttribute("size", "s");
    await page.waitForChanges();

    expect(page.root.getAttribute("size")).toBe("s");
    expect(page.root.getAttribute("variant")).toBe("square");
  });

  describe("published custom properties", () => {
    it.each([
      ["3xs", "20px", "4px"],
      ["2xs", "24px", "4px"],
      ["xs", "28px", "8px"],
      ["s", "32px", "8px"],
      ["m", "40px", "10px"],
      ["l", "48px", "12px"],
      ["xl", "64px", "16px"],
      ["2xl", "144px", "20px"],
    ])(
      "publishes its size and square radius for size %s",
      async (size, expectedSize, expectedRadius) => {
        const page = await newSpecPage({
          components: [SwirlAvatar],
          html: `<swirl-avatar label="John Doe" size="${size}"></swirl-avatar>`,
        });

        const style = page.root.getAttribute("style");

        expect(style).toContain(`--swirl-avatar-size: ${expectedSize}`);
        expect(style).toContain(
          `--swirl-avatar-square-radius: ${expectedRadius}`
        );
      }
    );

    it("publishes the medium defaults when no size is set", async () => {
      const page = await newSpecPage({
        components: [SwirlAvatar],
        html: `<swirl-avatar label="John Doe"></swirl-avatar>`,
      });

      const style = page.root.getAttribute("style");

      expect(style).toContain("--swirl-avatar-size: 40px");
      expect(style).toContain("--swirl-avatar-square-radius: 10px");
    });

    it("does not clobber inline styles set by a parent component", async () => {
      const page = await newSpecPage({
        components: [SwirlAvatar],
        html: `<swirl-avatar label="John Doe" size="l"></swirl-avatar>`,
      });

      // swirl-avatar-group's "horizontal" layout sets these imperatively on
      // the light-DOM host; a re-render must not wipe them.
      (page.root as HTMLElement).style.zIndex = "3";

      page.root.setAttribute("size", "xl");
      await page.waitForChanges();

      expect((page.root as HTMLElement).style.zIndex).toBe("3");
      expect(page.root.getAttribute("style")).toContain(
        "--swirl-avatar-size: 64px"
      );
    });
  });
});
