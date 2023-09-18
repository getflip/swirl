import { generateStoryElement } from "../../utils";
import { SwirlAutocompleteSuggestion } from "./swirl-autocomplete";
import Docs from "./swirl-autocomplete.mdx";

export default {
  component: "swirl-autocomplete",
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: {
        type: "object",
      },
    },
  },
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
      id: "item-1",
      label: "Item #1",
    },
    {
      disabled: true,
      id: "item-2",
      label: "Item #2",
    },
    {
      id: "item-3",
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

  formControl.setAttribute("disabled", args.disabled ? "true" : "false");
  formControl.label = "Autocomplete";

  const suggestions: SwirlAutocompleteSuggestion[] = [
    {
      id: "item-1",
      label: "Item #1",
    },
    {
      disabled: true,
      id: "item-2",
      label: "Item #2",
    },
    {
      id: "item-3",
      label: "Item #3 with a longer label",
    },
    {
      id: "item-4",
      label: "Item #4",
    },
    {
      id: "item-5",
      label: "Item #5",
    },
    {
      id: "item-6",
      label: "Item #6 with some additional information",
    },
    {
      id: "item-7",
      label: "Item #7",
    },
    {
      disabled: true,
      id: "item-8",
      label: "Item #8",
    },
    {
      id: "item-9",
      label: "Item #9 with a lengthy label to test wrapping",
    },
    {
      id: "item-10",
      label: "Item #10",
    },
    {
      id: "item-11",
      label: "Item #11",
    },
    {
      id: "item-12",
      label: "Item #12",
    },
    {
      id: "item-13",
      label: "Item #13",
    },
    {
      id: "item-14",
      label: "Item #14 with a descriptive label",
    },
    {
      id: "item-15",
      label: "Item #15",
    },
    {
      id: "item-16",
      label: "Item #16",
    },
    {
      id: "item-17",
      label: "Item #17",
    },
    {
      disabled: true,
      id: "item-18",
      label: "Item #18 with special considerations",
    },
    {
      id: "item-19",
      label: "Item #19",
    },
    {
      id: "item-20",
      label: "Item #20",
    },
    {
      id: "item-21",
      label: "Item #21",
    },
    {
      id: "item-22",
      label: "Item #22",
    },
    {
      id: "item-23",
      label: "Item #23 with an extended label",
    },
    {
      id: "item-24",
      label: "Item #24",
    },
    {
      id: "item-25",
      label: "Item #25",
    },
    {
      id: "item-26",
      label: "Item #26",
    },
    {
      id: "item-27",
      label: "Item #27",
    },
    {
      id: "item-28",
      label: "Item #28 with unique properties",
    },
    {
      id: "item-29",
      label: "Item #29",
    },
    {
      id: "item-30",
      label: "Item #30",
    },
    {
      id: "item-31",
      label: "Item #31",
    },
    {
      id: "item-32",
      label: "Item #32",
    },
    {
      id: "item-33",
      label: "Item #33 with additional notes",
    },
    {
      id: "item-34",
      label: "Item #34",
    },
    {
      id: "item-35",
      label: "Item #35",
    },
    {
      id: "item-36",
      label: "Item #36",
    },
    {
      id: "item-37",
      label: "Item #37",
    },
    {
      id: "item-38",
      label: "Item #38 with a customized label",
    },
    {
      id: "item-39",
      label: "Item #39",
    },
    {
      id: "item-40",
      label: "Item #40",
    },
    {
      id: "item-41",
      label: "Item #41",
    },
    {
      id: "item-42",
      label: "Item #42",
    },
    {
      id: "item-43",
      label: "Item #43 with specific details",
    },
    {
      id: "item-44",
      label: "Item #44",
    },
    {
      id: "item-45",
      label: "Item #45",
    },
    {
      id: "item-46",
      label: "Item #46",
    },
    {
      id: "item-47",
      label: "Item #47",
    },
    {
      id: "item-48",
      label: "Item #48 with optional settings",
    },
    {
      id: "item-49",
      label: "Item #49",
    },
    {
      id: "item-50",
      label: "Item #50",
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
