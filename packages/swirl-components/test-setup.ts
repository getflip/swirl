/**
 * Global test setup for Stencil components
 */

// Mock native Popover API and :scope selector for Stencil's mock-doc
const mockDoc = require("@stencil/core/mock-doc");

const originalQuerySelector = mockDoc.MockHTMLElement.prototype.querySelector;

Object.assign(mockDoc.MockHTMLElement.prototype, {
  showPopover() {},
  hidePopover() {},
  togglePopover() {
    return true;
  },
  showModal() {
    (this as any).open = true;
  },
  close() {
    (this as any).open = false;
  },
  querySelector(selector: string) {
    if (selector.startsWith(":scope >")) {
      const childSelector = selector.replace(":scope >", "").trim();
      return (
        Array.from(this.children).find((child: Element) =>
          child.matches(childSelector)
        ) || null
      );
    }
    return originalQuerySelector.call(this, selector);
  },
});
