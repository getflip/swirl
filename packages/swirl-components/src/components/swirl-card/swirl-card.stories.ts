import { generateStoryElement } from "../../utils";
import Docs from "./swirl-card.mdx";

export default {
  argTypes: {
    borderRadius: {
      control: "text",
    },
  },
  component: "swirl-card",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlCard",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-card", args);

  element.innerHTML = `
    <img slot="image" alt="Dog in a blanket." src="/sample-2.jpg" >
    <swirl-stack slot="content" spacing="12">
      <swirl-stack>
        <swirl-stack orientation="horizontal">
          <swirl-text color="subdued" size="sm" weight="semibold">New •&nbsp;</swirl-text>
          <swirl-text color="subdued" size="sm">A sub heading.</swirl-text>
        </swirl-stack>
        <swirl-heading as="h2" level="4" text="This is the heading of the card."></swirl-heading>
      </swirl-stack>
      <swirl-text size="sm">
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
  `;

  return element;
};

export const SwirlCard = Template.bind({});

SwirlCard.args = {
  "image-aspect-ratio": "16/9",
};
