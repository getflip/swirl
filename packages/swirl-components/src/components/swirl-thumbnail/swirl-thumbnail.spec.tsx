import { newSpecPage } from "@stencil/core/testing";

import { SwirlThumbnail } from "./swirl-thumbnail";

describe("swirl-thumbnail", () => {
  it("renders the image", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="Brief description of the image." format="portrait" src="https://picsum.photos/id/433/400/400" size="l"></swirl-thumbnail>`,
    });

    const thumbnail = page.root.shadowRoot.querySelector(".thumbnail");
    expect(thumbnail.classList.contains("thumbnail--format-portrait")).toBe(
      true
    );
    expect(thumbnail.classList.contains("thumbnail--size-l")).toBe(true);

    expect(
      page.root.shadowRoot.querySelector(".thumbnail__image").getAttribute("src")
    ).toBe("https://picsum.photos/id/433/400/400");
  });

  it("renders a segmented button group on larger sizes", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" src="/x.png" size="xl" format="square" show-edit-button show-remove-button></swirl-thumbnail>`,
    });

    const group = page.root.shadowRoot.querySelector("swirl-button-group");
    expect(group).not.toBeNull();
    expect(group.getAttribute("segmented")).not.toBeNull();

    const buttons = page.root.shadowRoot.querySelectorAll("swirl-button");
    expect(buttons.length).toBe(2);
  });

  it("renders a segmented button group on landscape format at larger sizes", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" src="/x.png" size="l" format="landscape" show-remove-button></swirl-thumbnail>`,
    });

    expect(
      page.root.shadowRoot.querySelector("swirl-button-group")
    ).not.toBeNull();
  });

  it("renders compact menu on portrait format at sizes l and xl", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" src="/x.png" size="l" format="portrait" show-edit-button show-remove-button></swirl-thumbnail>`,
    });

    expect(
      page.root.shadowRoot.querySelector(".thumbnail__compact-button")
    ).not.toBeNull();
    expect(page.root.shadowRoot.querySelector("swirl-button-group")).toBeNull();
  });

  it("renders a compact single action on sizes s/m", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" src="/x.png" size="m" show-remove-button></swirl-thumbnail>`,
    });

    expect(
      page.root.shadowRoot.querySelector(".thumbnail__compact-button")
    ).not.toBeNull();
    expect(page.root.shadowRoot.querySelector("swirl-button-group")).toBeNull();
  });

  it("renders a popover menu on compact sizes when both actions are set", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" src="/x.png" size="s" show-edit-button show-remove-button></swirl-thumbnail>`,
    });

    expect(
      page.root.shadowRoot.querySelector("swirl-popover-trigger")
    ).not.toBeNull();
    expect(page.root.shadowRoot.querySelector("swirl-popover")).not.toBeNull();

    const items = page.root.shadowRoot.querySelectorAll(
      "swirl-action-list-item"
    );
    expect(items.length).toBe(2);
  });

  it("renders a circular spinner overlay when uploading on compact sizes", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" src="/x.png" size="s" progress="40"></swirl-thumbnail>`,
    });

    const indicator = page.root.shadowRoot.querySelector(
      ".thumbnail__uploading-overlay swirl-progress-indicator"
    );
    expect(indicator).not.toBeNull();
    expect(indicator.getAttribute("variant")).toBe("circle");
  });

  it("renders a progress bar when uploading on larger sizes", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" src="/x.png" size="xl" format="square" progress="70"></swirl-thumbnail>`,
    });

    const indicator = page.root.shadowRoot.querySelector(
      ".thumbnail__progress-indicator swirl-progress-indicator"
    );
    expect(indicator).not.toBeNull();
    expect(indicator.getAttribute("variant")).toBeNull();
  });

  it("shows the timestamp on sizes m and above", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" src="/x.png" size="m" timestamp="1:23"></swirl-thumbnail>`,
    });

    expect(
      page.root.shadowRoot.querySelector(".thumbnail__timestamp").textContent
    ).toBe("1:23");
  });

  it("hides the timestamp on size s", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" src="/x.png" size="s" timestamp="1:23"></swirl-thumbnail>`,
    });

    expect(
      page.root.shadowRoot.querySelector(".thumbnail__timestamp")
    ).toBeNull();
  });

  it("hides the timestamp on compact sizes when uploading", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" src="/x.png" size="m" timestamp="1:23" progress="40"></swirl-thumbnail>`,
    });

    expect(
      page.root.shadowRoot.querySelector(".thumbnail__timestamp")
    ).toBeNull();
  });

  it("does not set segmented when only one action is shown", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" src="/x.png" size="l" format="landscape" show-remove-button></swirl-thumbnail>`,
    });

    const group = page.root.shadowRoot.querySelector("swirl-button-group");
    expect(group).not.toBeNull();
    expect(group.getAttribute("segmented")).toBeNull();
  });

  it("sets the aria-label on the compact menu button", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" src="/x.png" size="s" show-remove-button menu-button-label="Actions"></swirl-thumbnail>`,
    });

    const button = page.root.shadowRoot.querySelector(
      ".thumbnail__compact-button"
    );
    expect(button.getAttribute("aria-label")).toBe("Actions");
  });

  it("emits thumbnailClick when the image is clicked", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" src="/x.png"></swirl-thumbnail>`,
    });

    const spy = jest.fn();
    page.root.addEventListener("thumbnailClick", spy);

    page.root.shadowRoot
      .querySelector(".thumbnail__image-wrapper")
      .dispatchEvent(new MouseEvent("click"));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("emits edit when the edit button is clicked", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" src="/x.png" size="xl" format="square" show-edit-button></swirl-thumbnail>`,
    });

    const spy = jest.fn();
    page.root.addEventListener("edit", spy);

    page.root.shadowRoot
      .querySelector("swirl-button")
      .dispatchEvent(new MouseEvent("click"));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("emits remove when the remove button is clicked", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" src="/x.png" size="xl" format="square" show-remove-button></swirl-thumbnail>`,
    });

    const spy = jest.fn();
    page.root.addEventListener("remove", spy);

    page.root.shadowRoot
      .querySelector("swirl-button")
      .dispatchEvent(new MouseEvent("click"));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("can be interactive", async () => {
    const page = await newSpecPage({
      components: [SwirlThumbnail],
      html: `<swirl-thumbnail alt="x" interactive src="/x.png"></swirl-thumbnail>`,
    });

    expect(
      page.root.shadowRoot
        .querySelector(".thumbnail")
        .classList.contains("thumbnail--interactive")
    ).toBe(true);
    expect(
      page.root.shadowRoot.querySelector(".thumbnail__image-wrapper").tagName
    ).toBe("BUTTON");
  });
});
