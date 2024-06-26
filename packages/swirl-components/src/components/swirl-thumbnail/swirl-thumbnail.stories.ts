import { generateStoryElement } from "../../utils";
import Docs from "./swirl-thumbnail.mdx";

export default {
  argTypes: {
    showEditButton: {
      description:
        "Only displayed with format `square` and either size `2xl` or size `xl` with `show-remove-button` set to `false`. ",
    },
    showRemoveButton: {
      description:
        "Only displayed with size `xl` or `2xl` and format `square`.",
    },
    timestamp: {
      description:
        "Only displayed with size `xl` or `2xl` and format `square`.",
    },
    editButtonIcon: {
      table: {
        type: {
          detail: "e.g. <swirl-icon-edit></swirl-icon-edit>",
          summary: "swirl-icon-*",
        },
      },
    },
  },
  component: "swirl-thumbnail",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlThumbnail",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-thumbnail", args);

  return element;
};

export const SwirlThumbnail = Template.bind({});

SwirlThumbnail.args = {
  alt: "Brief description of the image.",
  src: "https://picsum.photos/id/433/400/400",
};
