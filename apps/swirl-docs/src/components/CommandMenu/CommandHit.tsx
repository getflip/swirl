import classNames from "classnames";
import { Command } from "cmdk";
import { ReactNode } from "react";

type CommandHitProps = {
  title: string;
  description?: string;
  icon: ReactNode;
  handleOnSelect: (value: unknown) => void;
  handleOnFocus: (value: unknown) => void;
};

export function CommandHit({
  title,
  icon,
  description,
  handleOnSelect,
  handleOnFocus,
}: CommandHitProps) {
  return (
    <Command.Item onFocus={handleOnFocus} onSelect={handleOnSelect}>
      <button
        type="button"
        className={classNames(
          "flex w-full h-full py-2",
          "bg-surface-overlay-default",
          "hover:bg-surface-hovered",
          "focus:bg-surface-pressed",
          "active:bg-surface-pressed",
          "outline-none"
        )}
      >
        <span className="inline-flex items-center max-w-5 pl-4 pr-3">
          {icon}
        </span>
        <span className="flex flex-col items-start">
          <p className="text-font-size-sm font-medium text-text-default">
            {title}
          </p>
          {description && (
            <p className="text-font-size-sm font-normal text-text-subdued text-start">
              {description}
            </p>
          )}
        </span>
      </button>
    </Command.Item>
  );
}
