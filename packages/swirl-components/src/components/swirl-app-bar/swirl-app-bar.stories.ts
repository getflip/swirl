import { generateStoryElement } from "../../utils";
import Docs from "./swirl-app-bar.mdx";

export default {
  component: "swirl-app-bar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlAppBar",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-app-bar", args);

  element.innerHTML = `
    <swirl-heading as="h1" level="3" slot="heading" text="Heading" truncate></swirl-heading>
    <swirl-stack justify="center" orientation="horizontal" spacing="8" slot="center-controls">
      <swirl-button label="All posts" variant="flat"></swirl-button>
      <swirl-button label="Groups"></swirl-button>
      <swirl-button label="Saved"></swirl-button>
      <swirl-button label="Scheduled"></swirl-button>
    </swirl-stack>
    <div slot="right-controls">
      <swirl-button hide-label="true" icon="<swirl-icon-search></swirl-icon-search>" label="Search"></swirl-button>
    </div>
  `;

  return element;
};

export const SwirlAppBar = Template.bind({});

SwirlAppBar.args = {
  showCloseButton: true,
  showStepperControls: true,
};
