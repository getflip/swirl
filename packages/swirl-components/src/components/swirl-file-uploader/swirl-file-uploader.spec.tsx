import { newSpecPage } from "@stencil/core/testing";

import { FlipFileUploader } from "./swirl-file-uploader";

describe("flip-file-uploader", () => {
  it("renders with dropzone", async () => {
    const page = await newSpecPage({
      components: [FlipFileUploader],
      html: `<flip-file-uploader
              accept="image/*"
              description="Only image files are allowed."
              input-id="file-upload"
              input-name="file-upload"
              label="Label"
              cta-label="CTA Label"
              drag-drop-label="DragDropLabel"
              multiple="true"
            ></flip-file-uploader>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-file-uploader accept="image/*" cta-label="CTA Label" description="Only image files are allowed." drag-drop-label="DragDropLabel" input-id="file-upload" input-name="file-upload" label="Label" multiple="true">
        <div class="file-uploader file-uploader--show-dropzone">
          <label class="file-uploader__label" htmlfor="file-upload" id="undefined-label">
            Label
          </label>
          <span class="file-uploader__description" id="file-upload-description">
            Only image files are allowed.
          </span>
          <div class="file-uploader__dropzone">
            <flip-icon-cloud-upload class="file-uploader__dropzone-icon"></flip-icon-cloud-upload>
            <div class="file-uploader__dropzone-label" id="file-upload-additional-label">
              <span class="file-uploader__dropzone-cta">
                CTA Label
              </span>
              <span class="file-uploader__drag-drop-label">
                DragDropLabel
              </span>
            </div>
            <input accept="image/*" aria-describedby="file-upload-description file-upload-additional-label" autocomplete="off" class="file-uploader__input" id="file-upload" multiple="" name="file-upload" tabindex="0" type="file">
          </div>
        </div>
      </flip-file-uploader>
    `);
  });

  it("renders with upload button", async () => {
    const page = await newSpecPage({
      components: [FlipFileUploader],
      html: `<flip-file-uploader
              input-id="file-upload"
              input-name="file-upload"
              label="Label"
              show-dropzone="false"
              upload-button-label="Add file"
            ></flip-file-uploader>`,
    });

    expect(
      page.root.querySelector(
        '.file-uploader__dropzone flip-button[label="Add file"]'
      )
    ).not.toBeNull();
  });

  it("fires valueChange event", async () => {
    const page = await newSpecPage({
      components: [FlipFileUploader],
      html: `<flip-file-uploader
              input-id="file-upload"
              input-name="file-upload"
              label="Label"
            ></flip-file-uploader>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);

    page.root
      .querySelector<HTMLInputElement>('input[type="file"]')
      .dispatchEvent(new Event("change"));

    expect(spy).toHaveBeenCalled();
  });
});
