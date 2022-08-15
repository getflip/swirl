import { generateStoryElement } from '../../utils';
// @ts-ignore
import Docs from './flip-button.mdx';

export default {
  component: "flip-button",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipButton",
};

const Template = (args) => {
  const element = generateStoryElement("flip-button", args);

  element.addEventListener("click", (event) => {
    console.log(event);
  });

  return element;
};

export const Default = Template.bind({});

Default.args = {
  label: "Label",
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
  label: "Label",
};

const TemplateWithLeftIcon = (args) => {
  const element = generateStoryElement("flip-button", args);

  element.innerHTML = "<flip-icon-close slot='left-icon'></flip-icon-close>";

  return element;
};

export const WithIcon = TemplateWithLeftIcon.bind({});

WithIcon.args = {
  label: "Label",
};
