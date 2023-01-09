import { generateStoryElement } from "../../utils";
import Docs from "./flip-tab.mdx";

export default {
  component: "flip-tab",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipTab",
};

const Template = (args) => {
  const element = generateStoryElement("flip-tab", args);

  element.innerHTML = `<flip-text>Content</flip-text>`;

  return element;
};

export const FlipTab = Template.bind({});

FlipTab.args = {
  active: true,
  label: "Label",
  tabId: "tab-id",
};
