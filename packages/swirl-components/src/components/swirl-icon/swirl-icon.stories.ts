import IconsJSON from "../../../icons.json";
import { generateStoryElement } from "../../utils";
import Docs from "./swirl-icon.mdx";

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

export const SwirlIconWithWrapper = Template.bind({});

SwirlIconWithWrapper.args = {
  glyph: "edit",
  size: "20",
  wrapperColor: "blueberry",
  wrapperSize: "xl",
};

export const SwirlIconWithWrapperAndExplicitColor = Template.bind({});

SwirlIconWithWrapperAndExplicitColor.args = {
  glyph: "edit",
  color: "critical",
  size: "20",
  wrapperColor: "blueberry",
  wrapperSize: "xl",
};
