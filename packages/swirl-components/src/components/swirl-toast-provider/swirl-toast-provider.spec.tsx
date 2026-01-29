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
          <swirl-stack align="center" class="toast-provider__stack" part="toast-provider__stack" popover="manual" spacing="12">
            <swirl-toast toastid="toast-1">Toast 1</swirl-toast>
            <swirl-toast dismisslabel="Dismiss" icon="<lip-icon-mail></swirl-icon-mail>" intent="success" toastid="toast-2">Toast 2</swirl-toast>
            <slot></slot>
          </swirl-stack>
        </mock:shadow-root>
      </swirl-toast-provider>
    `);

    await toastProvider.dismiss("toast-2");

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <swirl-toast-provider role="status">
        <mock:shadow-root>
          <swirl-stack align="center" class="toast-provider__stack" part="toast-provider__stack" popover="manual" spacing="12">
            <swirl-toast toastid="toast-1">Toast 1</swirl-toast>
            <slot></slot>
          </swirl-stack>
        </mock:shadow-root>
      </swirl-toast-provider>
    `);

    await toastProvider.clearAll();

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <swirl-toast-provider role="status">
        <mock:shadow-root>
          <swirl-stack align="center" class="toast-provider__stack" part="toast-provider__stack" popover="manual" spacing="12">
            <slot></slot>
          </swirl-stack>
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

  it("should show popover when toasts are added", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `<swirl-toast-provider></swirl-toast-provider>`,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;
    const popoverEl = page.root.shadowRoot.querySelector("swirl-stack");

    const showPopoverSpy = jest.fn();
    const hidePopoverSpy = jest.fn();
    popoverEl.showPopover = showPopoverSpy;
    popoverEl.hidePopover = hidePopoverSpy;

    await toastProvider.toast({
      content: "Test Toast",
      toastId: "test-toast",
    });

    await page.waitForChanges();

    expect(showPopoverSpy).toHaveBeenCalled();
  });

  it("should hide popover when all toasts are cleared", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `<swirl-toast-provider></swirl-toast-provider>`,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;
    const popoverEl = page.root.shadowRoot.querySelector("swirl-stack");

    const showPopoverSpy = jest.fn();
    const hidePopoverSpy = jest.fn();
    popoverEl.showPopover = showPopoverSpy;
    popoverEl.hidePopover = hidePopoverSpy;

    await toastProvider.toast({
      content: "Test Toast",
      toastId: "test-toast",
    });

    await page.waitForChanges();

    hidePopoverSpy.mockClear();

    await toastProvider.clearAll();
    await page.waitForChanges();

    expect(hidePopoverSpy).toHaveBeenCalled();
  });

  it("should hide popover when last toast is dismissed", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `<swirl-toast-provider></swirl-toast-provider>`,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;
    const popoverEl = page.root.shadowRoot.querySelector("swirl-stack");

    const showPopoverSpy = jest.fn();
    const hidePopoverSpy = jest.fn();
    popoverEl.showPopover = showPopoverSpy;
    popoverEl.hidePopover = hidePopoverSpy;

    await toastProvider.toast({
      content: "Test Toast",
      toastId: "test-toast",
    });

    await page.waitForChanges();

    hidePopoverSpy.mockClear();

    await toastProvider.dismiss("test-toast");
    await page.waitForChanges();

    expect(hidePopoverSpy).toHaveBeenCalled();
  });

  it("should keep popover open when dismissing one of multiple toasts", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `<swirl-toast-provider></swirl-toast-provider>`,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;
    const popoverEl = page.root.shadowRoot.querySelector("swirl-stack");

    const showPopoverSpy = jest.fn();
    const hidePopoverSpy = jest.fn();
    popoverEl.showPopover = showPopoverSpy;
    popoverEl.hidePopover = hidePopoverSpy;

    await toastProvider.toast({
      content: "Toast 1",
      toastId: "toast-1",
    });

    await toastProvider.toast({
      content: "Toast 2",
      toastId: "toast-2",
    });

    await page.waitForChanges();

    showPopoverSpy.mockClear();
    hidePopoverSpy.mockClear();

    await toastProvider.dismiss("toast-1");
    await page.waitForChanges();

    expect(showPopoverSpy).toHaveBeenCalled();
  });

  it("should show popover when slotted toast is added", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `<swirl-toast-provider></swirl-toast-provider>`,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;
    const popoverEl = page.root.shadowRoot.querySelector("swirl-stack");
    const slotEl = page.root.shadowRoot.querySelector("slot");

    const showPopoverSpy = jest.fn();
    const hidePopoverSpy = jest.fn();
    popoverEl.showPopover = showPopoverSpy;
    popoverEl.hidePopover = hidePopoverSpy;

    const slottedToast = document.createElement("swirl-toast");
    slottedToast.setAttribute("toast-id", "slotted-toast");
    toastProvider.appendChild(slottedToast);

    slotEl.dispatchEvent(new Event("slotchange"));
    await page.waitForChanges();

    expect(showPopoverSpy).toHaveBeenCalled();
  });

  it("should hide popover when slotted toast is removed", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `
          <swirl-toast-provider>
            <swirl-toast toast-id="slotted-toast">Slotted Toast</swirl-toast>
          </swirl-toast-provider>
        `,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;
    const popoverEl = page.root.shadowRoot.querySelector("swirl-stack");
    const slotEl = page.root.shadowRoot.querySelector("slot");

    const showPopoverSpy = jest.fn();
    const hidePopoverSpy = jest.fn();
    popoverEl.showPopover = showPopoverSpy;
    popoverEl.hidePopover = hidePopoverSpy;

    const slottedToast = toastProvider.querySelector("swirl-toast");
    slottedToast.remove();

    slotEl.dispatchEvent(new Event("slotchange"));
    await page.waitForChanges();

    expect(hidePopoverSpy).toHaveBeenCalled();
  });

  it("should move into dialog when swirlDialogToggle event with 'open' is received", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `
          <div id="container">
            <swirl-toast-provider></swirl-toast-provider>
          </div>
        `,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;
    const container = page.body.querySelector("#container");
    const popoverEl = page.root.shadowRoot.querySelector("swirl-stack");

    // Mock matches to avoid :popover-open error
    popoverEl.matches = jest.fn().mockReturnValue(false);

    // Create a mock dialog
    const dialog = document.createElement("dialog");
    page.body.appendChild(dialog);

    // Verify initial position
    expect(toastProvider.parentElement).toBe(container);

    // Dispatch swirlDialogToggle event with "open" state
    const toggleEvent = new CustomEvent("swirlDialogToggle", {
      bubbles: true,
      composed: true,
      detail: { newState: "open", dialog },
    });
    document.dispatchEvent(toggleEvent);

    await page.waitForChanges();

    // Verify toast provider moved into dialog
    expect(toastProvider.parentElement).toBe(dialog);
  });

  it("should restore to original position when swirlDialogToggle event with 'closed' is received", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `
          <div id="container">
            <swirl-toast-provider></swirl-toast-provider>
          </div>
        `,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;
    const container = page.body.querySelector("#container");
    const popoverEl = page.root.shadowRoot.querySelector("swirl-stack");

    // Mock matches to avoid :popover-open error
    popoverEl.matches = jest.fn().mockReturnValue(false);

    // Create a mock dialog
    const dialog = document.createElement("dialog");
    page.body.appendChild(dialog);

    // Open dialog
    const openEvent = new CustomEvent("swirlDialogToggle", {
      bubbles: true,
      composed: true,
      detail: { newState: "open", dialog },
    });
    document.dispatchEvent(openEvent);

    await page.waitForChanges();
    expect(toastProvider.parentElement).toBe(dialog);

    // Close dialog
    const closeEvent = new CustomEvent("swirlDialogToggle", {
      bubbles: true,
      composed: true,
      detail: { newState: "closed", dialog },
    });
    document.dispatchEvent(closeEvent);

    await page.waitForChanges();

    // Verify toast provider restored to original position
    expect(toastProvider.parentElement).toBe(container);
  });

  it("should handle nested dialogs by moving to the topmost dialog", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `
          <div id="container">
            <swirl-toast-provider></swirl-toast-provider>
          </div>
        `,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;
    const container = page.body.querySelector("#container");
    const popoverEl = page.root.shadowRoot.querySelector("swirl-stack");

    // Mock matches to avoid :popover-open error
    popoverEl.matches = jest.fn().mockReturnValue(false);

    // Create two mock dialogs
    const dialog1 = document.createElement("dialog");
    const dialog2 = document.createElement("dialog");
    page.body.appendChild(dialog1);
    page.body.appendChild(dialog2);

    // Open first dialog
    document.dispatchEvent(
      new CustomEvent("swirlDialogToggle", {
        bubbles: true,
        composed: true,
        detail: { newState: "open", dialog: dialog1 },
      })
    );
    await page.waitForChanges();
    expect(toastProvider.parentElement).toBe(dialog1);

    // Open second dialog (nested)
    document.dispatchEvent(
      new CustomEvent("swirlDialogToggle", {
        bubbles: true,
        composed: true,
        detail: { newState: "open", dialog: dialog2 },
      })
    );
    await page.waitForChanges();
    expect(toastProvider.parentElement).toBe(dialog2);

    // Close second dialog - should move back to first dialog
    document.dispatchEvent(
      new CustomEvent("swirlDialogToggle", {
        bubbles: true,
        composed: true,
        detail: { newState: "closed", dialog: dialog2 },
      })
    );
    await page.waitForChanges();
    expect(toastProvider.parentElement).toBe(dialog1);

    // Close first dialog - should restore to original position
    document.dispatchEvent(
      new CustomEvent("swirlDialogToggle", {
        bubbles: true,
        composed: true,
        detail: { newState: "closed", dialog: dialog1 },
      })
    );
    await page.waitForChanges();
    expect(toastProvider.parentElement).toBe(container);
  });

  it("should refresh popover after moving to dialog", async () => {
    const page = await newSpecPage({
      components: [SwirlToastProvider],
      html: `<swirl-toast-provider></swirl-toast-provider>`,
    });

    const toastProvider = page.root as HTMLSwirlToastProviderElement;
    const popoverEl = page.root.shadowRoot.querySelector("swirl-stack");

    // Add a toast to open the popover
    await toastProvider.toast({
      content: "Test Toast",
      toastId: "test-toast",
    });
    await page.waitForChanges();

    const hidePopoverSpy = jest.fn();
    const showPopoverSpy = jest.fn();
    popoverEl.hidePopover = hidePopoverSpy;
    popoverEl.showPopover = showPopoverSpy;
    (popoverEl as any).matches = () => true; // Mock :popover-open

    // Create a mock dialog and trigger open
    const dialog = document.createElement("dialog");
    page.body.appendChild(dialog);

    document.dispatchEvent(
      new CustomEvent("swirlDialogToggle", {
        bubbles: true,
        composed: true,
        detail: { newState: "open", dialog },
      })
    );
    await page.waitForChanges();

    // Verify popover was refreshed (hide then show)
    expect(hidePopoverSpy).toHaveBeenCalled();
    expect(showPopoverSpy).toHaveBeenCalled();
  });
});
