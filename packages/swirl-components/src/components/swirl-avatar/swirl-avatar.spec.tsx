import { newSpecPage } from "@stencil/core/testing";

import { SwirlAvatar } from "./swirl-avatar";

describe("swirl-avatar", () => {
  it("renders with the fallback icon", async () => {
    const page = await newSpecPage({
      components: [SwirlAvatar],
      html: `<swirl-avatar label="John Doe"></swirl-avatar>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-avatar aria-label="John Doe" label="John Doe" role="img">
        <mock:shadow-root>
          <span class="avatar avatar--color-kiwi avatar--has-icon avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__icon">
              <swirl-icon-person></swirl-icon-person>
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
      <swirl-avatar aria-label="John Doe" label="John Doe" role="img" src="https://">
        <mock:shadow-root>
          <span class="avatar avatar--color-kiwi avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__image">
              <img alt="" height="40" src="https://" width="40">
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
      <swirl-avatar aria-label="John Doe" initials="JD" label="John Doe" role="img">
        <mock:shadow-root>
          <span class="avatar avatar--color-kiwi avatar--has-initials avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__initials">
              <span>
                JD
              </span>
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
      <swirl-avatar aria-label="John Doe" icon="<swirl-icon-close></swirl-icon-close>" label="John Doe" role="img">
        <mock:shadow-root>
          <span class="avatar avatar--color-kiwi avatar--has-icon avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__icon">
              <swirl-icon-close></swirl-icon-close>
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
      <swirl-avatar aria-label="John Doe" badge="<swirl-badge aria-label='3 new messages' label='3'></swirl-badge>" badge-position="top" label="John Doe" role="img">
        <mock:shadow-root>
          <span class="avatar avatar--color-kiwi avatar--has-icon avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__icon">
              <swirl-icon-person></swirl-icon-person>
            </span>
            <span class="avatar__badge avatar__badge--position-top">
              <swirl-badge aria-label="3 new messages" label="3"></swirl-badge>
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
      <swirl-avatar aria-label="John Doe" label="John Doe" role="img" show-label="">
        <mock:shadow-root>
          <span class="avatar avatar--color-kiwi avatar--has-icon avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__icon">
              <swirl-icon-person></swirl-icon-person>
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

    const buttonSpy = jest.fn();

    page.root.addEventListener("click", buttonSpy);

    page.root.click();
    page.root.dispatchEvent(new KeyboardEvent("keydown", { code: "Enter" }));
    page.root.dispatchEvent(new KeyboardEvent("keyup", { code: "Space" }));

    await page.waitForChanges();

    expect(buttonSpy).toHaveBeenCalledTimes(3);
  });
});
