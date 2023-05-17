import { generateStoryElement } from "../../utils";
import Docs from "./swirl-icon.mdx";
import IconsJSON from "../../../icons.json";

export default {
  argTypes: {
    glyph: {
      control: "select",
      options: Object.values(IconsJSON).map((icon) => icon.name),
    },
  },
  component: "swirl-icon",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlIcon",
};

const Template = (args) => {
  const element = generateStoryElement(`swirl-icon`, args);

  return element;
};

export const SwirlIcon = Template.bind({});

SwirlIcon.args = {
  glyph: "notifications",
  size: "24",
};
