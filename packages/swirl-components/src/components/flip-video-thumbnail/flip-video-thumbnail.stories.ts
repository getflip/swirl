import { generateStoryElement } from "../../utils";
import Docs from "./flip-video-thumbnail.mdx";

export default {
  component: "flip-video-thumbnail",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipVideoThumbnail",
};

const Template = (args) => {
  const element = generateStoryElement("flip-video-thumbnail", args);

  return element;
};

export const FlipVideoThumbnail = Template.bind({});

FlipVideoThumbnail.args = {
  duration: "1:23",
  label: "Play video of a cute pug.",
  src: "https://picsum.photos/id/1062/680/380",
};
