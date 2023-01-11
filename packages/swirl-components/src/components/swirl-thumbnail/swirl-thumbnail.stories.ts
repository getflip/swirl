import { generateStoryElement } from "../../utils";
import Docs from "./swirl-thumbnail.mdx";

export default {
  component: "swirl-thumbnail",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlThumbnail",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-thumbnail", args);

  return element;
};

export const SwirlThumbnail = Template.bind({});

SwirlThumbnail.args = {
  alt: "Brief description of the image.",
  src: "https://picsum.photos/id/433/400/400",
};
