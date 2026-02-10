import { generateStoryElement } from "../../utils";
import Docs from "./swirl-inline-notification.mdx";

export default {
  component: "swirl-inline-notification",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlInlineNotification",
  argTypes: {
    borderRadius: {
      control: "select",
      options: ["xs", "sm"],
    },
  },
};

const Template = (args) => {
  const element = generateStoryElement("swirl-inline-notification", args);

  element.innerHTML = `
    Lorem ipsum dolor sit amet. <swirl-link href="#" label="With a link."></swirl-link>
  `;

  return element;
};

export const SwirlInlineNotification = Template.bind({});

SwirlInlineNotification.args = {
  heading: "Notification title",
};
