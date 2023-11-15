import { generateStoryElement } from "../../utils";
import Docs from "./swirl-search.mdx";

export default {
  component: "swirl-search",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlSearch",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-search", args);

  return element;
};

export const SwirlSearch = Template.bind({});

SwirlSearch.args = {
  label: "Search",
};
