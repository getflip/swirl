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
        template: `import { Component, h, Host } from '@stencil/core';

@Component({
  tag: "{{name}}",
  styleUrl: "{{name}}.css",
  shadow: true,
})
export class {{pascalCase name}} {
  render() {
    return <Host>Hello World</Host>;
  }
}`,
      },
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.css",
        template: `:host {
  display: block;
}`,
      },
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.spec.tsx",
        template: `import { newSpecPage } from '@stencil/core/testing';

import { {{pascalCase name}} } from './{{name}}';

describe("{{name}}", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [{{pascalCase name}}],
      html: \`<{{name}}></{{name}}>\`,
    });

    expect(page.root).toEqualHtml(\`
      <{{name}}>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </{{name}}>
    \`);
  });
});`,
      },
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.stories.ts",
        template: `import { storybookArgsToProps } from '../../utils';

export default {
  component: "{{name}}",
  title: "Components/{{pascalCase name}}",
};

const Template = (args) => {
  const props = storybookArgsToProps(args);

  return \`<{{name}} \$\{props\}></{{name}}>\`;
};

export const {{pascalCase name}} = Template.bind({});

{{pascalCase name}}.args = {};`,
      },
    ],
  });
}
