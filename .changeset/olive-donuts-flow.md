---
"@getflip/swirl-components": patch
"@getflip/swirl-components-angular": patch
"@getflip/swirl-components-react": patch
---

Fix `inline` prop on `swirl-form-control` rendering an overlapping label and placeholder for inputs with a default placeholder (`swirl-time-input`, `swirl-date-input`). The label now always substitutes for the placeholder while inline mode is empty, and the input's own native placeholder never renders.
