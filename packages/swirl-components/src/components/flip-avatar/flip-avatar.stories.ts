import { generateStoryElement } from "../../utils";
// @ts-ignore
import Docs from "./flip-avatar.mdx";

export default {
  argTypes: {
    badge: {
      description: 'Only visible with default size "m".',
    },
  },
  component: "flip-avatar",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipAvatar",
};

const Template = (args) => {
  const element = generateStoryElement("flip-avatar", args);

  element.addEventListener("click", () => {
    console.log("activated");
  });

  return element;
};

export const FlipAvatar = Template.bind({});

FlipAvatar.args = {
  label: "John Doe",
  src: "https://picsum.photos/id/433/144/144",
};
