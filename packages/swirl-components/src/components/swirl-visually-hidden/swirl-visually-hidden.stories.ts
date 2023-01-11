import { generateStoryElement } from "../../utils";
import Docs from "./swirl-visually-hidden.mdx";

export default {
  component: "swirl-visually-hidden",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlVisuallyHidden",
};

const Template = (args) => {
  const element = generateStoryElement(
    "swirl-visually-hidden",
    args,
    "Content"
  );

  return element;
};

export const SwirlVisuallyHidden = Template.bind({});

SwirlVisuallyHidden.args = {};
