import { generateStoryElement } from "../../utils";
import Docs from "./swirl-link.mdx";

export default {
  component: "swirl-link",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlLink",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-link", args);

  return element;
};

export const SwirlLink = Template.bind({});

SwirlLink.args = {
  href: "/?path=/docs/components-swirllink--swirl-link",
  label: "Label",
};
