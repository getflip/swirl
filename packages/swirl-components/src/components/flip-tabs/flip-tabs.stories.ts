import { generateStoryElement } from "../../utils";
import Docs from "./flip-tabs.mdx";

export default {
  component: "flip-tabs",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipTabs",
};

const Template = (args) => {
  const element = generateStoryElement("flip-tabs", args);

  element.innerHTML = `
    <flip-tab label="Tab #1" tab-id="tab-1">Tab 1</flip-tab>
    <flip-tab label="Tab #2" tab-id="tab-2">Tab 2</flip-tab>
    <flip-tab label="Tab Number 3" tab-id="tab-3">Tab 3</flip-tab>
  `;

  return element;
};

export const FlipTabs = Template.bind({});

FlipTabs.args = {
  initialTab: "tab-2",
  label: "Tabs",
};
