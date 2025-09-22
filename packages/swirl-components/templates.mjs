export const componentTemplate = `import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "{{name}}.css",
  tag: "{{name}}",
})
export class {{pascalCase name}} {
  @Prop() label: string;

  render() {
    return <Host>Hello World {this.label}</Host>;
  }
}
`;

export const cssTemplate = `:host {
  display: block;

  & * {
    box-sizing: border-box;
  }
}
`;

export const docsTemplate = `import { Controls, Canvas, Meta, Story } from "@storybook/addon-docs";
import * as Stories from "./{{name}}.stories";

<Meta title="Components/{{pascalCase name}}" />

# {{pascalCase name}}

The {{pascalCase name}} component is used to …

- **[Figma Design Specs](#)**
- **[Source Code](https://github.com/flip-corp/swirl/tree/main/packages/swirl-components/src/components/{{name}})**

## Usage

<Canvas of={Stories.{{pascalCase name}}{{append '' '}'}} sourceState="shown"></Canvas>

<Controls of={Stories.{{pascalCase name}}{{append '' '}'}} />

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

export const emojiComponentTemplate = `// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlEmojiSize } from "../swirl-emoji.types";
import classnames from 'classnames';

@Component({
  shadow: true,
  styleUrl: "../swirl-emoji.css",
  tag: "swirl-emoji-{{emojiNameKebab}}",
})
export class SwirlEmoji{{emojiName}} {
  @Prop() label?: string = "";
  @Prop() size?: SwirlEmojiSize = 24;

  render() {
    const className = classnames('emoji', \`emoji--size-$\{this.size\}\`);

    return (
      <Fragment>
        {this.size === 16 && <img alt={this.label} class={className} height="16" src="emojis/{{emojiName}}16.png" width="16" />}
        {this.size === 20 && <img alt={this.label} class={className} height="20" src="emojis/{{emojiName}}20.png" width="20" />}
        {this.size === 24 && <img alt={this.label} class={className} height="24" src="emojis/{{emojiName}}24.png" width="24" />}
        {this.size === 32 && <img alt={this.label} class={className} height="32" src="emojis/{{emojiName}}32.png" width="32" />}
      </Fragment>
    );
  }
}
`;

export const iconComponentTemplate = `// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlIconSize } from "../swirl-icon.types";
import { SwirlIconColor } from "../swirl-icon";
import classnames from 'classnames';

@Component({
  shadow: true,
  styleUrl: "../swirl-icon.css",
  tag: "swirl-icon-{{iconNameKebab}}",
})
export class SwirlIcon{{iconName}} {
  @Prop() color?: SwirlIconColor;
  @Prop() size: SwirlIconSize = 24;

  render() {
    const viewBoxSize = this.size === 20 ? 24 : this.size;

    const styles = {
      color: Boolean(this.color)
        ? \`var(--s-icon-\${this.color})\`
        : undefined,
    };

    const className = classnames('swirl-icon', \`swirl-icon--size-$\{this.size\}\`);

    return (
      <svg
        aria-hidden="true"
        class={className}
        fill="none"
        height={this.size}
        part="icon"
        style={styles}
        viewBox={\`0 0 \${viewBoxSize} \${viewBoxSize}\`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.size === 16 && <Fragment>{{{iconSvg16}}}</Fragment>}
        {(this.size === 20 || this.size === 24) && <Fragment>{{{iconSvg24}}}</Fragment>}
        {this.size === 28 && <Fragment>{{{iconSvg28}}}</Fragment>}
      </svg>
    );
  }
}
`;

export const symbolComponentTemplate = `// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "../swirl-symbol.types";
import classnames from 'classnames';

@Component({
  shadow: true,
  styleUrl: "../swirl-symbol.css",
  tag: "swirl-symbol-{{symbolName}}",
})
export class SwirlSymbol{{symbolNamePascalCase}} {
  @Prop() size: SwirlSymbolSize = 24;

  render() {
    const className = classnames('swirl-symbol', \`swirl-symbol--size-$\{this.size\}\`);

    return (
      <svg
        class={className}
        fill="none"
        height={this.size}
        part="symbol"
        viewBox="0 0 24 24"
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Fragment>{{{symbolSvg}}}</Fragment>
      </svg>
    );
  }
}
`;

export const storiesTemplate = `import { generateStoryElement } from "../../utils";
import Docs from "./{{name}}.mdx";

export default {
  component: "{{name}}",
  tags: ["autodocs"],
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

export const unitTestTemplate = `import { newSpecPage } from "@stencil/core/testing";

import { {{pascalCase name}} } from "./{{name}}";

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
