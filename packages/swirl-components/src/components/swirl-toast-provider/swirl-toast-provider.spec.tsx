import { newSpecPage } from "@stencil/core/testing";

import { SwirlToastProvider } from "./swirl-toast-provider";

describe("swirl-toast-provider", () => {
  it("renders, dismisses and clears its toasts", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `<swirl-toast-provider></swirl-toast-provider>`,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;

    await toastProvider.toast({
      content: "Toast 1",
      toastId: "toast-1",
    });

    await toastProvider.toast({
      content: "Toast 2",
      dismissLabel: "Dismiss",
      icon: "<lip-icon-mail></swirl-icon-mail>",
      intent: "success",
      toastId: "toast-2",
    });

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <swirl-toast-provider role="status">
        <mock:shadow-root>
          <swirl-stack spacing="12">
            <swirl-toast toastid="toast-1">Toast 1</swirl-toast>
            <swirl-toast dismisslabel="Dismiss" icon="<lip-icon-mail></swirl-icon-mail>" intent="success" toastid="toast-2">Toast 2</swirl-toast>
          </swirl-stack>
        </mock:shadow-root>
      </swirl-toast-provider>
    `);

    await toastProvider.dismiss("toast-2");

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <swirl-toast-provider role="status">
        <mock:shadow-root>
          <swirl-stack spacing="12">
            <swirl-toast toastid="toast-1">Toast 1</swirl-toast>
          </swirl-stack>
        </mock:shadow-root>
      </swirl-toast-provider>
    `);

    await toastProvider.clearAll();

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <swirl-toast-provider role="status">
        <mock:shadow-root>
          <swirl-stack spacing="12"></swirl-stack>
        </mock:shadow-root>
      </swirl-toast-provider>
    `);
  });
});
