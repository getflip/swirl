import { newSpecPage } from "@stencil/core/testing";

import { SwirlModal } from "./swirl-modal";

describe("swirl-modal", () => {
  it("renders content and heading", async () => {
    const page = await newSpecPage({
      components: [SwirlModal],
      html: `<swirl-modal label="Dialog">Content</swirl-modal>`,
    });

    expect(page.root).toEqualHtml(`
     <swirl-modal label="Dialog">
  <section
    aria-hidden="true"
    aria-label="Dialog"
    aria-modal="true"
    class="modal modal--padded modal--sidebar-footer-padded modal--sidebar-padded modal--variant-default"
    role="dialog"
  >
    <div class="modal__backdrop"></div>
    <div class="modal__body">
      <aside class="modal__sidebar">
        <div class="modal__sidebar-content"></div>
        <div class="modal__sidebar-footer"></div>
      </aside>
      <div class="modal__main-content">
        <header class="modal__custom-header"></header>
        <header class="modal__header">
          <div class="modal__header-bar">
            <swirl-button
              class="modal__close-button"
              hidelabel=""
              icon="<swirl-icon-close></swirl-icon-close>"
              label="Close modal"
            ></swirl-button>
            <swirl-heading
              as="h2"
              class="modal__heading"
              level="3"
              text="Dialog"
            ></swirl-heading>
          </div>
        </header>
        <div class="modal__content-container">
          <div class="modal__primary-content">
            <div class="modal__header-tools"></div>
            <div class="modal__content">Content</div>
          </div>
          <div class="modal__secondary-content"></div>
        </div>
        <div class="modal__custom-footer"></div>
      </div>
    </div>
  </section>
</swirl-modal>
    `);
  });

  it("renders controls and fires events", async () => {
    const page = await newSpecPage({
      components: [SwirlModal],
      html: `<swirl-modal label="Dialog" primary-action-label="Primary" secondary-action-label="Secondary">Content</swirl-modal>`,
    });

    const primarySpy = jest.fn();
    const secondarySpy = jest.fn();

    const buttons = page.root.querySelectorAll<HTMLSwirlButtonElement>(
      ".modal__controls swirl-button"
    );

    page.root.addEventListener("primaryAction", primarySpy);
    page.root.addEventListener("secondaryAction", secondarySpy);

    buttons[0].click();
    buttons[1].click();

    expect(buttons[0].getAttribute("label")).toEqual("Secondary");
    expect(buttons[1].getAttribute("label")).toEqual("Primary");

    expect(primarySpy).toHaveBeenCalled();
    expect(secondarySpy).toHaveBeenCalled();
  });

  it("renders the sidebar with the close button", async () => {
    const page = await newSpecPage({
      components: [SwirlModal],
      html: `
        <swirl-modal label="Dialog" sidebar-label="Sidebar label" has-sidebar-close-button="true">
          Main Content

          <swirl-box slot="sidebar-content">
            <swirl-text>
              Sidebar Content
            </swirl-text>
          </swirl-box>

        </swirl-modal>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-modal has-sidebar-close-button="true" label="Dialog" sidebar-label="Sidebar label">
   <section
     aria-hidden="true"
     aria-label="Dialog"
     aria-modal="true"
     class="modal modal--has-sidebar-content modal--padded modal--sidebar-footer-padded modal--sidebar-padded modal--variant-default"
     role="dialog"
   >
     <div class="modal__backdrop"></div>
     <div class="modal__body">
       <aside class="modal__sidebar">
        <header class="modal__sidebar-header modal__sidebar-header--has-close-button">
          <swirl-button hidelabel="" icon="<swirl-icon-double-arrow-right></swirl-icon-double-arrow-right>" label="Close sidebar"></swirl-button>
          <swirl-heading as="h3" class="modal__sidebar-heading" level="5" text="Sidebar label"></swirl-heading>
        </header>
        <div class="modal__sidebar-content">
        <swirl-box slot="sidebar-content">
          <swirl-text>
          Sidebar Content
          </swirl-text>
        </swirl-box>
        </div>
        <div class="modal__sidebar-footer"></div>
       </aside>
       <div class="modal__main-content">
         <header class="modal__custom-header"></header>
         <header class="modal__header">
           <div class="modal__header-bar">
             <swirl-button
               class="modal__close-button"
               hidelabel=""
               icon="<swirl-icon-close></swirl-icon-close>"
               label="Close modal"
             ></swirl-button>
             <swirl-heading
               as="h2"
               class="modal__heading"
               level="3"
               text="Dialog"
             ></swirl-heading>
           </div>
         </header>
         <div class="modal__content-container">
           <div class="modal__primary-content">
             <div class="modal__header-tools"></div>
             <div class="modal__content">Main Content</div>
           </div>
           <div class="modal__secondary-content"></div>
         </div>
         <div class="modal__custom-footer"></div>
       </div>
     </div>
   </section>
 </swirl-modal>
     `);

    const sidebarCloseSpy = jest.fn();

    const closeButton = page.root.querySelector<HTMLSwirlButtonElement>(
      ".modal__sidebar-header swirl-button"
    );

    page.root.addEventListener("sidebarClose", sidebarCloseSpy);

    closeButton.click();

    expect(sidebarCloseSpy).toHaveBeenCalled();
  });

  it("renders fullscreen button when showFullscreenButton is true", async () => {
    const page = await newSpecPage({
      components: [SwirlModal],
      html: `<swirl-modal label="Dialog" show-fullscreen-button="true">Content</swirl-modal>`,
    });

    const fullscreenButton = page.root.querySelector<HTMLSwirlButtonElement>(
      ".modal__fullscreen-button"
    );

    expect(fullscreenButton).not.toBeNull();
    expect(fullscreenButton.getAttribute("label")).toEqual("Full screen");
    expect(fullscreenButton.getAttribute("icon")).toEqual(
      "<swirl-icon-open-in-full></swirl-icon-open-in-full>"
    );
  });

  it("toggles the fullscreen state when clicking the fullscreen button", async () => {
    const page = await newSpecPage({
      components: [SwirlModal],
      html: `<swirl-modal label="Dialog" show-fullscreen-button="true">Content</swirl-modal>`,
    });
    const fullscreenButton = page.root.querySelector<HTMLSwirlButtonElement>(
      ".modal__fullscreen-button"
    );
    const spy = jest.fn();

    page.root.addEventListener("toggleFullscreen", spy);

    expect(page.root.querySelector(".modal--fullscreen")).toBeNull();

    fullscreenButton.click();
    await page.waitForChanges();

    expect(page.root.querySelector(".modal--fullscreen")).not.toBeNull();
    expect(fullscreenButton.getAttribute("label")).toEqual("Exit full screen");
    expect(fullscreenButton.getAttribute("icon")).toEqual(
      "<swirl-icon-close-fullscreen></swirl-icon-close-fullscreen>"
    );

    fullscreenButton.click();
    await page.waitForChanges();

    expect(page.root.querySelector(".modal--fullscreen")).toBeNull();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0].detail).toBe(true);
    expect(spy.mock.calls[1][0].detail).toBe(false);
    expect(fullscreenButton.getAttribute("label")).toEqual("Full screen");
    expect(fullscreenButton.getAttribute("icon")).toEqual(
      "<swirl-icon-open-in-full></swirl-icon-open-in-full>"
    );
  });
});
