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
  const container = document.createElement("flip-stack");

  container.spacing = "24";

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

  const dateInput = generateStoryElement("flip-form-control", {
    ...args,
    label: "Date Control",
  });

  dateInput.innerHTML = `
    <flip-date-input></flip-date-input>
  `;

  const passwordInput = generateStoryElement("flip-form-control", {
    ...args,
    label: "Password Control",
  });

  passwordInput.innerHTML = `
    <flip-text-input type="password"></flip-text-input>
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
    dateInput,
    "\n  ",
    passwordInput,
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
