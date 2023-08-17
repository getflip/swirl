import { generateStoryElement } from "../../utils";
import Docs from "./swirl-emoji.mdx";
import EmojisJSON from "../../../emojis.json";

export default {
  argTypes: {
    name: {
      control: "select",
      options: Object.values(EmojisJSON).map((emoji) => emoji.name),
    },
  },
  component: "swirl-emoji",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlEmoji",
};

const Template = (args) => {
  const element = generateStoryElement(`swirl-emoji`, args);

  return element;
};

export const SwirlEmoji = Template.bind({});

SwirlEmoji.args = {
  name: "clap",
  size: "24",
};
