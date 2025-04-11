import { newSpecPage } from "@stencil/core/testing";

import { SwirlCarousel } from "./swirl-carousel";

describe("swirl-carousel", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [SwirlCarousel],
      html: `<swirl-carousel>Content</swirl-carousel>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-carousel aria-roledescription="carousel" role="group" style="--swirl-carousel-spacing: 16px; --swirl-carousel-fade-color: var(--s-background-default);">
        <mock:shadow-root>
          <div class="carousel carousel--is-at-end carousel--is-at-start">
            <div aria-live="polite" class="carousel__slides" style="padding: var(--s-space-16); scroll-padding: var(--s-space-16);">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
        Content
      </swirl-carousel>
    `);
  });

  it("scroll to a slide", async () => {
    const page = await newSpecPage({
      components: [SwirlCarousel],
      html: `
        <swirl-carousel>
          <swirl-carousel-slide id="1" label="Slide 1"><img alt="Slide 1" src="/sample-1.jpg"></swirl-carousel-slide>
          <swirl-carousel-slide id="2" label="Slide 2"><img alt="Slide 1" src="/sample-2.jpg"></swirl-carousel-slide>
          <swirl-carousel-slide id="3" label="Slide 3"><img alt="Slide 1" src="/sample-3.jpg"></swirl-carousel-slide>
          <swirl-carousel-slide id="4" label="Slide 4"><img alt="Slide 1" src="/sample-4.jpg"></swirl-carousel-slide>
        </swirl-carousel>
      `,
    });

    const spy = jest.fn();

    page.rootInstance.scrollToElement = spy;

    page.rootInstance.scrollToSlide("3");

    expect(spy).toHaveBeenCalled();
  });

  it("hides scroll buttons if not scrollable", async () => {
    const page = await newSpecPage({
      components: [SwirlCarousel],
      html: `
        <swirl-carousel>
          <swirl-carousel-slide id="1" label="Slide 1"><img alt="Slide 1" src="/sample-1.jpg"></swirl-carousel-slide>
          <swirl-carousel-slide id="2" label="Slide 2"><img alt="Slide 1" src="/sample-2.jpg"></swirl-carousel-slide>
          <swirl-carousel-slide id="3" label="Slide 3"><img alt="Slide 1" src="/sample-3.jpg"></swirl-carousel-slide>
          <swirl-carousel-slide id="4" label="Slide 4"><img alt="Slide 1" src="/sample-4.jpg"></swirl-carousel-slide>
        </swirl-carousel>
      `,
    });

    const previousButton = page.root.shadowRoot.querySelector(
      ".carousel__previous-slide-button"
    );

    const nextButton = page.root.shadowRoot.querySelector(
      ".carousel__next-slide-button"
    );

    expect(previousButton).toBeNull();
    expect(nextButton).toBeNull();
  });

  it("restores scroll when slides change", async () => {
    const page = await newSpecPage({
      components: [SwirlCarousel],
      html: `
        <swirl-carousel>
          <swirl-carousel-slide id="1" label="Slide 1"><img alt="Slide 1" src="/sample-1.jpg"></swirl-carousel-slide>
          <swirl-carousel-slide id="2" label="Slide 2"><img alt="Slide 1" src="/sample-2.jpg"></swirl-carousel-slide>
          <swirl-carousel-slide id="3" label="Slide 3"><img alt="Slide 1" src="/sample-3.jpg"></swirl-carousel-slide>
          <swirl-carousel-slide id="4" label="Slide 4"><img alt="Slide 1" src="/sample-4.jpg"></swirl-carousel-slide>
        </swirl-carousel>
      `,
    });

    const spy = jest.fn();
    const slide = page.root.querySelector("#3");
    const slot = page.root.shadowRoot.querySelector("slot");

    page.rootInstance.scrollToElement = spy;
    page.rootInstance.activeSlides = [slide];

    slot.dispatchEvent(new Event("slotchange"));

    expect(spy).toHaveBeenCalled();
  });
});
