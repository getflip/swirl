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

import { FlipFileViewer } from "./flip-file-viewer";
import { FlipFileViewerAudio } from "./viewers/flip-file-viewer-audio/flip-file-viewer-audio";
import { FlipFileViewerCsv } from "./viewers/flip-file-viewer-csv/flip-file-viewer-csv";
import { FlipFileViewerImage } from "./viewers/flip-file-viewer-image/flip-file-viewer-image";
import { FlipFileViewerText } from "./viewers/flip-file-viewer-text/flip-file-viewer-text";
import { FlipFileViewerVideo } from "./viewers/flip-file-viewer-video/flip-file-viewer-video";

describe("flip-file-viewer", () => {
  it("renders images", async () => {
    const page = await newSpecPage({
      components: [FlipFileViewer, FlipFileViewerImage],
      html: `
        <flip-file-viewer
          description="Description"
          file="https://picsum.photos/id/1025/1000/1000"
          type="image/jpeg"
        ></flip-file-viewer>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-file-viewer description="Description" file="https://picsum.photos/id/1025/1000/1000" type="image/jpeg">
        <mock:shadow-root>
          <div class="file-viewer">
            <div class="file-viewer__file">
              <flip-file-viewer-image class="file-viewer-image">
                <mock:shadow-root>
                  <img alt="Description" class="file-viewer-image__image" src="https://picsum.photos/id/1025/1000/1000">
                  <div class="file-viewer-image__spinner">
                    <flip-spinner></flip-spinner>
                  </div>
                </mock:shadow-root>
              </flip-file-viewer-image>
            </div>
          </div>
        </mock:shadow-root>
      </flip-file-viewer>
    `);
  });

  it("renders video player", async () => {
    const page = await newSpecPage({
      components: [FlipFileViewer, FlipFileViewerVideo],
      html: `
        <flip-file-viewer
          file="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        ></flip-file-viewer>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-file-viewer file="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
        <mock:shadow-root>
          <div class="file-viewer">
            <div class="file-viewer__file">
              <flip-file-viewer-video class="file-viewer-video">
                <mock:shadow-root>
                  <video class="file-viewer-video__video" controls="">
                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
                  </video>
                </mock:shadow-root>
              </flip-file-viewer-video>
            </div>
          </div>
        </mock:shadow-root>
      </flip-file-viewer>
    `);
  });

  it("renders audio player", async () => {
    const page = await newSpecPage({
      components: [FlipFileViewer, FlipFileViewerAudio],
      html: `
        <flip-file-viewer
          file="https://raw.githubusercontent.com/exaile/exaile-test-files/master/art.mp3"
          type="audio/mp3"
        ></flip-file-viewer>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-file-viewer file="https://raw.githubusercontent.com/exaile/exaile-test-files/master/art.mp3" type="audio/mp3">
        <mock:shadow-root>
          <div class="file-viewer">
            <div class="file-viewer__file">
              <flip-file-viewer-audio class="file-viewer-audio">
                <mock:shadow-root>
                  <audio class="file-viewer-audio__audio" controls="">
                    <source src="https://raw.githubusercontent.com/exaile/exaile-test-files/master/art.mp3" type="audio/mp3">
                  </audio>
                </mock:shadow-root>
              </flip-file-viewer-audio>
            </div>
          </div>
        </mock:shadow-root>
      </flip-file-viewer>
    `);
  });

  it("renders plain text", async () => {
    mockFetch.text("TEXT");

    const page = await newSpecPage({
      components: [FlipFileViewer, FlipFileViewerText],
      html: `
        <flip-file-viewer
          file="https://www.w3.org/TR/2003/REC-PNG-20031110/iso_8859-1.txt"
          type="text/plain"
        ></flip-file-viewer>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-file-viewer file="https://www.w3.org/TR/2003/REC-PNG-20031110/iso_8859-1.txt" type="text/plain">
        <mock:shadow-root>
          <div class="file-viewer">
            <div class="file-viewer__file">
              <flip-file-viewer-text class="file-viewer-text">
                <mock:shadow-root>
                  <pre class="file-viewer-text__text" tabindex="0">TEXT</pre>
                </mock:shadow-root>
              </flip-file-viewer-text>
            </div>
          </div>
        </mock:shadow-root>
      </flip-file-viewer>
    `);
  });

  it("renders csv", async () => {
    mockFetch.text("Col1,Col2,Col3\nCell1,Cell2,Cell3");

    const page = await newSpecPage({
      components: [FlipFileViewer, FlipFileViewerCsv],
      html: `
        <flip-file-viewer
          file="/sample.csv"
          type="text/csv"
        ></flip-file-viewer>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-file-viewer file="/sample.csv" type="text/csv">
        <mock:shadow-root>
          <div class="file-viewer">
            <div class="file-viewer__file">
              <flip-file-viewer-csv class="file-viewer-csv">
                <mock:shadow-root>
                  <div class="file-viewer-csv__csv" tabindex="0">
                    <table class="file-viewer-csv__table">
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
              </flip-file-viewer-csv>
            </div>
          </div>
        </mock:shadow-root>
      </flip-file-viewer>
    `);
  });

  it("renders pdf", async () => {
    const page = await newSpecPage({
      components: [FlipFileViewer],
      html: `
        <flip-file-viewer
          file="/sample.pdf"
          type="application/pdf"
        ></flip-file-viewer>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-file-viewer file="/sample.pdf" type="application/pdf">
        <mock:shadow-root>
          <div class="file-viewer">
            <div class="file-viewer__file">
              <flip-file-viewer-pdf errormessage="File could not be loaded." file="/sample.pdf" zoom="1"></flip-file-viewer-pdf>
            </div>
          </div>
        </mock:shadow-root>
      </flip-file-viewer>
    `);
  });

  it("shows error for unsupported type", async () => {
    const page = await newSpecPage({
      components: [FlipFileViewer],
      html: `
        <flip-file-viewer
          file="/sample.html"
          type="text/html"
        ></flip-file-viewer>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-file-viewer file="/sample.html" type="text/html">
        <mock:shadow-root>
          <div class="file-viewer">
            <div class="file-viewer__file">
              <flip-inline-error message="File type is not supported."></flip-inline-error>
            </div>
          </div>
        </mock:shadow-root>
      </flip-file-viewer>
    `);
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
      components: [FlipFileViewer],
      html: `
        <flip-file-viewer
          file="/sample.pdf"
          type="application/pdf"
        ></flip-file-viewer>
      `,
    });

    await (page.root as HTMLFlipFileViewerElement).download();
    await page.waitForChanges();

    expect(saveAsMock).toHaveBeenCalledWith("Blob", "sample.pdf");
  });
});
