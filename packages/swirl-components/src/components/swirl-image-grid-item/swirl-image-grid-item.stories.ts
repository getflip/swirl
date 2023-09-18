import { generateStoryElement } from "../../utils";
import Docs from "./swirl-image-grid-item.mdx";

export default {
  component: "swirl-image-grid-item",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlImageGridItem",
};

const Template = (args) => {
  const container = document.createElement("swirl-image-grid");
  const element = generateStoryElement("swirl-image-grid-item", args);

  container.append(element);

  return container;
};

export const SwirlImageGridItem = Template.bind({});

SwirlImageGridItem.args = {
  alt: "Dog in a blanket",
  icon: "<swirl-icon-play-arrow></swirl-icon-play-arrow>",
  src: "/sample.jpg",
};
