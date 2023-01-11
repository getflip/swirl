import { generateStoryElement } from "../../utils";
import Docs from "./swirl-pagination.mdx";

export default {
  component: "flip-pagination",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipPagination",
};

const Template = (args) => {
  const element = generateStoryElement("flip-pagination", args);

  return element;
};

export const FlipPagination = Template.bind({});

FlipPagination.args = {
  label: "Pagination",
  page: 1,
  pages: 20,
};
