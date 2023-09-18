import { generateStoryElement } from "../../utils";
import Docs from "./swirl-carousel-slide.mdx";

export default {
  component: "swirl-carousel-slide",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlCarouselSlide",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-carousel-slide", args);

  element.innerHTML = `
    <img alt="Description" src="/sample-3.jpg">
  `;

  return element;
};

export const SwirlCarouselSlide = Template.bind({});

SwirlCarouselSlide.args = {
  label: "Label",
};
