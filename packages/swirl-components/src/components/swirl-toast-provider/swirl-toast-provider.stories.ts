import { SwirlToastIntent } from "../swirl-toast/swirl-toast";
import { generateStoryElement } from "../../utils";
import Docs from "./swirl-toast-provider.mdx";

export default {
  component: "swirl-toast-provider",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `const toasts = document.createElement('swirl-toast-provider');
const trigger = document.createElement('button');

trigger.innerText = 'Create toast';

trigger.addEventListener("click", () => {
  toasts.toast({
    content: "Hello World!",
    duration: 10000,
    icon: "<swirl-icon-mail></swirl-icon-mail>",
    intent: 'info'
  });
});

document.body.append(trigger, toasts);`,
      },
    },
  },
  title: "Components/SwirlToastProvider",
};

const Template = () => {
  const contents = [
    "Hello World",
    "This is toast text with multiple lines. Try to keep the info as short as possible.",
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
  ];

  const intents: SwirlToastIntent[] = ["default", "critical", "success"];

  const container = document.createElement("div");
  const createButton = document.createElement("swirl-button");
  const clearButton = document.createElement("swirl-button");
  const element = generateStoryElement(
    "swirl-toast-provider",
    {}
  ) as HTMLSwirlToastProviderElement;

  createButton.variant = "flat";
  createButton.label = "Create random toast";
  createButton.style.marginRight = "0.5rem";
  createButton.style.marginBottom = "1rem";

  clearButton.label = "Clear all";
  clearButton.style.marginBottom = "1rem";

  createButton.addEventListener("click", () => {
    element.toast({
      content: [...contents].sort(() => Math.random() - 0.5)[0],
      duration: 6000,
      icon: "<swirl-icon-mail></swirl-icon-mail>",
      intent: [...intents].sort(() => Math.random() - 0.5)[0],
    });
  });

  clearButton.addEventListener("click", () => element.clearAll());

  container.append(createButton, clearButton, element);

  return container;
};

export const SwirlToastProvider = Template.bind({});
