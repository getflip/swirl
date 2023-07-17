import { Heading } from "../swirl-recreations";

interface HeadlineProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  id: string;
}

const H1 = ({ id, ...rest }: HeadlineProps) => {
  if (id) {
    return <Heading level={1} id={id} {...rest} />;
  }
  return <Heading level={1} {...rest} />;
};

const H2 = ({ id, ...rest }: HeadlineProps) => {
  if (id) {
    return <Heading level={2} id={id} {...rest} />;
  }
  return <Heading level={2} {...rest} />;
};

const H3 = ({ id, ...rest }: HeadlineProps) => {
  if (id) {
    return <Heading level={3} id={id} {...rest} />;
  }
  return <Heading level={3} {...rest} />;
};

const H4 = ({ id, ...rest }: HeadlineProps) => {
  if (id) {
    return <Heading level={4} id={id} {...rest} />;
  }
  return <Heading level={4} {...rest} />;
};

const H5 = ({ id, ...rest }: HeadlineProps) => {
  if (id) {
    return <Heading level={4} id={id} {...rest} />;
  }
  return <Heading level={4} {...rest} />;
};

const H6 = ({ id, ...rest }: HeadlineProps) => {
  if (id) {
    return <Heading level={4} {...rest} />;
  }
  return <Heading level={4} {...rest} />;
};

export const LinkedHeaders = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
};
