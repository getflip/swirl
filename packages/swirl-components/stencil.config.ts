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
    elementSelectors: [
      "flip-checkbox",
      "flip-resource-list-item",
      "flip-switch",
    ],
    event: "valueChange",
    targetAttr: "checked",
    type: "boolean",
  },
  {
    elementSelectors: ["flip-option-list"],
    event: "valueChange",
    targetAttr: "value",
    type: "select",
  },
  {
    elementSelectors: ["flip-radio-group", "flip-search", "flip-text-input"],
    event: "valueChange",
    targetAttr: "value",
    type: "text",
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
      copy: [
        {
          src: "../../../node_modules/pdfjs-dist/legacy/build/pdf.worker.min.js",
          dest: "src/assets/pdfjs/pdf.worker.min.js",
          warn: true,
        },
        {
          src: "assets/fonts/*",
          dest: "dist/components/assets/fonts",
          warn: true,
        },
        {
          src: "assets/images/*",
          dest: "dist/components/assets/images",
          warn: true,
        },
        {
          src: "assets/pdfjs/*",
          dest: "dist/components/assets/pdfjs",
          warn: true,
        },
      ],
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
  sourceMap: true,
};
