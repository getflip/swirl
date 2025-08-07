import { fullscreenStoryDecorator, generateStoryElement } from "../../utils";
import Docs from "./swirl-shell-layout.mdx";

const dummyText = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.     Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.     Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.     Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.     Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.     At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.     Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus.     Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.     Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.     Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.     Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo`;

export default {
  argTypes: {
    sidebarToggleBadge: {
      control: {
        type: "text",
      },
    },
  },
  component: "swirl-shell-layout",
  tags: ["autodocs"],
  decorators: [fullscreenStoryDecorator(false)],
  parameters: {
    docs: {
      page: Docs,
    },
    layout: "fullscreen",
  },
  title: "Components/SwirlShellLayout",
};

const Template = (args) => {
  const element = generateStoryElement(
    "swirl-shell-layout",
    args
  ) as HTMLSwirlShellLayoutElement;

  element.innerHTML = `
    <a href="" slot="logo">
      <img alt="Flip logo" src="/images/flip-logo.png">
    </a>
    <img alt="Flip logo" slot="mobile-logo" src="/images/flip-logo.png">

    <swirl-avatar label="John Doe" slot="avatar" src="https://picsum.photos/id/433/144/144"></swirl-avatar>
    <swirl-avatar label="John Doe" slot="mobile-header-tools" src="https://picsum.photos/id/433/144/144"></swirl-avatar>

    <swirl-box padding-inline-start="16" slot="left-header-tools">
      <swirl-switch label="Header tool" label-position="start"></swirl-switch>
    </swirl-box>

    <swirl-button label="Header tool" slot="right-header-tools" variant="outline"></swirl-button>

    <div slot="nav">
      <swirl-stack align="stretch" as="ul" spacing="2">
        <li>
          <swirl-shell-navigation-item label="News">
            <swirl-app-icon icon="<swirl-icon-news size=&quot;24&quot;></swirl-icon-news>" slot="icon"></swirl-app-icon>
          </swirl-shell-navigation-item>
        </li>
        <li>
          <swirl-shell-navigation-item active label="Chats">
            <swirl-app-icon icon="<swirl-icon-chats size=&quot;24&quot;></swirl-icon-chats>" slot="icon"></swirl-app-icon>
          </swirl-shell-navigation-item>
        </li>
        <li>
          <swirl-shell-navigation-item label="Tasks" badge-label="3">
            <swirl-app-icon icon="<swirl-icon-tasks size=&quot;24&quot;></swirl-icon-tasks>" slot="icon"></swirl-app-icon>
          </swirl-shell-navigation-item>
        </li>
        <li>
          <swirl-shell-navigation-item label="Calendar">
            <swirl-app-icon icon="<swirl-icon-today size=&quot;24&quot;></swirl-icon-today>" slot="icon"></swirl-app-icon>
          </swirl-shell-navigation-item>
        </li>
        <li>
          <swirl-shell-navigation-item label="Employee directory">
            <swirl-app-icon icon="<swirl-icon-directory size=&quot;24&quot;></swirl-icon-directory>" slot="icon"></swirl-app-icon>
          </swirl-shell-navigation-item>
        </li>
      </swirl-stack>
    </div>

    <ul slot="secondary-nav">
      <li>
        <swirl-shell-navigation-item filled inline-label label="Reporting hub" with-gradient>
          <swirl-app-icon src="/menu-item-1.png" slot="icon"></swirl-app-icon>
        </swirl-shell-navigation-item>
      </li>
      <li>
        <swirl-shell-navigation-item filled inline-label label="My absences" badge-label="3">
          <swirl-app-icon src="/menu-item-2.png" slot="icon"></swirl-app-icon>
        </swirl-shell-navigation-item>
      </li>
      <li>
        <swirl-shell-navigation-item filled inline-label label="IT self-service">
          <swirl-symbol glyph="shopping-cart" size="24" slot="icon" ></swirl-symbol>
        </swirl-shell-navigation-item>
      </li>
      <li>
        <swirl-shell-navigation-item filled inline-label label="Office door key" with-gradient>
          <swirl-app-icon src="/menu-item-4.png" slot="icon"></swirl-app-icon>
        </swirl-shell-navigation-item>
      </li>
    </ul>

    <swirl-app-layout app-name="App name" collapsible-navigation>
      <swirl-button hide-label="true" icon="<swirl-icon-menu></swirl-icon-menu>" label="Menu" slot="navigation-mobile-menu-button"></swirl-button>
      <swirl-resource-list label="Items" slot="navigation">
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" class="item"></swirl-resource-list-item>
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
      </swirl-app-bar>
      <div slot="app-bar-controls">
        <swirl-button hide-label="true" icon="<swirl-icon-search></swirl-icon-search>" label="Search"></swirl-button>
        <swirl-button hide-label class="info-button" icon="<swirl-icon-info></swirl-icon-info>" label="More information"></swirl-button>
      </div>
      <div slot="content">
        <swirl-box padding-inline-start="16" padding-inline-end="16" padding-block-end="16">
          ${dummyText} ${dummyText} ${dummyText}
        </swirl-box>
      </div>
      <div slot="sidebar">
        <swirl-box padding-inline-start="16" padding-inline-end="16" padding-block-end="16">
          ${dummyText}
        </swirl-box>
      </div>
      <div slot="bottom-bar">
        <swirl-box padding="16">
          Bottom bar
        </swirl-box>
      </div>
    </swirl-app-layout>

    <swirl-app-bar close-button-icon="<swirl-icon-double-arrow-right></swirl-icon-double-arrow-right>" close-button-label="Hide sidebar" show-close-button slot="sidebar-app-bar">
      <swirl-heading level="3" slot="heading" text="Sidebar" truncate=""></swirl-heading>
    </swirl-app-bar>

    <div slot="sidebar">
      <swirl-box padding-inline-start="16" padding-inline-end="16" padding-block-end="16">
        ${dummyText}
      </swirl-box>
    </div>
  `;

  const appLayout = element.querySelector("swirl-app-layout");

  appLayout.querySelector(".info-button").addEventListener("click", () => {
    appLayout.changeMobileView("sidebar");
  });

  element
    .querySelector('swirl-button[slot="navigation-mobile-menu-button"]')
    ?.addEventListener("click", () => {
      element.showMobileNavigation();
    });

  element
    .querySelector("swirl-app-bar[slot='sidebar-app-bar']")
    ?.addEventListener("closeButtonClick", () => {
      element.setAttribute("sidebar-active", "false");
    });

  element.addEventListener("sidebarToggleClick", () => {
    element.setAttribute(
      "sidebar-active",
      element.sidebarActive ? "false" : "true"
    );
  });

  element.addEventListener("skipLinkClick", () => {
    window.location.hash = "main-content";
  });

  return element;
};

export const SwirlShellLayout = Template.bind({});

SwirlShellLayout.args = {
  sidebarToggleBadgeAriaLabel: "3 new notifications",
  sidebarToggleBadge: true,
  secondaryNavGridLayoutVariant: "app-icon",
};
