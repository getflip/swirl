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

FlipBanner.args = {
  actionLabel: "Action",
  content:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
  dismissable: true,
  icon: "<flip-icon-info></flip-icon-info>",
  intent: "critical",
};
