import { generateStoryElement } from "../../utils";
import Docs from "./swirl-tab.mdx";

export default {
  component: "swirl-tab",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlTab",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-tab", args);

  element.innerHTML = `Content`;

  return element;
};

export const SwirlTab = Template.bind({});

SwirlTab.args = {
  active: true,
  label: "Label",
  tabId: "tab-id",
};
