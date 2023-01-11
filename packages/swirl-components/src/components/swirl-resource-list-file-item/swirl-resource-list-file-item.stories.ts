import { generateStoryElement } from "../../utils";
import Docs from "./swirl-resource-list-file-item.mdx";

export default {
  argTypes: {
    icon: {
      table: {
        type: {
          detail: "e.g. <flip-icon-file></flip-icon-file>",
          summary: "flip-icon-*",
        },
      },
    },
  },
  component: "flip-resource-list-file-item",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipResourceListFileItem",
};

const Template = (args) => {
  const container = document.createElement("div");
  const element = generateStoryElement("flip-resource-list-file-item", args);

  container.setAttribute("aria-label", "List");
  container.setAttribute("role", "grid");

  container.append("\n  ", element, "\n");

  return container;
};

export const FlipResourceListFileItem = Template.bind({});

FlipResourceListFileItem.args = {
  description: "12MB",
  label: "Design_final-final-12.png",
  removable: true,
};
