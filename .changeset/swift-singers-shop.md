---
"@getflip/swirl-components": patch
"@getflip/swirl-components-angular": patch
"@getflip/swirl-components-react": patch
---

Fix SwirlFileViewer video rendering: videos now fill the available stage
and letterbox the picture, so extremely wide/short videos are no longer covered
by the native controls bar, and tall videos no longer overflow their container.
