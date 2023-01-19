interface HeadlineProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  id: string;
}

const H1 = ({ id, ...rest }: HeadlineProps) => {
  if (id) {
    return <h1 id={id} {...rest} />;
  }
  return <h1 {...rest} />;
};

const H2 = ({ id, ...rest }: HeadlineProps) => {
  console.log("hello world");
  if (id) {
    return <h2 id={id} {...rest} />;
  }
  return <h2 {...rest} />;
};

const H3 = ({ id, ...rest }: HeadlineProps) => {
  if (id) {
    return <h3 id={id} {...rest} />;
  }
  return <h3 {...rest} />;
};

const H4 = ({ id, ...rest }: HeadlineProps) => {
  if (id) {
    return <h4 id={id} {...rest} />;
  }
  return <h4 {...rest} />;
};

const H5 = ({ id, ...rest }: HeadlineProps) => {
  if (id) {
    return <h5 id={id} {...rest} />;
  }
  return <h5 {...rest} />;
};

const H6 = ({ id, ...rest }: HeadlineProps) => {
  if (id) {
    return <h6 id={id} {...rest} />;
  }
  return <h6 {...rest} />;
};

export const LinkedHeaders = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
};
