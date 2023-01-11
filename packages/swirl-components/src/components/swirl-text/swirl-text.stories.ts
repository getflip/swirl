import { generateStoryElement } from "../../utils";
import Docs from "./swirl-text.mdx";

export default {
  component: "flip-text",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipText",
};

const Template = (args) => {
  const element = generateStoryElement("flip-text", args);

  element.innerHTML = `
    Est, odio dis scelerisque risus sagittis lorem rhoncus. Vivamus tristique
    habitant vitae cursus nisl. Sed adipiscing proin suspendisse aliquam
    maecenas faucibus mauris purus. Tortor ut habitant erat adipiscing nulla
    pretium, cursus tortor. Amet viverra et platea lacus, nec molestie
    tincidunt.
  `;

  return element;
};

export const FlipText = Template.bind({});

FlipText.args = {};
