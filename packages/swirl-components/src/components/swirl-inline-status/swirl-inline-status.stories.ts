import { generateStoryElement } from "../../utils";
import Docs from "./swirl-inline-status.mdx";

export default {
  component: "swirl-inline-status",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlInlineStatus",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-inline-status", args);

  return element;
};

export const SwirlInlineStatus = Template.bind({});

SwirlInlineStatus.args = {
  icon: "<swirl-icon-info></swirl-icon-info>",
  intent: "info",
  message: "This is status message.",
};
