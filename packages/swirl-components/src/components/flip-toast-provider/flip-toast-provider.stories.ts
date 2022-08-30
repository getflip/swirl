import { FlipToastIntent } from "../flip-toast/flip-toast";
import { generateStoryElement } from "../../utils";
import Docs from "./flip-toast-provider.mdx";

export default {
  component: "flip-toast-provider",
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `const toasts = document.createElement('flip-toast-provider');
const trigger = document.createElement('button');

trigger.innerText = 'Create toast';

trigger.addEventListener("click", () => {
  toasts.toast({
    content: "Hello World!",
    duration: 10000,
    icon: "<flip-icon-mail></flip-icon-mail>",
    intent: 'info'
  });
});

document.body.append(trigger, toasts);`,
      },
    },
  },
  title: "Components/FlipToastProvider",
};

const Template = () => {
  const contents = [
    "Hello World",
    "This is toast text with multiple lines. Try to keep the info as short as possible.",
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
  ];

  const intents: FlipToastIntent[] = [
    "default",
    "critical",
    "success",
    "info",
    "warning",
  ];

  const container = document.createElement("div");
  const createButton = document.createElement("flip-button");
  const clearButton = document.createElement("flip-button");
  const element = generateStoryElement(
    "flip-toast-provider",
    {}
  ) as HTMLFlipToastProviderElement;

  createButton.label = "Create random toast";
  createButton.style.marginRight = "0.5rem";
  createButton.style.marginBottom = "1rem";

  clearButton.label = "Clear all";
  clearButton.style.marginBottom = "1rem";

  createButton.addEventListener("click", () => {
    element.toast({
      content: [...contents].sort(() => Math.random() - 0.5)[0],
      duration: 6000,
      icon: "<flip-icon-mail></flip-icon-mail>",
      intent: [...intents].sort(() => Math.random() - 0.5)[0],
    });
  });

  clearButton.addEventListener("click", () => element.clearAll());

  container.append(createButton, clearButton, element);

  return container;
};

export const FlipToastProvider = Template.bind({});
