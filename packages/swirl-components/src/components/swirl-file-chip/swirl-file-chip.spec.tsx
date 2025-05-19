const saveAsMock = jest.fn();

jest.mock("file-saver", () => ({
  saveAs: saveAsMock,
}));

import {
  mockFetch,
  MockHeaders,
  MockResponse,
  newSpecPage,
} from "@stencil/core/testing";
import { SwirlFileChip } from "./swirl-file-chip";
import { SwirlButtonGroup } from "../swirl-button-group/swirl-button-group";
import { SwirlButton } from "../swirl-button/swirl-button";

describe("swirl-file-chip", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with required props", async () => {
    const page = await newSpecPage({
      components: [SwirlFileChip],
      html: `<swirl-file-chip url="/sample.pdf" name="sample.pdf" type="application/pdf"></swirl-file-chip>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-file-chip name="sample.pdf" type="application/pdf" url="/sample.pdf">
        <mock:shadow-root>
          <span class="file-chip">
            <span class="file-chip__icon">
              <swirl-icon-picture-as-pdf></swirl-icon-picture-as-pdf>
            </span>
            <span class="file-chip__info">
              <span class="file-chip__name" title="sample.pdf">
                sample.pdf
              </span>
            </span>
            <swirl-button-group class="file-chip__actions"></swirl-button-group>
          </span>
        </mock:shadow-root>
      </swirl-file-chip>
    `);
  });

  it("renders with description", async () => {
    const page = await newSpecPage({
      components: [SwirlFileChip],
      html: `<swirl-file-chip url="/sample.pdf" name="sample.pdf" description="2.5 MB" type="application/pdf"></swirl-file-chip>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-file-chip name="sample.pdf" description="2.5 MB" type="application/pdf" url="/sample.pdf">
        <mock:shadow-root>
          <span class="file-chip">
            <span class="file-chip__icon">
              <swirl-icon-picture-as-pdf></swirl-icon-picture-as-pdf>
            </span>
            <span class="file-chip__info">
              <span class="file-chip__name" title="sample.pdf">
                sample.pdf
              </span>
              <span class="file-chip__description">
                2.5 MB
              </span>
            </span>
            <swirl-button-group class="file-chip__actions"></swirl-button-group>
          </span>
        </mock:shadow-root>
      </swirl-file-chip>
    `);
  });

  it("renders image file type", async () => {
    const page = await newSpecPage({
      components: [SwirlFileChip],
      html: `<swirl-file-chip url="https://example.com/image.jpg" name="image.jpg" type="image/jpeg"></swirl-file-chip>`,
    });
    const iconElement = page.root.shadowRoot.querySelector(
      ".file-chip__icon swirl-icon-image"
    );

    expect(iconElement).toBeTruthy();
  });

  it("renders video file type", async () => {
    const page = await newSpecPage({
      components: [SwirlFileChip],
      html: `<swirl-file-chip url="https://example.com/video.mp4" name="video.mp4" type="video/mp4"></swirl-file-chip>`,
    });
    const iconElement = page.root.shadowRoot.querySelector(
      ".file-chip__icon swirl-icon-video-player"
    );

    expect(iconElement).toBeTruthy();
  });

  it("renders audio file type", async () => {
    const page = await newSpecPage({
      components: [SwirlFileChip],
      html: `<swirl-file-chip url="https://example.com/audio.mp3" name="audio.mp3" type="audio/mpeg"></swirl-file-chip>`,
    });
    const iconElement = page.root.shadowRoot.querySelector(
      ".file-chip__icon swirl-icon-audio-file"
    );

    expect(iconElement).toBeTruthy();
  });

  it("renders text file type", async () => {
    const page = await newSpecPage({
      components: [SwirlFileChip],
      html: `<swirl-file-chip url="https://example.com/document.txt" name="document.txt" type="text/plain"></swirl-file-chip>`,
    });
    const iconElement = page.root.shadowRoot.querySelector(
      ".file-chip__icon swirl-icon-attachment"
    );

    expect(iconElement).toBeTruthy();
  });

  it("renders loading state", async () => {
    const page = await newSpecPage({
      components: [SwirlFileChip],
      html: `<swirl-file-chip url="/sample.pdf" name="sample.pdf" type="application/pdf" loading="true"></swirl-file-chip>`,
    });

    const iconElement = page.root.shadowRoot.querySelector(
      ".file-chip__icon swirl-spinner"
    );

    expect(iconElement).toBeTruthy();
  });

  it("renders with preview button", async () => {
    const page = await newSpecPage({
      components: [SwirlFileChip, SwirlButtonGroup, SwirlButton],
      html: `<swirl-file-chip url="/sample.pdf" name="sample.pdf" type="application/pdf" show-preview-button="true"></swirl-file-chip>`,
    });

    const previewButton = page.root.shadowRoot
      .querySelector(".file-chip__actions")
      .querySelector("swirl-button");

    expect(previewButton.icon).toContain("swirl-icon-preview");
  });

  it("renders with download button", async () => {
    const page = await newSpecPage({
      components: [SwirlFileChip, SwirlButtonGroup, SwirlButton],
      html: `<swirl-file-chip url="/sample.pdf" name="sample.pdf" type="application/pdf" show-download-button="true"></swirl-file-chip>`,
    });
    const downloadButton = page.root.shadowRoot
      .querySelector(".file-chip__actions")
      .querySelector("swirl-button");

    expect(downloadButton.icon).toContain("swirl-icon-download");
  });

  it("emits preview event when preview button is clicked", async () => {
    const page = await newSpecPage({
      components: [SwirlFileChip, SwirlButtonGroup, SwirlButton],
      html: `<swirl-file-chip url="/sample.pdf" name="sample.pdf" type="application/pdf" show-preview-button="true"></swirl-file-chip>`,
    });
    const previewSpy = jest.fn();

    page.root.addEventListener("preview", previewSpy);
    page.root.shadowRoot.querySelector("swirl-button").click();

    expect(previewSpy).toHaveBeenCalled();
  });

  it("emits download event when download button is clicked", async () => {
    const page = await newSpecPage({
      components: [SwirlFileChip],
      html: `<swirl-file-chip url="/sample.pdf" name="sample.pdf" type="application/pdf" show-download-button="true" skip-native-download="true"></swirl-file-chip>`,
    });
    const downloadSpy = jest.fn();

    page.root.addEventListener("download", downloadSpy);
    page.root.shadowRoot.querySelector("swirl-button").click();

    expect(downloadSpy).toHaveBeenCalled();
  });

  it("downloads file when download button is clicked", async () => {
    const page = await newSpecPage({
      components: [SwirlFileChip],
      html: `<swirl-file-chip url="/sample.pdf" name="sample.pdf" type="application/pdf" show-download-button="true"></swirl-file-chip>`,
    });
    const res = new MockResponse("", {
      url: "/sample.pdf",
      headers: new MockHeaders([
        ["Content-Type", "application/pdf"],
        ["Access-Control-Allow-Origin", "*"],
      ]),
    });

    mockFetch.response(Object.assign(res, { blob: () => "Blob" }));
    page.root.shadowRoot.querySelector("swirl-button").click();
    await page.waitForChanges();

    expect(saveAsMock).toHaveBeenCalledWith("Blob", "sample.pdf");
  });

  it("skips native download when skipNativeDownload is true", async () => {
    const page = await newSpecPage({
      components: [SwirlFileChip],
      html: `<swirl-file-chip url="/sample.pdf" name="sample.pdf" type="application/pdf" show-download-button="true" skip-native-download="true"></swirl-file-chip>`,
    });

    page.root.shadowRoot.querySelector("swirl-button").click();
    await page.waitForChanges();

    expect(saveAsMock).not.toHaveBeenCalled();
  });
});
