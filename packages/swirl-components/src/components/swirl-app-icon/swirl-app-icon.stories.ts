import { generateStoryElement } from "../../utils";
import Docs from "./swirl-app-icon.mdx";

export default {
  component: "swirl-app-icon",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlAppIcon",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-app-icon", args);

  return element;
};

export const SwirlAppIcon = Template.bind({});

SwirlAppIcon.args = {
  src: "https://picsum.photos/id/433/144/144",
};
