---
"@getflip/swirl-components": patch
---

Fix `swirl-form-control`'s `inline` prop rendering an overlapping label when the input has a default placeholder (e.g. `swirl-time-input`, `swirl-date-input`). The label is now shown while the input is empty and hidden once it has a value, instead of being keyed off whether the input happens to declare a `placeholder`.
