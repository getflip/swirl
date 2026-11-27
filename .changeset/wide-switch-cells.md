---
"@getflip/swirl-components": patch
---

A swirl-switch in the `content` slot of swirl-data-cell now takes the full
width of the cell, like swirl-checkbox and swirl-radio. With
`labelPosition="start"`, the toggle sits at the end of the cell. The cell is
interactive: it shows the pointer cursor and hover state, and a click anywhere
in the cell toggles the switch. swirl-switch now shows the pointer cursor over
its label too, not only over the toggle.
