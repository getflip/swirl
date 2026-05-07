import { newSpecPage } from "@stencil/core/testing";

import { SwirlProgressIndicator } from "./swirl-progress-indicator";

describe("swirl-progress-indicator", () => {
  it("renders a progress bar", async () => {
    const page = await newSpecPage({
      components: [SwirlProgressIndicator],
      html: `<swirl-progress-indicator label="Progress" value="60"></swirl-progress-indicator>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-progress-indicator class="bar" label="Progress" value="60">
        <mock:shadow-root>
          <progress
            aria-label="Progress"
            aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow="60"
            class="progress-indicator progress-indicator--size-m progress-indicator--variant-bar"
            max="100"
            value="60"></progress>
        </mock:shadow-root>
      </swirl-progress-indicator>
    `);
  });

  it("renders an extra-small progress bar", async () => {
    const page = await newSpecPage({
      components: [SwirlProgressIndicator],
      html: `<swirl-progress-indicator label="Progress" size="xs" value="60"></swirl-progress-indicator>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-progress-indicator class="bar" label="Progress" size="xs" value="60">
        <mock:shadow-root>
          <progress
            aria-label="Progress"
            aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow="60"
            class="progress-indicator progress-indicator--size-xs progress-indicator--variant-bar"
            max="100"
            value="60"></progress>
        </mock:shadow-root>
      </swirl-progress-indicator>
    `);
  });

  it("renders a progress circle", async () => {
    const page = await newSpecPage({
      components: [SwirlProgressIndicator],
      html: `<swirl-progress-indicator label="Progress" value="60" variant="circle"></swirl-progress-indicator>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-progress-indicator class="circle" label="Progress" value="60" variant="circle">
        <mock:shadow-root>
          <span aria-label="Progress" aria-valuemax="100" aria-valuemin="0" aria-valuenow="60" class="progress-indicator progress-indicator--size-m progress-indicator--variant-circle" role="progressbar">
            <svg class="progress-indicator__circle" focusable="false" viewBox="0 0 48 48">
              <circle class="progress-indicator__circle-background" cx="24" cy="24" fill="none" r="20" stroke-width="4"></circle>
              <circle class="progress-indicator__circle-value" cx="24" cy="24" fill="none" r="20" stroke-dasharray="126" stroke-dashoffset="50" stroke-width="4"></circle>
            </svg>
          </span>
        </mock:shadow-root>
      </swirl-progress-indicator>
    `);
  });

  it("renders an extra-small progress circle", async () => {
    const page = await newSpecPage({
      components: [SwirlProgressIndicator],
      html: `<swirl-progress-indicator label="Progress" size="xs" value="60" variant="circle"></swirl-progress-indicator>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-progress-indicator class="circle" label="Progress" size="xs" value="60" variant="circle">
        <mock:shadow-root>
          <span aria-label="Progress" aria-valuemax="100" aria-valuemin="0" aria-valuenow="60" class="progress-indicator progress-indicator--size-xs progress-indicator--variant-circle" role="progressbar">
            <svg class="progress-indicator__circle" focusable="false" viewBox="0 0 20 20">
              <circle class="progress-indicator__circle-background" cx="10" cy="10" fill="none" r="8" stroke-width="2"></circle>
              <circle class="progress-indicator__circle-value" cx="10" cy="10" fill="none" r="8" stroke-dasharray="50" stroke-dashoffset="20" stroke-width="2"></circle>
            </svg>
          </span>
        </mock:shadow-root>
      </swirl-progress-indicator>
    `);
  });
});
