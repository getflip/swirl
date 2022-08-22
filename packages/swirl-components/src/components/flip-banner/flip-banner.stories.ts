import { generateStoryElement } from "../../utils";
import Docs from "./flip-banner.mdx";

export default {
  component: "flip-banner",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipBanner",
};

const Template = (args) => {
  const element = generateStoryElement("flip-banner", args);

  return element;
};

export const FlipBanner = Template.bind({});

FlipBanner.args = {};
