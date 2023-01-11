import { generateStoryElement } from "../../utils";
import Docs from "./swirl-tabs.mdx";

export default {
  component: "swirl-tabs",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlTabs",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-tabs", args);

  element.innerHTML = `
    <swirl-tab label="Tab #1" tab-id="tab-1">Tab 1</swirl-tab>
    <swirl-tab label="Tab #2" tab-id="tab-2">Tab 2</swirl-tab>
    <swirl-tab label="Tab Number 3" tab-id="tab-3">Tab 3</swirl-tab>
  `;

  return element;
};

export const SwirlTabs = Template.bind({});

SwirlTabs.args = {
  initialTab: "tab-2",
  label: "Tabs",
};
