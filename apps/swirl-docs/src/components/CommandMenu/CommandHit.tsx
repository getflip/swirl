import classNames from "classnames";
import { Command } from "cmdk";
import { ReactNode } from "react";

type CommandHitProps = {
  title: string;
  description: string;
  icon: ReactNode;
  handleOnSelect: (value: any) => void;
  handleOnFocus: (value: any) => void;
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
        aria-label={title}
        className={classNames(
          "flex w-full h-full py-2",
          "bg-surface-overlay-default",
          "hover:bg-surface-hovered",
          "focus:bg-surface-pressed",
          "active:bg-surface-pressed",
          "outline-none"
        )}
      >
        <div className="inline-flex items-center max-w-5 max-h-5 pl-4 pr-3">
          {icon}
        </div>
        <div>
          <h4 className="text-font-size-sm font-medium text-text-default">
            {title}
          </h4>
          <p className="text-font-size-sm font-normal text-text-subdued">
            {description}
          </p>
        </div>
      </button>
    </Command.Item>
  );
}
