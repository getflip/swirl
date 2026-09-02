---
"@getflip/swirl-components": patch
---

Fix `swirl-form-control`'s `inline` prop rendering an overlapping floating label instead of positioning the label outside the border. `inline` now renders the same layout as `labelPosition="outside"`, which fixes the broken text alignment on `swirl-time-input` (and any other input with a default placeholder, e.g. `swirl-date-input`) when used inline.
