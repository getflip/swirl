import classNames from "classnames";
import { FunctionComponent } from "react";

interface CardProps {
  title: string;
  description: string;
  highlightColor?: "red" | "green";
  className?: string;
}

export const Card: FunctionComponent<CardProps> = ({
  title,
  description,
  highlightColor,
  className,
}) => {
  return (
    <div
      className={classNames(
        "relative w-full bg-surface-raised-default p-space-16 rounded-border-radius-s",
        "before:block before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-surface-raised-default before:rounded-t-border-radius-s",
        className,
        {
          "before:bg-border-critical": highlightColor === "red",
          "before:bg-border-success": highlightColor === "green",
        }
      )}
    >
      <h3 className="text-font-size-base font-font-weight-semibold">{title}</h3>
      <p className="text-font-size-base font-font-weight-normal">
        {description}
      </p>
    </div>
  );
};
