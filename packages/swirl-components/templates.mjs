export const componentTemplate = `import { Component, h, Host } from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: "{{name}}.css",
  tag: "{{name}}",
})
export class {{pascalCase name}} {
  render() {
    return <Host>Hello World</Host>;
  }
}
`;

export const cssTemplate = `:host {
  display: block;
}
`;

export const docsTemplate = `import { ArgsTable, Canvas, Meta, Story } from "@storybook/addon-docs";

<Meta title="Components/{{pascalCase name}}" />

# {{pascalCase name}}

The {{pascalCase name}} component is used to …

## Usage

<Canvas withSource="open">
  <Story id="components-{{lowerCase (pascalCase name)}}--{{name}}" />
</Canvas>

<ArgsTable />

## Theming

| Variable                          | Usage                       |
| --------------------------------- | --------------------------- |
| \`--s-interactive-primary-default\` | The button background color |
| \`--s-text-on-action-primary\`      | The button text color       |

## Accessibility

### ARIA

The component follows the [WAI-ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

| ARIA            | Usage                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| \`role="button"\` |                                                                                                                   |
| \`aria-label\`    | If no accessible label is provided via the button's text, the \`aria-label\` or \`aria-labelledby\` attribute is set. |
| \`aria-disabled\` | If the button is disabled, the \`aria-disabled\` attribute is set to \`true\`.                                        |

### Keyboard

| Key              | Action                |
| ---------------- | --------------------- |
| <kbd>ENTER</kbd> | Activates the button. |
| <kbd>SPACE</kbd> | Activates the button. |
`;

export const storiesTemplate = `import { generateStoryElement } from '../../utils';
// @ts-ignore
import Docs from './{{name}}.mdx';

export default {
  component: "{{name}}",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/{{pascalCase name}}",
};

const Template = (args) => {
  const element = generateStoryElement("{{name}}", args);

  return element;
};

export const {{pascalCase name}} = Template.bind({});

{{pascalCase name}}.args = {
  label: "Label",
};
`;

export const unitTestTemplate = `import { newSpecPage } from '@stencil/core/testing';

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
          Hello World
        </mock:shadow-root>
      </{{name}}>
    \`);
  });
});
`;
