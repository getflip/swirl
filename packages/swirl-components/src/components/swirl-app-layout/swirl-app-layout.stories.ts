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
  component: "swirl-app-layout",
  decorators: [fullscreenStoryDecorator],
  parameters: {
    docs: {
      page: Docs,
    },
    layout: "fullscreen",
  },
  title: "Components/SwirlAppLayout",
};

const Template = (args) => {
  const element = generateStoryElement(
    "swirl-app-layout",
    args
  ) as HTMLSwirlAppLayoutElement;

  element.innerHTML = `
    <swirl-resource-list label="Items" slot="navigation">
      <swirl-resource-list-item description="With a description" label="This is a resource item" class="item" media="<swirl-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/433/144/144&quot;></swirl-avatar>"></swirl-resource-list-item>
      <swirl-resource-list-item description="With a description" label="This is a resource item" class="item" media="<swirl-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/103/144/144&quot;></swirl-avatar>"></swirl-resource-list-item>
      <swirl-resource-list-item description="With a description" label="This is a resource item" class="item" media="<swirl-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/1027/144/144&quot;></swirl-avatar>"></swirl-resource-list-item>
    </swirl-resource-list>
    <swirl-button
      hide-label
      icon="<swirl-icon-settings></swirl-icon-settings>"
      label="Settings"
      slot="navigation-controls"
    ></swirl-button>
    <div slot="app-bar-controls">
      <swirl-button hide-label class="info-button" icon="<swirl-icon-info></swirl-icon-info>" label="More information"></swirl-button>
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

export const SwirlAppLayout = Template.bind({});

SwirlAppLayout.args = {
  appBarMedia:
    '<swirl-avatar label="John Doe" src="https://picsum.photos/id/433/144/144" variant="square"></swirl-avatar>',
  appName: "App Name",
  ctaIcon: "<swirl-icon-add></swirl-icon-add>",
  ctaLabel: "Call to action",
  heading: "Heading",
  navigationLabel: "Items",
  sidebarHeading: "Sidebar Heading",
  subheading: "Subheading",
};
