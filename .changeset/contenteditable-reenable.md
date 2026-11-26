---
"@getflip/swirl-components": patch
---

swirl-form-control no longer leaves a contenteditable control uneditable after
it is re-enabled, when the app also sets `contenteditable` on it.
