import { FunctionComponent } from "react";

export type GridProps = {
  id?: string;
  className?: string;
  labelledBy?: string;
  children: JSX.Element | JSX.Element[];
};

/**
 * Use this component to create an **a11y** grid.
 * #### Important
 * - As children you need to add a list of elements of which every element get the `role="gridcell"` attribute.
 * - You need to use the `useDynamicRefs` hook to create a ref for every gridcell and pass the ref to the element.
 * - You need to Use the `handleGridKeyDown` function to handle the arrow keys and tab key.
 *
 * You can find an example in the `IconGrid` and `ComponentGrid` components.
 */
export const Grid: FunctionComponent<GridProps> = ({
  className,
  children,
  labelledBy,
  id,
}) => {
  return (
    <div
      className="@container"
      id={id}
      role="grid"
      aria-labelledby={labelledBy}
    >
      <div className={className} role="row">
        {children}
      </div>
    </div>
  );
};

export default Grid;
