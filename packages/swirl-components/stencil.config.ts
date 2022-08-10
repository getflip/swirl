import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';

import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';

export const config: Config = {
  globalStyle: "src/styles.css",
  namespace: "swirl-components",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "dist-custom-elements",
    },
    {
      file: "components.json",
      type: "docs-json",
    },
  ],
  plugins: [
    postcss({
      plugins: [autoprefixer(), postcssNested()],
    }),
  ],
};
