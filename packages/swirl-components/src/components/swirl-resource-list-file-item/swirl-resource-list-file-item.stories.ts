import { generateStoryElement } from "../../utils";
import Docs from "./swirl-resource-list-file-item.mdx";

export default {
  argTypes: {
    icon: {
      table: {
        type: {
          detail: "e.g. <swirl-icon-file></swirl-icon-file>",
          summary: "swirl-icon-*",
        },
      },
    },
  },
  component: "swirl-resource-list-file-item",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlResourceListFileItem",
};

const Template = (args) => {
  const container = document.createElement("div");
  const element = generateStoryElement("swirl-resource-list-file-item", args);

  container.setAttribute("aria-label", "List");
  container.setAttribute("role", "grid");

  container.append("\n  ", element, "\n");

  return container;
};

export const SwirlResourceListFileItem = Template.bind({});

SwirlResourceListFileItem.args = {
  description: "12MB",
  label: "Design_final-final-12.png",
  removable: true,
};
