import { generateStoryElement } from "../../utils";
import Docs from "./swirl-banner.mdx";

export default {
  component: "swirl-banner",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlBanner",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-banner", args);

  return element;
};

export const SwirlBanner = Template.bind({});

SwirlBanner.args = {
  actionLabel: "Action",
  content:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
  dismissable: true,
  intent: "critical",
};
