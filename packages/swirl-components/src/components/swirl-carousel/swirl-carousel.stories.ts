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
    <swirl-carousel-slide>
      <img alt="Description" src="/sample-2.jpg">
    </swirl-carousel-slide>
    <swirl-carousel-slide>
      <img alt="Description" src="/sample-3.jpg">
    </swirl-carousel-slide>
    <swirl-carousel-slide>
      <img alt="Description" src="/sample-2.jpg">
    </swirl-carousel-slide>
    <swirl-carousel-slide>
      <img alt="Description" src="/sample-3.jpg">
    </swirl-carousel-slide>
  `;

  return element;
};

export const SwirlCarousel = Template.bind({});

SwirlCarousel.args = {
  label: "Carousel",
  loopAround: true,
};
