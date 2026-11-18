---
"@getflip/swirl-components": minor
"@getflip/swirl-components-angular": minor
"@getflip/swirl-components-react": minor
---

Fix form controls remaining interactive when `swirl-form-control` is readonly.

- swirl-select: add `readonly` prop. A readonly select does not open its
  options and its multi-select tags can't be removed.
- swirl-autocomplete: add `readonly` prop. A readonly autocomplete doesn't
  accept input or show suggestions, and its multi-select tags can't be removed.
- swirl-file-uploader: add `readonly` prop. A readonly file uploader doesn't
  open the file picker or accept dropped files.
- swirl-form-control: readonly and disabled now also turn off editing of
  slotted contenteditable controls.
