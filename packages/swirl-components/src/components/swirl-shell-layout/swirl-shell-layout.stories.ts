import { fullscreenStoryDecorator, generateStoryElement } from "../../utils";
import Docs from "./swirl-shell-layout.mdx";

export default {
  component: "swirl-shell-layout",
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
    <div slot="logo-expanded">
      <svg width="72" height="32" fill="none">
        <g clip-path="url(#a)">
          <path fill="#145AF5" d="M58.7162 32c1.44 0 2.592-1.1584 2.592-2.6064v-4.0905c.648.8326 2.052 1.448 3.888 1.448 3.996 0 6.8039-3.1855 6.8039-7.638 0-4.3801-2.4839-7.6018-6.6239-7.6018-2.052 0-3.6001.905-4.2121 1.8461v-1.4841h-1.62c-1.44 0-2.592 1.1584-2.592 2.6063V32h1.7641Zm9-12.8507c0 2.4253-1.512 3.6199-3.24 3.6199-1.692 0-3.2041-1.2308-3.2041-3.6199 0-2.4253 1.5121-3.6199 3.2041-3.6199 1.728 0 3.24 1.1946 3.24 3.6199ZM43.3441 26.6425c1.44 0 2.592-1.1584 2.592-2.6063V5.61084h-1.764c-1.44 0-2.592 1.15837-2.592 2.60634V26.6425h1.764ZM27.7562 26.6425c1.44 0 2.592-1.1584 2.592-2.6063v-5.4299h4.932c1.44 0 2.592-1.1584 2.592-2.6063v-1.5928h-7.56v-2.8235c0-.8688.684-1.5566 1.548-1.5566h4.428c1.44 0 2.592-1.15835 2.592-2.60631V5.64703h-8.28c-2.664 0-4.86 2.17195-4.86 4.88687v16.181h2.016v-.0724ZM51.0477 26.6425c1.44 0 2.592-1.1584 2.592-2.6063V12.0905h-1.764c-1.44 0-2.592 1.1583-2.592 2.6063v11.9457h1.764ZM51.4438 10.3891c-1.368 0-2.52-1.15835-2.52-2.60631 0-1.44797 1.152-2.60634 2.52-2.60634 1.44 0 2.592 1.15837 2.592 2.60634 0 1.44796-1.188 2.60631-2.592 2.60631ZM.756232 16.6878c-.36-.6516-.612-1.3756-.7200003-2.1358-.072-.7963-.03600002-1.5565.1440003-2.2805.18-.724.54-1.448.971998-2.0272.468-.61534 1.008-1.12213 1.692-1.48412L17.6762 0c.36.651584.612 1.37557.72 2.13575.108.76018.036 1.52036-.144 2.28054-.18.72398-.54 1.44796-.972 2.02715-.468.61538-1.008 1.12217-1.692 1.48416L.756232 16.6878ZM4.4641 25.7014c-.36-.6516-.612-1.3756-.72-2.1358-.108-.7602-.036-1.5203.144-2.2805.18-.724.54-1.448.972-2.0272.468-.6153 1.008-1.1221 1.692-1.4841l8.208-4.8507c.36.6516.612 1.3756.72 2.1357.108.7602.036 1.5204-.144 2.2806-.18.724-.54 1.4479-.972 2.0271-.468.6154-1.008 1.1222-1.692 1.4842l-8.208 4.8507Z"/>
          <path fill="#80A8F4" d="m4.46387 25.7013 4.932-2.8959c.75603 1.3394.93603 2.9321.576 4.4163-.396 1.4842-1.332 2.7511-2.664 3.5475l-2.844-5.0679ZM14.7599 12.9231l-5.90404-1.0136-8.100001 4.7783 5.760001 1.0859 8.24404-4.8506Z"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h72v32H0z"/>
          </clipPath>
        </defs>
      </svg>
    </div>
    <div slot="logo-collapsed">
      <swirl-app-icon slot="icon" border-hidden="true" label="link" src="/flip-logo.png"></swirl-app-icon>
    </div>
    <div slot="tools">
      <swirl-stack>
        <swirl-shell-navigation-item label="Search">
          <swirl-app-icon slot="icon" label="link" icon="<swirl-icon-search></swirl-icon-search>"></swirl-app-icon>
        </swirl-shell-navigation-item>
        <swirl-shell-navigation-item label="Notifications" badge-label="1">
          <swirl-app-icon slot="icon" label="link" icon="<swirl-icon-notifications></swirl-icon-notifications>"></swirl-app-icon>
        </swirl-shell-navigation-item>
        <swirl-shell-navigation-item label="Profile & Settings">
          <swirl-avatar slot="icon" label="John Doe" src="https://picsum.photos/id/433/144/144" size="xs"></swirl-avatar>
        </swirl-shell-navigation-item>
        <swirl-shell-navigation-item label="Create">
          <swirl-app-icon slot="icon" label="link" icon="<swirl-icon-add></swirl-icon-add>"></swirl-app-icon>
        </swirl-shell-navigation-item>
      </swirl-stack>
    </div>
    <div slot="main-navigation">
      <swirl-stack>
        <swirl-shell-navigation-item active label="Home" badge-label="2">
          <swirl-app-icon slot="icon" label="link" src="https://picsum.photos/id/437/144/144"></swirl-app-icon>
        </swirl-shell-navigation-item>
        <swirl-shell-navigation-item label="Chats">
          <swirl-app-icon slot="icon" label="link" src="https://picsum.photos/id/437/144/144"></swirl-app-icon>
        </swirl-shell-navigation-item>
        <swirl-shell-navigation-item label="News">
          <swirl-app-icon slot="icon" label="link" src="https://picsum.photos/id/437/144/144"></swirl-app-icon>
        </swirl-shell-navigation-item>
      </swirl-stack>
    </div>
    <swirl-banner slot="banner" action-label="Update" content="New version available." dismissable="false" intent="info" size="s"></swirl-banner>
    <div slot="main">
      <swirl-app-layout
        app-name="Chat"
        navigation-label="Items"
      >
        <swirl-banner slot="banner" action-label="Details" content="On leave until 16.05.2023" dismissable="false" intent="info"></swirl-banner>
        <swirl-button
          hide-label
          icon="<swirl-icon-menu></swirl-icon-menu>"
          id="navigation-mobile-menu-button"
          label="Toggle sidebar"
          slot="navigation-mobile-menu-button"
        ></swirl-button>
        <swirl-resource-list label="Items" slot="navigation">
          <swirl-resource-list-item description="With a description" label="This is a resource item" class="item">
            <swirl-avatar label="John Doe" src="https://picsum.photos/id/433/144/144" slot="media"></swirl-avatar>
          </swirl-resource-list-item>
          <swirl-resource-list-item description="With a description" label="This is a resource item" class="item">
            <swirl-avatar label="John Doe" src="https://picsum.photos/id/433/144/144" slot="media"></swirl-avatar>
          </swirl-resource-list-item>
          <swirl-resource-list-item description="With a description" label="This is a resource item" class="item">
            <swirl-avatar label="John Doe" src="https://picsum.photos/id/433/144/144" slot="media"></swirl-avatar>
          </swirl-resource-list-item>
        </swirl-resource-list>
        <swirl-button
          hide-label
          icon="<swirl-icon-settings></swirl-icon-settings>"
          label="Settings"
          slot="navigation-controls"
        ></swirl-button>
        <swirl-button
          hide-label
          icon="<swirl-icon-menu></swirl-icon-menu>"
          id="app-bar-mobile-menu-button"
          label="Toggle sidebar"
          slot="app-bar-mobile-menu-button"
        ></swirl-button>
        <swirl-heading as="h2" level="3" slot="app-bar" text="Heading"></swirl-heading>
        <div slot="app-bar-controls">
          <swirl-button hide-label class="info-button" icon="<swirl-icon-info></swirl-icon-info>" label="More information"></swirl-button>
        </div>
        <div slot="content"></div>
        <div slot="sidebar"></div>
      </swirl-app-layout>
    </div>
  `;

  element
    .querySelector("#navigation-mobile-menu-button")
    .addEventListener("click", () => {
      element.extendSidebar();
    });

  element
    .querySelector("#app-bar-mobile-menu-button")
    .addEventListener("click", () => {
      element.extendSidebar();
    });

  element.querySelector(".info-button").addEventListener("click", () => {
    element.querySelector("swirl-app-layout").changeMobileView("sidebar");
  });

  element.querySelectorAll(".item").forEach((el) => {
    el.addEventListener("click", () => {
      element.querySelector("swirl-app-layout").changeMobileView("body");
    });
  });

  return element;
};

export const SwirlShellLayout = Template.bind({});

SwirlShellLayout.args = {};
