---
"@getflip/swirl-components": minor
---

Add `swirl-sidebar-navigation` component and redesign `swirl-console-layout` with a hideable, collapsible sidebar.

**New component `swirl-sidebar-navigation`** — reusable 296px sidebar shell (logo slot with Flip fallback, `appName`, collapse button emitting `collapseButtonClick`, scrollable default slot with scroll-state header/footer dividers, `user` footer slot, `elevated` shadow variant, `focusCollapseButton()` method).

**`swirl-console-layout` changes** (API is backward compatible, behavior notes below):

- New shell styling: an ambient radial-glow background on a sunken surface (themeable via `--swirl-console-layout-background`), a rounded content card, and a translucent 296px sidebar rendered through `swirl-sidebar-navigation`.
- The desktop sidebar can now be hidden via its collapse button and reopened via a floating menu button (or the app bar toggle when an app bar is visible). New event `sidebarVisibilityChange(boolean)`; new slot `logo`.
- The visibility state persists to localStorage. The default key is shared per origin — set `sidebarVisibilityStateStorageKey` per app if multiple Swirl console apps run on the same origin.
- Behavior change: `toggleSidebar()`/`showSidebar()`/`hideSidebar()` now also hide/show the sidebar on desktop viewports (previously mobile-only). If you call `hideSidebar()` on route changes to close the mobile drawer, guard it with a viewport check to keep the desktop sidebar open.
- The mobile drawer is now full-height and overlays the app bar while open.
