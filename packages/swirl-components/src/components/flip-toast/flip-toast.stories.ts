import { generateStoryElement } from "../../utils";
import Docs from "./flip-toast.mdx";

export default {
  component: "flip-toast",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipToast",
};

const Template = (args) => {
  const element = generateStoryElement("flip-toast", args);

  return element;
};

export const FlipToast = Template.bind({});

FlipToast.args = {
  content: `This is toast text with multiple lines. Try to keep the info as short as possible.`,
  icon: `<flip-icon-mail></flip-icon-mail>`,
};
