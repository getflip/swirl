import { generateStoryElement } from "../../utils";
// @ts-ignore
import Docs from "./swirl-badge.mdx";

export default {
  argTypes: {
    icon: {
      table: {
        type: {
          detail: "e.g. <swirl-icon-close></swirl-icon-close>",
          summary: "swirl-icon-*",
        },
      },
    },
  },
  component: "swirl-badge",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlBadge",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-badge", args);

  return element;
};

export const SwirlBadge = Template.bind({});

SwirlBadge.args = {
  "aria-label": "3 new messages",
  label: "3",
};
