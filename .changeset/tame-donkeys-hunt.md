---
"@getflip/swirl-components": patch
---

Fix `swirl-form-control`'s `inline` prop rendering an overlapping label when the input has a default placeholder (e.g. `swirl-time-input`, `swirl-date-input`). While empty, the input's compact single-row layout is preserved and the label fills it like a placeholder; once it has a value, the label now falls back to its normal small pinned position above the value (as it already does for non-inline inputs) instead of overlapping or disappearing.
