import { generateStoryElement } from "../../utils";
import Docs from "./swirl-sausage-message.mdx";

export default {
  component: "swirl-sausage-message",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlSausageMessage",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-sausage-message", args);

  return element;
};

export const SwirlSausageMessage = Template.bind({});

SwirlSausageMessage.args = {
  message: "This is a german white sausage message 🌭",
  author: "Marco Traspel",
  self: true,
  dateTime: new Date(),
};
