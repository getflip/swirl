import { generateStoryElement } from "../../utils";
import Docs from "./flip-form-control.mdx";

export default {
  component: "flip-form-control",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipFormControl",
};

const Template = (args) => {
  const container = document.createElement("div");

  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "2rem";

  const textInput = generateStoryElement("flip-form-control", args);

  textInput.innerHTML = `
    <flip-text-input clearable="true" type="text"></flip-text-input>
  `;

  const numberInput = generateStoryElement("flip-form-control", {
    ...args,
    label: "Number Control",
  });

  numberInput.innerHTML = `
    <flip-text-input suffix-label="€" type="number"></flip-text-input>
  `;

  const multilineInput = generateStoryElement("flip-form-control", {
    ...args,
    label: "Multiline Control",
  });

  multilineInput.innerHTML = `
    <flip-text-input max-length="200" show-character-counter="true" rows="5" type="text"></flip-text-input>
  `;

  container.append(
    "\n  ",
    textInput,
    "\n  ",
    numberInput,
    "\n  ",
    multilineInput,
    "\n"
  );

  return container;
};

export const FlipFormControl = Template.bind({});

FlipFormControl.args = {
  description: "Optional description of the control.",
  label: "Form Control Label",
};
