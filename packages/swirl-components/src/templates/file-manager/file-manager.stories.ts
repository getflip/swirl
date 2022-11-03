import { fullscreenStoryDecorator, generateStoryElement } from "../../utils";

export default {
  decorators: [fullscreenStoryDecorator],
  parameters: {
    controls: { disable: true },
    layout: "fullscreen",
    previewTabs: {
      "storybook/docs/panel": {
        hidden: true,
      },
    },
    viewMode: "story",
  },
  title: "Templates/FileManager",
};

const Template = () => {
  const element = generateStoryElement("file-manager", {});

  return element;
};

export const FileManager = Template.bind({});
