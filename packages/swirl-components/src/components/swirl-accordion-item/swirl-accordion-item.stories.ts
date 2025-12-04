import { generateStoryElement } from "../../utils";
import Docs from "./swirl-accordion-item.mdx";

export default {
  component: "swirl-accordion-item",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlAccordionItem",
};

const Template = (args) => {
  const container = document.createElement("swirl-accordion");
  const element = generateStoryElement("swirl-accordion-item", args);

  element.innerHTML = `
    <swirl-avatar slot="media" icon="<swirl-icon-groups></swirl-icon-groups>"></swirl-avatar>
    <swirl-text slot="trailing" color="subdued">Trailing slot</swirl-text>
    <swirl-stack spacing="16">
      <swirl-text size="sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
        euismod libero, nec sollicitudin diam ultricies ut. Donec eget
        consectetur libero. Donec et mi non mauris fermentum dictum. Sed
        scelerisque, sapien vitae fringilla aliquam, quam sapien aliquet.
      </swirl-text>
      <swirl-button label="A button" variant="flat"></swirl-button>
    </swirl-stack>
  `;

  container.append("\n  ", element, "\n");

  return container;
};

export const SwirlAccordionItem = Template.bind({});

SwirlAccordionItem.args = {
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  heading: "Accordion item",
};
