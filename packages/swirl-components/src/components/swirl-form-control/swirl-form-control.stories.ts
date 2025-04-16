import { generateStoryElement } from "../../utils";
import { SwirlAutocompleteSuggestion } from "../swirl-autocomplete/swirl-autocomplete";
import Docs from "./swirl-form-control.mdx";

export default {
  component: "swirl-form-control",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlFormControl",
};

const Template = (args) => {
  const container = document.createElement("swirl-stack");

  container.spacing = "24";

  const textInput = generateStoryElement("swirl-form-control", args);

  textInput.innerHTML = `
    <swirl-text-input clearable="true" type="text"></swirl-text-input>
    <select slot="prefix">
      <option>CH</option>
      <option selected>DE</option>
      <option>EN</option>
      <option>FR</option>
    </select>
  `;

  const numberInput = generateStoryElement("swirl-form-control", {
    ...args,
    label: "Number Control",
  });

  numberInput.innerHTML = `
    <swirl-text-input suffix-label="€" type="number"></swirl-text-input>
  `;

  const dateInput = generateStoryElement("swirl-form-control", {
    ...args,
    label: "Date Control",
  });

  dateInput.innerHTML = `
    <swirl-date-input></swirl-date-input>
  `;

  const timeInput = generateStoryElement("swirl-form-control", {
    ...args,
    label: "Time Control",
  });

  timeInput.innerHTML = `
    <swirl-time-input></swirl-time-input>
  `;

  const passwordInput = generateStoryElement("swirl-form-control", {
    ...args,
    label: "Password Control",
  });

  passwordInput.innerHTML = `
    <swirl-text-input type="password"></swirl-text-input>
  `;

  const select = generateStoryElement("swirl-form-control", {
    ...args,
    label: "Select",
  });

  select.innerHTML = `
    <swirl-select multi-select="true">
      <swirl-option-list-section label="Section 1">
        <swirl-option-list-item
          label="This is an option 1"
          value="1"
        ></swirl-option-list-item>
        <swirl-option-list-item
          label="This is an option 2"
          value="2"
        ></swirl-option-list-item>
        <swirl-option-list-item
          label="This is an option 3"
          value="3"
        ></swirl-option-list-item>
      </swirl-option-list-section>
      <swirl-option-list-section label="Section 2">
        <swirl-option-list-item
          label="This is an option 4"
          value="4"
        ></swirl-option-list-item>
      </swirl-option-list-section>
    </swirl-select>
  `;

  const autocomplete = generateStoryElement("swirl-form-control", {
    ...args,
    label: "Autocomplete",
  });

  autocomplete.innerHTML = `
    <swirl-autocomplete></swirl-autocomplete>
  `;

  const suggestions: SwirlAutocompleteSuggestion[] = [
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

  autocomplete.querySelector("swirl-autocomplete").generateSuggestions = async (
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

  const multilineInput = generateStoryElement("swirl-form-control", {
    ...args,
    label: "Multiline Control",
  });

  multilineInput.innerHTML = `
    <swirl-text-input max-length="200" show-character-counter="true" rows="5" type="text"></swirl-text-input>
  `;

  const contenteditable = generateStoryElement("swirl-form-control", {
    ...args,
    label: "Contenteditable Control",
  });

  contenteditable.innerHTML = `
    <div contenteditable="plaintext-only" role="textbox"></div>
  `;

  const iconPrefix = generateStoryElement("swirl-form-control", {
    ...args,
    label: "With leading Icon",
    icon: "location-on",
  });

  iconPrefix.innerHTML = `
    <swirl-text-input type="text"></swirl-text-input>
  `;

  container.append(
    "\n  ",
    textInput,
    "\n  ",
    numberInput,
    "\n  ",
    dateInput,
    "\n  ",
    timeInput,
    "\n  ",
    passwordInput,
    "\n  ",
    select,
    "\n  ",
    autocomplete,
    "\n  ",
    multilineInput,
    "\n  ",
    contenteditable,
    "\n",
    iconPrefix,
    "\n"
  );

  return container;
};

export const SwirlFormControl = Template.bind({});

SwirlFormControl.args = {
  description: "Optional description of the control.",
  label: "Form Control Label",
};
