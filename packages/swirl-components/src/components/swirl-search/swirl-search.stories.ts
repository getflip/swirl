import { generateStoryElement } from "../../utils";
import Docs from "./swirl-search.mdx";

export default {
  component: "flip-search",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipSearch",
};

const Template = (args) => {
  const element = generateStoryElement("flip-search", args);

  return element;
};

export const FlipSearch = Template.bind({});

FlipSearch.args = {
  label: "Search",
};
