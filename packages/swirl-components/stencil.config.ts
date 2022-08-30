import autoprefixer from "autoprefixer";
import postcssCustomMedia from "postcss-custom-media";
import postcssNested from "postcss-nested";

import {
  angularOutputTarget,
  ValueAccessorConfig,
} from "@stencil/angular-output-target";
import { Config } from "@stencil/core";
import { postcss } from "@stencil/postcss";
import { reactOutputTarget } from "@stencil/react-output-target";

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ["flip-checkbox"],
    event: "valueChange",
    targetAttr: "checked",
    type: "boolean",
  },
];

export const config: Config = {
  globalStyle: "src/styles/global.css",
  namespace: "swirl-components",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      autoDefineCustomElements: true,
      generateTypeDeclarations: true,
      type: "dist-custom-elements",
    },
    {
      file: "components.json",
      type: "docs-json",
    },
    {
      type: "docs-vscode",
      file: "vscode-data.json",
    },
    reactOutputTarget({
      componentCorePackage: "@getflip/swirl-components",
      proxiesFile: "../swirl-components-react/lib/stencil-generated/index.ts",
      includeDefineCustomElements: true,
    }),
    angularOutputTarget({
      componentCorePackage: "@getflip/swirl-components",
      directivesProxyFile:
        "../swirl-components-angular/projects/component-library/src/lib/stencil-generated/components.ts",
      directivesArrayFile:
        "../swirl-components-angular/projects/component-library/src/lib/stencil-generated/index.ts",
      includeImportCustomElements: false,
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
  ],
  plugins: [
    postcss({
      plugins: [autoprefixer(), postcssNested(), postcssCustomMedia()],
    }),
  ],
};
