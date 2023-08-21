import { generateStoryElement } from "../../utils";
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

export const SwirlTabBar = Template.bind({});

SwirlTabBar.args = {
  tabs: [
    {
      active: false,
      id: "tab1",
      label: "Tab #1",
    },
    {
      active: true,
      icon: '<swirl-icon glyph="emoji-mood" size="20"></swirl-icon>',
      id: "tab2",
      label: "Tab #2",
    },
    {
      active: false,
      icon: '<swirl-icon glyph="emoji-satisfied" size="20"></swirl-icon>',
      id: "tab3",
      label: "Tab #3",
    },
  ],
};
