import { fullscreenStoryDecorator, generateStoryElement } from "../../utils";
import Docs from "./swirl-app-layout.mdx";

export default {
  argTypes: {
    appBarMedia: {
      description:
        "Displayed above the content area, if the navigation area is present. Otherwise replaced by the app name.",
    },
    appName: {
      description:
        "Displayed above the navigation area, if present. Otherwise displayed above the content area.",
    },
    heading: {
      description:
        "Displayed above the content area, if the navigation area is present. Otherwise replaced by the app name.",
    },
    subheading: {
      description:
        "Displayed above the content area, if the navigation area is present. Otherwise replaced by the app name.",
    },
    transitionStyle: {
      control: "select",
      options: ["none", "slides", "dialog"],
    },
  },
  component: "flip-app-layout",
  decorators: [fullscreenStoryDecorator],
  parameters: {
    docs: {
      page: Docs,
    },
    layout: "fullscreen",
  },
  title: "Components/FlipAppLayout",
};

const Template = (args) => {
  const element = generateStoryElement(
    "flip-app-layout",
    args
  ) as HTMLFlipAppLayoutElement;

  element.innerHTML = `
    <flip-resource-list label="Items" slot="navigation">
      <flip-resource-list-item description="With a description" label="This is a resource item" class="item" media="<flip-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/433/144/144&quot;></flip-avatar>"></flip-resource-list-item>
      <flip-resource-list-item description="With a description" label="This is a resource item" class="item" media="<flip-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/103/144/144&quot;></flip-avatar>"></flip-resource-list-item>
      <flip-resource-list-item description="With a description" label="This is a resource item" class="item" media="<flip-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/1027/144/144&quot;></flip-avatar>"></flip-resource-list-item>
    </flip-resource-list>
    <flip-button
      hide-label
      icon="<flip-icon-settings></flip-icon-settings>"
      label="Settings"
      slot="navigation-controls"
    ></flip-button>
    <div slot="app-bar-controls">
      <flip-button hide-label class="info-button" icon="<flip-icon-info></flip-icon-info>" label="More information"></flip-button>
    </div>
    <div slot="content"></div>
    <div slot="sidebar"></div>
  `;

  element.querySelector(".info-button").addEventListener("click", () => {
    element.changeMobileView("sidebar");
  });

  element.querySelectorAll(".item").forEach((el) => {
    el.addEventListener("click", () => {
      element.changeMobileView("body");
    });
  });

  return element;
};

export const FlipAppLayout = Template.bind({});

FlipAppLayout.args = {
  appBarMedia:
    '<flip-avatar label="John Doe" src="https://picsum.photos/id/433/144/144" variant="square"></flip-avatar>',
  appName: "App Name",
  ctaIcon: "<flip-icon-add></flip-icon-add>",
  ctaLabel: "Call to action",
  heading: "Heading",
  navigationLabel: "Items",
  sidebarHeading: "Sidebar Heading",
  subheading: "Subheading",
};
