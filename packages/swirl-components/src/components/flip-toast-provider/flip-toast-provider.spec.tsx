import { newSpecPage } from "@stencil/core/testing";

import { FlipToastProvider } from "./flip-toast-provider";

describe("flip-toast-provider", () => {
  it("renders, dismisses and clears its toasts", async () => {
    const page = await newSpecPage({
      components: [FlipToastProvider],
      html: `<flip-toast-provider></flip-toast-provider>`,
    });

    const toastProvider = page.root as HTMLFlipToastProviderElement;

    await toastProvider.toast({
      content: "Toast 1",
      toastId: "toast-1",
    });

    await toastProvider.toast({
      content: "Toast 2",
      dismissLabel: "Dismiss",
      icon: "<lip-icon-mail></flip-icon-mail>",
      intent: "warning",
      toastId: "toast-2",
    });

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <flip-toast-provider role="status">
        <mock:shadow-root>
        <flip-toast content="Toast 1" toastid="toast-1"></flip-toast>
          <flip-toast content="Toast 2" dismisslabel="Dismiss" icon="<lip-icon-mail></flip-icon-mail>" intent="warning" toastid="toast-2"></flip-toast>
        </mock:shadow-root>
      </flip-toast-provider>
    `);

    await toastProvider.dismiss("toast-2");

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <flip-toast-provider role="status">
        <mock:shadow-root>
          <flip-toast content="Toast 1" toastid="toast-1"></flip-toast>
        </mock:shadow-root>
      </flip-toast-provider>
    `);

    await toastProvider.clearAll();

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <flip-toast-provider role="status">
        <mock:shadow-root>
        </mock:shadow-root>
      </flip-toast-provider>
    `);
  });
});
