---
"@getflip/swirl-components": minor
"@getflip/swirl-components-angular": minor
"@getflip/swirl-components-react": minor
---

Add `trigger` prop to swirl-popover-trigger (`click` | `hover` | `focus`, array or space-separated string) so popovers used as hover cards are keyboard accessible (WCAG 1.4.13).

Deprecates `triggerOnClick` and `triggerOnHover`; `triggerOnHover="true"` now also opens the popover on keyboard focus.
