---
"@getflip/swirl-components": minor
---

Added a `swirlAriaDisabled` input and a `swirlAriaDescription` input to `swirl-action-list-item`.
`swirlAriaDisabled` renders the item with `aria-disabled` instead of the native `disabled`
attribute, so it stays focusable and hoverable — letting a wrapping `swirl-tooltip` explain why the
item is disabled. Clicking (mouse or keyboard) a soft-disabled item is blocked inside the
component. The existing `disabled` prop is unchanged.
