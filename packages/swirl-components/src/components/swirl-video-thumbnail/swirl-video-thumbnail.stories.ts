import { generateStoryElement } from "../../utils";
import Docs from "./swirl-video-thumbnail.mdx";

export default {
  component: "swirl-video-thumbnail",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlVideoThumbnail",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-video-thumbnail", args);

  return element;
};

export const SwirlVideoThumbnail = Template.bind({});

SwirlVideoThumbnail.args = {
  duration: "1:23",
  label: "Play video of a cute pug.",
  src: "https://picsum.photos/id/1062/680/380",
};
