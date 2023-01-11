import { generateStoryElement } from "../../utils";
import Docs from "./swirl-link.mdx";

export default {
  component: "flip-link",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipLink",
};

const Template = (args) => {
  const element = generateStoryElement("flip-link", args);

  return element;
};

export const FlipLink = Template.bind({});

FlipLink.args = {
  href: "/?path=/docs/components-fliplink--flip-link",
  label: "Label",
};
