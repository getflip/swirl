import { generateStoryElement } from "../../utils";
import Docs from "./swirl-pagination.mdx";

export default {
  component: "swirl-pagination",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlPagination",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-pagination", args);

  return element;
};

export const SwirlPagination = Template.bind({});

SwirlPagination.args = {
  label: "Pagination",
  page: 1,
  pages: 20,
};
