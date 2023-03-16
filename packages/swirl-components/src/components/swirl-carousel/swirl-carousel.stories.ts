import { generateStoryElement } from "../../utils";
import Docs from "./swirl-carousel.mdx";

export default {
  component: "swirl-carousel",
  parameters: {
    docs: {
      page: Docs,
    },
    layout: "fullscreen",
  },
  title: "Components/SwirlCarousel",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-carousel", args);

  element.innerHTML = `
    <swirl-carousel-slide min-height="10rem">
      <swirl-card image-aspect-ratio="16/9" height="100%" interactive elevated>
        <img slot="image" alt="Dog in a blanket." src="/sample.jpg">
        <swirl-stack slot="content" spacing="12">
          <swirl-heading as="h2" level="4" text="This is the pretty pretty long heading of the card. Like really long." lines="2" truncate></swirl-heading>
        </swirl-stack>
      </swirl-card>
    </swirl-carousel-slide>
    <swirl-carousel-slide min-height="10rem">
      <swirl-card image-aspect-ratio="16/9" height="100%" interactive elevated>
        <swirl-stack slot="content" spacing="12">
        <swirl-heading as="h2" level="4" text="This is the pretty pretty long heading of the card. Like really long." lines="3" truncate></swirl-heading>
          <swirl-text size="sm" truncate lines="5">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
            clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
            rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
            dolor sit amet.
          </swirl-text>
        </swirl-stack>
      </swirl-card>
    </swirl-carousel-slide>
    <swirl-carousel-slide min-height="10rem">
      <swirl-card image-aspect-ratio="16/9" height="100%" interactive elevated>
        <img slot="image" alt="Dog in a blanket." src="/sample-3.jpg">
        <swirl-stack slot="content" spacing="12">
          <swirl-heading as="h2" level="4" text="This is the heading of the card." lines="2" truncate></swirl-heading>
        </swirl-stack>
      </swirl-card>
    </swirl-carousel-slide>
    <swirl-carousel-slide min-height="10rem">
      <swirl-card image-aspect-ratio="16/9" height="100%" interactive elevated>
        <img slot="image" alt="Dog in a blanket." src="/sample.jpg">
        <swirl-stack slot="content" spacing="12">
          <swirl-heading as="h2" level="4" text="This is the heading of the card." lines="2" truncate></swirl-heading>
        </swirl-stack>
      </swirl-card>
    </swirl-carousel-slide>
    <swirl-carousel-slide min-height="10rem">
      <swirl-card image-aspect-ratio="16/9" height="100%" interactive elevated>
        <img slot="image" alt="Dog in a blanket." src="/sample.jpg">
        <swirl-stack slot="content" spacing="12">
          <swirl-heading as="h2" level="4" text="This is the pretty pretty long heading of the card. Like really long." lines="2" truncate></swirl-heading>
        </swirl-stack>
      </swirl-card>
    </swirl-carousel-slide>
    <swirl-carousel-slide min-height="10rem">
      <swirl-card image-aspect-ratio="16/9" height="100%" interactive elevated>
        <swirl-stack slot="content" spacing="12">
        <swirl-heading as="h2" level="4" text="This is the pretty pretty long heading of the card. Like really long." lines="3" truncate></swirl-heading>
          <swirl-text size="sm" truncate lines="5">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor.
          </swirl-text>
        </swirl-stack>
      </swirl-card>
    </swirl-carousel-slide>
  `;

  element.addEventListener("activeSlidesChange", (event: CustomEvent) => {
    console.log(event.detail);
  });

  return element;
};

export const SwirlCarousel = Template.bind({});

SwirlCarousel.args = {
  label: "Carousel",
  loopAround: true,
};
