import IconsJSON from "../../../icons.json";
import { generateStoryElement } from "../../utils";
// @ts-ignore
import Docs from "./flip-icon.mdx";

export default {
  component: "flip-icon-close",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipIcon",
};

const Template = (args) => {
  const element = generateStoryElement("flip-icon-emoji-satisfied", args);

  return element;
};

export const Default = Template.bind({});

Default.args = {
  size: "24",
};

const OverviewTemplate = (args) => {
  const container = document.createElement("ul");

  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "0.5rem";
  container.style.margin = "0";
  container.style.padding = "0";

  const elements = Object.values(IconsJSON).map((icon: any) => {
    const row = document.createElement("li");
    const iconElement = generateStoryElement(`flip-icon-${icon.name}`, args);
    const label = document.createElement("span");

    label.innerHTML = `flip-icon-${icon.name}`;

    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = "0.5rem";

    row.append(iconElement);
    row.append(label);

    return row;
  });

  container.append(...elements);

  return container;
};

export const Icons = OverviewTemplate.bind({});

Icons.args = {
  size: "16",
};
