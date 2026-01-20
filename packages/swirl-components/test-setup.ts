/**
 * Global test setup for Stencil components
 */

// Mock native Popover API for Stencil's mock-doc
const mockDoc = require("@stencil/core/mock-doc");

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
});
