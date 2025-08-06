import { newSpecPage } from "@stencil/core/testing";

import { SwirlShellLayout } from "./swirl-shell-layout";

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

describe("swirl-shell-layout", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [SwirlShellLayout],
      html: `<swirl-shell-layout main-navigation-label="Test">
        <div slot="logo">Logo</div>
        <div slot="mobile-logo">Mobile logo</div>
        <div slot="header-tools">Tools</div>
        <div slot="nav">nav</div>
        <div>Main</div>
        <div slot="sidebar-header">Sidebar header</div>
        <div slot="sidebar">Sidebar</div>
      </swirl-shell-layout>`,
    });

    expect(page.root.innerHTML).toMatchInlineSnapshot(
      `"<!---->      <div slot=\\"header-tools\\" hidden=\\"\\">Tools</div>      <div slot=\\"sidebar-header\\" hidden=\\"\\">Sidebar header</div>   <div class=\\"shell-layout\\"><header class=\\"shell-layout__header\\" data-tauri-drag-region=\\"true\\"><button class=\\"shell-layout__skip-link\\" type=\\"button\\">Skip to main content</button><div class=\\"shell-layout__header-left\\"><swirl-tooltip content=\\"Collapse navigation\\" delay=\\"100\\" position=\\"right\\"><button class=\\"shell-layout__header-tool\\" type=\\"button\\"><swirl-icon-dock-left-collapse size=\\"20\\"></swirl-icon-dock-left-collapse><swirl-visually-hidden>Collapse navigation</swirl-visually-hidden></button></swirl-tooltip><a class=\\"shell-layout__header-tool\\" href=\\"javascript:history.back()\\"><swirl-icon-arrow-back size=\\"20\\"></swirl-icon-arrow-back><swirl-visually-hidden>Navigate back</swirl-visually-hidden></a><a class=\\"shell-layout__header-tool\\" href=\\"javascript:history.forward()\\"><swirl-icon-arrow-forward size=\\"20\\"></swirl-icon-arrow-forward><swirl-visually-hidden>Navigate forward</swirl-visually-hidden></a> </div><div class=\\"shell-layout__logo\\"> <div slot=\\"logo\\">Logo</div></div><div class=\\"shell-layout__header-right\\"> <button class=\\"shell-layout__header-tool shell-layout__sidebar-toggle\\" type=\\"button\\"><swirl-icon glyph=\\"notifications\\" size=\\"20\\"></swirl-icon><swirl-visually-hidden>Toggle sidebar</swirl-visually-hidden></button> </div></header><div class=\\"shell-layout__mobile-nav-backdrop\\"></div><nav aria-labelledby=\\"main-navigation-label\\" class=\\"shell-layout__nav\\"><div class=\\"shell-layout__mobile-header\\"> <div slot=\\"mobile-logo\\">Mobile logo</div><div class=\\"shell-layout__mobile-header-tools\\"> <button class=\\"shell-layout__header-tool\\" type=\\"button\\"><swirl-icon-double-arrow-left size=\\"20\\"></swirl-icon-double-arrow-left><swirl-visually-hidden>Close navigation</swirl-visually-hidden></button></div></div><div class=\\"shell-layout__nav-body\\"><swirl-visually-hidden><span id=\\"main-navigation-label\\">Main</span></swirl-visually-hidden> <div slot=\\"nav\\">nav</div><div class=\\"shell-layout__secondary-nav\\"><swirl-separator color=\\"strong\\" spacing=\\"16\\"></swirl-separator><swirl-box paddingblockend=\\"16\\"><swirl-stack justify=\\"space-between\\" orientation=\\"horizontal\\"><swirl-button icon=\\"<swirl-icon-expand-less></swirl-icon-expand-less>\\" label=\\"Show less\\" variant=\\"plain\\"></swirl-button><swirl-button icon=\\"<swirl-icon-hamburger-menu></swirl-icon-hamburger-menu>\\" iconposition=\\"end\\" label=\\"List\\" variant=\\"plain\\"></swirl-button></swirl-stack></swirl-box><div class=\\"shell-layout__secondary-nav-items--tiled shell-layout__secondary-nav-items\\"></div></div></div></nav><main class=\\"shell-layout__main\\" id=\\"main-content\\">      <div>Main</div>   </main><aside class=\\"shell-layout__sidebar\\" inert=\\"\\"><div class=\\"shell-layout__sidebar-body\\"><div class=\\"shell-layout__sidebar-app-bar\\"></div><div class=\\"shell-layout__sidebar-content\\"> <div slot=\\"sidebar\\">Sidebar</div></div></div></aside></div>"`
    );
  });
});
