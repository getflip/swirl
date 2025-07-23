import { newSpecPage } from "@stencil/core/testing";

import { SwirlToastConfig, SwirlToastProvider } from "./swirl-toast-provider";

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

  it("should create a toast with required properties", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `<swirl-toast-provider></swirl-toast-provider>`,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;
    const result = await toastProvider.toast({
      content: "Simple Toast",
    });

    expect(result).toBeDefined();
    expect(result.content).toBe("Simple Toast");
    expect(result.toastId).toBeDefined();
    expect(result.createdAt).toBeInstanceOf(Date);
  });

  it("should use the provided toastId when creating a toast", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `<swirl-toast-provider></swirl-toast-provider>`,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;
    const result = await toastProvider.toast({
      content: "Toast with ID",
      toastId: "custom-id",
    });

    expect(result.toastId).toBe("custom-id");
  });

  it("should use the provided duration or fall back to globalDuration when creating a toast", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `<swirl-toast-provider global-duration="5000"></swirl-toast-provider>`,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;

    // Toast with specific duration
    const result1 = await toastProvider.toast({
      content: "Toast with duration",
      duration: 3000,
    });

    // Toast with global duration
    const result2 = await toastProvider.toast({
      content: "Toast with global duration",
    });

    expect(result1.duration).toBe(3000);
    expect(result2.duration).toBe(5000);
  });

  it("should not create a toast with duplicate toastId", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `<swirl-toast-provider></swirl-toast-provider>`,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;

    // Add first toast
    await toastProvider.toast({
      content: "First Toast",
      toastId: "duplicate-id",
    });

    // Try to add duplicate toast
    const result = await toastProvider.toast({
      content: "Duplicate Toast",
      toastId: "duplicate-id",
    });

    await page.waitForChanges();

    // Should return undefined for duplicate toast
    expect(result).toBeUndefined();

    // Only one toast should be rendered
    const toasts = page.root.shadowRoot.querySelectorAll("swirl-toast");
    expect(toasts.length).toBe(1);
    expect(toasts[0].textContent).toBe("First Toast");
  });

  it("should generate a random toastId when not provided", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `<swirl-toast-provider></swirl-toast-provider>`,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;

    const result = await toastProvider.toast({
      content: "Toast without ID",
    });

    await page.waitForChanges();

    expect(result.toastId).toBeDefined();
    expect(result.toastId.length).toBeGreaterThan(0);
  });

  it("should maintain all provided toast properties when creating a toast", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `<swirl-toast-provider></swirl-toast-provider>`,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;

    const fullToast: SwirlToastConfig = {
      content: "Full Toast",
      accessibleDismissLabel: "Close notification",
      dismissLabel: "Dismiss",
      icon: "<swirl-icon-info></swirl-icon-info>",
      intent: "success",
      duration: 8000,
      toastId: "full-toast",
    };

    const result = await toastProvider.toast(fullToast);

    await page.waitForChanges();

    // Verify all properties are maintained
    expect(result.content).toBe(fullToast.content);
    expect(result.accessibleDismissLabel).toBe(
      fullToast.accessibleDismissLabel
    );
    expect(result.dismissLabel).toBe(fullToast.dismissLabel);
    expect(result.icon).toBe(fullToast.icon);
    expect(result.intent).toBe(fullToast.intent);
    expect(result.duration).toBe(fullToast.duration);
    expect(result.toastId).toBe(fullToast.toastId);
  });
});
