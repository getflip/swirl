import { newSpecPage } from "@stencil/core/testing";

import { FlipVideoThumbnail } from "./flip-video-thumbnail";

describe("flip-video-thumbnail", () => {
  it("renders the preview image and duration", async () => {
    const page = await newSpecPage({
      components: [FlipVideoThumbnail],
      html: `<flip-video-thumbnail duration="1:23" label="Label" src="https://picsum.photos/id/1062/680/380"></flip-video-thumbnail>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-video-thumbnail duration="1:23" label="Label" src="https://picsum.photos/id/1062/680/380">
        <mock:shadow-root>
          <button aria-describedby="duration" aria-label="Label" class="video-thumbnail" type="button">
            <img alt="" class="video-thumbnail__image" loading="lazy" src="https://picsum.photos/id/1062/680/380">
            <span class="video-thumbnail__duration" id="duration">
              <flip-visually-hidden>
                Duration
              </flip-visually-hidden>
              1:23
            </span>
            <svg class="video-thumbnail__play-icon" fill="none" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 14.65V25.35C15 26.1167 15.35 26.7 16.05 27.1C16.75 27.5 17.4333 27.4667 18.1 27L26.4 21.7C27.0333 21.3 27.35 20.7333 27.35 20C27.35 19.2667 27.0333 18.7 26.4 18.3L18.1 13C17.4333 12.5333 16.75 12.5 16.05 12.9C15.35 13.3 15 13.8833 15 14.65ZM20 40C17.2333 40 14.6333 39.4747 12.2 38.424C9.76667 37.3747 7.65 35.95 5.85 34.15C4.05 32.35 2.62533 30.2333 1.576 27.8C0.525334 25.3667 0 22.7667 0 20C0 17.2333 0.525334 14.6333 1.576 12.2C2.62533 9.76667 4.05 7.65 5.85 5.85C7.65 4.05 9.76667 2.62467 12.2 1.574C14.6333 0.524667 17.2333 0 20 0C22.7667 0 25.3667 0.524667 27.8 1.574C30.2333 2.62467 32.35 4.05 34.15 5.85C35.95 7.65 37.3747 9.76667 38.424 12.2C39.4747 14.6333 40 17.2333 40 20C40 22.7667 39.4747 25.3667 38.424 27.8C37.3747 30.2333 35.95 32.35 34.15 34.15C32.35 35.95 30.2333 37.3747 27.8 38.424C25.3667 39.4747 22.7667 40 20 40Z" fill="white" fill-opacity="0.95"></path>
            </svg>
          </button>
        </mock:shadow-root>
      </flip-video-thumbnail>
    `);
  });

  it("renders without duration", async () => {
    const page = await newSpecPage({
      components: [FlipVideoThumbnail],
      html: `<flip-video-thumbnail label="Label" src="https://picsum.photos/id/1062/680/380"></flip-video-thumbnail>`,
    });

    expect(
      page.root.shadowRoot.querySelector(".video-thumbnail__duration")
    ).toBeNull();
  });
});
