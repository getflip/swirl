import { generateStoryElement } from "../../utils";
import { FlipAutocompleteSuggestion } from "./flip-autocomplete";
import Docs from "./flip-autocomplete.mdx";

export default {
  component: "flip-autocomplete",
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `<flip-form-control description="Optional description of the control." label="Autocomplete">
  <flip-autocomplete id="autocomplete"></flip-autocomplete>
</flip-form-control>

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
  title: "Components/FlipAutocomplete",
};

const Template = (args) => {
  const element = generateStoryElement(
    "flip-autocomplete",
    args
  ) as HTMLFlipAutocompleteElement;

  const suggestions: FlipAutocompleteSuggestion[] = [
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

  return element;
};

export const FlipAutocomplete = Template.bind({});

FlipAutocomplete.args = {};
