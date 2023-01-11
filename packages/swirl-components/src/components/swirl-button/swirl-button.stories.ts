import { generateStoryElement } from "../../utils";
// @ts-ignore
import Docs from "./swirl-button.mdx";

export default {
  argTypes: {
    icon: {
      table: {
        type: {
          detail: "e.g. <flip-icon-close></flip-icon-close>",
          summary: "flip-icon-*",
        },
      },
    },
  },
  component: "flip-button",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipButton",
};

const Template = (args) => {
  const element = generateStoryElement("flip-button", args);

  return element;
};

export const FlipButton = Template.bind({});

FlipButton.args = {
  icon: "<flip-icon-add></flip-icon-add>",
  label: "Label",
};
