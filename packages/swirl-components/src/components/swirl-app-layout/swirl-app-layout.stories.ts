import { fullscreenStoryDecorator, generateStoryElement } from "../../utils";
import Docs from "./swirl-app-layout.mdx";

export default {
  argTypes: {
    appName: {
      description:
        "Displayed above the navigation area, if present. Otherwise displayed above the content area.",
    },
    transitionStyle: {
      control: "select",
      options: ["none", "slides", "dialog"],
    },
  },
  component: "swirl-app-layout",
  tags: ["autodocs"],
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
    <swirl-button hide-label="true" icon="<swirl-icon-menu></swirl-icon-menu>" label="Menu" slot="navigation-mobile-menu-button"></swirl-button>
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
      <swirl-heading as="h2" level="3" slot="heading" text="Heading" truncate=""></swirl-heading>
      <swirl-stack justify="center" orientation="horizontal" spacing="8" slot="center-controls">
        <swirl-button label="All posts" variant="flat"></swirl-button>
        <swirl-button label="Groups"></swirl-button>
        <swirl-button label="Saved"></swirl-button>
        <swirl-button label="Scheduled"></swirl-button>
      </swirl-stack>
    </swirl-app-bar>
    <swirl-stack orientation="horizontal" slot="app-bar-controls">
      <swirl-button hide-label="true" icon="<swirl-icon-search></swirl-icon-search>" label="Search"></swirl-button>
      <swirl-button hide-label class="info-button" icon="<swirl-icon-info></swirl-icon-info>" label="More information"></swirl-button>
    </swirl-stack>
    <div slot="content"></div>
    <div slot="sidebar"></div>
    <swirl-button slot="floating-action-button" icon="<swirl-icon-add></swirl-icon-add>" label="CTA" variant="floating" intent="primary" hide-label="true"></swirl-button>
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
  hasNavigation: true,
  navigationLabel: "Items",
  sidebarHeading: "Sidebar Heading",
};
