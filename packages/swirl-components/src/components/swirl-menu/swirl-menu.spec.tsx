import { newSpecPage } from "@stencil/core/testing";

import { SwirlButton } from "../swirl-button/swirl-button";
import { SwirlMenuItem } from "../swirl-menu-item/swirl-menu-item";
import { SwirlPopoverTrigger } from "../swirl-popover-trigger/swirl-popover-trigger";
import { SwirlPopover } from "../swirl-popover/swirl-popover";
import { SwirlMenu } from "./swirl-menu";

(global as any).DocumentFragment = class DocumentFragment extends Node {};
(global as any).ShadowRoot = class ShadowRoot extends DocumentFragment {};

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

(global as any).IntersectionObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

const template = `
  <div>
    <swirl-popover-trigger swirl-popover="menu">
      <swirl-button label="Trigger"></swirl-button>
    </swirl-popover-trigger>
    <swirl-popover label="Menu" id="menu">
      <swirl-menu label="Menu">
        <swirl-menu-item label="Item 1"></swirl-menu-item>
        <swirl-menu-item label="Item 2">
          <swirl-menu label="Sub menu" variant="selection">
            <swirl-menu-item label="Sub item 1" value="1"></swirl-menu-item>
            <swirl-menu-item label="Sub item 2" value="2"></swirl-menu-item>
          </swirl-menu>
        </swirl-menu-item>
        <swirl-menu-item label="Item 3"></swirl-menu-item>
      </swirl-menu>
    </swirl-popover>
  </div>
`;

describe("swirl-menu", () => {
  beforeAll(() => {
    Object.defineProperty(window, "ShadowRoot", {
      writable: false,
      value: jest.fn(),
    });

    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    global.ResizeObserver = ResizeObserver;
  });

  it("renders", async () => {
    const page = await newSpecPage({
      components: [
        SwirlButton,
        SwirlPopover,
        SwirlPopoverTrigger,
        SwirlMenu,
        SwirlMenuItem,
      ],
      html: template,
    });

    expect(page.body.children[0]).toMatchInlineSnapshot(`
      <div>
        <swirl-popover-trigger swirl-popover="menu">
          <!---->
          <swirl-button label="Trigger" swirl-aria-controls="menu" swirl-aria-expanded="false" swirl-aria-haspopup="dialog">
            <!---->
            <button aria-controls="menu" aria-expanded="false" aria-haspopup="dialog" class="button button--icon-position-start button--intent-default button--size-m button--text-align-center button--variant-ghost" type="button">
              <span class="button__icon"></span>
              <span class="button__label">
                Trigger
              </span>
            </button>
          </swirl-button>
        </swirl-popover-trigger>
        <swirl-popover id="menu" label="Menu" style="display: none;">
          <mock:shadow-root>
            <div class="popover popover--animation-scale-in-xy popover--inactive popover--padded popover--placement-undefined">
              <div aria-hidden="true" aria-label="Menu" class="popover__content" part="popover__content" role="dialog" tabindex="-1">
                <span class="popover__handle"></span>
                <div class="popover__scroll-container" part="popover__scroll-container">
                  <slot></slot>
                </div>
              </div>
            </div>
          </mock:shadow-root>
          <swirl-menu label="Menu">
            <mock:shadow-root>
              <div class="menu menu--active menu--level-0 menu--mobile menu--root">
                <div class="menu__mobile-header">
                  <swirl-button>
                    <!---->
                    <button aria-label="Close menu" class="button button--has-icon button--icon-only button--icon-position-start button--intent-default button--size-m button--text-align-center button--variant-plain" type="button">
                      <span class="button__icon">
                        <swirl-icon-close size="24"></swirl-icon-close>
                      </span>
                    </button>
                  </swirl-button>
                  <span class="menu__title" id="menu-title">
                    <swirl-heading align="center" as="span" level="4" text="Menu" truncate=""></swirl-heading>
                  </span>
                  <swirl-button class="menu__done-button">
                    <!---->
                    <button class="button button--icon-position-start button--intent-primary button--size-m button--text-align-center button--variant-ghost" type="button">
                      <span class="button__icon"></span>
                      <span class="button__label">
                        Done
                      </span>
                    </button>
                  </swirl-button>
                </div>
                <div aria-labelledby="menu-title" aria-orientation="vertical" class="menu__menu" role="menubar" style="left: calc(-100% * 0);">
                  <slot></slot>
                </div>
              </div>
            </mock:shadow-root>
            <swirl-menu-item label="Item 1">
              <mock:shadow-root>
                <div class="menu-item">
                  <swirl-action-list-item intent="default" label="Item 1"></swirl-action-list-item>
                  <slot></slot>
                </div>
              </mock:shadow-root>
            </swirl-menu-item>
            <swirl-menu-item label="Item 2">
              <mock:shadow-root>
                <div class="menu-item">
                  <swirl-action-list-item intent="default" label="Item 2"></swirl-action-list-item>
                  <slot></slot>
                </div>
              </mock:shadow-root>
              <swirl-menu label="Sub menu" variant="selection">
                <mock:shadow-root>
                  <div class="menu menu--active menu--level-1 menu--mobile menu--root">
                    <div class="menu__mobile-header">
                      <swirl-button>
                        <!---->
                        <button aria-label="Close menu" class="button button--has-icon button--icon-only button--icon-position-start button--intent-default button--size-m button--text-align-center button--variant-plain" type="button">
                          <span class="button__icon">
                            <swirl-icon-close size="24"></swirl-icon-close>
                          </span>
                        </button>
                      </swirl-button>
                      <span class="menu__title" id="menu-title">
                        <swirl-heading align="center" as="span" level="4" text="Sub menu" truncate=""></swirl-heading>
                      </span>
                      <swirl-button class="menu__done-button">
                        <!---->
                        <button class="button button--icon-position-start button--intent-primary button--size-m button--text-align-center button--variant-ghost" type="button">
                          <span class="button__icon"></span>
                          <span class="button__label">
                            Done
                          </span>
                        </button>
                      </swirl-button>
                    </div>
                    <div aria-labelledby="menu-title" aria-orientation="vertical" class="menu__menu" role="menubar" style="left: calc(-100% * 0);">
                      <slot></slot>
                    </div>
                  </div>
                </mock:shadow-root>
                <swirl-menu-item label="Sub item 1" value="1">
                  <mock:shadow-root>
                    <div class="menu-item">
                      <swirl-option-list-item label="Sub item 1" swirlariarole="menuitemradio" value="1"></swirl-option-list-item>
                      <slot></slot>
                    </div>
                  </mock:shadow-root>
                </swirl-menu-item>
                <swirl-menu-item label="Sub item 2" value="2">
                  <mock:shadow-root>
                    <div class="menu-item">
                      <swirl-option-list-item label="Sub item 2" swirlariarole="menuitemradio" value="2"></swirl-option-list-item>
                      <slot></slot>
                    </div>
                  </mock:shadow-root>
                </swirl-menu-item>
              </swirl-menu>
            </swirl-menu-item>
            <swirl-menu-item label="Item 3">
              <mock:shadow-root>
                <div class="menu-item">
                  <swirl-action-list-item intent="default" label="Item 3"></swirl-action-list-item>
                  <slot></slot>
                </div>
              </mock:shadow-root>
            </swirl-menu-item>
          </swirl-menu>
        </swirl-popover>
      </div>
    `);
  });

  it("starts as active if root menu", async () => {
    const page = await newSpecPage({
      components: [
        SwirlButton,
        SwirlPopover,
        SwirlPopoverTrigger,
        SwirlMenu,
        SwirlMenuItem,
      ],
      html: template,
    });

    const menu = page.body.querySelector("swirl-menu");
    const rootMenuEl = menu.shadowRoot.children[0];

    expect(rootMenuEl.classList.contains("menu--active")).toBeTruthy();
  });

  it("fires done event", async () => {
    const page = await newSpecPage({
      components: [
        SwirlButton,
        SwirlPopover,
        SwirlPopoverTrigger,
        SwirlMenu,
        SwirlMenuItem,
      ],
      html: template,
    });

    const spy = jest.fn();
    const menu = page.body.querySelector("swirl-menu");
    const trigger = page.body.querySelector<HTMLSwirlButtonElement>(
      "swirl-popover-trigger"
    );

    menu.addEventListener("done", spy);

    trigger.click();

    const doneButton = Array.from(
      menu.shadowRoot.querySelectorAll("swirl-button")
    ).find((button) => button.innerText === "Done");

    doneButton.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
