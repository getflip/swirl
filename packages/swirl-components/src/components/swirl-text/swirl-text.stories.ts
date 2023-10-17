import { generateStoryElement } from "../../utils";
import Docs from "./swirl-text.mdx";

export default {
  argTypes: {
    balance: {
      description:
        "Balances the text across lines to prevent visually undesirable results like typographic widows.",
    },
  },
  component: "swirl-text",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlText",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-text", args);

  element.innerHTML = `Est, odio dis scelerisque risus sagittis lorem rhoncus. Vivamus tristique
    habitant vitae cursus nisl. Sed adipiscing proin suspendisse aliquam
    maecenas faucibus mauris purus. Tortor ut habitant erat adipiscing nulla
    pretium, cursus tortor. Amet viverra et platea lacus, nec molestie
    tincidunt.`;

  return element;
};

export const SwirlText = Template.bind({});

SwirlText.args = {};
