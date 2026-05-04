import { generateStoryElement } from "../../utils";
import Docs from "./swirl-thumbnail.mdx";

export default {
  argTypes: {
    editButtonIcon: {
      table: {
        type: {
          summary: "swirl-icon-*",
        },
      },
    },
    removeButtonIcon: {
      table: {
        type: {
          summary: "swirl-icon-*",
        },
      },
    },
    openButtonIcon: {
      table: {
        type: {
          summary: "swirl-icon-*",
        },
      },
    },
    showEditButton: {
      description:
        "Shows an edit action on hover. On sizes `s`/`m` the action renders as a small corner button (or inside a popover when combined with `showRemoveButton`). On sizes `l`/`xl`/`2xl` it renders as part of a segmented button group.",
    },
    showRemoveButton: {
      description:
        "Shows a remove action on hover. Follows the same compact/segmented rules as `showEditButton`.",
    },
    timestamp: {
      description:
        "Rendered at the bottom-left of the thumbnail for sizes `m` and above. Commonly used to display a video duration.",
    },
    progress: {
      description:
        "When set, shows an uploading indicator. Sizes `s`/`m` show a centered circular spinner on a dark overlay, sizes `l`/`xl`/`2xl` show a bottom progress bar.",
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

const Template = (args) => generateStoryElement("swirl-thumbnail", args);

export const SwirlThumbnail = Template.bind({});

SwirlThumbnail.args = {
  alt: "Brief description of the image.",
  src: "https://picsum.photos/id/433/400/400",
};
