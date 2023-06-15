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
      id: "tab2",
      label: "Tab #2",
    },
    {
      active: false,
      id: "tab3",
      label: "Tab #3",
    },
  ],
};
