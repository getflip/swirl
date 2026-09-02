---
"@getflip/swirl-components": minor
---

Fix `swirl-form-control`'s `inline` prop rendering an overlapping label. While the input is empty, the label now acts as a compact, centered inside placeholder (as intended); once the input has a value, the label moves above the border, the same position as `labelPosition="outside"`. This fixes the broken text alignment on `swirl-time-input` (and any other input with a default placeholder, e.g. `swirl-date-input`) when used inline.

This changes the appearance of every existing filled `inline` input: the label now renders above the border once there's a value, rather than floating inside/over it.
