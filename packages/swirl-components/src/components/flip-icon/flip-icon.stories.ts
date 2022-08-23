import IconsJSON from "../../../icons.json";
import { generateStoryElement } from "../../utils";
import Docs from "./flip-icon.mdx";

export default {
  component: "flip-icon-close",
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: "<flip-icon-emoji-satisfied></flip-icon-emoji-satisfied>",
      },
    },
  },
  title: "Components/FlipIcon",
};

const Template = (args) => {
  const container = document.createElement("ul");

  container.style.columns = "2";
  container.style.margin = "0";
  container.style.marginBottom = "-0.5rem";
  container.style.padding = "0";

  const elements = Object.values(IconsJSON).map((icon: any) => {
    const row = document.createElement("li");
    const iconElement = generateStoryElement(`flip-icon-${icon.name}`, args);
    const label = document.createElement("span");

    label.innerHTML = `flip-icon-${icon.name}`;

    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = "0.5rem";
    row.style.marginBottom = "0.5rem";
    row.style.paddingRight = "0.5rem";

    row.append(iconElement);
    row.append(label);

    return row;
  });

  container.append(...elements);

  return container;
};

export const FlipIcon = Template.bind({});

FlipIcon.args = {
  size: "24",
};
