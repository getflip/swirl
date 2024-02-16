import { newSpecPage } from "@stencil/core/testing";
import { SwirlFileViewerImage } from "./swirl-file-viewer-image";

describe("swirl-file-viewer", () => {
  it("zooms images with double click and wheel", async () => {
    const page = await newSpecPage({
      components: [SwirlFileViewerImage],
      html: `
        <swirl-file-viewer-image
          description="Description"
          file="https://picsum.photos/id/1025/1000/1000"
        ></swirl-file-viewer>
      `,
    });

    expect(await page.rootInstance.getZoom()).toBe(1);

    page.root.dispatchEvent(new Event("dblclick"));
    expect(await page.rootInstance.getZoom()).toBe(2);

    page.root.dispatchEvent(new Event("wheel", { deltaY: -1000 } as any));
    expect(await page.rootInstance.getZoom()).toBe(3);

    page.rootInstance.resetZoom();
    expect(await page.rootInstance.getZoom()).toBe(1);
  });
});
