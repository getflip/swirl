import { Heading, LinkedHeading } from "../swirl-recreations";

interface HeadlineProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  id: string;
  href?: string;
  className?: string;
}

const idToHref = (id: string) => `#${id}`;

const H1 = ({ id, href, className, ...rest }: HeadlineProps) => {
  if (id && href) {
    return (
      <LinkedHeading className={className} href={idToHref(id)}>
        <Heading level={1} id={id} {...rest} />
      </LinkedHeading>
    );
  }
  return <Heading level={1} {...rest} />;
};

export const H2 = ({ id, href, className, ...rest }: HeadlineProps) => {
  if (id && href) {
    return (
      <LinkedHeading className={className} href={href}>
        <Heading level={2} id={id} {...rest} />
      </LinkedHeading>
    );
  }
  return <Heading level={2} {...rest} />;
};

export const H3 = ({ id, href, className, ...rest }: HeadlineProps) => {
  if (id && href) {
    return (
      <LinkedHeading className={className} href={href}>
        <Heading level={3} id={id} {...rest} />
      </LinkedHeading>
    );
  }
  return <Heading level={3} {...rest} />;
};

export const H4 = ({ id, href, className, ...rest }: HeadlineProps) => {
  if (id && href) {
    return (
      <LinkedHeading className={className} href={id}>
        <Heading level={4} id={id} {...rest} />
      </LinkedHeading>
    );
  }
  return <Heading level={4} {...rest} />;
};

export const H5 = ({ id, href, ...rest }: HeadlineProps) => {
  if (id && href) {
    return (
      <LinkedHeading href={id}>
        <Heading level={4} {...rest} />
      </LinkedHeading>
    );
  }
  return <Heading level={4} {...rest} />;
};

export const H6 = ({ id, href, ...rest }: HeadlineProps) => {
  if (id && href) {
    return (
      <LinkedHeading href={id}>
        <Heading level={4} {...rest} />
      </LinkedHeading>
    );
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
