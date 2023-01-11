import { generateStoryElement } from "../../utils";
import { SwirlAutocompleteSuggestion } from "./swirl-autocomplete";
import Docs from "./swirl-autocomplete.mdx";

export default {
  component: "swirl-autocomplete",
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `<swirl-form-control label="Autocomplete">
  <swirl-autocomplete id="autocomplete"></swirl-autocomplete>
</swirl-form-control>

<script>
  const autocomplete = document.getElementById('autocomplete');

  const suggestions = [
    {
      id: "1",
      label: "Item #1",
    },
    {
      disabled: true,
      id: "2",
      label: "Item #2",
    },
    {
      id: "3",
      label: "Item #3",
    },
  ];

  // The generateSuggestions callback should always return a promise.
  autocomplete.generateSuggestions = async (value) => {
    if (!Boolean(value)) {
      return suggestions;
    }

    return suggestions.filter((suggestion) =>
      suggestion.label.toLowerCase().includes(value.toLowerCase())
    );
  }
</script>`,
      },
    },
  },
  title: "Components/SwirlAutocomplete",
};

const Template = (args) => {
  const formControl = document.createElement("swirl-form-control");
  const element = generateStoryElement(
    "swirl-autocomplete",
    args
  ) as HTMLSwirlAutocompleteElement;

  formControl.label = "Autocomplete";

  const suggestions: SwirlAutocompleteSuggestion[] = [
    {
      id: "1",
      label: "Item #1",
    },
    {
      disabled: true,
      id: "2",
      label: "Item #2",
    },
    {
      id: "3",
      label: "Item #3",
    },
  ];

  element.generateSuggestions = async (value: string) => {
    if (!Boolean(value)) {
      return suggestions;
    }

    return suggestions.filter((suggestion) =>
      suggestion.label.toLowerCase().includes(value.toLowerCase())
    );
  };

  formControl.append(element);

  return formControl;
};

export const SwirlAutocomplete = Template.bind({});

SwirlAutocomplete.args = {};
