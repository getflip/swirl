import { generateStoryElement } from "../../utils";
import Docs from "./swirl-description-list-item.mdx";

export default {
  component: "flip-description-list-item",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipDescriptionListItem",
};

const Template = (args) => {
  const element = generateStoryElement("flip-description-list-item", args);

  element.innerHTML = `A short description`;

  return element;
};

export const FlipDescriptionListItem = Template.bind({});

FlipDescriptionListItem.args = {
  term: "Term or label",
};
