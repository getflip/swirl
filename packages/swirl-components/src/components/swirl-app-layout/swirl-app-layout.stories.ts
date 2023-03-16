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
  decorators: [fullscreenStoryDecorator()],
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
      <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
      <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
      <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
    </swirl-resource-list>
    <swirl-button
      hide-label
      icon="<swirl-icon-settings></swirl-icon-settings>"
      label="Settings"
      slot="navigation-controls"
    ></swirl-button>
    <swirl-app-bar show-close-button="false" show-stepper-controls="false" slot="app-bar">
      <swirl-heading as="h1" level="3" slot="heading" text="Heading" truncate=""></swirl-heading>
      <swirl-stack justify="center" orientation="horizontal" spacing="8" slot="center-controls">
        <swirl-button label="All posts" variant="flat"></swirl-button>
        <swirl-button label="Groups"></swirl-button>
        <swirl-button label="Saved"></swirl-button>
        <swirl-button label="Scheduled"></swirl-button>
      </swirl-stack>
      <div slot="right-controls">
        <swirl-button hide-label="true" icon="<swirl-icon-search></swirl-icon-search>" label="Search"></swirl-button>
      </div>
    </swirl-app-bar>
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
  appName: "App Name",
  ctaIcon: "<swirl-icon-add></swirl-icon-add>",
  ctaLabel: "Call to action",
  navigationLabel: "Items",
  sidebarHeading: "Sidebar Heading",
};
