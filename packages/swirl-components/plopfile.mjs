import {
  componentTemplate,
  cssTemplate,
  docsTemplate,
  storiesTemplate,
  unitTestTemplate,
} from "./templates.mjs";

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setHelper("camelCase", (txt) =>
    txt.replace(/-./g, (x) => x[1].toUpperCase())
  );

  plop.setGenerator("component", {
    description: "Generate a new web component",
    prompts: [
      {
        message: 'Component name. Must be kebab-case and start with "flip-".',
        name: "name",
        validate: (input) => {
          if (!String(input).startsWith("flip-")) {
            return 'Must start with "flip-".';
          }

          if (
            !String(input).match(
              /^([a-z](?![\d])|[\d](?![a-z]))+(-?([a-z](?![\d])|[\d](?![a-z])))*$|^$/
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
}
