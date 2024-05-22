import { generateStoryElement } from "../../utils";
import Docs from "./swirl-tabs.mdx";

export default {
  component: "swirl-tabs",
  tags: ["autodocs"],
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
    <swirl-tab icon="<swirl-icon-emoji-satisfied size=&quot;20&quot;></swirl-icon-emoji-satisfied>" label="Tab #1" tab-id="tab-1"><swirl-text>Tab 1</swirl-text></swirl-tab>
    <swirl-tab icon="<swirl-icon-emoji-mood size=&quot;20&quot;></swirl-icon-emoji-mood>" label="Tab #2" tab-id="tab-2"><swirl-text>Tab 2</swirl-text></swirl-tab>
    <swirl-tab label="Tab Number 3" tab-id="tab-3"><swirl-text>Tab 3</swirl-text></swirl-tab>
  `;

  return element;
};

export const SwirlTabs = Template.bind({});

SwirlTabs.args = {
  initialTab: "tab-2",
  label: "Tabs",
};
