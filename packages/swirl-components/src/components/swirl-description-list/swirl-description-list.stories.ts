import { generateStoryElement } from "../../utils";
import Docs from "./swirl-description-list.mdx";

export default {
  component: "flip-description-list",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipDescriptionList",
};

const Template = (args) => {
  const element = generateStoryElement("flip-description-list", args);

  element.innerHTML = `
    <flip-description-list-item term="Term #1">
      A short description
    </flip-description-list-item>
    <flip-description-list-item term="A longer term that might wrap">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus eu
      consectetur vestibulum tempus, nulla lobortis ipsum. Odio a ipsum purus
      pellentesque maecenas.
    </flip-description-list-item>
    <flip-description-list-item term="Term #3">
      A short description
    </flip-description-list-item>
  `;

  return element;
};

export const FlipDescriptionList = Template.bind({});

FlipDescriptionList.args = {};
