import { newSpecPage } from "@stencil/core/testing";

import { FlipAvatar } from "./flip-avatar";

describe("flip-avatar", () => {
  it("renders with the fallback icon", async () => {
    const page = await newSpecPage({
      components: [FlipAvatar],
      html: `<flip-avatar label="John Doe"></flip-avatar>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-avatar aria-label="John Doe" label="John Doe" role="img">
        <mock:shadow-root>
          <span class="avatar avatar--has-icon avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__icon">
              <flip-icon-person></flip-icon-person>
            </span>
          </span>
        </mock:shadow-root>
      </flip-avatar>
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
      components: [FlipAvatar],
      html: `<flip-avatar label="John Doe" src="https://"></flip-avatar>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-avatar aria-label="John Doe" label="John Doe" role="img" src="https://">
        <mock:shadow-root>
          <span class="avatar avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__image">
              <img alt="" height="40" src="https://" width="40">
            </span>
          </span>
        </mock:shadow-root>
      </flip-avatar>
    `);
  });

  it("renders with initials", async () => {
    const page = await newSpecPage({
      components: [FlipAvatar],
      html: `<flip-avatar initials="JD" label="John Doe"></flip-avatar>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-avatar aria-label="John Doe" initials="JD" label="John Doe" role="img">
        <mock:shadow-root>
          <span class="avatar avatar--has-initials avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__initials">
              <span>
                JD
              </span>
            </span>
          </span>
        </mock:shadow-root>
      </flip-avatar>
    `);
  });

  it("renders with an icon", async () => {
    const page = await newSpecPage({
      components: [FlipAvatar],
      html: `<flip-avatar icon="<flip-icon-close></flip-icon-close>" label="John Doe"></flip-avatar>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-avatar aria-label="John Doe" icon="<flip-icon-close></flip-icon-close>" label="John Doe" role="img">
        <mock:shadow-root>
          <span class="avatar avatar--has-icon avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__icon">
              <flip-icon-close></flip-icon-close>
            </span>
          </span>
        </mock:shadow-root>
      </flip-avatar>
    `);
  });

  it("renders fallbacks in the right order", async () => {
    const pageWithInitials = await newSpecPage({
      components: [FlipAvatar],
      html: `<flip-avatar icon="<flip-icon-close></flip-icon-close>" initials="JD" label="John Doe"></flip-avatar>`,
    });

    expect(
      pageWithInitials.root.shadowRoot.querySelector(".avatar__initials > span")
        .innerHTML
    ).toBe("JD");

    expect(
      pageWithInitials.root.shadowRoot.querySelector(".avatar__icon")
    ).toBeNull();

    const pageWithoutInitials = await newSpecPage({
      components: [FlipAvatar],
      html: `<flip-avatar icon="<flip-icon-close></flip-icon-close>" label="John Doe"></flip-avatar>`,
    });

    expect(
      pageWithoutInitials.root.shadowRoot.querySelector(".avatar__initials")
    ).toBeNull();

    expect(
      pageWithoutInitials.root.shadowRoot.querySelector(".avatar__icon")
        .innerHTML
    ).toEqual(`<flip-icon-close></flip-icon-close>`);

    const pageWithoutInitialsAndIcon = await newSpecPage({
      components: [FlipAvatar],
      html: `<flip-avatar label="John Doe"></flip-avatar>`,
    });

    expect(
      pageWithoutInitialsAndIcon.root.shadowRoot.querySelector(
        ".avatar__initials"
      )
    ).toBeNull();

    expect(
      pageWithoutInitialsAndIcon.root.shadowRoot.querySelector(".avatar__icon")
        .innerHTML
    ).toEqual(`<flip-icon-person></flip-icon-person>`);
  });

  it("renders with a badge", async () => {
    const page = await newSpecPage({
      components: [FlipAvatar],
      html: `<flip-avatar badge="<flip-badge aria-label='3 new messages' label='3'></flip-badge>" badge-position="top" label="John Doe"></flip-avatar>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-avatar aria-label="John Doe" badge="<flip-badge aria-label='3 new messages' label='3'></flip-badge>" badge-position="top" label="John Doe" role="img">
        <mock:shadow-root>
          <span class="avatar avatar--has-icon avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__icon">
              <flip-icon-person></flip-icon-person>
            </span>
            <span class="avatar__badge avatar__badge--position-top">
              <flip-badge aria-label="3 new messages" label="3"></flip-badge>
            </span>
          </span>
        </mock:shadow-root>
      </flip-avatar>
    `);
  });

  it("renders with a visible label", async () => {
    const page = await newSpecPage({
      components: [FlipAvatar],
      html: `<flip-avatar label="John Doe" show-label></flip-avatar>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-avatar aria-label="John Doe" label="John Doe" role="img" show-label="">
        <mock:shadow-root>
          <span class="avatar avatar--has-icon avatar--size-m avatar--variant-round" part="avatar">
            <span class="avatar__icon">
              <flip-icon-person></flip-icon-person>
            </span>
          </span>
          <span aria-hidden="" class="avatar__label">
            John Doe
          </span>
        </mock:shadow-root>
      </flip-avatar>
    `);
  });

  it("activates when interactive", async () => {
    const page = await newSpecPage({
      components: [FlipAvatar],
      html: `<flip-avatar interactive="true" label="John Doe"></flip-avatar>`,
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
