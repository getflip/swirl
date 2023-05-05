import IconsJSON from "../../../icons.json";
import { generateStoryElement } from "../../utils";
import Docs from "./swirl-icon.mdx";

export default {
  component: "swirl-icon-close",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: "<swirl-icon-emoji-satisfied></swirl-icon-emoji-satisfied>",
      },
    },
  },
  title: "Components/SwirlIcon",
};

const Template = (args) => {
  const container = document.createElement("ul");

  container.style.columns = "2";
  container.style.margin = "0";
  container.style.marginBottom = "-0.5rem";
  container.style.padding = "0";

  const elements = Object.values(IconsJSON).map((icon: any) => {
    const row = document.createElement("li");
    const iconElement = generateStoryElement(`swirl-icon-${icon.name}`, args);
    const label = document.createElement("span");

    label.innerHTML = `swirl-icon-${icon.name}`;

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

export const SwirlIcon = Template.bind({});

SwirlIcon.args = {
  size: "24",
};
