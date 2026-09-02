import type { SwirlAvatarSize } from "./swirl-avatar";

/**
 * The rendered width/height of an avatar at each size.
 *
 * swirl-avatar publishes this on its own host as the read-only custom
 * property `--swirl-avatar-size`, so that outer components styling it through
 * `::slotted()` (e.g. swirl-avatar-group's "centered" layout) can size
 * against it rather than keeping their own copy of these numbers. It's set as
 * an inline style, so a stylesheet cannot override it.
 */
export const swirlAvatarSizeMappings: { [key in SwirlAvatarSize]: number } = {
  "3xs": 20,
  "2xs": 24,
  xs: 28,
  s: 32,
  m: 40,
  l: 48,
  xl: 64,
  "2xl": 144,
};

/**
 * The `border-radius` an avatar uses for `variant="square"` at each size.
 *
 * Published as `--swirl-avatar-square-radius` on the host under the same
 * rules as swirlAvatarSizeMappings above; swirl-avatar.css consumes it for
 * its own corners, so these values live here only.
 */
export const swirlAvatarSquareRadiusMappings: {
  [key in SwirlAvatarSize]: number;
} = {
  "3xs": 4,
  "2xs": 4,
  xs: 8,
  s: 8,
  m: 10,
  l: 12,
  xl: 16,
  "2xl": 20,
};
