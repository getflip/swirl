---
"@getflip/swirl-components": minor
"@getflip/swirl-components-angular": minor
"@getflip/swirl-components-react": minor
---

swirl-tooltip: the `focus` trigger now only opens the tooltip on keyboard focus
(`:focus-visible`). Focus caused by a mouse click, or moved by a script after a
mouse interaction (e.g. a popover returning focus to its trigger on close), no
longer opens it. Use `show()` to open the tooltip programmatically.
