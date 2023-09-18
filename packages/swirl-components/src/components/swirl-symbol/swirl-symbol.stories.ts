import { generateStoryElement } from "../../utils";
import Docs from "./swirl-symbol.mdx";
import SymbolsJSON from "../../../symbols.json";

export default {
  argTypes: {
    glyph: {
      control: "select",
      options: Object.values(SymbolsJSON).map((symbol) => symbol.name),
    },
  },
  component: "swirl-symbol",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlSymbol",
};

const Template = (args) => {
  const element = generateStoryElement(`swirl-symbol`, args);

  return element;
};

export const SwirlSymbol = Template.bind({});

SwirlSymbol.args = {
  glyph: "cloud",
  size: "24",
};
