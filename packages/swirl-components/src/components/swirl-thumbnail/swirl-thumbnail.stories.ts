import { generateStoryElement } from "../../utils";
import Docs from "./swirl-thumbnail.mdx";

export default {
  component: "flip-thumbnail",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipThumbnail",
};

const Template = (args) => {
  const element = generateStoryElement("flip-thumbnail", args);

  return element;
};

export const FlipThumbnail = Template.bind({});

FlipThumbnail.args = {
  alt: "Brief description of the image.",
  src: "https://picsum.photos/id/433/400/400",
};
