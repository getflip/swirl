import { generateStoryElement } from "../../utils";
import { FlipAutocompleteSuggestion } from "../flip-autocomplete/flip-autocomplete";
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

  const autocomplete = generateStoryElement("flip-form-control", {
    ...args,
    label: "Autocomplete",
  });

  autocomplete.innerHTML = `
    <flip-autocomplete></flip-autocomplete>
  `;

  const suggestions: FlipAutocompleteSuggestion[] = [
    {
      id: "1",
      label: "Item #1",
    },
    {
      id: "2",
      label: "Item #2",
    },
    {
      id: "3",
      label: "Item #3",
    },
  ];

  autocomplete.querySelector("flip-autocomplete").generateSuggestions = async (
    value: string
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!Boolean(value)) {
      return suggestions;
    }

    return suggestions.filter((suggestion) =>
      suggestion.label.toLowerCase().includes(value.toLowerCase())
    );
  };

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
    autocomplete,
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
