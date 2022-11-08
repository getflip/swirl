import { FunctionComponent } from "react";

export type GridProps = {
  data: any;
  className?: string;
  children: JSX.Element | JSX.Element[];
};

export const Grid: FunctionComponent<GridProps> = ({ className, children }) => {
  return (
    <div role="grid" aria-colcount={1} aria-rowcount={1}>
      <div className={className} role="row">
        {children}
      </div>
    </div>
  );
};

export default Grid;
