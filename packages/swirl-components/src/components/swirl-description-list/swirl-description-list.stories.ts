import { generateStoryElement } from "../../utils";
import Docs from "./swirl-description-list.mdx";

export default {
  component: "swirl-description-list",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlDescriptionList",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-description-list", args);

  element.innerHTML = `
    <swirl-description-list-item term="Term #1">
      A short description
      </swirl-description-list-item>
      <swirl-description-list-item term="A longer term that might wrap">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus eu
      consectetur vestibulum tempus, nulla lobortis ipsum. Odio a ipsum purus
      pellentesque maecenas.
      <swirl-button label="A button" slot="tools" variant="outline"></swirl-button>
    </swirl-description-list-item>
    <swirl-description-list-item term="Term #3">
      A short description
    </swirl-description-list-item>
  `;

  return element;
};

export const SwirlDescriptionList = Template.bind({});

SwirlDescriptionList.args = {};
