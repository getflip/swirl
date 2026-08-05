import IllustrationsJSON from "../../../illustrations.json";
import { generateStoryElement } from "../../utils";
import Docs from "./swirl-illustration.mdx";

export default {
  argTypes: {
    svg: {
      control: "select",
      options: Object.values(IllustrationsJSON).map(
        (illustration) => illustration.name
      ),
    },
  },
  component: "swirl-illustration",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlIllustration",
};

const Template = (args) => {
  const element = generateStoryElement(`swirl-illustration`, args);

  return element;
};

export const SwirlIllustration = Template.bind({});

SwirlIllustration.args = {
  svg: "absence",
};
