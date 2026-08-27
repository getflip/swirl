import { generateStoryElement } from "../../utils";
import { SwirlTabBarTab } from "./swirl-tab-bar";
import Docs from "./swirl-tab-bar.mdx";

export default {
  component: "swirl-tab-bar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlTabBar",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-tab-bar", args);

  return element;
};

const tabs: SwirlTabBarTab[] = [
  {
    active: false,
    id: "tab1",
    label: "A Tab",
    suffix: "2",
    tooltip: "With a tooltip",
  },
  {
    active: true,
    badge: {
      intent: "info",
      label: "Batches running",
    },
    icon: '<swirl-icon glyph="emoji-mood" size="20"></swirl-icon>',
    id: "tab2",
    label: "Another Tab",
    suffix: "12",
  },
  {
    active: false,
    icon: '<swirl-icon glyph="emoji-satisfied" size="20"></swirl-icon>',
    id: "tab3",
    label: "Yet Another Tab",
  },
];

export const SwirlTabBar = Template.bind({});

SwirlTabBar.args = {
  tabs,
};
