export const LinkedHeaders = {
  h1: (props: any) => {
    return (
      <h1 className="mb-4" id={props.children.toLowerCase()}>
        {props.children}
      </h1>
    );
  },
  h2: (props: any) => {
    return (
      <h2 className="mb-4" id={props.children.toLowerCase()}>
        {props.children}
      </h2>
    );
  },
  h3: (props: any) => {
    return <h3 id={props.children.toLowerCase()}>{props.children}</h3>;
  },
  h4: (props: any) => {
    return <h4 id={props.children.toLowerCase()}>{props.children}</h4>;
  },
  h5: (props: any) => {
    return <h5 id={props.children.toLowerCase()}>{props.children}</h5>;
  },
  h6: (props: any) => {
    return <h6 id={props.children.toLowerCase()}>{props.children}</h6>;
  },
};
