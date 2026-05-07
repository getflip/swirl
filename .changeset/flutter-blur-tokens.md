---
"@getflip/swirl-tokens": patch
---

Make blur tokens Flutter-compatible. Dimension-typed tokens (`blur-s`, `blur-m`, `blur-l`) are now emitted as numeric `double` values in the generated Dart files instead of CSS px strings, so they can be passed directly to `ImageFilter.blur` / `BackdropFilter`.
