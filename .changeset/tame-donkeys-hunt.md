---
"@getflip/swirl-components": minor
---

Fix `swirl-form-control`'s `inline` prop rendering an overlapping or disappearing label. `inline` now renders the label above the border, the same as `labelPosition="outside"`, instead of maintaining its own divergent (and broken) label styles. This fixes the broken text alignment on `swirl-time-input` (and any other input with a default placeholder, e.g. `swirl-date-input`) when used inline.

This changes the appearance of every existing `inline` usage: the label now always renders above the border in its own row, rather than floating inside/over the input.
