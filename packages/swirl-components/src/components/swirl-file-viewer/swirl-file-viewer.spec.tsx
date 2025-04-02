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

import { SwirlFileViewer } from "./swirl-file-viewer";
import { SwirlFileViewerAudio } from "./viewers/swirl-file-viewer-audio/swirl-file-viewer-audio";
import { SwirlFileViewerCsv } from "./viewers/swirl-file-viewer-csv/swirl-file-viewer-csv";
import { SwirlFileViewerImage } from "./viewers/swirl-file-viewer-image/swirl-file-viewer-image";
import { SwirlFileViewerText } from "./viewers/swirl-file-viewer-text/swirl-file-viewer-text";
import { SwirlFileViewerVideo } from "./viewers/swirl-file-viewer-video/swirl-file-viewer-video";

describe("swirl-file-viewer", () => {
  it("renders images", async () => {
    const page = await newSpecPage({
      components: [SwirlFileViewer, SwirlFileViewerImage],
      html: `
        <swirl-file-viewer
          description="Description"
          file="https://picsum.photos/id/1025/1000/1000"
          type="image/jpeg"
        ></swirl-file-viewer>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-file-viewer description="Description" file="https://picsum.photos/id/1025/1000/1000" type="image/jpeg">
        <mock:shadow-root>
          <div class="file-viewer">
            <div class="file-viewer__file">
              <swirl-file-viewer-image class="file-viewer-image">
                <mock:shadow-root>
                  <img alt="Description" class="file-viewer-image__image" src="https://picsum.photos/id/1025/1000/1000">
                  <div class="file-viewer-image__spinner">
                    <swirl-spinner></swirl-spinner>
                  </div>
                </mock:shadow-root>
              </swirl-file-viewer-image>
            </div>
          </div>
        </mock:shadow-root>
      </swirl-file-viewer>
    `);
  });

  it("renders video player", async () => {
    const page = await newSpecPage({
      components: [SwirlFileViewer, SwirlFileViewerVideo],
      html: `
        <swirl-file-viewer
          file="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        ></swirl-file-viewer>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-file-viewer file="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
        <mock:shadow-root>
          <div class="file-viewer">
            <div class="file-viewer__file">
              <swirl-file-viewer-video class="file-viewer-video">
                <mock:shadow-root>
                  <video class="file-viewer-video__video" controls="">
                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
                  </video>
                </mock:shadow-root>
              </swirl-file-viewer-video>
            </div>
          </div>
        </mock:shadow-root>
      </swirl-file-viewer>
    `);
  });

  it("renders audio player", async () => {
    const page = await newSpecPage({
      components: [SwirlFileViewer, SwirlFileViewerAudio],
      html: `
        <swirl-file-viewer
          file="https://raw.githubusercontent.com/exaile/exaile-test-files/master/art.mp3"
          type="audio/mp3"
        ></swirl-file-viewer>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-file-viewer file="https://raw.githubusercontent.com/exaile/exaile-test-files/master/art.mp3" type="audio/mp3">
        <mock:shadow-root>
          <div class="file-viewer">
            <div class="file-viewer__file">
              <swirl-file-viewer-audio class="file-viewer-audio">
                <mock:shadow-root>
                  <audio class="file-viewer-audio__audio" controls="">
                    <source src="https://raw.githubusercontent.com/exaile/exaile-test-files/master/art.mp3" type="audio/mp3">
                  </audio>
                </mock:shadow-root>
              </swirl-file-viewer-audio>
            </div>
          </div>
        </mock:shadow-root>
      </swirl-file-viewer>
    `);
  });

  it("renders plain text", async () => {
    mockFetch.text("TEXT");

    const page = await newSpecPage({
      components: [SwirlFileViewer, SwirlFileViewerText],
      html: `
        <swirl-file-viewer
          file="https://www.w3.org/TR/2003/REC-PNG-20031110/iso_8859-1.txt"
          type="text/plain"
        ></swirl-file-viewer>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-file-viewer file="https://www.w3.org/TR/2003/REC-PNG-20031110/iso_8859-1.txt" type="text/plain">
        <mock:shadow-root>
          <div class="file-viewer">
            <div class="file-viewer__file">
              <swirl-file-viewer-text class="file-viewer-text" exportparts="file-viewer-text__text">
                <mock:shadow-root><pre class="file-viewer-text__text" part="file-viewer-text__text" tabindex="0">TEXT</pre>
                </mock:shadow-root>
              </swirl-file-viewer-text>
            </div>
          </div>
        </mock:shadow-root>
      </swirl-file-viewer>
    `);
  });

  it("renders csv", async () => {
    mockFetch.text("Col1,Col2,Col3\nCell1,Cell2,Cell3");

    const page = await newSpecPage({
      components: [SwirlFileViewer, SwirlFileViewerCsv],
      html: `
        <swirl-file-viewer
          file="/sample.csv"
          type="text/csv"
        ></swirl-file-viewer>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-file-viewer file="/sample.csv" type="text/csv">
        <mock:shadow-root>
          <div class="file-viewer">
            <div class="file-viewer__file">
              <swirl-file-viewer-csv class="file-viewer-csv" exportparts="file-viewer-csv__table">
                <mock:shadow-root>
                  <div class="file-viewer-csv__csv" tabindex="0">
                    <table class="file-viewer-csv__table" part="file-viewer-csv__table">
                      <tbody>
                        <tr class="file-viewer-csv__row">
                          <td class="file-viewer-csv__cell">
                            Col1
                          </td>
                          <td class="file-viewer-csv__cell">
                            Col2
                          </td>
                          <td class="file-viewer-csv__cell">
                            Col3
                          </td>
                        </tr>
                        <tr class="file-viewer-csv__row">
                          <td class="file-viewer-csv__cell">
                            Cell1
                          </td>
                          <td class="file-viewer-csv__cell">
                            Cell2
                          </td>
                          <td class="file-viewer-csv__cell">
                            Cell3
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </mock:shadow-root>
              </swirl-file-viewer-csv>
            </div>
          </div>
        </mock:shadow-root>
      </swirl-file-viewer>
    `);
  });

  it("renders pdf", async () => {
    const page = await newSpecPage({
      components: [SwirlFileViewer],
      html: `
        <swirl-file-viewer
          file="/sample.pdf"
          type="application/pdf"
        ></swirl-file-viewer>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-file-viewer file="/sample.pdf" type="application/pdf">
        <mock:shadow-root>
          <div class="file-viewer">
            <div class="file-viewer__file">
              <swirl-file-viewer-pdf errormessage="File could not be loaded." file="/sample.pdf" viewmode="single" zoom="1"></swirl-file-viewer-pdf>
            </div>
          </div>
        </mock:shadow-root>
      </swirl-file-viewer>
    `);
  });

  it("shows fallback for unsupported type", async () => {
    const page = await newSpecPage({
      components: [SwirlFileViewer],
      html: `
        <swirl-file-viewer
          file="/sample.html"
          type="text/html"
        ></swirl-file-viewer>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-file-viewer file="/sample.html" type="text/html">
        <mock:shadow-root>
          <div class="file-viewer">
            <div class="file-viewer__file">
              <swirl-file-viewer-fallback file="/sample.html"></swirl-file-viewer-fallback>
            </div>
          </div>
        </mock:shadow-root>
      </swirl-file-viewer>
    `);
  });

  it("skips native file download and triggers startDownload event", async () => {
    const page = await newSpecPage({
      components: [SwirlFileViewer],
      html: `
        <swirl-file-viewer
          file="/sample.pdf"
          type="application/pdf"
          skip-native-download="true"
        ></swirl-file-viewer>
      `,
    });

    const downloadStartSpy = jest.fn();
    page.root.addEventListener("downloadStart", downloadStartSpy);

    await (page.root as HTMLSwirlFileViewerElement).download();
    await page.waitForChanges();

    expect(downloadStartSpy).toHaveBeenCalled();
    expect(saveAsMock).not.toHaveBeenCalled();
  });

  it("allows to download files", async () => {
    const res = new MockResponse("", {
      url: "/sample.pdf",
      headers: new MockHeaders([
        ["Content-Type", "application/pdf"],
        ["Access-Control-Allow-Origin", "*"],
      ]),
    });

    mockFetch.response(Object.assign(res, { blob: () => "Blob" }));

    const page = await newSpecPage({
      components: [SwirlFileViewer],
      html: `
        <swirl-file-viewer
          file="/sample.pdf"
          type="application/pdf"
        ></swirl-file-viewer>
      `,
    });

    await (page.root as HTMLSwirlFileViewerElement).download();
    await page.waitForChanges();

    expect(saveAsMock).toHaveBeenCalledWith("Blob", "sample.pdf");
  });
});
