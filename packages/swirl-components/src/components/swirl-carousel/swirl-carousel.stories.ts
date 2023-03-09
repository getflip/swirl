import { generateStoryElement } from "../../utils";
import Docs from "./swirl-carousel.mdx";

export default {
  component: "swirl-carousel",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlCarousel",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-carousel", args);

  element.innerHTML = `
        <img src="/sample-3.jpg">
        <img src="/sample-2.jpg">
        <img src="/sample-3.jpg">
  `;

  return element;
};

export const SwirlCarousel = Template.bind({});

SwirlCarousel.args = {};
