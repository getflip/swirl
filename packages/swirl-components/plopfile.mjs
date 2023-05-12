import {
  componentTemplate,
  cssTemplate,
  docsTemplate,
  iconComponentTemplate,
  storiesTemplate,
  unitTestTemplate,
} from "./templates.mjs";

import Handlebars from "handlebars";
import handlebarsHelpers from "handlebars-helpers";

import { execSync } from "child_process";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { optimize } from "svgo";

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setHelper("camelCase", (txt) =>
    txt.replace(/-./g, (x) => x[1].toUpperCase())
  );

  plop.setHelper("append", handlebarsHelpers().append);

  plop.setGenerator("component", {
    description: "Generate a new web component",
    prompts: [
      {
        message: 'Component name. Must be kebab-case and start with "swirl-".',
        name: "name",
        validate: (input) => {
          if (!String(input).startsWith("swirl-")) {
            return 'Must start with "swirl-".';
          }

          if (
            !String(input).match(
              /^([a-z](?!\d)|\d(?![a-z]))+(-?([a-z](?!\d)|\d(?![a-z])))*$|^$/
            )
          ) {
            return "Must be kebab-case.";
          }

          return true;
        },
        type: "input",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.tsx",
        template: componentTemplate,
      },
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.css",
        template: cssTemplate,
      },
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.spec.tsx",
        template: unitTestTemplate,
      },
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.stories.ts",
        template: storiesTemplate,
      },
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.mdx",
        template: docsTemplate,
      },
    ],
  });

  plop.setGenerator("icons", {
    description: "Generate icon components from SVG",
    prompts: [],
    actions: [
      function (answers, config, plop) {
        const iconsPath = "../../node_modules/@getflip/swirl-icons/icons";

        const svgFileNames = readdirSync(iconsPath);

        const optimizedIcons = {};

        for (const svgFileName of svgFileNames) {
          const path = `${iconsPath}/${svgFileName}`;
          const svg = readFileSync(path);
          const optimized = optimize(svg, {
            path,
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          });

          optimizedIcons[svgFileName] = optimized.data
            .replace(/^<svg [^>]*>/, "")
            .replace(/<\/svg>/, "");
        }

        const iconNames = Array.from(
          new Set(
            svgFileNames.map((svgFileName) =>
              svgFileName
                .replace("16", "")
                .replace("24", "")
                .replace("28", "")
                .replace(".svg", "")
            )
          )
        );

        writeFileSync(
          `./icons.json`,
          JSON.stringify(
            iconNames.reduce(
              (content, iconName) => ({
                ...content,
                [iconName]: {
                  id: iconName,
                  name: iconName.replace(
                    /[A-Z]+(?![a-z])|[A-Z]/g,
                    ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
                  ),
                },
              }),
              {}
            )
          )
        );

        for (const iconName of iconNames) {
          const componentTemplate = Handlebars.compile(iconComponentTemplate);

          const iconNameKebab = iconName.replace(
            /[A-Z]+(?![a-z])|[A-Z]/g,
            ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
          );

          const templateData = {
            iconName,
            iconNameKebab,
            iconSvg16: optimizedIcons[`${iconName}16.svg`],
            iconSvg24: optimizedIcons[`${iconName}24.svg`],
            iconSvg28: optimizedIcons[`${iconName}28.svg`],
          };

          const component = componentTemplate(templateData);

          writeFileSync(
            `./src/components/swirl-icon/icons/swirl-icon-${iconNameKebab}.tsx`,
            component
          );
        }

        execSync(
          "PATH=$(npm bin):$PATH prettier ./src/components/swirl-icon/icons/* --write"
        );

        return `${iconNames.length} icons generated.`;
      },
    ],
  });
}
