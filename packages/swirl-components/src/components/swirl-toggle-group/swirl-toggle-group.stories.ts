import { generateStoryElement } from "../../utils";
import Docs from "./swirl-toggle-group.mdx";

export default {
  component: "swirl-toggle-group",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlToggleGroup",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-toggle-group", args);

  element.innerHTML = `
    <swirl-toggle-button identifier="1" label="Toggle One" icon="mention"></swirl-toggle-button>
    <swirl-toggle-button identifier="2" label="Toggle Two"></swirl-toggle-button>
    <swirl-toggle-button identifier="3" label="Toggle Three" icon="mention"></swirl-toggle-button>
  `;

  return element;
};

export const SwirlToggleGroup = Template.bind({});

SwirlToggleGroup.args = {
  selectedToggleId: "2",
};
