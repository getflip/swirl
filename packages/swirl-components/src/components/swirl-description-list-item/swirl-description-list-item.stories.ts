import { generateStoryElement } from "../../utils";
import Docs from "./swirl-description-list-item.mdx";

export default {
  component: "swirl-description-list-item",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlDescriptionListItem",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-description-list-item", args);

  element.innerHTML = `A short description`;

  return element;
};

export const SwirlDescriptionListItem = Template.bind({});

SwirlDescriptionListItem.args = {
  term: "Term or label",
};
