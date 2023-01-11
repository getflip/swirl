import { generateStoryElement } from "../../utils";
// @ts-ignore
import Docs from "./swirl-badge.mdx";

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
  component: "flip-badge",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipBadge",
};

const Template = (args) => {
  const element = generateStoryElement("flip-badge", args);

  return element;
};

export const FlipBadge = Template.bind({});

FlipBadge.args = {
  "aria-label": "3 new messages",
  label: "3",
};
