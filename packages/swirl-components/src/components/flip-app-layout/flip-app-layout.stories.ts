import { generateStoryElement } from "../../utils";
import Docs from "./flip-app-layout.mdx";

export default {
  component: "flip-app-layout",
  decorators: [
    (story) => {
      const container = document.createElement("div");
      const styles = document.createElement("style");

      container.classList.add("container");
      container.style.backgroundColor = "var(--s-surface-raised-default)";
      container.style.height = "100vh";

      styles.innerHTML = `
        @media (min-width: 1440px) {
          .container {
            padding: 1rem;
          }
        }
      `;

      container.append(styles, story());

      return container;
    },
  ],
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
