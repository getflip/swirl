import { storybookArgsToProps } from '../../utils';

export default {
  component: "flip-icon",
  title: "Components/FlipIcon",
};

const Template = (args) => {
  const props = storybookArgsToProps(args);

  return `<flip-icon ${props}></flip-icon>`;
};

export const FlipIcon = Template.bind({});

FlipIcon.args = {
  size: "m",
};
